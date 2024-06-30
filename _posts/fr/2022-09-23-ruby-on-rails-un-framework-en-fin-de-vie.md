---
lang: fr
page_id: rails-fin-de-vie
permalink: /posts/ruby-on-rails-un-framework-en-fin-de-vie
title: RubyOnRails un framework en fin de vie ?
date: 2022-09-23
categories: [Ruby On Rails]
author: ayaz
description: Rails ? Ça scale pas trop comme tech non ?, Pourquoi tu n'utilise pas de framework Js ? C'est plus moderne!. C'est ce genre de questions qu'on me pose quand je dis que je suis développeur Rails, mais ont-ils vraiment raison ?
image: /assets/img/posts/ruby-on-rails-un-framework-en-fin-de-vie/thumbnail.jpg
---

Lorsque je me présente en tant que développeur freelance RubyOnRails à mes collègues dans le monde de la Tech, j’ai souvent le droit à des remarques comme: “C’est un framework dépassé non ?” ou encore “Ruby On Rails ? C’est encore utilisé ça ?”.

Si t’es un développeur RubyOnRails, tu dois savoir de quoi je parle 🥲.

La plupart du temps je pars sur un mini-monologue pour expliquer que RubyOnRails n’est pas en fin de vie et est bien loin de l’être!

Le but de cet article est donc de d’abord d’expliquer pourquoi RubyOnRails est toujours un aussi bon choix pour créer une application web en 2022 mais aussi pour éviter que je fasse des mini-monologue à l’avenir (j’aurai juste à partager cet article) 😋.

## RubyOnRails, solide sans pris de tête
La première force de RubyOnRails, c’est le langage sur lequel il est basé, *Ruby*. Je ne vais pas décrire *Ruby* dans cet article, mais il est important de savoir que ce langage a été créé dans le but de faciliter la vie du développeur (syntaxe, nom des méthodes etc.).

RubyOnRails repose sur deux concepts dont tu as déjà dû entendre parler:
- [Convention over Configuration (CoC)](https://en.wikipedia.org/wiki/Convention_over_configuration): Ce principe signifie que le développeur ne précise que les comportements qui sont inconventionnels dans l’application. Par exemple si on a un modèle “Book”, la table correspondante dans la base de données se nommera automatiquement “books” par convention. S’il souhaite donner un autre nom à la table (ex: “magazins”), donc une action inconventionnel, il devra alors écrire du code pour le préciser.
- [Don’t Repeat Yourself (DRY)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself): Comme l’indique son nom, ce principe a pour but de ne pas dupliquer du code dans l’application. Pour ce faire RubyOnRails nous met a disposition plusieurs outils: scopes, concerns, helpers, [PORO](/posts/les-poro-pour-un-code-propre), etc.

## La propagande des SPA et des frameworks JS
Les SPA (Single Page Application) ont plusieurs avantages qui sont indéniables: un affichage plus rapide du contenu et une meilleure réactivité dans le but d’améliorer le plus possible l’expérience utilisateur. Seulement voilà, la plupart des applications développées avec des SPA, n’en n’ont pas réellement besoin. Elles n’ont que très peu de contenu à charger et/ou pas beaucoup d’interactions avec l’utilisateur. On se retrouve donc dans un schéma avec deux applications distinctes (Front et Back), alors qu’un [monolith](https://m.signalvnoise.com/the-majestic-monolith/) aurait très bien fait l’affaire…

Mais on ne peut pas leur en vouloir, car la propagande pour les frameworks JavaScript est conséquente. Si bien, que cela éclipse les autres bon frameworks, comme RubyOnRails.

Cependant, c’est aussi de la faute de la communauté RubyOnRails, qui est beaucoup moins active et fait moins parler d’elle à l’instar des autres frameworks tel que: Symfony, Laravel, Django, etc.

Et même si RubyOnRails était plus connu, comment est-il possible de rendre l’expérience utilisateur aussi fluide qu’avec les frameworks JS ?

## Hotwire, un peu de douceur dans ce monde de brute
Pendant longtemps, l’intégration du JavaScript dans RubyOnRails n’était pas top. On a eu le droit à l’intégration du JS en utilisant le langage de templating ERB (js.erb), très peu maintenable… Il n’existait pas de réel moyen pour ajouter un peu de piment aux interfaces utilisateurs, sans passer par la création d’un fichier JavaScript dans le projet. C’est à ce moment qu’Hotwire entre en jeu !

[Hotwire (HTML Over The Wire)](https://hotwired.dev/) c’est la combinaison de 2 technologies:
- [Turbo](https://turbo.hotwired.dev/): Composé de TurboDrive, Turbo Frames, Turbo Streams et Turbo Native. Il permet de réduire la quantité de JavaScript produite pour des actions simples (mise à jour du contenu, navigation, etc.)
- [Stimulus](https://stimulus.hotwired.dev/): Léger framework (voir libraire), qui permet d’ajouter des comportements au HTML. Par exemple: Changer la classe d’un élément lors d’un clique sur une case à cocher.

Les différents technologies qui compose Hotwire, s’intègrent parfaitement à l’écosystème RubyOnRails, mais aussi à d’autres frameworks tel que Symfony (vrai reconnait vrai).

C’est bien beau tout ça, mais est-ce que ça scale ? 🥴

## RubyOnRails, l’Homme de l’Ombre
Quand on demande si un framework scale, on veut savoir si ce dernier peut supporter la charger d’une grande quantité d’utilisateur (> 1 millions par exemple).

Le site de plusieurs grosses entreprises du monde de la Tech est fait en RubyOnRails (et oui!):
- Github
- Doctolib (Cocorico 🐓)
- AirBnb
- Shopify

D’ailleurs, RubyOnRails scale comme tout autre framework sur le marché 😉

## Conclusion

En conclusion on peut dire que RubyOnRails est un framework solide et fiable. Il est constamment mis à jour afin de permettre le développement d’applications qui répondent à la demande du web d’aujourd’hui.

Le but ici n’est pas de dire que RubyOnRails est le meilleur framework qui existe, mais simplement préciser que c’est encore et toujours une technologie avec laquelle on peut développer des applications web solide.
