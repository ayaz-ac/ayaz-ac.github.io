---
lang: en
page_id: poro
permalink: /posts/clean-code-with-poros
title: Clean code with poros
date: 2021-10-24
categories: [Ruby On Rails]
author: ayaz
description: J’ai récemment fait la découverte du PORO, Plain Old Ruby Object. Le principe est simple, créer une classe qui aura un seul objectif, respectant ainsi le principe SRP et permettant d’alléger le code des modèles et des contrôleurs.
image: /assets/img/posts/les-poros-pour-un-code-propre/thumbnail.png
---

## Introduction au PORO
Lorsque l’on développe des applications web avec Ruby On Rails, on a tendance à mettre trop de logique dans le contrôleur ou dans le modèle. En construisant les applications de cette manière on fait abstraction d’un principe fondamental du *Clean code*, le [SRP (Single Responsiblity Principle)](https://fr.wikipedia.org/wiki/Principe_de_responsabilit%C3%A9_unique). Le fait d’avoir une classe qui doit gérer plusieurs comportements, rend l’application difficilement maintenable, testable et y ajouter de nouvelles fonctionnalités devient un vrai cauchemar.

J’ai récemment fait la découverte du **PORO**, Plain Old Ruby Object. Le principe est simple, créer une classe qui aura un seul objectif, respectant ainsi le principe SRP et permettant d’alléger le code des modèles et des contrôleurs.

## Cas d'utilisation
Imaginons une application où vous avez un modèle *User*:
```ruby
class User < ApplicationRecord
end
```
Un utilisateur possède un attribut role pouvant prendre comme valeur: admin, premium ou guest. L’administrateur doit pouvoir:
- Supprimer un utilisateur à l’exception d’un autre administrateur.
- Changer le rôle d’un utilisateur pour le passer de *guest* à *premium*.

Si on respecte le principe *SRP*, on ne peut pas créer ces méthodes dans le modèle User, car ce dernier a pour unique but de gérer les utilisateurs peu importe leurs rôles. Nous allons donc créer un **PORO** pour gérer les actions des administrateurs.

On créer d’abord un fichier `admin.rb` dans *app/models/user*. Pour plus de clarté nous mettrons la classe Admin dans un module User: 
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

Pour utiliser un **PORO** dans un contrôleur, il faut d'abord initialiser l'instance:
```ruby
# current_user correspond à l'administrateur connecté
@admin = User::Admin.new(current_user)
```

Puis on peut appeler ses méthodes:
```ruby
# user_to_delete est une instance d'un User
@admin.delete_user(user_to_delete)

# user_to_update est une instance d'un User
@admin.update_to_premium(user_to_update)
```
## Conclusion
En utilisant les PORO dans une application Ruby On Rails, on assure:
- Le respect du principe de *SRP*
- Une sépration logique des méthodes
- Une amélioration de la lisibilité du code
- Une meilleure maintenabilité de l’application
- Faciliter la couverture de test pour l’ensemble du projet
