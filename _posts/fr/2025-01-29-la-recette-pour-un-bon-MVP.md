---
lang: fr
page_id: recette-pour-un-mvp
permalink: /posts/la-recette-pour-un-bon-mvp
title: La recette pour un bon MVP
date: 2025-01-29
categories: [Entrepreneuriat]
tags: [SaaS]
author: ayaz
description: "Pour un bon MVP, il faut : échanger avec sa cible, de la simplicité et de l'engagement de la part de ses utilisateurs. Comment concilier tout ça ? La réponse dans cet article!"
image: /assets/img/posts/la-recette-pour-un-bon-mvp/thumbnail.jpg
---

# Introduction
Le MVP est la pierre angulaire de toute aventure entrepreneuriale dans le domaine de la tech. Dans cet article, on va principalement s’intéresser
au MVP d’un type bien précis de produit qui se nomme : “SaaS” (Software As A Service). Il y a de fortes chances que tu aies déjà utilisé un SaaS au
moins une fois, voire même quotidiennement. Un SaaS, c’est une application qui propose un service auquel tu accèdes en payant un abonnement. Netflix
est un très bon exemple : les utilisateurs paient un abonnement mensuel et, en retour, ils ont accès à un catalogue de films et de séries.

Cela fait maintenant quelques années que je développe des SaaS tout en étant freelance en tant que développeur Ruby On Rails.
D’ailleurs, si tu cherches ou que tu connais quelqu’un qui cherche un freelance Ruby On Rails,
[tu peux me contacter ici](/me-contacter){:target="_blank"}.

Si l’aventure du SaaS t’intéresse, il faut savoir que c’est un chemin avec beaucoup d’a priori.
C’est d’ailleurs pour cette raison que j’ai écrit un [article](la-dure-realite-des-saas){:target="_blank"} dessus.

# Définition
MVP est un acronyme anglais qui signifie “Minimum Viable Product”, si on devait le traduire en français, ça donnerait “Produit Minimum Viable”.
Il est important que tu comprennes la signification de chaque mot et son impact dans le contexte du SaaS. En assimilant ces informations,
tu auras gagné plusieurs mois, voire des années d’expérience, et je pèse mes mots.

Commençons par le “P” qui signifie “produit”, c’est un terme générique. Tu remarqueras qu’on ne parle pas spécifiquement d’un type d’application
(web ou mobile), ni d’un type de support en particulier, et encore moins d’une techno précise. Ce qu’il faut comprendre ici, c’est qu’un MVP dépend
du contexte et, de ce fait, ça peut être n’importe quoi : un site web, une page Notion, une affiche, etc.

V pour “viable” : l’idée ici, c’est de développer un produit qui soit un minimum utile pour tes utilisateurs. L’utilité se traduit ici par une
réponse efficace à un besoin ou un problème que rencontre un marché.

Pour finir, le “M” pour “minimum”, celui-là est tout aussi important que les deux points précédents. Tu peux construire un MVP qui correspond
parfaitement aux besoins de tes utilisateurs avec toutes les fonctionnalités possibles et te planter dès le début. Car la force de ce concept
réside dans le périmètre des fonctionnalités que tu attribues à ton produit. Plus tu ajoutes de fonctionnalités, plus ton temps de développement
sera long, et donc ton *time-to-market* aussi. Le nombre de fonctionnalités va aussi influer sur ta capacité à faire de l’*A/B testing* et à vraiment
cerner la solution qui correspond à ton marché.

Dans un MVP, tu dois d’abord analyser le problème principal de tes utilisateurs et proposer un produit qui le résout avec un minimum de
fonctionnalités.

# Le MVP il a changé
Pendant l’âge d’or des startups, c’est-à-dire durant les années Covid, le “M” de “Minimum” valait aussi pour le temps que tu pouvais passer dessus.
Durant cette période, il suffisait de passer une ou deux semaines pour développer un MVP assez léger et obtenir tes premiers clients. Cela s’explique
notamment par le fait qu’avec le Covid, il y avait tellement de marchés où les problèmes sans solution étaient nombreux que la barrière à l’entrée
était relativement basse.

Nous sommes maintenant en 2025, et la bulle qui s’était créée lors du Covid dans l’univers des startups a éclaté depuis un moment. La grande majorité
des marchés possède déjà des solutions à leurs problèmes, ce qui rend l’insertion dans l’un d’entre eux avec un MVP “léger” plus compliquée
qu’auparavant. Il ne suffit donc plus de développer un produit avec une seule fonctionnalité, car il y a tellement de concurrence que les
utilisateurs sont habitués à utiliser des applications complètes et performantes. Pour faire simple, la barrière à l’entrée est beaucoup plus élevée
qu’il y a quelques années.

Ceci étant dit, cela ne veut pas dire qu’il t’est impossible de développer un MVP dans un marché déjà concurrentiel, mais l’approche doit être
légèrement différente.

## Les pilliers du MVP
Peu importe la taille de ton marché, il y a des principes qui, selon moi, sont essentiels au développement d’un bon MVP.

Avant de te les détailler, il faut que je te parle du projet de SaaS sur lequel je travaille en ce moment :
[*ProfPlanner*](https://profplanner.com){:target="_blank"}.
Une application web destinée aux professeurs afin de les aider à optimiser leur temps et à simplifier leur organisation. À l’heure où j’écris cet
article, mon associé et moi travaillons justement sur le MVP. Pour chaque principe que je vais te lister, je te présenterai comment nous l’avons 
appliqué sur *ProfPlanner*, afin que tu aies un cas concret sur lequel t’appuyer.

## Échanger avec sa cible
Le cœur de tout projet entrepreneurial, ce sont les utilisateurs. Il est donc essentiel, surtout en *early-stage*, de discuter avec ta cible,
car il y a souvent une différence entre ce que tu imagines être leur problème et la réalité. Sur des marchés concurrentiels, tu peux analyser, grâce
à tes échanges avec tes utilisateurs, les axes de différenciation sur lesquels tu peux t’appuyer pour développer ton projet.

Pour *ProfPlanner*, on s’est appuyé sur le fait que mon associé est professeur au lycée et présente dans des groupes Facebook d’entraide entre profs.
Elle a publié des posts ayant pour but de recueillir des avis sur les besoins des enseignants. Elle a aussi échangé en privé, toujours sur Facebook,
avec des professeurs afin d’avoir plus de détails sur les solutions qu’ils utilisaient jusqu’à présent et leurs points de blocage.

## Simplicité
Si j’avais un conseil à donner à mon moi du passé, ce serait celui-là : **garde le MVP simple**. Si tu te forces à être simple dans le développement
de ton MVP, tu verras que ton time-to-market sera beaucoup plus court. Nous, développeurs, avons souvent tendance à over-engineer, surtout sur nos
projets perso. Il faut donc que tu fasses l’effort de garder ton MVP le plus simple possible.

Concernant *ProfPlanner*, nous avons fait l’effort de réduire au maximum les fonctionnalités et la complexité globale du projet afin de nous
concentrer uniquement sur l’essentiel : un algorithme de planification. Mais je te mentirais si je te disais que nous sommes arrivés à ce résultat
dès le début. Au départ, nous avions quelque chose de différent, avec une gestion des tâches classique, des colonnes par statut, etc.

![screenshot de la maquette l'ancienne version du MVP de ProfPlanner](/assets/img/posts/la-recette-pour-un-bon-mvp/screenshot-ancien-mvp-profplanner.png)
*Screenshot de la maquette de l'ancienne version du MVP de ProfPlanner*

On s’est rapidement rendu compte que notre MVP n’apportait pas de réelle valeur à nos utilisateurs. On a donc pivoté pour finalement arriver sur
l’idée d’un algorithme de planification.

## Engagement
L’objectif du MVP, c’est de valider une idée, un concept. La seule manière d’y parvenir, c’est que tes utilisateurs montrent de l’intérêt pour ton
projet. Il existe trois manières d’impliquer réellement un utilisateur dans ton projet : **son temps, sa réputation ou son argent**.

- Temps : Prendre du temps pour te faire des retours sur ton produit, te donner des idées d’amélioration.
- Réputation : Te présenter un collègue ou une personne importante .
- Argent : Achat, précommande ou investissement financier.

Je te conseille vivement la lecture de [*The Mom Test* de Rob Fitzpatrick](https://www.momtestbook.com/){:target="_blank"}, qui aborde justement ces thèmes-là. Plus globalement, cet ouvrage
va t’apprendre à poser les bonnes questions à ton marché afin de savoir si ton produit est utile. C’est un *must-have* pour tout entrepreneur !

De notre côté avec *ProfPlanner* on a opté pour une étape supplémentaire avant le MVP en développant un *POC (Proof Of Concept)*. L’idée était de
valider l’existence du problème chez nos utilisateurs. On a donc créé et mis en vente un template Notion permettant la gestion des cours, la gestion
des tâches, le suivi des élèves etc. Les retours étaient très positifs puisqu’on a eu assez de ventes pour valider le besoin.

# Oublier le lancement unique
On a souvent tendance à penser que le lancement d’un projet est quelque chose que l’on fait une seule fois. On va donc se concentrer sur cette date
symbolique et y mettre toute notre énergie.

En réalité, rien ne t’empêche de faire plusieurs lancements, et c’est d’ailleurs tout à ton avantage, car cela te permet de communiquer plusieurs
fois sur ton projet. C’est une technique beaucoup utilisée sur [*Product Hunt*](https://www.producthunt.com/){:target="_blank"} : plusieurs projets font un lancement pour chaque nouvelle 
fonctionnalité qu’ils développent.

# Rater fait partie de l'apprentissage
Comme tout aspect de la vie d’entrepreneur, tout n’est qu’expérience. Tu vas peut-être te rater plusieurs fois, mais tu auras beaucoup appris
de chaque projet. Ton premier MVP sera sûrement trop complexe ou ne répondra pas à un vrai besoin, mais ce n’est pas grave, car tu as besoin de
passer par là pour en construire de meilleurs.
