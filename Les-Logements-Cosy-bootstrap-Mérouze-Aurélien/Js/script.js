
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


// for (let i = 0; i < cld[cld.length - 1].length + 1; i++) {
//   if (i <= cld[cld.length - 1].length) {
//     cases[(i + cld[cld.length - 1].dayStart) % 7].innerText = (i).toString();
//   }
// }
// }

// Remplissage de toutes les cases du calendrier
// for (let i = 0; i < cases.length; i++) {
//   cases[i].innerText = "";
// }

// const firstDayOfMonth = cld[cld.length - 1].dayStart; // Jour de la semaine (0-6) pour le premier jour du mois
// const lastDayOfMonth = (firstDayOfMonth + cld[cld.length - 1].length - 1) % 7; // Jour de la semaine (0-6) pour le dernier jour du mois

// for (let i = 1; i <= cld[cld.length - 1].length; i++) {
//   const dayIndex = (i + firstDayOfMonth - 1) % 7; // Calcul de la position du jour dans la grille du calendrier
//   cases[i - 1 + dayIndex].innerText = i.toString();
// }

// Remplissage de toutes les cases du calendrier
for (let i = 0; i < cases.length; i++) {
  cases[i].innerText = "";
}

for (let i = 1; i <= cld[cld.length - 1].length; i++) {
  cases[i - 1 + cld[cld.length - 1].dayStart].innerText = i.toString();
}



function getFévrierLength(year) {
  if (year % 4 === 0) return 29;
  else return 28;
}
// Mise à jour de l'affichage du calendrier
document.getElementById('cldT').innerText = monthName[month - 1].toLocaleUpperCase() + " " + year;
}
}