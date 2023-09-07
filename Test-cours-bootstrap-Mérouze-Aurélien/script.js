
// ************Navbar**************************

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0px";
  } else {
    document.getElementById("navbar").style.top = "-100px";
  }
}

// ************************Gallery*************************




const paragraph = document.getElementById("tittle");

const characters = paragraph.textContent.split("");

paragraph.textContent = "";

// Fonction pour afficher progressivement les caractères
function animateText(index) {
  if (index < characters.length) {
    paragraph.textContent += characters[index];
    setTimeout(function () {
      animateText(index + 1);
    }, 50);
  }

}

animateText(0);


























