
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




// *****************************Form*********************

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche l'envoi par défaut du formulaire

    // Récupérer les valeurs des champs en utilisant les classes
    const name = document.querySelector(".name").value;
    const email = document.querySelector(".email").value;
    const phoneNumber = document.querySelector(".phone").value;
    const message = document.querySelector(".message").value;
    const dateIn = document.querySelector(".dateIn").value;
    const dateOut = document.querySelector(".dateOut").value;
    const numberNight = document.querySelector(".numberNight").value;
    // Créer un objet contenant les données
    const formData = {
      dateIn,
      dateOut,
      numberNight,
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
        month = 1;
      }
      break;
    case DOWN_MONTH:
      if (month > 1) month--
      else {
        year--
        month = 12;
      }
      break;
    default:
      break;
  }
  getCalendrier(year, month);
}

document.getElementById('left').onclick = function () {
  CALENDRIER_REDUCER(DOWN_MONTH);
  console.log(month);
}

document.getElementById('right').onclick = function () {
  CALENDRIER_REDUCER(UP_MONTH);
  console.log(month);
};

getCalendrier(year, month);

function getCalendrier(year, month) {
  const monthNb = month + 12 * (year - 2020);
  let cld = [{ dayStart: 2, length: 31, year: 2020, month: "janvier" }];

  for (let i = 0; i < monthNb - 1; i++) {
    let yearSimule = 2020 + Math.floor(i / 12);
    const monthsSimuleLongueur = [31, getFévrierLength(yearSimule), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let monthsSimuleIndex = (i + 1) - (yearSimule - 2020) * 12;

    cld[i + 1] = {
      dayStart: (cld[i].dayStart + monthsSimuleLongueur[monthsSimuleIndex - 1]) % 7,
      length: monthsSimuleLongueur[monthsSimuleIndex],
      year: 2020 + Math.floor((i + 1) / 12),
      month: monthName[monthsSimuleIndex]
    }
    if (cld[i + 1].month === undefined) {
      cld[i + 1].month = "janvier"
      cld[i + 1].length = 31;
    }
    // Remplissage de toutes les cases du calendrier
    for (let i = 0; i < cases.length; i++) {
      cases[i].innerText = "";
      const dayOfMonth = i - cld[cld.length - 1].dayStart + 1;
      if (dayOfMonth > 0 && dayOfMonth <= cld[cld.length - 1].length) {
        const currentDate = `${year}-${month.toString().padStart(2, '0')}-${dayOfMonth.toString().padStart(2, '0')}`;
        cases[i].setAttribute('data-date', currentDate);
        cases[i].innerText = dayOfMonth.toString();
      }
    }

    function getFévrierLength(year) {
      if (year % 4 === 0) return 29;
      else return 28;
    }
    // Mise à jour de l'affichage du calendrier
    document.getElementById('cldT').innerText = monthName[month - 1].toLocaleUpperCase() + " " + year;
  }
}


// **************************Link calendar/form****************************

const calendar = document.getElementById('cld');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const numberNightInput = document.getElementById('numberNight');

let startHighlightDate = null;
let endHighlightDate = null;

// Fonction pour mettre à jour les champs de date
function updateDateFields(startDate, endDate) {
  startDateInput.value = startDate;
  endDateInput.value = endDate;
  calculateNumberOfNights(startDate, endDate);
}

// Fonction pour calculer le nombre de nuits
function calculateNumberOfNights(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end.getTime() - start.getTime();
  const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24));
  numberNightInput.value = numberOfNights;
}

// Fonction pour réinitialiser la surbrillance des dates sélectionnées
function resetDateHighlight() {
  startHighlightDate = null;
  endHighlightDate = null;
  const allCases = document.getElementsByClassName('case');
  for (let i = 0; i < allCases.length; i++) {
    allCases[i].classList.remove('highlighted-range');
  }
}

// Gestionnaire d'événement click sur le calendrier
calendar.addEventListener('click', function (event) {
  // Vérification si la cible du clic est une case du calendrier
  if (event.target.classList.contains('case')) {
    const selectedDate = event.target.getAttribute('data-date');
    const currentStartDate = startDateInput.value;
    const currentEndDate = endDateInput.value;

    if (!currentStartDate || (currentStartDate && currentEndDate)) {
      // Si aucune date de début n'est sélectionnée ou si les deux dates sont déjà sélectionnées, réinitialisez la surbrillance
      resetDateHighlight();
    }

    if (!currentStartDate || (currentStartDate && currentEndDate)) {
      startDateInput.value = selectedDate;
      endDateInput.value = '';
      startHighlightDate = new Date(selectedDate);
      endHighlightDate = null;
    } else if (!currentEndDate) {
      endDateInput.value = selectedDate;
      endHighlightDate = new Date(selectedDate);
    }

    // Mettez en surbrillance les cases entre la date de début et la date de fin
    if (startHighlightDate && endHighlightDate) {
      const dateArray = [];
      let currentDate = new Date(startHighlightDate);
      while (currentDate <= endHighlightDate) {
        const formattedDate = currentDate.toISOString().slice(0, 10);
        const caseElement = document.querySelector(`.case[data-date="${formattedDate}"]`);
        if (caseElement) {
          caseElement.classList.add('highlighted-range');
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    // Calcul du nombre de nuits et mise à jour de l'input
    calculateNumberOfNights(startDateInput.value, endDateInput.value);
  }
});

// Réinitialisez la surbrillance lorsque l'utilisateur modifie une date manuellement
startDateInput.addEventListener('input', resetDateHighlight);
endDateInput.addEventListener('input', resetDateHighlight);

