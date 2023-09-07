
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

// ************************Gallery*************************


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


























