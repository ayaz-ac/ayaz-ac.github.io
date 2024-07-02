---
lang: fr
page_id: csrf
permalink: /posts/les-attaques-csrf-en-ruby-on-rails
title: Les attaques CSRF en Ruby on Rails
date: 2022-03-26
categories: [Ruby on Rails]
author: ayaz
description: L'attaque CSRF est l'une des plus connue sur le web. Voyons en quoi consiste cette attaque et comment Ruby on Rails intègre des sécurités pour s'en prémunir.
image: /assets/img/posts/les-attaques-csrf-en-ruby-on-rails/thumbnail.jpg
---

## CSRF ? Qu'est-ce que c'est ?
Pour comprendre comment les attaques CSRF (Cross-Site Request Forgery) exploitent le comportement des navigateurs, il est crucial de clarifier quelles données sont incluses dans les requêtes HTTP. Lorsqu'un utilisateur déclenche une action sur un site web qui nécessite une requête serveur, comme la mise à jour de leur profil, la requête inclut les cookies spécifiquement associés au domaine de ce site. 

De ce fait, les cookies provenant de domaines non liés ne sont pas inclus en raison de mesures de sécurité telles que le *same-origin policy*.

Par exemple, si un utilisateur est connecté à la fois sur Facebook et Twitter, et qu'il effectue une action sur Twitter, la requête vers le serveur de Twitter inclura uniquement les cookies de Twitter, pas ceux de Facebook.

C'est là que réside la vulnérabilité CSRF : supposons qu'un attaquant crée un site malveillant, "evil-site.com", et convainc les utilisateurs connectés à Facebook de le visiter. Une fois sur "evil-site.com", le script de l'attaquant peut déclencher automatiquement une requête HTTP forgée (par exemple, DELETE) vers les serveurs de Facebook. La requête inclut les cookies Facebook de la victime, tentant d'exécuter des actions sur Facebook comme si elles étaient initiées par la victime.

La raison pour laquelle ces cookies sont inclus réside dans la manière dont les navigateurs gèrent les requêtes : lorsqu'un navigateur effectue une requête vers un domaine (dans ce cas, Facebook) à partir d'un autre domaine (evil-site.com), il attache automatiquement les cookies associés à ce domaine cible (Facebook). Cette inclusion automatique des cookies facilite les attaques CSRF, exploitant le contexte authentifié de la session de la victime.

Bien évidemment vous vous doutez bien que ce n'est pas aussi simple que ça. L'attaque CSRF fait partie des attaques les plus populaires sur le web, et *normalement* tous les sites possèdent des processus pour contrer ce type d'attaque.

## Contrer les attaques CSRF avec Rails
En tant que développeur Ruby on Rails, nous avons de la chance car pour contrer les attaques CSRF, eh bien nous n'avons rien à faire ! Allez fin de l'article, merci d'avoir lu jusqu'au bout ! 👋

Plus sérieusement, depuis la [version 6.1](https://edgeguides.rubyonrails.org/configuring.html#config-action-controller-default-protect-from-forgery) Rails intègre nativement la méthode `protect_from_forgery` permettant d'empêcher les attaques CSRF.

Mais alors comment fonctionne cette méthode ? La méthode `protect_from_forger` génère un *token* aléatoire qui est lié à la session de l'utilisateur et l'insère sous forme de balise dans tous les formulaires:
```html
<input type="hidden" name="authenticity_token" value="token_aleatoire" autocomplete="off">
```
Ce token qui est généré aléatoirement, est comparé à la session de l'utilisateur à chaque requête dans la méthode `verify_authenticty_token`, afin de vérifier que c'est bien depuis l'application que la requête est effectuée.
[D'après la documentation](https://edgeguides.rubyonrails.org/configuring.html#config-action-controller-default-protect-from-forgery), `protect_from_forgery` est déjà inclus de base dans `ActionController::Base`, c'est d'ailleurs pour cette raison qu'on n'a pas nécessité d'indiquer son utilisation dans chaque controller.

Cependant, certaines fois on souhaite autoriser des requêtes de type PUT, POST ou DELETE, sans `authenticity_token` (par exemple dans le cadre d'un widget présent sur une autre site). Pour ce faire, il suffit de d'ajouter un [callback dans le controller](/posts/les-callbacks-de-controller-en-ruby-on-rails) souhaité afin d'ignorer la méthode `verify_authenticty_token`:
```ruby
skip_before_action :verify_authenticity_token
```
Bien évidemment si l'on souhaite limiter le nombre de méthodes qui doit vérifier le `authenticity_token`, nous pouvons utiliser les mots-clés `except` ou `only` (Plus d'explication sur ces mots clés dans [mon précédent article](/posts/les-callbacks-de-controller-en-ruby-on-rails)):
```ruby
skip_before_action :verify_authenticity_token, except: :index
# OU
skip_before_action :verify_authenticity_token, only: %i[create update]
```
