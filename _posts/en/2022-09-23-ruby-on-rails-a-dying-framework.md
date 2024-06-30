---
lang: en  
page_id: rails-fin-de-vie  
permalink: /posts/ruby-on-rails-a-dying-framework  
title: RubyOnRails, a dying framework?  
date: 2022-09-23  
categories: [Ruby On Rails]  
author: ayaz  
description: Rails? It doesn't scale well, right?, Why don't you use a JS framework? It's more modern!. These are the kinds of questions I get when I say I'm a Rails developer, but are they really right?  
image: /assets/img/posts/ruby-on-rails-un-framework-en-fin-de-vie/thumbnail.jpg  
---

When I introduce myself as a freelance Ruby on Rails developer to my colleagues in the Tech world, I often get comments like: "Isn't that an outdated framework?" or "Ruby on Rails? Is that still being used?".

If you're a Ruby on Rails developer, you know what I'm talking about 🥲.

Most of the time, I go on a mini-monologue to explain that Ruby on Rails is not outdated and is far from being so!

The purpose of this article is to first explain why Ruby on Rails is still a great choice for building a web application in 2022, but also to avoid me having to go on mini-monologues in the future (I'll just share this article) 😋.

## Ruby on Rails, solid and hassle-free

The first strength of Ruby on Rails is the language it is based on, *Ruby*. I'm not going to describe *Ruby* in this article, but it is important to know that this language was created to make the developer's life easier (syntax, method names, etc.).

Ruby on Rails is based on two concepts you have probably heard of:
- [Convention over Configuration (CoC)](https://en.wikipedia.org/wiki/Convention_over_configuration): This principle means that the developer only specifies the unconventional behaviors in the application. For example, if we have a "Book" model, the corresponding table in the database will automatically be named "books" by convention. If they want to give another name to the table (e.g., "magazines"), an unconventional action, they will have to write code to specify it.
- [Don't Repeat Yourself (DRY)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself): As its name suggests, this principle aims to avoid duplicating code in the application. To do this, Ruby on Rails provides several tools: scopes, concerns, helpers, [POROs](/posts/clean-code-with-poros), etc.

## The propaganda of SPAs and JS frameworks

SPAs (Single Page Applications) have several undeniable advantages: faster content display and better responsiveness to improve the user experience as much as possible. However, most applications developed with SPAs do not really need them. They have very little content to load and/or not many user interactions. We end up with a schema of two distinct applications (Front and Back), whereas a [monolith](https://m.signalvnoise.com/the-majestic-monolith/) would have done just fine...

But we can't blame them because the propaganda for JavaScript frameworks is substantial. So much so that it overshadows other good frameworks, like Ruby on Rails.

However, it is also the fault of the Ruby on Rails community, which is much less active and makes less noise compared to other frameworks like Symfony, Laravel, Django, etc.

And even if Ruby on Rails were more well-known, how is it possible to make the user experience as smooth as with JS frameworks?

## Hotwire, a little sweetness in this rough world

For a long time, integrating JavaScript into Ruby on Rails was not great. We had the integration of JS using the ERB templating language (js.erb), which was hardly maintainable... There was no real way to spice up user interfaces without creating a JavaScript file in the project. That's where Hotwire comes in!

[Hotwire (HTML Over The Wire)](https://hotwired.dev/) is the combination of two technologies:
- [Turbo](https://turbo.hotwired.dev/): Comprising TurboDrive, Turbo Frames, Turbo Streams, and Turbo Native. It reduces the amount of JavaScript produced for simple actions (content updates, navigation, etc.).
- [Stimulus](https://stimulus.hotwired.dev/): A lightweight framework (more like a library) that allows adding behaviors to HTML. For example, changing the class of an element when clicking a checkbox.

The different technologies that make up Hotwire integrate perfectly with the Ruby on Rails ecosystem but also with other frameworks like Symfony (real recognizes real).

All this sounds great, but does it scale? 🥴

## Ruby on Rails, the man in the shadows

When asking if a framework scales, we want to know if it can handle the load of a large number of users (> 1 million, for example).

Several major Tech companies' websites are made with Ruby on Rails (yes!):
- Github
- Doctolib (Cocorico 🐓)
- Airbnb
- Shopify

By the way, Ruby on Rails scales like any other framework on the market 😉

## Conclusion

In conclusion, we can say that Ruby on Rails is a solid and reliable framework. It is constantly updated to allow the development of applications that meet today's web demands.

The goal here is not to say that Ruby on Rails is the best framework out there but simply to point out that it is still a technology with which one can develop solid web applications.
