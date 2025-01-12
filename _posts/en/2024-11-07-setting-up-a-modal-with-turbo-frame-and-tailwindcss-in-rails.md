---
lang: en
page_id: modals-rails
permalink: /posts/setting-up-a-modal-with-turbo-frame-and-tailwindcss-in-rails
title: Setting Up a Modal with Turbo Frame and TailwindCSS in Rails
date: 2024-11-07
categories: [Ruby on Rails]
tags: [Tutorial]
author: ayaz
description: "Quick setup for a modal in Rails using Turbo Frame and TailwindCSS: two files, three lines of JavaScript, and voilà a ready-to-go interactive modal!"
image: /assets/img/posts/creer-des-modals-avec-rails-n-a-jamais-ete-aussi-simple/thumbnail.jpg
---

# Setup

In this example, I’m using *TailwindCSS*, but it can easily adapt to any CSS library or framework.

Only 2 files are needed:

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

    Here, we wrap our modal code with a Turbo Frame with the ID `modal`. This layout allows the *view* that uses it to define the modal’s `title` and `body`.

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

    We add a small amount of JavaScript (just a tiny bit, I promise!) only to handle closing the modal when the user clicks outside of it (in `<div class="z-30 fixed inset-0 py-20 flex justify-center">`).

Finally, add the following to your `application.html.erb`:

```erb
<%= turbo_frame_tag :modal, data: { controller: "modal", modal_target: "modal" } %>
```

# Usage example

To display a page’s content in the modal, simply target the `:modal` TurboFrame and insert the content using `content_for`:

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
