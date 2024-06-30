---
lang: en  
page_id: callbacks  
permalink: /posts/controller-callbacks-in-ruby-on-rails  
title: Controller callbacks in Ruby on Rails  
date: 2022-02-15  
categories: [Ruby On Rails]  
author: ayaz  
description: What is a callback and how to use them effectively in a controller? Let's find out together :)  
image: /assets/img/posts/les-callbacks-de-controller-en-ruby-on-rails/thumbnail.jpg
---

## What is a callback?

A *controller* *callback* allows Ruby on Rails to execute a method before and/or after a specific controller action (Index, Show, Create, Update, etc.). Here is a non-exhaustive list of available callbacks in Ruby on Rails:
- *after_action*: Executes a method after an action (Index, Show, Edit, etc.).
- *around_action*: Executes a method before and after an action.
- *skip_before_action*: Skips executing a method before an action. This implies that this method would normally be called before the action.

You can find the complete list of all possible callbacks directly in the [Ruby on Rails documentation](https://api.rubyonrails.org/classes/AbstractController/Callbacks.html).

Note: The *callbacks* presented in this article are only available and usable in *controllers*. They cannot be called from a model or a [PORO](https://ayaz-abdulcader.com/clean-code-with-poro/).

## How to use a callback?

To illustrate the use of a *callback*, let's take a very simple example: this blog. All users, whether logged in or not, can access the list of articles and view an article (which you are doing right now). However, only authors can edit and delete their articles. Without using a *callback*, the code would look like this:
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

As we can see, there is redundant code in multiple controller actions. Fortunately, Ruby on Rails provides *before_action*, which allows us to execute code before one or more actions. Let's rewrite our controller using the *before_action* callback:

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

  # This method is called before all actions EXCEPT index
  def set_post
    @post = Post.find(params[:id])
  end

  # This method is called before all actions EXCEPT index and show
  def redirect_unless_author
    redirect_to root_url if current_user != @post.author
  end
end
```

In this new version, the controller adheres to the DRY principle by moving the repetitive logic into separate methods and calling them via *callbacks*. Creating methods that perform only one action (*set_post* finds the post by the ID parameter, and *redirect_unless_author* redirects if the user is not the author) aligns with the [(SRP)](https://en.wikipedia.org/wiki/Single-responsibility_principle).

By separating the logic into multiple methods and using *callbacks*, we ensure better readability and simpler code throughout the controller.
