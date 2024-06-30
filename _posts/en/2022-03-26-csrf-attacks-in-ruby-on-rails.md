---
lang: en  
page_id: csrf  
permalink: /posts/csrf-attacks-in-ruby-on-rails  
title: CSRF Attacks in Ruby on Rails  
date: 2022-03-26  
categories: [Ruby On Rails]  
author: ayaz  
description: CSRF attacks are among the most well-known on the web. Let's see what this attack entails and how Ruby on Rails integrates security measures to prevent it.  
image: /assets/img/posts/les-attaques-csrf-en-ruby-on-rails/thumbnail.jpg
---

## CSRF? What is it?

Before diving into the details of how this attack works, it is first important to understand what data is sent during *HTTP* requests made by a web browser. When a user performs an action on a website that triggers a request to the server (for example: updating their profile), the request will include **ALL** the cookies from their session. And I emphasize "ALL" because it also includes cookies from other sites.

Let's take an example with two social networks you probably know and use: Facebook and Twitter. I am on my browser and logged into both Facebook and Twitter. When a request is sent to Twitter, it will include Twitter's cookies as well as Facebook's cookies.

If I wanted to exploit this vulnerability, I would "simply" create a site that I will call "cool-site.com", which I then send to my future victims who are already logged into their Facebook account. Once they visit my site, it sends an *HTTP* *DELETE* request containing Facebook's cookies to Facebook's server to delete the victim's account.

Of course, you can guess it's not that simple. The *CSRF* attack is one of the most popular attacks on the web, and *normally* all sites have processes to counter this type of attack.

## Countering CSRF Attacks with Rails

As Ruby on Rails developers, we are fortunate because to counter *CSRF* attacks, we don't have to do anything! Okay, end of the article, thanks for reading! 👋

More seriously, since [version 6.1](https://edgeguides.rubyonrails.org/configuring.html#config-action-controller-default-protect-from-forgery), Rails natively includes the `protect_from_forgery` method to prevent *CSRF* attacks.

But how does this method work? The `protect_from_forgery` method generates a random *token* that is tied to the user's session and inserts it as a hidden field in all forms:
```html
<input type="hidden" name="authenticity_token" value="random_token" autocomplete="off">
```
This randomly generated token is compared to the user's session on each request in the `verify_authenticity_token` method to ensure that the request is indeed coming from the application.

[According to the documentation](https://edgeguides.rubyonrails.org/configuring.html#config-action-controller-default-protect-from-forgery), `protect_from_forgery` is already included by default in `ActionController::Base`, which is why we do not need to specify its use in each controller.

However, sometimes we want to allow *PUT*, *POST*, or *DELETE* requests without an `authenticity_token` (for example, in the case of a *widget* on another site). To do this, we simply add a [callback in the desired controller](/posts/controller-callbacks-in-ruby-on-rails) to skip the `verify_authenticity_token method`:
```ruby
skip_before_action :verify_authenticity_token
```

Of course, if we want to limit the number of methods that need to verify the `authenticity_token`, we can use the `except` or `only` keywords (More explanation on these keywords in [my previous article](/posts/controller-callbacks-in-ruby-on-rails)):
```ruby
skip_before_action :verify_authenticity_token, except: :index
# OR
skip_before_action :verify_authenticity_token, only: %i[create update]
```
