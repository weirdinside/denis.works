var htmlGalleryItems = wheelGalleryList.querySelectorAll("#gallery-item");

var boxesChecked = 0;

function areAnyCheckboxesChecked(category) {
  const container = document.getElementById(category);
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      return true;
    }
  }
  return false;
}

function howManyCategoriesChecked() {
  return [
    areAnyCheckboxesChecked("size"),
    areAnyCheckboxesChecked("brand"),
    areAnyCheckboxesChecked("body"),
  ].filter(Boolean).length;
}

function whichCategoriesChecked() {
  function areAnyCheckboxesChecked(category) {
    const container = document.getElementById(category);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        return true;
      }
    }
    return false;
  }

  var listCheckedCategories = [
    {
      type: "body",
      value: areAnyCheckboxesChecked("body"),
    },
    {
      type: "size",
      value: areAnyCheckboxesChecked("size"),
    },
    {
      type: "brand",
      value: areAnyCheckboxesChecked("brand"),
    },
  ];
  return listCheckedCategories;
}

//main checkbox initializer
document.querySelector(".wheelfinder__selector").onclick = function (e) {
  //   console.log(e.target.checked, e.target.value, e.target.dataset.categ);
  wheelGalleryList.classList.add("filtered");

  function checkedButton(dimensions) {
    htmlGalleryItems.forEach((item) => {
      // cycles through every item in the gallery - this can't be minimized
      item.style.display = ""; //clear display value of all items
      if (e.target.value === item.dataset[dimensions[0]]) {
        //if the object has the correct corresponding value to the checkbox - item.dataset.size is variable dependent on parent
        item.dataset[dimensions[0] + "filter"] = "true"; // "size has been filtered" will be tagged - item.dataset.sizefilter is variable dependent upon parent
      }
      if (item.dataset[dimensions[0] + "filter"] === "true") {
        // - same goes here
        if (howManyCategoriesChecked() === 1) {
          // if the only category checked is size,
          item.style.display = "flex"; // and set the display of this item to SHOW
        } else if (howManyCategoriesChecked() === 2) {
          //if two categories have been checked,
          if (areAnyCheckboxesChecked(dimensions[1])) {
            //if it's the body category - this changes dependent on the func as well
            if (item.dataset[dimensions[1] + "filter"] === "true") {
              //if there is a bodyfilter currently applied to the item (meaning it is shown if ONLY the bodyfilter is active)
              item.style.display = "flex"; // and set the display of this item to SHOW
            }
          }
          if (areAnyCheckboxesChecked(dimensions[2])) {
            // if instead it's the brand category that is checked,
            if (item.dataset[dimensions[2] + "filter"] === "true") {
              // check if the item is currently being filtered by brand,
              item.style.display = "flex"; // and set the display of this item to SHOW
            }
          }
        } else {
          // no "if" here, because if it's not 1 and it's not 2, it's 3 categories. it cannot be zero here because we're in an affirmative action
          if (
            item.dataset[dimensions[1] + "filter"] === "true" &&
            item.dataset[dimensions[2] + "filter"] === "true"
          ) {
            // if the item currently has two
            item.style.display = "flex"; // show the item because it meets all the requirements
          }
        }
      }
    });
  }

  function uncheckedButton(dimensions) {
    htmlGalleryItems.forEach((item) => {
      //cycles through all the items
      if (e.target.value === item.dataset[dimensions[0]]) {
        //if the item matches the size value you unchecked
        item.dataset[dimensions[0] + "filter"] = ""; //set the sizefilter to unfiltered. this happens regardless of future events
        if (areAnyCheckboxesChecked(dimensions[0])) {
          //if there are still size boxes checked
          item.style.display = ""; //hide these items
        }
      }
      if (!areAnyCheckboxesChecked(dimensions[0])) {
        if (
          areAnyCheckboxesChecked(dimensions[2]) &&
          item.dataset[dimensions[2] + "filter"] === "true" &&
          ((areAnyCheckboxesChecked(dimensions[1]) &&
            item.dataset[dimensions[1] + "filter"] === "true") ||
            !areAnyCheckboxesChecked(dimensions[1]))
        ) {
          item.style.display = "flex";
        }
        if (
          areAnyCheckboxesChecked(dimensions[1]) &&
          item.dataset[dimensions[1] + "filter"] === "true" &&
          ((areAnyCheckboxesChecked(dimensions[2]) &&
            item.dataset[dimensions[2] + "filter"] === "true") ||
            !areAnyCheckboxesChecked(dimensions[2]))
        ) {
          item.style.display = "flex";
        }
      }
    });
  }

  // ITEM CHECKED
  if (e.target.checked === true) {
    // console.log(e.target.value);
    // console.log(e.target.dataset.categ);
    boxesChecked += 1;
    //SIZE CHECK,
    if (e.target.dataset.categ === "size") {
      //if you clicked on a button
      wheelFinderImageCheck(e.target); // send target (checkbox) to wheelFinderImage
      checkedButton(["size", "body", "brand"]); // i'd like to find a way to implement this where you only call one var. a rotating array maybe?
      //BODY CHECK
    } else if (e.target.dataset.categ === "body") {
      //if you clicked on a button
      checkedButton(["body", "brand", "size"]);
      //BRAND CHECK
    } else if (e.target.dataset.categ === "brand") {
      //if you clicked on a button
      checkedButton(["brand", "size", "body"]);
    }
  }
  //ITEM UNCHECKED
  if (e.target.checked === false) {
    boxesChecked -= 1;
    //SIZE CHECK
    if (e.target.dataset.categ === "size") {
      wheelFinderImageCheck(e.target); // send target (checkbox) to wheelFinderImage
      uncheckedButton(["size", "body", "brand"]);
    }
    //BODY CHECK
    else if (e.target.dataset.categ === "body") {
      uncheckedButton(["body", "brand", "size"]);
    }
    // BRAND CHECK
    else if (e.target.dataset.categ === "brand") {
      uncheckedButton(["brand", "size", "body"]);
    }
    //TOTAL RESET
    if (boxesChecked === 0) {
      wheelGalleryList.classList.remove("filtered");
    }
  }
};

// Method now knows which checkbox was changed
function wheelFinderImageCheck(checkboxChanged) {
  // Note: checkBoxes[0] corresponds to wheelOptions[0]
  const checkBoxes = [size15, size16, size17, size18, size19, size20];
  const wheelOptions = [
    "wheel15",
    "wheel16",
    "wheel17",
    "wheel18",
    "wheel19",
    "wheel20",
  ];
  const wheelFinderImage = document.querySelector(".wheelfinder__size-image");

  if (checkboxChanged === undefined) {
    // Reset flow
    for (let className of wheelOptions) {
      wheelFinderImage.classList.remove(className);
    }
    return;
  }

  const currentWheel = Array.from(wheelFinderImage.classList).filter((className) => wheelOptions.includes(className))[0]; 
  const mutatedCheckboxIndex = checkBoxes.indexOf(checkboxChanged); 
  const wheelClassNameForMutated = wheelOptions[mutatedCheckboxIndex]; 
  const isNotSameWheel = !(currentWheel === wheelClassNameForMutated);
  let nextBox = checkBoxes.find((box, index) => box.checked && currentWheel != wheelOptions[index]); 

  if (checkboxChanged.checked) {
    if (currentWheel) wheelFinderImage.classList.remove(currentWheel); 
    if (isNotSameWheel) {
      wheelFinderImage.classList.add(wheelClassNameForMutated); 
    } else {
      wheelFinderImage.classList.add(wheelOptions[checkBoxes.indexOf(nextBox)]);
    }

  } else {
    wheelFinderImage.classList.remove(wheelClassNameForMutated); 
    if (nextBox) {
      wheelFinderImageCheck(nextBox);
    } else {
      if(!areAnyCheckboxesChecked("size")){
        resetForm();
      } else{
        const allButActiveWheel = wheelOptions.filter(wheel => wheel !== currentWheel);
        const randomIndex = Math.floor(Math.random() * allButActiveWheel.length); 
        wheelFinderImage.classList.remove(currentWheel);
        wheelFinderImage.classList.add(allButActiveWheel[randomIndex]);
      }
    }
  }
}

function resetForm() {
  document.querySelector(".wheelfinder__selector").reset();
  wheelGalleryList.classList.remove("filtered");
  htmlGalleryItems.forEach((item) => {
    item.style.display = "";
    item.dataset.bodyfilter = "";
    item.dataset.sizefilter = "";
    item.dataset.brandfilter = "";
  });
  boxesChecked = 0;
  wheelFinderImageCheck(undefined); // send undefined to wheelFinderImage
}
