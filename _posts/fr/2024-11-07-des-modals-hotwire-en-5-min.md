---
lang: fr
page_id: modals-rails
permalink: /posts/creer-des-modals-avec-rails-n-a-jamais-ete-aussi-simple
title: Créer des modals avec Rails n'a jamais été aussi simple!
date: 2024-11-07
categories: [Ruby on Rails]
author: ayaz
description: "Setup rapide d’une modal en Rails avec Turbo Frame et TailwindCSS: 2 fichiers, 3 lignes de JavaScript, et tadaaa 🎉"
image: /assets/img/posts/creer-des-modals-avec-rails-n-a-jamais-ete-aussi-simple/thumbnail.jpg
---

# Mise en place

Dans cet exemple, j'utilise *TailwindCSS*, mais il peut s'adapter facilement à n'importe quelle librairie ou framework CSS.

2 fichiers suffisent:
- `app/views/layouts/modal.html.erb`
  ```erb
  <%= turbo_frame_tag :modal do %>
    <div class="z-30 fixed inset-0 py-20 flex justify-center">
      <div data-action="click->modal#close" class="z-20 fixed inset-0 bg-gray-500 bg-opacity-50 flex"></div>
      <div class="z-40 relative h-fit bg-white rounded-lg p-6 max-w-lg w-full shadow-xl">
        <h2 class="text-xl font-semibold mb-4"><%= yield :title %></h2>
        <%= yield :body %>
      </div>
    </div>
  <% end %>
  ```
Ici on encapsule le code de notre modal avec une TurboFrame ayant pour ID `modal`. Ce layout permet à la *view* qui l'utilise de définir le `title` et le `body` de la modal.

- `app/javascript/controllers/modal_controller.js`
  ```js
  import { Controller } from "@hotwired/stimulus"

  export default class extends Controller {
    static targets = ["modal"]

    close() {
      this.modalTarget.innerHTML = "";
    }
  }
  ```
Nous ajoutons un peu (vraiment très peu, je vous le promets !) de JavaScript, uniquement pour gérer la fermeture de la modale lorsque l'utilisateur clique en dehors de celle-ci (dans `<div class="z-30 fixed inset-0 py-20 flex justify-center">`)

Pour finir il suffit d'ajouter dans votre `application.html.erb`
```erb
<%= turbo_frame_tag :modal, data: { controller: "modal", modal_target: "modal" } %>
```

# Exemple d'utilisation
Pour afficher le contenu d'une page dans la modal, il suffit de cibler la TurboFrame `:modal` et d'insérer le contenu avec des `content_for`:
- `index.html.erb`
  ```erb
  <% @posts.each do |post| %>
    <%= link_to post_path(post), data: { turbo_frame: :modal } do %>
      <h1> <%= post.title %> </h1>
    <% end %>
  <% end %>
  ```

- `show.html.erb`
  ```erb
  <% content_for(:title) { @post.title } %>
  <% content_for(:body) do %>
    <p> <%= @post.content %> </p>
  <% end %>
  ```
