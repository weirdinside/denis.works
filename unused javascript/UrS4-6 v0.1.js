var galleryInfo = [
  {
    wheelname: "ABT A16",
    brand: "ABT",
    wheelsize: "17",
    username: "",
    type: "UrS6sedan",
    image: "https://12v.org/wheel_gallery/images/ABT-A16-1225509921.jpg",
  },
  {
    wheelname: "ABT A24",
    brand: "ABT",
    wheelsize: "17",
    username: "",
    type: "UrS4sedan",
    image: "https://12v.org/wheel_gallery/images/ABT-A24-1274338113.jpg",
  },
  {
    wheelname: "Audi S8 Avus",
    brand: "Audi",
    wheelsize: "18",
    username: "",
    type: "UrS4sedan",
    image:
      "https://12v.org/wheel_gallery/images/Audi%20(OEM)-Avus%20(S8)-1225517673.jpg",
  },
  {
    wheelname: "Audi B6 A4 Sport",
    brand: "Audi",
    wheelsize: "17",
    username: "",
    type: "UrS4sedan",
    image:
      "https://12v.org/wheel_gallery/images/Audi%20(OEM)-B5%20A4%20Sport-1468318114.jpg",
  },
  {
    wheelname: "Audi B5 Celebration",
    brand: "Audi",
    wheelsize: "17",
    username: "",
    type: "UrS4sedan",
    image:
      "https://12v.org/wheel_gallery/images/Audi%20(OEM)-Celebration-1225575861.jpg",
  },
  {
    wheelname: "BBS RK",
    brand: "BBS",
    wheelsize: "17",
    username: "",
    type: "UrS4sedan",
    image: "https://12v.org/wheel_gallery/images/BBS-RK-1374504614.jpg",
  },
  {
    wheelname: "Avant Garde ",
    brand: "Avant Garde",
    wheelsize: "17",
    username: "",
    type: "UrS4sedan",
    image:
      "https://bringatrailer.com/wp-content/uploads/2024/02/1993_audi_s4_Small_AUDi-S4_00136-03996.jpg",
  },
  {
    wheelname: "Audi C4 S6 Fuchs ",
    brand: "Audi",
    wheelsize: "16",
    username: "",
    type: "UrS4sedan",
    image:
      "https://12v.org/wheel_gallery/images/Audi%20(OEM)-Avus%20(UrS6)-1225567990.jpg",
  },
  {
    wheelname: "Audi C4 Bolero ",
    brand: "Audi",
    wheelsize: "17",
    username: "",
    type: "UrS6avant",
    image:
      "https://12v.org/wheel_gallery/images/Audi%20(OEM)-Bolero-1225516652.jpg",
  },
  {
    wheelname: "Audi D2 Flat Five ",
    brand: "Audi",
    wheelsize: "18",
    username: "",
    type: "UrS6sedan",
    image:
      "https://12v.org/wheel_gallery/images/Audi%20(OEM)-Flat%20Five%20(D3%20A8L)-1367860524.jpg",
  },
  {
    wheelname: "Audi C5 RS6 5 spoke",
    brand: "Audi",
    wheelsize: "19",
    username: "",
    type: "UrS4sedan",
    image:
      "https://12v.org/wheel_gallery/images/Audi%20(OEM)-RS6%20(5%20Spoke)-1225575181.jpg",
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
  gridElement.setAttribute("data-cartype", wheelData.cartype);
  // returns the html to be injected into the page
  return gridElement;
}
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
  if (numberBoxesChecked > 0) {
    return true;
  } else {
    return false;
  }
}

// returns true if any bodyType selector is checked, false if not
function bodyTypeChecked(){
    if((s4Sedan.checked) || (s6Sedan.checked) || (s4Avant.checked) ||  (s6Avant.checked)){
        return true;
    }
    else{
        return false;
    }
}

// returns true if any wheel size is checked, false if not
function wheelSizeChecked(){
    if((size15.checked) || (size16.checked) || (size17.checked) || (size18.checked) || (size19.checked) || (size20.checked)){
        return true;
    }
    else{
        return false;
    }
}

// returns true if any wheel brands are checked, false if not
function wheelBrandChecked(){
    if((brandAudi.checked) || (brandABT.checked) || (brandAvantGarde.checked) || (brandBBS.checked) || (brandFifteen.checked) || (brandHRE.checked) || (brandOtherOEM.checked)){
        return true;
    }
    else{
        return false;
    }
}


function filterWheelSizes(checkBox) {
  checkBox.addEventListener("change", (e) => {
    if (e.target.checked === true) {
      numberBoxesChecked += 1;
      if (checkChecked(numberBoxesChecked)) {
        wheelGalleryList.classList.add("filtered");
        galleryItems.forEach((item) => {
          if (item.dataset.wheelsize === checkBox.dataset.size){
            item.style.display = "flex";
          }
        });
      }
    }
    if (e.target.checked === false) {
      numberBoxesChecked -= 1;
      if (checkChecked(numberBoxesChecked)) {
        galleryItems.forEach((item) => {
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            item.style.display = "none";
          }
        });
      } else {
        galleryItems.forEach((item) => {
          item.style.display = "";
        });
        wheelGalleryList.classList.remove("filtered");
      }
    }
  });
}

function filterBodyStyle(checkBox) {
  checkBox.addEventListener("change", (e) => {
    if (e.target.checked === true) {
      numberBoxesChecked += 1;
      if (checkChecked(numberBoxesChecked)) {
        wheelGalleryList.classList.add("filtered");
        galleryItems.forEach((item) => {
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            item.style.display = "flex";
          }
        });
      }
    }
    if (e.target.checked === false) {
      numberBoxesChecked -= 1;
      if (checkChecked(numberBoxesChecked)) {
        galleryItems.forEach((item) => {
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            item.style.display = "none";
          }
        });
      } else {
        galleryItems.forEach((item) => {
          item.style.display = "";
        });
        wheelGalleryList.classList.remove("filtered");
      }
    }
  });
}

filterBodyStyle(s4Sedan);
filterBodyStyle(s6Sedan);
filterBodyStyle(s4Avant);
filterBodyStyle(s6Avant);

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
