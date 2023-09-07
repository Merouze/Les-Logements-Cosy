
// ************Navbar**************************

let prevScrollpos = window.scrollY;

window.onscroll = function () {
  let currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0px";
  } else {
    document.getElementById("navbar").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
};

// ************************Animation titre*************************


const paragraph = document.querySelector("h1");

const characters = paragraph.textContent.split("");

paragraph.textContent = "";

// Fonction pour afficher progressivement les caractères
function animateText(index) {
  if (index < characters.length) {
    paragraph.textContent += characters[index];
    setTimeout(function () {
      animateText(index + 1);
    }, 100);
  }

}

animateText(0);


// *****************************Form*********************

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");

  form.addEventListener("submit", function (e) {
      e.preventDefault(); // Empêche l'envoi par défaut du formulaire

      // Récupérer les valeurs des champs en utilisant les classes
      const name = document.querySelector(".name").value;
      const email = document.querySelector(".email").value;
      const phoneNumber = document.querySelector(".form-control[type='text']").value;
      const message = document.querySelector(".message").value;

      // Créer un objet contenant les données
      const formData = {
          name,
          email,
          phoneNumber,
          message,
      };

      // Stocker les données dans le Local Storage
      localStorage.setItem("formData", JSON.stringify(formData));

      // Afficher un message de confirmation dans la console
      console.log("Données stockées dans le Local Storage");

      // Réinitialiser le formulaire après stockage des données
      form.reset();
  });
});
