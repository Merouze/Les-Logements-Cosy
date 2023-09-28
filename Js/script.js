
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

    // Récupérer les valeurs des champs en utilisant les classes
    const name = document.querySelector(".name").value;
    const email = document.querySelector(".email").value;
    const phoneNumber = document.querySelector(".phone").value;
    const message = document.querySelector(".message").value;
    const dateIn = document.querySelector(".dateIn").value;
    const dateOut = document.querySelector(".dateOut").value;
    const numberNight = document.querySelector(".numberNight").value;
    const checkData = document.querySelector(".form-check-input").value;
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
