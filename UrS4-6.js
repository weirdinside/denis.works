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
  {
    wheelname: "Fikse FM5",
    brand: "Fikse",
    wheelsize: "17",
    username: "",
    type: "UrS6sedan",
    image:
      "https://12v.org/wheel_gallery/images/Fikse-FM5-1225568743.jpg",
  },
  {
    wheelname: "Fikse FM10",
    brand: "Fikse",
    wheelsize: "17",
    username: "",
    type: "UrS6avant",
    image:
      "https://12v.org/wheel_gallery/images/Fikse-FM10-1225568776.jpg",
  },
  {
    wheelname: "OZ crono",
    brand: "OZ",
    wheelsize: "18",
    username: "",
    type: "UrS4sedan",
    image:
      "https://12v.org/wheel_gallery/images/OZ--1252533680.jpg",
  },
  {
    wheelname: "Audi C4 S6 Fuchs",
    brand: "Audi",
    wheelsize: "16",
    username: "",
    type: "UrS4avant",
    image:
      "https://i2.wp.com/audiclubna.org/wp-content/uploads/FOTD-C4-S4-Avant.jpg",
  },
];

const gridTemplate =
  document.querySelector("#grid-template").content.firstElementChild;
const wheelGalleryList = document.querySelector("#gallery-grid");

const checkBoxZone = document.querySelector(".wheelfinder");
const checkboxList = checkBoxZone.querySelectorAll(".checkbox_ref");

function getGridElement(wheelData) {
  const gridElement = gridTemplate.cloneNode(true);
  const gridElementName = gridElement.querySelector("#wheelname");
  const gridElementSize = gridElement.querySelector("#wheelsize");
  const gridElementUser = gridElement.querySelector("#username");
  let wheelImageTemp = wheelData.image.replace(/\(/g, "%28");
  wheelImageTemp = wheelImageTemp.replace(/\)/g, "%29");
  gridElement.style.backgroundImage = "url(" + wheelImageTemp + ")";
  gridElementName.textContent = wheelData.wheelname;
  gridElementSize.textContent = wheelData.wheelsize + '"';
  gridElementUser.textContent = wheelData.username;
  gridElement.setAttribute("data-wheelsize", wheelData.wheelsize);
  gridElement.setAttribute("data-brand", wheelData.brand);
  gridElement.setAttribute("data-cartype", wheelData.type);
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
const brandFikse = document.getElementById("brandFikse");
const brandOZ = document.getElementById("brandOZ");

galleryInfo.forEach((wheelData) => {
  const gridElement = getGridElement(wheelData);
  wheelGalleryList.append(gridElement);
});

const galleryItems = wheelGalleryList.querySelectorAll("#gallery-item");

function checkChecked(numberBoxesChecked) {
  if (numberBoxesChecked > 0) {
    return true;
  } else {
    return false;
  }
}

// returns true if any bodyType selector is checked, false if not
function bodyTypeChecked() {
  if (
    s4Sedan.checked ||
    s6Sedan.checked ||
    s4Avant.checked ||
    s6Avant.checked
  ) {
    return true;
  } else {
    return false;
  }
}

// returns true if any wheel size is checked, false if not
function wheelSizeChecked() {
  if (
    size15.checked ||
    size16.checked ||
    size17.checked ||
    size18.checked ||
    size19.checked ||
    size20.checked
  ) {
    return true;
  } else {
    return false;
  }
}

// returns true if any wheel brands are checked, false if not
function wheelBrandChecked() {
  if (
    brandAudi.checked ||
    brandABT.checked ||
    brandAvantGarde.checked ||
    brandBBS.checked ||
    brandFifteen.checked ||
    brandHRE.checked ||
    brandOtherOEM.checked
  ) {
    return true;
  } else {
    return false;
  }
}

//Explanation for code below:
//if one dimension only has been checked:
//only check for that dimension and see which items the filter has been applied to

//if two dimensions have been checked:
//check the overlap of both the dimensions, and when anything gets unchecked, push it back to one dimension
//hide anything that only has one dimension

//if three dimensions have been checked:
//check the overlap of all three dimensions, and when anything gets unchecked, push it back to two dimensions
//hide anything that only has two dimensions

//initializes the wheelsize checkboxes and monitors them throughout operation
function filterWheelSizes(checkBox) {
  checkBox.addEventListener("change", (e) => {
    if (e.target.checked === true) {
      numberBoxesChecked += 1;
      wheelFinderImageCheck();
      wheelGalleryList.classList.add("filtered");
      //if only one dimension has been checked and it's the current one
      if (wheelSizeChecked() && !wheelBrandChecked() && !bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            item.dataset.sizefilter = "true"; 
            item.style.display = "flex"; // 
          }
        });
      }
      //if two dimensions have been checked (size and body type)
      if (wheelSizeChecked() && !wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          item.style.display = "";
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            item.dataset.sizefilter = "true";
          }
          if ((item.dataset.sizefilter && item.dataset.bodyfilter) === "true") {
            item.style.display = "flex";
          }
        });
      }
      //if two dimensions have been checked (size and wheel brand)
      if (wheelSizeChecked() && wheelBrandChecked() && !bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          item.style.display = ""; 
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            item.dataset.sizefilter = "true";
          }
          if ((item.dataset.brandfilter && item.dataset.wheelsize) === "true") {
            item.style.display = "flex";
          }
        });
      }
      //if all three dimensions have been checked
      if (wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          item.style.display = ""; 
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            item.dataset.sizefilter = "true";
          }
          if ((item.dataset.brandfilter && item.dataset.bodyfilter && item.dataset.sizefilter) === "true") {
            item.style.display = "flex";
          }
        });
      }
    }

    if (e.target.checked === false) {
      numberBoxesChecked -= 1; //decrement the number of boxes checked by 1
      wheelFinderImageCheck();
      // weird (common) case: if we just got rid of all wheel size declarations:
      if (!wheelSizeChecked())  {
        galleryItems.forEach((item) => {
          item.dataset.sizefilter = ""; 
          if ((item.dataset.bodyfilter === "true") && (bodyTypeChecked()) && ((item.dataset.brandfilter === "true") && wheelBrandChecked())) {
            item.style.display = "flex"; 
          }
          else if ((item.dataset.bodyfilter === "true") && (bodyTypeChecked()) && (!wheelBrandChecked())){
            item.style.display = "flex";
          }
          else if ((item.dataset.brandfilter === "true") && (wheelBrandChecked()) && (!bodyTypeChecked())){
            item.style.display = "flex";
          }
        });
      }
      // if we're still in one dimension and it has only the one property
      if (wheelSizeChecked() && !wheelBrandChecked() && !bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            item.dataset.sizefilter = ""; 
            item.style.display = ""; 
          }
        });
      }
      //if two dimensions had active filters (size and body type)
      if (wheelSizeChecked() && !wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            item.dataset.sizefilter = "";
            if(item.dataset.bodyfilter === "true"){ 
              item.style.display = "";
            }
          }
        });
      }
      //if two dimensions have active filters (size and wheel brand)
      if (wheelSizeChecked() && wheelBrandChecked() && !bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            item.dataset.sizefilter = ""; 
            if(item.dataset.brandfilter === "true"){
              item.style.display = ""; 
            }
          }
        });
      }
      //if all three dimensions have filters still
      if (wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
          galleryItems.forEach((item) => {
            item.style.display = ""; 
            if (item.dataset.wheelsize === checkBox.dataset.size) {
              item.dataset.sizefilter = "";
            }
            if ((item.dataset.brandfilter && item.dataset.bodyfilter && item.dataset.sizefilter) === "true") {
              item.style.display = "flex"; 
            }
          });

      }
      // if nothing is checked, reset the whole gallery
      if (!checkChecked(numberBoxesChecked)) {
        galleryItems.forEach((item) => {
          item.style.display = "";
          item.dataset.bodyfilter = "";
          item.dataset.sizefilter = "";
          item.dataset.brandfilter = "";
        });
        wheelGalleryList.classList.remove("filtered");
      }
    }
  });
}

//initializes the bodystyle checkboxes and monitors them throughout operation
function filterBodyStyle(checkBox) {
  checkBox.addEventListener("change", (e) => {
    if (e.target.checked === true) {
      numberBoxesChecked += 1;
      wheelGalleryList.classList.add("filtered");
      //if only one dimension has been checked and it's the current one
      if (!wheelSizeChecked() && !wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            item.dataset.bodyfilter = "true";
            item.style.display = "flex"; 
          }
        });
      }
      //if two dimensions have been checked (size and body type)
      if (wheelSizeChecked() && !wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          item.style.display = "";
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            item.dataset.bodyfilter = "true";
          }
          if ((item.dataset.bodyfilter && item.dataset.sizefilter) === "true") {
            item.style.display = "flex";
          }
        });
      }
      //if two dimensions have been checked (body and wheel brand)
      if (!wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          item.style.display = ""; 
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            item.dataset.bodyfilter = "true";
          }
          if (
            (item.dataset.bodyfilter && item.dataset.brandfilter) === "true"
          ) {
            item.style.display = "flex";
          }
        });
      }
      //if all three dimensions have been checked
      if (wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
        {
          galleryItems.forEach((item) => {
            item.style.display = ""; 
            if (item.dataset.cartype === checkBox.dataset.cartype) {
              item.dataset.bodyfilter = "true";
            }
            if ((item.dataset.sizefilter && item.dataset.bodyfilter && item.dataset.brandfilter) === "true") {
              item.style.display = "flex";
            }
          });
        }
      }
    }

    if (e.target.checked === false) {
      numberBoxesChecked -= 1; //decrement the number of boxes checked by 1
      if (!bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          item.dataset.bodyfilter = "";
          if ((item.dataset.sizefilter === "true") && (wheelSizeChecked()) && ((item.dataset.brandfilter === "true") && wheelBrandChecked())) {
            item.style.display = "flex"; 
          }
          else if ((item.dataset.sizefilter === "true") && (wheelSizeChecked()) && (!wheelBrandChecked())){
            item.style.display = "flex";
          }
          else if ((item.dataset.brandfilter === "true") && (wheelBrandChecked()) && (!wheelSizeChecked())){
            item.style.display = "flex";
          }
        });
      }
      // if we're still in one dimension and it has only the one property
      if (!wheelSizeChecked() && !wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            item.dataset.bodyfilter = "";
            item.style.display = "";
          }
        });
      }
      //if two dimensions had active filters (size and body type)
      if (wheelSizeChecked() && !wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            item.dataset.bodyfilter = ""; 
            if (item.dataset.sizefilter === "true") {
              item.style.display = "";
            }
          }
        });
      }
      //if two dimensions have active filters (body and wheel brand)
      if (!wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            item.dataset.bodyfilter = ""; 
            if (item.dataset.brandfilter === "true") { 
              item.style.display = "none";
            }
          }
        });
      }
      //if all three dimensions have filters still
      if (wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          item.style.display = "";
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            item.dataset.bodyfilter = "";
          }
          if ((item.dataset.brandfilter && item.dataset.bodyfilter && item.dataset.sizefilter) === "true") {
            item.style.display = "flex";
          }
        });
      }
      // if nothing is checked, reset the whole gallery
      if (!checkChecked(numberBoxesChecked)) {
        galleryItems.forEach((item) => {
          item.style.display = "";
          item.dataset.bodyfilter = "";
          item.dataset.sizefilter = "";
          item.dataset.brandfilter = "";
        });
        wheelGalleryList.classList.remove("filtered");
      }
    }
  });
}

//initializes the brand checkboxes and monitors them throughout operation
function filterBrand(checkBox) {
  checkBox.addEventListener("change", (e) => {
    if (e.target.checked === true) {
      numberBoxesChecked += 1;
      wheelGalleryList.classList.add("filtered");
      //if only one dimension has been checked and it's the current one
      if (!wheelSizeChecked() && wheelBrandChecked() && !bodyTypeChecked()) {

        galleryItems.forEach((item) => {
          if (item.dataset.brand === checkBox.dataset.brand) {
            item.dataset.brandfilter = "true"; 
            item.style.display = "flex"; 
          }
        });
      }
      //if two dimensions have been checked (size and brand)
      if (wheelSizeChecked() && wheelBrandChecked() && !bodyTypeChecked()) {

        galleryItems.forEach((item) => {
          item.style.display = "";
          if (item.dataset.brand === checkBox.dataset.brand) {
            item.dataset.brandfilter = "true";
          }
          if ((item.dataset.brandfilter && item.dataset.sizefilter) === "true") {
            item.style.display = "flex";
          }
        });
      }
      //if two dimensions have been checked (body and brand)
      if (!wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {

        galleryItems.forEach((item) => {
          item.style.display = ""; 
          if (item.dataset.brand === checkBox.dataset.brand) {
            item.dataset.brandfilter = "true";
          }
          if (
            (item.dataset.bodyfilter && item.dataset.brandfilter) === "true"
          ) {
            item.style.display = "flex";
          }
        });
      }
      //if all three dimensions have been checked
      if (wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
        {
          galleryItems.forEach((item) => {
            item.style.display = ""; 
            if (item.dataset.brand === checkBox.dataset.brand) {
              item.dataset.brandfilter = "true";
            }
            if ((item.dataset.sizefilter && item.dataset.brandfilter && item.dataset.bodyfilter) === "true") {
              item.style.display = "flex";
            }
          });
        }
      }
    }

    if (e.target.checked === false) {
      numberBoxesChecked -= 1; //decrement the number of boxes checked by 1
      if (!wheelBrandChecked()) {
        galleryItems.forEach((item) => {
          item.dataset.brandfilter = ""; 
          if ((item.dataset.bodyfilter === "true") && (bodyTypeChecked()) && ((item.dataset.sizefilter === "true") && wheelSizeChecked())) {
            item.style.display = "flex"; // shows that item again
          }
          else if ((item.dataset.bodyfilter === "true") && (bodyTypeChecked()) && (!wheelSizeChecked())){
            item.style.display = "flex";
          }
          else if ((item.dataset.sizefilter === "true") && (wheelSizeChecked()) && (!bodyTypeChecked())){
            item.style.display = "flex";
          }
        });
      }
      // if we're still in one dimension and it has only the one property
      if (!wheelSizeChecked() && !wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.brand === checkBox.dataset.brand) {
            // checks for the items in the gallery that have the value the checkbox is looking for
            item.dataset.brandfilter = ""; // removes the filter from the item
            item.style.display = ""; // resets the item to default
          }
        });
      }
      //if two dimensions had active filters (size and brand )
      if (wheelSizeChecked() && wheelBrandChecked() && !bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.brand === checkBox.dataset.brand) {
            item.dataset.brandfilter = ""; 
            if (item.dataset.sizefilter === "true") { 
              item.style.display = "";
            }
          }
        });
      }
      //if two dimensions have active filters (body and wheel brand)
      if (!wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.brand === checkBox.dataset.brand) {
            item.dataset.brandfilter = "";
            if (item.dataset.bodyfilter === "true") { 
              item.style.display = "none";
            }
          }
        });
      }
      //if all three dimensions have filters still
      if (wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          item.style.display = ""; 
          if (item.dataset.brand === checkBox.dataset.brand) {
            item.dataset.brandfilter = "";
          }
          if ((item.dataset.brandfilter && item.dataset.bodyfilter && item.dataset.sizefilter) === "true") {
            item.style.display = "flex";
          
        };
        });
      }
      // if nothing is checked, reset the whole gallery
      if (!checkChecked(numberBoxesChecked)) {
        galleryItems.forEach((item) => {
          item.style.display = "";
          item.dataset.bodyfilter = "";
          item.dataset.sizefilter = "";
          item.dataset.brandfilter = "";
        });
        wheelGalleryList.classList.remove("filtered");
      }
    }
  });
}

const wheelFinderImage = document.querySelector(".wheelfinder__size-image");
function wheelFinderImageCheck(){
  const classNames = ["wheel16", "wheel17", "wheel18", "wheel19"];
  const random = classNames[Math.floor(Math.random() * classNames.length)];

  function remove16(){
    wheelFinderImage.classList.remove("wheel16");
  }
  function remove17(){
    wheelFinderImage.classList.remove("wheel17");
  }
  function remove18(){
    wheelFinderImage.classList.remove("wheel18");
  }
  function remove19(){
    wheelFinderImage.classList.remove("wheel19");
  }

  if(numberBoxesChecked > 1){
    remove16(); remove17(); remove18(); remove19();
    wheelFinderImage.classList.add(random);
  }
  else if(size16.checked){
    remove17(); remove18(); remove19();
    wheelFinderImage.classList.add("wheel16");
  }
  else if(size17.checked){
    remove16(); remove18(); remove19();
    wheelFinderImage.classList.add("wheel17");
  }
  else if(size18.checked){
    remove16(); remove17(); remove19();
    wheelFinderImage.classList.add("wheel18");
  }
  else if(size19.checked){
    remove16(); remove17(); remove18();
    wheelFinderImage.classList.add("wheel19");
  }
  else{
    remove16(); remove17(); remove18(); remove19();
  }
  
  }

filterBodyStyle(s4Sedan); filterBodyStyle(s6Sedan); filterBodyStyle(s4Avant); filterBodyStyle(s6Avant);

filterWheelSizes(size15); filterWheelSizes(size16); filterWheelSizes(size17); filterWheelSizes(size18);
filterWheelSizes(size19); filterWheelSizes(size20);

filterBrand(brandABT); filterBrand(brandAudi); filterBrand(brandAvantGarde); filterBrand(brandBBS);
filterBrand(brandFifteen); filterBrand(brandFikse); filterBrand(brandHRE); filterBrand(brandOtherOEM);
filterBrand(brandOZ);