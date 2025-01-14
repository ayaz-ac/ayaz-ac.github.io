---
lang: en
page_id: contact
permalink: /contact-me
title: Contact
order: 5
---
<div class="contact-page">
  <form id="contactForm">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required />

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required />

    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="5" required></textarea>

    <button type="submit">Send</button>
  </form>

  <!-- Message container for feedback -->
  <div id="formMessage" style="display: none; margin-top: 1rem; color: green;">
    Your message has been sent successfully!
  </div>
</div>

<script>
  // JavaScript to handle form submission
  document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const form = event.target;

    // Extract form data
    const formData = new FormData(form);

    // Convert form data to an object for easier processing
    const data = Object.fromEntries(formData.entries());

    try {
      // Send the form data to the webhook
      const response = await fetch("https://hook.eu1.make.com/fl8ope3mw1rjydd505kxgr0en4k2zotn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Show success message
        document.getElementById("formMessage").style.display = "block";
        form.reset(); // Optionally reset the form
      } else {
        // Handle server errors
        alert("An error occurred while sending. Please try again.");
      }
    } catch (error) {
      // Handle network errors
      alert("A connection error occurred. Please check your network.");
    }
  });
</script>
