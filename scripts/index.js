//definitions

const buttonMusic = document.querySelector(".button_music");
const buttonShop = document.querySelector(".button_shop");
const buttonPhoto = document.querySelector(".button_photo");
const buttonTap = document.querySelector(".button_tap");
const buttonUrS = document.querySelector(".button_urs4-6");
const blurbText = document.querySelector(".blurb__text");
const blurbTextDefault = document.querySelector(".blurb__text").textContent;
const blurb = document.getElementById("blurb");


// set default blurb text content

function setDefaultBlurbText() {
  blurbText.textContent = blurbTextDefault;
  blurb.style.minHeight = ("auto");
}

//set music blurb

function setMusicBlurbText() {
  blurb.style.minHeight = (blurb.clientHeight + "px");
  blurbText.textContent =
    "the music of denis biblioni, focused mostly on the feeling of walking around in the cold of new jersey between september and march.";
}

//define blurb text reaction to hover on buttons

buttonMusic.onmouseover = setMusicBlurbText;
buttonMusic.onmouseout = setDefaultBlurbText;