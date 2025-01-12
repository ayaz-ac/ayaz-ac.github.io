---
lang: fr
page_id: callbacks
permalink: /posts/les-callbacks-de-controller-en-ruby-on-rails
title: Les callbacks de controller en Ruby on Rails
date: 2022-02-15
categories: [Ruby on Rails]
tags: [Tutorial]
author: ayaz
description: Qu'est-ce qu'un callback et comment les utiliser efficacement dans un controller ? Voyons ça ensemble :)
image: /assets/img/posts/les-callbacks-de-controller-en-ruby-on-rails/thumbnail.jpg
---

## Qu'est-ce qu'un callback ?
Un callback de controller permet d'indiquer à Ruby on Rails d'exécuter une méthode avant et/ou après une action (Index, Show, Create, Update, etc.) spécifique d'un controller. Voici une liste non exhaustive des callbacks disponibles dans Ruby on Rails:
- after_action: Exécute une méthode après une action (Index, Show, Edit, etc.).
- around_action: Exécute une méthode avant et après une action.
- skip_before_action: N'exécute pas une méthode avant une action. Ce qui implique donc que cette méthode devait normalement être appelée avant l'action.

Vous pouvez trouver la liste de tous les callbacks possible dans la [documentation de Ruby on Rails](https://api.rubyonrails.org/classes/AbstractController/Callbacks.html).

À noter: Les callbacks présentés dans cet article ne sont disponibles et utilisables uniquement dans les controllers. Ils ne peuvent donc pas être appelés depuis un modèle ou un [PORO](/posts/les-poro-pour-un-code-propre).

## Comment utiliser un callback ?
Afin d'illustrer l'utilisation d'un callback prenons un exemple très simple: ce blog. Tous les utilisateurs connectés ou non, peuvent accéder à la liste des articles mais aussi à la visualisation d'un article (ce que vous êtes en train de faire en ce moment). Cependant, seuls les auteurs peuvent éditer et supprimer leurs articles. Si on n'utilisait pas de callback, le code ressemblerait à ça:
```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def show
    @post = Post.find(params[:id])
  end

  def edit
    @post = Post.find(params[:id])

    redirect_to root_url if current_user != @post.author
  end

  def update
    @post = Post.find(params[:id])

    redirect_to root_url if current_user != @post.author

    @post.update!(post_params)
  end

  def destroy
    @post = Post.find(params[:id])

    redirect_to root_url if current_user != @post.author

    @post.destroy!
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
```

Comme on peut s'en apercevoir on a de la redondance de code sur plusieurs actions du controller. Fort heureusement Ruby on Rails nous met disposition before_action qui nous permet d'exécuter du code avant une ou plusieurs actions. Re-écrivons notre controller en utilisant cette fois-ci le callback before_action:
```ruby
class PostsController < ApplicationController
  before_action :set_post, except: :index
  before_action :redirect_unless_author, except: %i[index show]

  def index
    @posts = Post.all
  end

  def show; end

  def edit; end

  def update
    @post.update!(post_params)
  end

  def destroy
    @post.destroy!
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end

  # Cette méthode est appelée avant toutes les actions SAUF index
  def set_post
    @post = Post.find(params[:id])
  end

  # Cette méthode est appelée avant toutes les actions SAUF index et show
  def redirect_unless_author
    redirect_to root_url if current_user != @post.author
  end
end
```

On remarque sur cette nouvelle version que le controller respecte le principe DRY en déplaçant la logique qui se répétait dans des méthodes séparées et en les appelant via des callbacks. Le fait d'avoir créé des méthodes qui n'effectuent qu'une seule action (`set_post` trouve l'article grâce à l'ID en paramètre et `redirect_unless_author`, redirige si l'utilisateur n'est pas l'auteur), rentre dans le cadre du design pattern [(Single Responsibility Principle)](https://en.wikipedia.org/wiki/Single-responsibility_principle).

En séparant la logique en plusieurs méthodes et en utilisant les callbacks on assure une meilleure lisibilité et un code plus simple sur l'ensemble du controller.
