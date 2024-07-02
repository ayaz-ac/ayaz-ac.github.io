---
lang: en  
page_id: csrf  
permalink: /posts/csrf-attacks-in-ruby-on-rails  
title: CSRF Attacks in Ruby on Rails  
date: 2022-03-26  
categories: [Ruby on Rails]  
author: ayaz  
description: CSRF attacks are among the most well-known on the web. Let's see how this attack works and how Ruby on Rails integrates security measures to prevent it.  
image: /assets/img/posts/les-attaques-csrf-en-ruby-on-rails/thumbnail.jpg
---

## CSRF? What is it?

To understand how CSRF (Cross-Site Request Forgery) attacks exploit browser behavior, it's crucial to clarify what data browsers include in HTTP requests. When a user triggers an action on a website that requires a server request, such as updating their profile, the request includes cookies specifically associated with that website's domain. Importantly, cookies from unrelated domains are not included due to security measures like the *same-origin policy*.

For instance, if a user is logged into both Facebook and Twitter, and they perform an action on Twitter, the request to Twitter's server will only include Twitter's cookies, not Facebook's.

Here's where CSRF vulnerability arises: Suppose an attacker creates a malicious site, "evil-site.com," and convinces logged-in Facebook users to visit it. Once on "evil-site.com," the attacker's script can automatically trigger a crafted HTTP request (e.g., DELETE) to Facebook's servers. The request includes the victim's Facebook cookies, attempting to execute actions on Facebook as if initiated by the victim.

The reason these cookies are included lies in how browsers handle requests: when a browser makes a request to a domain (in this case, Facebook) from another domain (evil-site.com), it automatically attaches cookies associated with that target domain (Facebook). This automatic inclusion of cookies facilitates CSRF attacks, exploiting the authenticated context of the victim's session.

Of course, you can guess it's not that simple. The CSRF attack is one of the most popular attacks on the web, and *normally* all sites have processes to counter this type of attack.

## Countering CSRF Attacks with Rails

As Ruby on Rails developers, we are fortunate because to counter CSRF attacks, we don't have to do anything! Okay, end of the article, thanks for reading! 👋

More seriously, since the [version 6.1](https://edgeguides.rubyonrails.org/configuring.html#config-action-controller-default-protect-from-forgery), Rails natively includes the `protect_from_forgery` method to prevent CSRF attacks.

But how does this method work? The `protect_from_forgery` method generates a random token that is tied to the user's session and inserts it as a hidden field in all forms:
```html
<input type="hidden" name="authenticity_token" value="random_token" autocomplete="off">
```
This randomly generated token is compared to the user's session on each request in the `verify_authenticity_token` method to ensure that the request is indeed coming from the application.

[According to the documentation](https://edgeguides.rubyonrails.org/configuring.html#config-action-controller-default-protect-from-forgery), `protect_from_forgery` is already included by default in `ActionController::Base`, which is why we do not need to specify its use in each controller.

However, sometimes we want to allow PUT, POST, or DELETE requests without an `authenticity_token` (for example, in the case of a widget on another site). To do this, we simply add a [callback in the desired controller](/posts/controller-callbacks-in-ruby-on-rails) to skip the `verify_authenticity_token method`:
```ruby
skip_before_action :verify_authenticity_token
```

Of course, if we want to limit the number of methods that need to verify the `authenticity_token`, we can use the `except` or `only` keywords (More explanation on these keywords in [my previous article](/posts/controller-callbacks-in-ruby-on-rails)):
```ruby
skip_before_action :verify_authenticity_token, except: :index
# OR
skip_before_action :verify_authenticity_token, only: %i[create update]
```
