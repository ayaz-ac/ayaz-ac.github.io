---
lang: en
page_id: poro
permalink: /posts/clean-code-with-poros
title: Clean code with poros
date: 2021-10-24
categories: [Ruby on Rails]
tags: [Tutorial]
author: ayaz
description: The PORO (Plain Old Ruby Object) concept allows you to create a class with a single responsibility. Let's apply this to Ruby on Rails!
image: /assets/img/posts/les-poros-pour-un-code-propre/thumbnail.png
---

## Introduction to PORO
When developing web applications with Ruby on Rails, there is a tendency to put too much logic into controllers or models. This approach neglects a fundamental principle of *Clean Code*: the [SRP (Single Responsibility Principle)](https://fr.wikipedia.org/wiki/Principe_de_responsabilit%C3%A9_unique). When a class is responsible for multiple behaviors, the application becomes challenging to maintain, test, and extend with new features.

## Use case
Let's imagine an application where you have a User model:
```ruby
class User < ApplicationRecord
end
```
A user has a role attribute that can be: admin, premium, or guest. The admin should be able to:
- Delete a user, except for another admin.
- Change a user's role from guest to premium.

To adhere to the SRP principle, we cannot create these methods in the User model, as its sole purpose is to manage users regardless of their roles. Therefore, we will create a *PORO* to handle admin actions.

First, create an `app/models/user/admin.rb` file. For clarity, we will place the Admin class in the User module:
```ruby
module User
  class Admin
    attr_reader :admin
  
    def initialize(user)
      @admin = user
    end
    
    def delete_user(user)
      user.destroy! unless user.admin?
    end
    
    def update_to_premium(user)
      user.update!(role: 'premium')
    end
  end
end
```
To use a *PORO* in a controller, you first need to initialize the instance.
```ruby
# current_user is the connected admin 
@admin = User::Admin.new(current_user)
```

Then you can call its methods:
```ruby
# user_to_delete is an instance of a User
@admin.delete_user(user_to_delete)

# user_to_update is an instance of a User
@admin.update_to_premium(user_to_update)
```
## Conclusion
Using *POROs* in a Ruby on Rails application ensures:
- Adherence to the SRP principle
- Logical separation of methods
- Improved code readability
- Better maintainability of the application
- Easier test coverage for the entire project
