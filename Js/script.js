
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

// *************************Input Navigateur date**************************

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

// *********************************calendar **************************************


// let cases = document.getElementsByClassName('case');

// let date = new Date();
// let year = date.getFullYear();
// let month = date.getMonth() + 1;
// let day = date.getDate();

// const monthName = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

// const UP_MONTH = 'upMonth';
// const DOWN_MONTH = 'downMonth';

// function CALENDRIER_REDUCER(action) {
//   switch (action) {
//     case UP_MONTH:
//       if (month < 12) month++;
//       else {
//         year++;
//         month = 1;
//       }
//       break;
//     case DOWN_MONTH:
//       if (month > 1) month--;
//       else {
//         year--;
//         month = 12;
//       }
//       break;
//     default:
//       break;
//   }
//   getCalendrier(year, month);
// }

// document.getElementById('left').onclick = function () {
//   CALENDRIER_REDUCER(DOWN_MONTH);
//   console.log(month);
// };

// document.getElementById('right').onclick = function () {
//   CALENDRIER_REDUCER(UP_MONTH);
//   console.log(month);
// };

// getCalendrier(year, month);

// function getCalendrier(year, month) {
//   const monthNb = month + 12 * (year - 2020);
//   let cld = [{ dayStart: 2, length: 31, year: 2020, month: "janvier" }];

//   for (let i = 0; i < monthNb - 1; i++) {
//     let yearSimule = 2020 + Math.floor(i / 12);
//     const monthsSimuleLongueur = [31, getFévrierLength(yearSimule), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//     let monthsSimuleIndex = (i + 1) - (yearSimule - 2020) * 12;

//     cld[i + 1] = {
//       dayStart: (cld[i].dayStart + monthsSimuleLongueur[monthsSimuleIndex - 1]) % 7,
//       length: monthsSimuleLongueur[monthsSimuleIndex],
//       year: 2020 + Math.floor((i + 1) / 12),
//       month: monthName[monthsSimuleIndex]
//     }
//     if (cld[i + 1].month === undefined) {
//       cld[i + 1].month = "janvier";
//       cld[i + 1].length = 31;
//     }
//   }

//   for (let i = 0; i < cases.length; i++) {
//     cases[i].innerText = "";
//     const dayOfMonth = i - cld[cld.length - 1].dayStart + 1;
//     if (dayOfMonth > 0 && dayOfMonth <= cld[cld.length - 1].length) {
//       const currentDate = `${year}-${month.toString().padStart(2, '0')}-${dayOfMonth.toString().padStart(2, '0')}`;
//       cases[i].setAttribute('data-date', currentDate);
//       cases[i].innerText = dayOfMonth.toString();
//     }
//   }

//   document.getElementById('cldT').innerText = monthName[month - 1].toLocaleUpperCase() + " " + year;
// }

// function getFévrierLength(year) {
//   if (year % 4 === 0) return 29;
//   else return 28;
// }



// ***********************************************************************Validation formulaire


// Sélectionnez tous les éléments avec la classe "form" et "validation-form"
const forms = document.querySelectorAll('.form');
const validationDivs = document.querySelectorAll('.validation-form');

// Parcourez tous les formulaires
forms.forEach(function (form, index) {
  // Écoutez l'événement "submit" de chaque formulaire
  form.addEventListener('submit', function (e) {
    // Empêchez le comportement par défaut du formulaire (rechargement de la page)
    e.preventDefault();

    // Affichez le message de confirmation dans la div de validation correspondante
    const validationDiv = validationDivs[index];
    const confirmationMessage = document.createElement('div');
    confirmationMessage.classList.add('alert', 'alert-success');
    confirmationMessage.textContent = 'Votre formulaire a été envoyé avec succès. Vous recevrez un e-mail de confirmation.';

    // Effacez le contenu précédent de la div de validation
    validationDiv.innerHTML = '';

    // Ajoutez le message à la div de validation
    validationDiv.appendChild(confirmationMessage);
  });
});


// ****************************translate*********
