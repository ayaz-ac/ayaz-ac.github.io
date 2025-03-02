---
lang: fr
page_id: deploiement-rails-coolify
permalink: /posts/deployer-une-application-ruby-on-rails-avec-coolify
title: Déployer une application RubyOnRails avec Coolify
date: 2025-03-02
categories: [Rails]
tags: [Self-Host, Coolify, Tutorial]
author: ayaz
description: ""
image: /assets/img/posts/deployer-une-application-ruby-on-rails-avec-coolify/thumbnail.jpg
---

## Introduction
Heroku a longtemps été la solution idéale pour déployer une application Ruby on Rails rapidement et gratuitement. Mais en [novembre 2022](https://help.heroku.com/RSBRUH58/removal-of-heroku-free-product-plans-faq){:target="_blank"}, tout a changé : la plateforme a supprimé son offre gratuite, rendant l’ensemble de ses services payants, même pour les petits projets.

Suite à cette annonce, plusieurs concurrents comme [Fly.io](https://fly.io){:target="_blank"} ont émergé avec des plans gratuits limités. Mais ils ont aussi fini par suivre le même chemin, supprimant progressivement leurs offres gratuites.

En tant qu’Indie Hacker, maintenir plusieurs projets en ligne devient rapidement trop coûteux, surtout si les bénéfices ne couvrent pas les frais.

Ajoutons à cela un autre enjeu: la RGPD. La majorité des PaaS hébergent leurs données aux États-Uns, ce qui pose problème de conformité pour les utilisateurs européens.

### La solution ? Le self-hosting
Face à cette situation, une alternative devient incontournable : héberger soi-même ses applications (aka self-hosting). Sur un serveur, peu importe le nombre de ressources utilisées, la facture reste la même. Et surtout, on garde le contrôle total sur ses données.

Mais une question se pose : comment faire du self-hosting sans galérer avec la configuration ?
Traditionnellement, des outils comme Capistrano ou Kamal sont utilisés, mais ils nécessitent une configuration avancée (serveur, accès SSH, reverse proxy…).

Bonne nouvelle : il existe une alternative bien plus simple qui prend en charge toutes ces contraintes tout en gardant la flexibilité d’Heroku… **Coolify**.

## Qu'est-ce que Coolify ?
[Coolify](https://coolify.io){:target="_blank"} est une alternative open-source et gratuite aux PaaS comme Heroku. Il permet de déployer facilement presque n'importe quelle application, quelle que soit la technologie utilisée, et ce, en seulement quelques clics.

Deux options s'offrent à toi pour l'utiliser : en mode **cloud** (5 $/mois) ou en mode **self-hosted**. Personnellement, j'ai choisi d'héberger Coolify moi-même sur un VPS de chez Hostinger avec un [KVM2](https://www.hostinger.fr/vps){:target="_blank"}.

Si tu souhaites sécuriser et configurer ton VPS avant d'y installer Coolify, je te recommande cette vidéo: [Set up and Secure Your Own Server](https://youtu.be/Q1Y_g0wMwww?feature=shared){:target="_blank"}. Concernant l'installation de Coolify, Syntax a réalisé un excellent guide vidéo: 

Pour configurer et sécuriser ton VPS, je te recommande de suivre cette vidéo: [Coolify Crash Course](https://www.youtube.com/watch?v=Q1Y_g0wMwww&t=202s){:target="_blank"}.

## Déployer une application Ruby On Rails
### Créer un nouveau projet et un environnement
![](/assets/img/posts/deployer-une-application-ruby-on-rails-avec-coolify/step_1.png)
![](/assets/img/posts/deployer-une-application-ruby-on-rails-avec-coolify/step_2.png)

### Mise en place de la base de données
Pour créer une base de données dans un environnement, rien de plus simple, il suffit d’ajouter une ressource en recherchant le nom de ton SGBD (PostgreSQL, MySQL, etc.).
![](/assets/img/posts/deployer-une-application-ruby-on-rails-avec-coolify/step_3.png)
![](/assets/img/posts/deployer-une-application-ruby-on-rails-avec-coolify/step_4.png)

### Déploiement avec GitHub
Afin que Coolify déploie ton projet, il faut d’abord créer une application GitHub pour accéder à tes repositories. Tu peux faire cela directement depuis le menu “Sources”.
![](/assets/img/posts/deployer-une-application-ruby-on-rails-avec-coolify/step_5.png)
![](/assets/img/posts/deployer-une-application-ruby-on-rails-avec-coolify/step_6.png)

### Déploiement d'une application
Au même titre que ta base de données, une application est aussi considérée comme une ressource par Coolify.
![](/assets/img/posts/deployer-une-application-ruby-on-rails-avec-coolify/step_7.png)

Pour récupérer ton projet depuis GitHub, tu peux sélectionner **Private Repository (with GitHub App)** depuis la liste des services. Coolify se chargera par la suite de cloner ton repo sur ton serveur.
![](/assets/img/posts/deployer-une-application-ruby-on-rails-avec-coolify/step_8.png)
![](/assets/img/posts/deployer-une-application-ruby-on-rails-avec-coolify/step_9.png)

Ici il faut bien que tu fasses attention à sélectionner **Dockerfile** dans le “Build Pack”, afin que Coolify se base sur ce dernier pour déployer ton application dans un container Docker.
![](/assets/img/posts/deployer-une-application-ruby-on-rails-avec-coolify/step_10.png)

Si tu n’as pas de Dockerfile déjà configuré, tu peux adapter celui qui est généré par Rails sur les nouvelles versions. N’oublie pas de mettre à jour ta version de Ruby dans le Dockerfile.
```docker
# syntax = docker/dockerfile:1

# This Dockerfile is designed for production, not development. Use with Kamal or build'n'run by hand:
# docker build -t my-app .
# docker run -d -p 80:80 -p 443:443 --name my-app -e RAILS_MASTER_KEY=<value from config/master.key> my-app

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version
ARG RUBY_VERSION=3.2.2
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

# Rails app lives here
WORKDIR /rails

# Install base packages
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl wget libjemalloc2 libvips postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development" \
    RAILS_SERVE_STATIC_FILES="1"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copy application code
COPY . .

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/

# Precompiling assets for production without requiring secret RAILS_MASTER_KEY
RUN RAILS_ENV=production SECRET_KEY_BASE=dummy ./bin/rails assets:precompile

# Final stage for app image
FROM base

# Copy built artifacts: gems, application
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# Run and own only the runtime files as a non-root user for security
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER 1000:1000

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["bash", "-c", "bin/rails db:prepare && bin/rails server -b '0.0.0.0'"]
```
### Variables d'environnement
En accédant à ta ressource correspondant à ton application Rails, tu peux modifier les variables d’environnement. Pour déployer ton application Rails tu as besoin au minimum de 3 variables d’environnement:
- **DATABASE_URL**: Tu peux récupérer la valeur de cette variable depuis la ressource de ta base de données. Par exemple si tu utilises PostgreSQL, il sera indiqué **Postgres URL (internal)**
- **RAILS_ENV**: Habituellement la valeur sera “production”
- **RAILS_MASTER_KEY**: La valeur de la master key de ton projet

### Configurer le nom de domaine
Toujours dans la ressource de ton application tu as la possibilité d’ajouter des noms de domaine. Il suffit que tu renseignes les différents noms de domaine qui doivent pointer sur ton app, séparé par une virgule.

Côté DNS il suffira d’ajouter ces noms de domaine en mettant l’IP de ton serveur comme cible.

### Aller plus loin
Maintenant que tu as un VPS avec Coolify dessus, tu peux tirer avantage de cette mise en place en mutualisant des services pour les intégrer avec tes différentes applications. Un très bon exemple pour t’illustrer ça c’est Plausible.

Plausible c’est un service qui te permet d’avoir des analytics simplifiées et RGPD-friendly (comparé à Google Analytics). Si tu souhaites utiliser Plausible en mode cloud (hébergé sur leurs serveurs) alors t’as [une tarification](https://plausible.io/#pricing){:target="_blank"} qui s’applique. Mais Plausible est aussi disponible en open-source et gratuitement.

Je pense que tu me vois venir, tu peux facilement installer [Plausible via Coolify](https://coolify.io/docs/services/plausible){:target="_blank"} et ainsi avoir des analytics pour l’ensemble de tes applications (même celles qui ne sont pas hébergées sur ton serveur).

### Bienvenue dans le monde du self-host
Grâce à Coolify, la barrière à l’entrée pour héberger soi-même ses applications/services est assez basse. Tu peux installer quasiment n’importe quelle application puisque Coolify s’appuie sur la puissance de Docker.

Je te préviens maintenant, tu vas vouloir héberger tous les SaaS que tu paies et c’est normal on est tous passé par là haha. Afin de nourrir ta soif de “self-hosting” voici une liste d’applications open-source et gratuit que tu peux self-host: [Awesome Selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted).

Avec Coolify, le self-hosting n'a jamais été aussi accessible. Moins cher, plus flexible et sans contrainte. **N'hésite plus et lance toi!** 😎
