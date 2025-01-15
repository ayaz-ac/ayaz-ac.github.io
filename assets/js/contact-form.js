  // JavaScript to handle form submission
  document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const form = event.target;

    // Extract form data
    const formData = new FormData(form);

    // Convert form data to an object for easier processing
    const data = Object.fromEntries(formData.entries());

    const isFrench = window.location.pathname.includes("/me-contacter")

    const message = {
      serverError: isFrench
      ? "Une erreur s'est produite lors de l'envoi. Veuillez réessayer."
      : "An error occurred while sending the form. Please try again.",
      networkError: isFrench
      ? "Une erreur de connexion s'est produite. Veuillez vérifier votre réseau."
      : "A network error occurred. Please check your connection.",
    }

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
        alert(messages.serverError);
      }
    } catch (error) {
      // Handle network errors
      alert(messages.networkError);
    }
  });
