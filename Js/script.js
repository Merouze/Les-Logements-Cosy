
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

// *****************************FormLocalStotrage*********************

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche l'envoi par défaut du formulaire

    // Récupérer les valeurs des champs en utilisant les IDs
    const name = document.querySelector("#inputName").value;
    const email = document.querySelector("#inputEmail").value;
    const phoneNumber = document.querySelector("#inputNumber").value;
    const message = document.querySelector("#commentaire").value;
    const dateIn = document.querySelector("#dateIn").value;
    const dateOut = document.querySelector("#dateOut").value;
    const numberNight = document.querySelector("#inputNumberNight").value;
    const checkData = document.querySelector("#check").checked;
    const housingChoice = document.querySelector("#input-choice").value;

    // Créer un objet contenant les données
    const formData = {
      dateIn,
      dateOut,
      numberNight,
      name,
      email,
      phoneNumber,
      message,
      checkData,
      housingChoice,
    };

    // Stocker les données dans le Local Storage
    localStorage.setItem("formData", JSON.stringify(formData));

    // Afficher un message de confirmation dans la console
    console.log("Données stockées dans le Local Storage");

    // Réinitialiser le formulaire après stockage des données
    form.reset();
  });
});

// *************************Calendar**************************

const dateIn = document.getElementById('dateIn');
const dateOut = document.getElementById('dateOut');
const dateError = document.getElementById('dateError');
const dateOutError = document.getElementById('dateOutError');
const numberNight = document.querySelector('.numberNight');

// Obtenez la date actuelle
const currentDate = new Date();

// Définissez la date d'arrivée par défaut sur la date actuelle
dateIn.valueAsDate = currentDate;

// Calcul de la date de départ à J+1
const nextDay = new Date(currentDate);
nextDay.setDate(currentDate.getDate() + 1);
dateOut.valueAsDate = nextDay;

// Mettez en place un écouteur d'événement sur la date d'arrivée pour ajuster la date de départ
dateIn.addEventListener('change', function () {
  const selectedDateIn = new Date(dateIn.value);

  if (selectedDateIn < currentDate) {
    dateError.textContent = "*Dates invalides";
    dateIn.valueAsDate = currentDate;
    dateOut.valueAsDate = nextDay;
  } else {
    dateError.textContent = "";
    // Calcul de la date de départ à J+1
    const nextDay = new Date(selectedDateIn);
    nextDay.setDate(selectedDateIn.getDate() + 1);
    dateOut.valueAsDate = nextDay;

    // Effacez le message d'erreur de la date de départ lorsque vous sélectionnez une nouvelle date d'arrivée
    dateOutError.textContent = "";
  }
});

// Mettez en place un écouteur d'événement sur la date de départ pour vérifier si elle est antérieure à la date d'arrivée ou à la date actuelle
dateOut.addEventListener('change', function () {
  const selectedDateIn = new Date(dateIn.value);
  const selectedDateOut = new Date(dateOut.value);

  if (selectedDateOut <= selectedDateIn) {
    dateOutError.textContent = "*Date de départ antérieure à la date d'arrivée";
  } else {
    dateOutError.textContent = "";

    // Calcul du nombre de nuits entre la date d'arrivée et la date de départ
    const timeDifference = selectedDateOut - selectedDateIn;
    const numberOfNights = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Affichage du nombre de nuits dans l'input correspondant
    numberNight.value = numberOfNights;
  }
});


// ************************************* Json for valid date *****************************

function isDateInvalid(selectedStartDate, selectedEndDate) {
  // Charger le fichier JSON
  fetch('dates_invalides.json')
    .then(response => response.json())
    .then(data => {
      const invalidDates = data.dates;
      let isInvalid = false;

      // Convertir les dates en objets Date
      const startDate = new Date(selectedStartDate);
      const endDate = new Date(selectedEndDate);

      // Parcourir toutes les dates entre la date d'arrivée et la date de départ
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format AAAA-MM-JJ
        if (invalidDates.includes(formattedDate)) {
          isInvalid = true;
          break;
        }
        currentDate.setDate(currentDate.getDate() + 1); // Passer à la date suivante
      }

      if (isInvalid) {
        // Une date invalide est présente dans la période sélectionnée, affiche un message d'erreur
        document.getElementById('dateInNoDispo').textContent = 'Le logement n\'est pas disponible pour cette période.';
      } else {
        // La période sélectionnée est valide, efface le message d'erreur
        document.getElementById('dateInNoDispo').textContent = '';
      }
    })
    .catch(error => console.error('Erreur de chargement du fichier JSON :', error));
}

// Écouteurs d'événements pour les champs de date
const dateInField = document.getElementById('dateIn');
const dateOutField = document.getElementById('dateOut');

dateInField.addEventListener('change', function () {
  const selectedDateIn = dateInField.value;
  const selectedDateOut = dateOutField.value;
  isDateInvalid(selectedDateIn, selectedDateOut);
});

dateOutField.addEventListener('change', function () {
  const selectedDateIn = dateInField.value;
  const selectedDateOut = dateOutField.value;
  isDateInvalid(selectedDateIn, selectedDateOut);
});

// ***********************************************************************Validation formulaire

const form = document.querySelector('#form');
const validationDiv = document.querySelector('#validation-form');

// Écoutez l'événement "submit" du formulaire
form.addEventListener('submit', function (e) {
  // Empêchez le comportement par défaut du formulaire (rechargement de la page)
  e.preventDefault();

  // Affichez le message de confirmation dans la div de validation
  const confirmationMessage = document.createElement('div');
  confirmationMessage.classList.add('alert', 'alert-success');
  confirmationMessage.textContent = 'Votre formulaire a été envoyé avec succès. Vous recevrez un e-mail de confirmation.';

  // Effacez le contenu précédent de la div de validation
  validationDiv.innerHTML = '';

  // Ajoutez le message à la div de validation
  validationDiv.appendChild(confirmationMessage);
});
