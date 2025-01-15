---
lang: fr
page_id: contact
permalink: /me-contacter
title: Contact
icon: fas fa-envelope
order: 5
---
<div class="contact-page">
  <form id="contactForm">
    <label for="name">Nom :</label>
    <input type="text" id="name" name="name" required />

    <label for="email">E-mail :</label>
    <input type="email" id="email" name="email" required />

    <label for="message">Message :</label>
    <textarea id="message" name="message" rows="5" required></textarea>

    <button type="submit">Envoyer</button>
  </form>

  <!-- Message container for feedback -->
  <div id="formMessage" style="display: none; margin-top: 1rem; color: green;">
    Votre message a été envoyé avec succès !
  </div>
</div>

<script src="{{ '/assets/js/contact-form.js' | relative_url }}"></script>
