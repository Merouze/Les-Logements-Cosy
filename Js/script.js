
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

// // Fonction pour charger le fichier JSON des dates invalides
// async function loadInvalidDates() {
//   try {
//     // Charge le fichier JSON et attend la réponse
//     const response = await fetch('dates_invalides.json');
//     // Analyse la réponse en JSON et récupère les dates invalides
//     const data = await response.json();
//     return data.dates;
//   } catch (error) {
//     console.error('Erreur de chargement du fichier JSON :', error);
//     return [];
//   }
// }

// // Fonction pour vérifier si les dates sont invalides
// function isDateInvalid(selectedStartDate, selectedEndDate, invalidDates) {
//   let isInvalid = false;
//   const startDate = new Date(selectedStartDate);
//   const endDate = new Date(selectedEndDate);

//   let currentDate = new Date(startDate);
//   while (currentDate <= endDate) {
//     const formattedDate = currentDate.toISOString().split('T')[0];
//     if (invalidDates.includes(formattedDate)) {
//       isInvalid = true;
//       break;
//     }
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return isInvalid;
// }

// // Fonction pour mettre à jour le message d'erreur
// function updateErrorMessage(isInvalid) {
//   const errorMessage = document.getElementById('dateInNoDispo');
//   if (isInvalid) {
//     errorMessage.textContent = 'Le logement n\'est pas disponible pour cette période.';
//   } else {
//     errorMessage.textContent = '';
//   }
// }

// // Écouteurs d'événements pour les champs de date et de choix du logement
// const dateInField = document.getElementById('dateIn');
// const dateOutField = document.getElementById('dateOut');
// const choiceField = document.getElementById('input-choice');

// async function handleDateChange() {
//   const selectedDateIn = dateInField.value;
//   const selectedDateOut = dateOutField.value;
//   const selectedChoice = choiceField.value;

//   if (selectedChoice === 'Cosy Patio') {
//     // Charge les dates invalides
//     const invalidDates = await loadInvalidDates();
//     // Vérifie si les dates sont invalides
//     const isInvalid = isDateInvalid(selectedDateIn, selectedDateOut, invalidDates);
//     // Met à jour le message d'erreur en fonction du résultat
//     updateErrorMessage(isInvalid);
//   } else {
//     // Réinitialise le message d'erreur si l'option change
//     updateErrorMessage(false);
//   }
// }

// // Ajoute des écouteurs d'événements pour les champs de date et de choix du logement
// dateInField.addEventListener('change', handleDateChange);
// dateOutField.addEventListener('change', handleDateChange);
// choiceField.addEventListener('change', handleDateChange);

// ********************
// Fonction pour charger le fichier JSON des dates invalides
async function loadInvalidDates(fileName) {
  try {
    // Charge le fichier JSON correspondant et attend la réponse
    const response = await fetch(fileName);
    // Analyse la réponse en JSON et récupère les dates invalides
    const data = await response.json();
    return data.dates;
  } catch (error) {
    console.error('Erreur de chargement du fichier JSON :', error);
    return [];
  }
}

// Fonction pour vérifier si les dates sont invalides
function isDateInvalid(selectedStartDate, selectedEndDate, invalidDates) {
  let isInvalid = false;
  const startDate = new Date(selectedStartDate);
  const endDate = new Date(selectedEndDate);

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().split('T')[0];
    if (invalidDates.includes(formattedDate)) {
      isInvalid = true;
      break;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return isInvalid;
}

// Fonction pour mettre à jour le message d'erreur
function updateErrorMessage(isInvalid) {
  const errorMessage = document.getElementById('dateInNoDispo');
  if (isInvalid) {
    errorMessage.textContent = 'Le logement n\'est pas disponible pour cette période.';
  } else {
    errorMessage.textContent = '';
  }
}

// Écouteurs d'événements pour les champs de date et de choix du logement
const dateInField = document.getElementById('dateIn');
const dateOutField = document.getElementById('dateOut');
const choiceField = document.getElementById('input-choice');

async function handleDateChange() {
  const selectedDateIn = dateInField.value;
  const selectedDateOut = dateOutField.value;
  const selectedChoice = choiceField.value;

  // Définissez ici le nom du fichier JSON correspondant au logement
  let jsonFileName = '';

  switch (selectedChoice) {
    case 'Cosy Patio':
      jsonFileName = 'dates_invalides_CosyPatio.json';
      break;
    case 'Cosy Zénith':
      jsonFileName = 'dates_invalides_CosyZénith.json';
      break;
    case 'Zénit\'House':
      jsonFileName = "dates_invalides_Zénit'House.json";
      break;
    default:
      jsonFileName = ''; // Le choix par défaut ou une option non reconnue
  }

  if (jsonFileName) {
    // Charge les dates invalides depuis le fichier JSON approprié
    const invalidDates = await loadInvalidDates(jsonFileName);
    // Vérifie si les dates sont invalides
    const isInvalid = isDateInvalid(selectedDateIn, selectedDateOut, invalidDates);
    // Met à jour le message d'erreur en fonction du résultat
    updateErrorMessage(isInvalid);
  } else {
    // Réinitialise le message d'erreur si l'option change
    updateErrorMessage(false);
  }
}

// Ajoute des écouteurs d'événements pour les champs de date et de choix du logement
dateInField.addEventListener('change', handleDateChange);
dateOutField.addEventListener('change', handleDateChange);
choiceField.addEventListener('change', handleDateChange);




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

// ****************************translate*********


