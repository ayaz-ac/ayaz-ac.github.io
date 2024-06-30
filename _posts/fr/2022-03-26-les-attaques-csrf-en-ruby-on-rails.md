---
lang: fr
page_id: csrf
permalink: /posts/les-attaques-csrf-en-ruby-on-rails
title: Les attaques CSRF en RubyOnRails
date: 2022-03-26
categories: [Ruby On Rails]
author: ayaz
description: L'attaque CSRF est l'une des plus connue sur le web. Voyons en quoi consiste cette attaque et comment RubyOnRails intègre des sécurités pour s'en prémunir.
image: /assets/img/posts/les-attaques-csrf-en-ruby-on-rails/thumbnail.jpg
---

## CSRF ? Qu'est-ce que c'est ?
Avant d'entrer dans les détails du fonctionnement de cette attaque, il est d'abord important de savoir quelles sont les données envoyées lors des requêtes *HTTP* faites par un navigateur web. Lorsqu'un utilisateur effectue une action sur un site web qui actionne une requête vers le serveur de ce dernier (par exemple: la mise à jour de son profil), la requête va comporter **TOUS** les cookies de sa session. Et j'insiste bien sur le "TOUS", car il inclut aussi les cookies des autres sites.

Prenons un exemple avec deux réseaux sociaux que vous devez sûrement connaître et utiliser: Facebook et Twitter. Je suis sur mon navigateur et je suis connecté à la fois sur Facebook et sur Twitter, lorsqu'une requête est envoyée à Twitter, elle comportera les cookies de Twitter mais aussi ceux de Facebook.

Si je souhaitais profiter de cette faille, j'aurais "simplement" à créer un site que je vais appeler "site-cool.com", que j’envoie ensuite à mes futures victimes qui sont déjà connectées à leur compte Facebook. Une fois qu'elles visitent mon site, il envoie une requête *HTTP* de type *DELETE* qui contient les cookies de Facebook au serveur de ce dernier, pour supprimer le compte de la victime.

Bien évidemment vous vous doutez bien que ce n'est pas aussi simple que ça. L'attaque *CSRF* fait partie des attaques les plus populaires sur le web, et *normalement* tous les sites possèdent des processus pour contrer ce type d'attaque.

## Contrer les attaques CSRF avec Rails
En tant que développeur Ruby On Rails, nous avons de la chance car pour contrer les attaques *CSRF*, eh bien nous n'avons rien à faire ! Allez fin de l'article, merci d'avoir lu jusqu'au bout ! 👋

Plus sérieusement, depuis la [version 6.1](https://edgeguides.rubyonrails.org/configuring.html#config-action-controller-default-protect-from-forgery) Rails intègre nativement la méthode `protect_from_forgery` permettant d'empêcher les attaques *CSRF*.

Mais alors comment fonctionne cette méthode ? La méthode `protect_from_forger` génère un *token* aléatoire qui est lié à la session de l'utilisateur et l'insère sous forme de balise dans tous les formulaires:
```html
<input type="hidden" name="authenticity_token" value="token_aleatoire" autocomplete="off">
```
Ce token qui est généré aléatoirement, est comparé à la session de l'utilisateur à chaque requête dans la méthode `verify_authenticty_token`, afin de vérifier que c'est bien depuis l'application que la requête est effectuée.
[D'après la documentation](https://edgeguides.rubyonrails.org/configuring.html#config-action-controller-default-protect-from-forgery), `protect_from_forgery` est déjà inclus de base dans `ActionController::Base`, c'est d'ailleurs pour cette raison qu'on n'a pas nécessité d'indiquer son utilisation dans chaque *controller*.

Cependant, certaines fois on souhaite autoriser des requêtes de type *PUT*, *POST* ou *DELETE*, sans `authenticity_token` (par exemple dans le cadre d'un *widget* présent sur une autre site). Pour ce faire, il suffit de d'ajouter un [callback dans le controller](/posts/les-callbacks-de-controller-en-ruby-on-rails) souhaité afin d'ignorer la méthode `verify_authenticty_token`:
```ruby
skip_before_action :verify_authenticity_token
```
Bien évidemment si l'on souhaite limiter le nombre de méthodes qui doit vérifier le `authenticity_token`, nous pouvons utiliser les mots-clés `except` ou `only` (Plus d'explication sur ces mots clés dans [mon précédent article](/posts/les-callbacks-de-controller-en-ruby-on-rails)):
```ruby
skip_before_action :verify_authenticity_token, except: :index
# OU
skip_before_action :verify_authenticity_token, only: %i[create update]
```
