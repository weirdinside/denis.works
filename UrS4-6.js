var galleryInfo = [
  {
    wheelname: "ABT A16",
    brand: "ABT",
    wheelsize: "17",
    username: "",
    type: "UrS6 sedan",
    image: "https://12v.org/wheel_gallery/images/ABT-A16-1225509921.jpg",
  },
  {
    wheelname: "ABT A24",
    brand: "ABT",
    wheelsize: "17",
    username: "",
    type: "UrS4 sedan",
    image: "https://12v.org/wheel_gallery/images/ABT-A24-1274338113.jpg",
  },
  {
    wheelname: "Audi S8 Avus",
    brand: "Audi",
    wheelsize: "18",
    username: "",
    type: "UrS4 sedan",
    image:
      "https://12v.org/wheel_gallery/images/Audi%20(OEM)-Avus%20(S8)-1225517673.jpg",
  },
  {
    wheelname: "Audi B5 A4 Sport",
    brand: "Audi",
    wheelsize: "17",
    username: "",
    type: "UrS4 sedan",
    image:
      "https://12v.org/wheel_gallery/images/Audi%20(OEM)-B5%20A4%20Sport-1468318114.jpg",
  },
  {
    wheelname: "Audi B5 Celebration",
    brand: "Audi",
    wheelsize: "17",
    username: "",
    type: "UrS4 sedan",
    image:
      "https://12v.org/wheel_gallery/images/Audi%20(OEM)-Celebration-1225575861.jpg",
  },
  {
    wheelname: "BBS RK",
    brand: "BBS",
    wheelsize: "17",
    username: "",
    type: "UrS4 sedan",
    image: "https://12v.org/wheel_gallery/images/BBS-RK-1374504614.jpg",
  },
];

// elements //

//
const gridTemplate =
  document.querySelector("#grid-template").content.firstElementChild;
const wheelGalleryList = document.querySelector("#gallery-grid");

//these two below are to keep track of the checkboxes in the wheelfinder section
const checkBoxZone = document.querySelector(".wheelfinder");
const checkboxList = checkBoxZone.querySelectorAll(".checkbox_ref");
console.log(checkboxList.length);

function getGridElement(wheelData) {
  // copies the template form
  const gridElement = gridTemplate.cloneNode(true);
  // sets constants for each of the items in the template
  const gridElementName = gridElement.querySelector("#wheelname");
  const gridElementSize = gridElement.querySelector("#wheelsize");
  const gridElementUser = gridElement.querySelector("#username");
  // this takes each image url and makes it NOT contain parentheses. thank you microsoft
  let wheelImageTemp = wheelData.image.replace(/\(/g, "%28");
  wheelImageTemp = wheelImageTemp.replace(/\)/g, "%29");
  // sets all the visible data for each grid element
  gridElement.style.backgroundImage = "url(" + wheelImageTemp + ")";
  gridElementName.textContent = wheelData.wheelname;
  gridElementSize.textContent = wheelData.wheelsize + '"';
  gridElementUser.textContent = wheelData.username;
  // sets invisible data in the HTML so i can reference this later for the filters
  gridElement.setAttribute("data-wheelsize", wheelData.wheelsize);
  gridElement.setAttribute("data-brand", wheelData.brand);
  gridElement.setAttribute("data-cartype", wheelData.type);
  // returns the html to be injected into the page
  return gridElement;
}

const size17List = [];
const size18List = [];
const brandABTList = [];
const brandAudiList = [];
let isBoxChecked = false;
let numberBoxesChecked = 0;
let searchUsed = false;

const s4Sedan = document.getElementById("UrS4sedan");
const s6Sedan = document.getElementById("UrS6sedan");
const s4Avant = document.getElementById("UrS4avant");
const s6Avant = document.getElementById("UrS6avant");

const size15 = document.getElementById("size15");
const size16 = document.getElementById("size16");
const size17 = document.getElementById("size17");
const size18 = document.getElementById("size18");
const size19 = document.getElementById("size19");
const size20 = document.getElementById("size20");

const brandAudi = document.getElementById("brandAudi");
const brandABT = document.getElementById("brandABT");
const brandAvantGarde = document.getElementById("brandAvantGarde");
const brandBBS = document.getElementById("brandBBS");
const brandFifteen = document.getElementById("brandFifteen");
const brandHRE = document.getElementById("brandHRE");
const brandOtherOEM = document.getElementById("brandOtherOEM");

galleryInfo.forEach((wheelData) => {
  const gridElement = getGridElement(wheelData);
  wheelGalleryList.append(gridElement);
});

const galleryItems = wheelGalleryList.querySelectorAll("#gallery-item");

// returns true if there's boxes checked on the bar, false if not
function checkChecked(numberBoxesChecked) {
    if(numberBoxesChecked > 0){
        return true;
    }
    else{
        return false;
    }
}

function filterWheelSizes(checkBox){

    console.log(checkBox.dataset.size);
    checkBox.addEventListener("change", (e) => {
        if (e.target.checked === true) {
          numberBoxesChecked += 1;
          if (checkChecked(numberBoxesChecked)) {
            wheelGalleryList.classList.add("filtered");
            galleryItems.forEach((item) => {
              if(item.dataset.wheelsize === checkBox.dataset.size){
                  item.style.display = "flex";
              }
            }
            )
          }
        }
        if (e.target.checked === false) {
          numberBoxesChecked -= 1;
          if (checkChecked(numberBoxesChecked)) {
              galleryItems.forEach((item) => {
                  if(item.dataset.wheelsize === checkBox.dataset.size){
                      item.style.display = "none";
                  }
                }
                )
          } else {
              galleryItems.forEach((item) => {
                  item.style.display = "";
              }
              )
            wheelGalleryList.classList.remove("filtered");
          }
        }
      });
}

filterWheelSizes(size15);
filterWheelSizes(size16);
filterWheelSizes(size17);
filterWheelSizes(size18);
filterWheelSizes(size19);
filterWheelSizes(size20);



// size18.addEventListener("change", (e) => {
//     if (e.target.checked === true) {
//       numberBoxesChecked += 1;
//       if (checkChecked(numberBoxesChecked)) {
//         wheelGalleryList.classList.add("filtered");
//         galleryItems.forEach((item) => {
//           if(item.dataset.wheelsize === "18"){
//               item.style.display = "flex";
//           }
//         }
//         )
//       }
//     }
//     if (e.target.checked === false) {
//       numberBoxesChecked -= 1;
//       if (checkChecked(numberBoxesChecked)) {
//           galleryItems.forEach((item) => {
//               if(item.dataset.wheelsize === "18"){
//                   item.style.display = "none";
//               }
//             }
//             )
//       } else {
//           galleryItems.forEach((item) => {
//               item.style.display = "";
//           }
//           )
//         wheelGalleryList.classList.remove("filtered");
//       }
//     }
//   });
  



//so far i've made a couple of arrays that have the data in them,
//so i know the file is capable of parsing the doc

//   if (wheelData.wheelsize === "17") {
//     size17List.push(wheelData);
//   } else if (wheelData.wheelsize === "18") {
//     size18List.push(wheelData);
//   }

//   if (wheelData.brand === "ABT") {
//     brandABTList.push(wheelData);
//     console.log(brandABT);
//   } else if (wheelData.brand === "Audi") {
//     brandAudiList.push(wheelData);
//     console.log(brandAudi);}
