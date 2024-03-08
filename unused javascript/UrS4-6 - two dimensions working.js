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
  gridElement.setAttribute("data-cartype", wheelData.type);
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

//let's try another approach

//if one dimension only has been checked:
//only check for that dimension and see which items the filter has been applied to

//if two dimensions have been checked:
//check the overlap of both the dimensions, and when anything gets unchecked, push it back to one dimension
//hide anything that only has one dimension

//if three dimensions have been checked:
//check the overlap of all three dimensions, and when anything gets unchecked, push it back to two dimensions
//hide anything that only has two dimensions

function filterWheelSizes(checkBox) {
  checkBox.addEventListener("change", (e) => {
    // if the checkbox for the target is checked,
    if (e.target.checked === true) {
      numberBoxesChecked += 1;
      // this makes the gallery become a filtered view
      wheelGalleryList.classList.add("filtered");
      //if only one dimension has been checked and it's the current one
      if (wheelSizeChecked() && !wheelBrandChecked() && !bodyTypeChecked()) {
        console.log("only one dimension checked");
        galleryItems.forEach((item) => {
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            // checks for the items in the gallery that have the value the checkbox is looking for
            item.dataset.sizefilter = "true"; // applies the filter to the item. this is relevant when you get to higher d
            item.style.display = "flex"; // shows the item
          }
        });
      }
      //if two dimensions have been checked (size and body type)
      if (wheelSizeChecked() && !wheelBrandChecked() && bodyTypeChecked()) {
        console.log("there's two dimensions checked (size and body)!");
        //so two dimensions have been checked. but if the appropriate filter isn't present on the image, it won't have dataset.bodyfilter
        galleryItems.forEach((item) => {
          item.style.display = ""; //clears it all so we can get a clean set
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            //set the filter, regardless of the viewability
            item.dataset.sizefilter = "true";
            //check if the appropriate filter is there
          }
          if ((item.dataset.sizefilter && item.dataset.bodyfilter) === "true") {
            item.style.display = "flex";
          }
        });
      }
      //if two dimensions have been checked (size and wheel brand)
      if (wheelSizeChecked() && wheelBrandChecked() && !bodyTypeChecked()) {
        console.log("there's two dimensions checked (size and brand)!");
        //so two dimensions have been checked. but if the appropriate filter isn't present on the image, it won't have dataset.brandfilter
        galleryItems.forEach((item) => {
          item.style.display = ""; //clears it all so we can get a clean set
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            //set the filter, regardless of the viewability
            item.dataset.sizefilter = "true";
            //check if the appropriate filter is there
            if (item.dataset.brandfilter === "true") {
              item.style.display = "flex";
            }
          }
        });
      }
      //if all three dimensions have been checked
      if (wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
      }
    }

    if (e.target.checked === false) {
      numberBoxesChecked -= 1; //decrement the number of boxes checked by 1
      // weird (common) case: if we just got rid of all wheel size declarations:
      if (!wheelSizeChecked()) {
        galleryItems.forEach((item) => {
          item.dataset.sizefilter = ""; // no size declarations have been made, so no filtering of size necessary
          if (
            item.dataset.wheelsize !== checkBox.dataset.size &&
            (item.dataset.bodyfilter === "true" ||
              item.dataset.brandfilter === "true")
          ) {
            item.style.display = "flex"; // shows that item again
            console.log("no more wheelsizes checked");
          }
        });
      }
      // if we're still in one dimension and it has only the one property
      if (wheelSizeChecked() && !wheelBrandChecked() && !bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            // checks for the items in the gallery that have the value the checkbox is looking for
            item.dataset.sizefilter = ""; // removes the filter from the item
            item.style.display = ""; // resets the item to default
            console.log(
              "nothing else was checked, so we can reset just the wheel size jawn",
            );
          }
        });
      }
      //if two dimensions had active filters (size and body type)
      if (wheelSizeChecked() && !wheelBrandChecked() && bodyTypeChecked()) {
        //so two dimensions have been checked. but if there's no dataset.bodyfilter tag
        galleryItems.forEach((item) => {
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            // checks for the items in the gallery that have the value the checkbox is looking for
            item.dataset.sizefilter = ""; // removes the filter from the item, relegates that item back into 1D. a wheel can't have two sizes
            if(item.dataset.bodyfilter === "true"){ // if there's a bodyfilter active, 
              item.style.display = "none"; //you can't see it because there's still a sizefilter active
            }
          }
        });
      }
      //if two dimensions have active filters (size and wheel brand)
      if (wheelSizeChecked() && wheelBrandChecked() && !bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            // checks for the items in the gallery that have the value the checkbox is looking for
            item.dataset.sizefilter = ""; // removes the filter from the item, relegates that item back into 1D. a wheel can't have two sizes
          }
        });
      }
      //if all three dimensions have filters still
      if (wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
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

function filterBodyStyle(checkBox) {
  checkBox.addEventListener("change", (e) => {
    // if the checkbox for the target is checked,
    if (e.target.checked === true) {
      numberBoxesChecked += 1;
      // this makes the gallery become a filtered view
      wheelGalleryList.classList.add("filtered");
      //if only one dimension has been checked and it's the current one
      if (!wheelSizeChecked() && !wheelBrandChecked() && bodyTypeChecked()) {
        console.log("only one dimension checked");
        galleryItems.forEach((item) => {
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            // checks for the items in the gallery that have the value the checkbox is looking for
            item.dataset.bodyfilter = "true"; // applies the filter to the item. this is relevant when you get to higher d
            item.style.display = "flex"; // shows the item
          }
        });
      }
      //if two dimensions have been checked (size and body type)
      if (wheelSizeChecked() && !wheelBrandChecked() && bodyTypeChecked()) {
        console.log("there's two dimensions checked (size and body)!");
        //so two dimensions have been checked. but if the appropriate filter isn't present on the image, it won't have dataset.bodyfilter
        galleryItems.forEach((item) => {
          item.style.display = ""; //clears everything
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            //set the filter, regardless of the viewability
            item.dataset.bodyfilter = "true";
            //check if the appropriate filter is there
          }
          if ((item.dataset.bodyfilter && item.dataset.sizefilter) === "true") {
            item.style.display = "flex";
          }
        });
      }
      //if two dimensions have been checked (body and wheel brand)
      if (!wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
        console.log("there's two dimensions checked (size and brand)!");
        //so two dimensions have been checked. but if the appropriate filter isn't present on the image, it won't have dataset.brandfilter
        galleryItems.forEach((item) => {
          item.style.display = ""; //clears everything
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            //set the filter, regardless of the viewability
            item.dataset.bodyfilter = "true";
            //check if the appropriate filter is there
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
      }
    }

    if (e.target.checked === false) {
      numberBoxesChecked -= 1; //decrement the number of boxes checked by 1
      if (!bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          item.dataset.bodyfilter = ""; // no body type selections have been made, so no need to have bodyfilter on any
          if (
            item.dataset.cartype !== checkBox.dataset.cartype &&
            (item.dataset.sizefilter === "true" ||
              item.dataset.brandfilter === "true")
          ) {
            item.style.display = "flex"; // shows that item again
            console.log("panera bread the long way");
          }
        });
      }
      // if we're still in one dimension and it has only the one property
      if (!wheelSizeChecked() && !wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            // checks for the items in the gallery that have the value the checkbox is looking for
            item.dataset.bodyfilter = ""; // removes the filter from the item
            item.style.display = ""; // resets the item to default
          }
        });
      }
      //if two dimensions had active filters (size and body type)
      if (wheelSizeChecked() && !wheelBrandChecked() && bodyTypeChecked()) {
        //so two dimensions have been checked. but if there's no dataset.bodyfilter tag
        galleryItems.forEach((item) => {
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            // checks for the items in the gallery that have the value the checkbox is looking for
            item.dataset.bodyfilter = ""; // removes the filter from the item, relegates that item back into 1D. a wheel can't have two sizes
            if (item.dataset.sizefilter === "true") { //if the wheel size filter is still active, hide the item??
              item.style.display = "";
            }
          }
        });
      }
      //if two dimensions have active filters (body and wheel brand)
      if (!wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.cartype === checkBox.dataset.cartype) {
            // checks for the items in the gallery that have the value the checkbox is looking for
            item.dataset.bodyfilter = ""; // removes the filter from the item, relegates that item back into 1D. a wheel can't have two sizes
            if (item.dataset.brandfilter === "true") { //if the wheel size filter is still active, hide the item??
              item.style.display = "none";
            }
          }
        });
      }
      //if all three dimensions have filters still
      if (wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
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

function filterBrand(checkBox) {
  checkBox.addEventListener("change", (e) => {
    // if the checkbox for the target is checked,
    if (e.target.checked === true) {
      numberBoxesChecked += 1;
      // this makes the gallery become a filtered view
      wheelGalleryList.classList.add("filtered");
      //if only one dimension has been checked and it's the current one
      if (!wheelSizeChecked() && wheelBrandChecked() && !bodyTypeChecked()) {
        console.log("only one dimension checked");
        galleryItems.forEach((item) => {
          if (item.dataset.brand === checkBox.dataset.brand) {
            // checks for the items in the gallery that have the value the checkbox is looking for
            item.dataset.brandfilter = "true"; // applies the filter to the item. this is relevant when you get to higher d
            item.style.display = "flex"; // shows the item
          }
        });
      }
      //if two dimensions have been checked (brand and body type)
      if (!wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
        console.log("there's two dimensions checked (size and body)!");
        //so two dimensions have been checked. but if the appropriate filter isn't present on the image, it won't have dataset.bodyfilter
        galleryItems.forEach((item) => {
          item.style.display = ""; //clears it all so we can get a clean set
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            //set the filter, regardless of the viewability
            item.dataset.brandfilter = "true";
            //check if the appropriate filter is there
          }
          if ((item.dataset.brandfilter && item.dataset.bodyfilter) === "true") {
            item.style.display = "flex";
          }
        });
      }
      //if two dimensions have been checked (size and wheel brand)
      if (wheelSizeChecked() && wheelBrandChecked() && !bodyTypeChecked()) {
        console.log("there's two dimensions checked (size and brand)!");
        //so two dimensions have been checked. but if the appropriate filter isn't present on the image, it won't have dataset.brandfilter
        galleryItems.forEach((item) => {
          if (item.dataset.brand === checkBox.dataset.brand) {
            //set the filter, regardless of the viewability
            item.dataset.brandfilter = "true";
            //check if the appropriate filter is there
            if (item.dataset.brandfilter === "true") {
              item.style.display = "flex";
            }
          }
        });
      }
      //if all three dimensions have been checked
      if (wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
      }
    }

    if (e.target.checked === false) {
      numberBoxesChecked -= 1; //decrement the number of boxes checked by 1
      // weird (common) case: if we just got rid of all wheel size declarations:
      if (!wheelBrandChecked()) {
        galleryItems.forEach((item) => {
          if (
            item.dataset.brand !== checkBox.dataset.brand &&
            (item.dataset.bodyfilter === "true" ||
              item.dataset.sizefilter === "true")
          ) {
            item.style.display = "flex"; // shows that item again
            console.log("panera bread brand");
          }
        });
      }
      // if we're still in one dimension and it has only the one property
      if (!wheelSizeChecked() && wheelBrandChecked() && !bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.wheelsize === checkBox.dataset.size) {
            // checks for the items in the gallery that have the value the checkbox is looking for
            item.dataset.sizefilter = ""; // removes the filter from the item
            item.style.display = ""; // resets the item to default
            console.log(
              "nothing else was checked, so we can reset just the wheel size jawn",
            );
          }
        });
      }
      //if two dimensions had active filters (size and brand )
      if (wheelSizeChecked() && wheelBrandChecked() && !bodyTypeChecked()) {
        //so two dimensions have been checked. but if there's no dataset.bodyfilter tag
        galleryItems.forEach((item) => {
          if (item.dataset.brand === checkBox.dataset.brand) {
            // checks for the items in the gallery that have the value the checkbox is looking for
            item.dataset.brandfilter = ""; // removes the filter from the item, relegates that item back into 1D. a wheel can't have two sizes
            if(item.dataset.sizefilter === "true"){ // if there's a bodyfilter active, 
              item.style.display = "none"; //you can't see it because there's still a sizefilter active
            }
          }
        });
      }
      //if two dimensions have active filters (brand and body)
      if (!wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
        galleryItems.forEach((item) => {
          if (item.dataset.brand === checkBox.dataset.brand) {
            // checks for the items in the gallery that have the value the checkbox is looking for
            item.dataset.brandfilter = ""; // removes the filter from the item, relegates that item back into 1D. a wheel can't have two sizes
            if(item.dataset.bodyfilter === "true"){ // if there's a bodyfilter active, 
              item.style.display = "none"; //you can't see it because there's still a brandfilterr active
            }
          }
        });
      }
      //if all three dimensions have filters still
      if (wheelSizeChecked() && wheelBrandChecked() && bodyTypeChecked()) {
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
};

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

filterBrand(brandABT);
filterBrand(brandAudi);
filterBrand(brandAvantGarde);
filterBrand(brandBBS);
filterBrand(brandFifteen);
filterBrand(brandHRE);
filterBrand(brandOtherOEM);
