
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


// const paragraph = document.querySelector("h1");

// const characters = paragraph.textContent.split("");

// paragraph.textContent = "";

// // Fonction pour afficher progressivement les caractères
// function animateText(index) {
//   if (index < characters.length) {
//     paragraph.textContent += characters[index];
//     setTimeout(function () {
//       animateText(index + 1);
//     }, 100);
//   }

// }

// animateText(0);

// *************************Calendar**************************
let cases = document.getElementsByClassName('case');

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

const monthName = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

const UP_MONTH = 'upMonth';
const DOWN_MONTH = 'downMonth';

function CALENDRIER_REDUCER(action) {
  switch (action) {
    case UP_MONTH:
      if (month < 12) month++
      else {
        year++
        month = 1; // Réinitialisez le mois à janvier
      }
      break;
    case DOWN_MONTH:
      if (month > 1) month-- // Modifiez la condition pour empêcher le mois de devenir négatif
      else {
        year--
        month = 12; // Réinitialisez le mois à décembre
      }
      break;
    default:
      break;
  }
}

document.getElementById('left').onclick = function () {
  CALENDRIER_REDUCER(DOWN_MONTH);
  console.log(month);
}

document.getElementById('right').onclick = function () {
  CALENDRIER_REDUCER(UP_MONTH);
  console.log(month);
}




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

