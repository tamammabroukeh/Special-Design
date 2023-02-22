//Check if There is local storage color option
let mainColors = localStorage.getItem("color_option");
//console.log(mainColors);
if (mainColors !== null) {
  //console.log("Local Storage Is Not Empty You Can Set It On Root Now");
  //console.log(localStorage.getItem("color_option"));
  document.documentElement.style.setProperty("--main-color", mainColors);

  //Remove Active Class Form All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {
      //Add Active Class
      element.classList.add("active");
    }
  });
}

//Toggle Spin Class On Icon
document.querySelector(".toggle-settings .settings").onclick = function () {
  // Toggle Class fa-spin for rotation on self
  this.classList.toggle("fa-spin");
  // Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("opened");
};

//Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");
colorLi.forEach((li) => {
  li.addEventListener("click", (event) => {
    //console.log(event.target.dataset.color);

    //Set Color on Root
    document.documentElement.style.setProperty(
      "--main-color",
      event.target.dataset.color
    );

    //Set Color On Local Storage
    localStorage.setItem("color_option", event.target.dataset.color);

    handleActive(event);
  });
});
// Check If There Is Local Storage Random Background Item
let backgroundLocalStorage = localStorage.getItem("background_option");
let backgroundOption = true;
// Check If Local Storage Item Is Not Empty
if (backgroundLocalStorage !== null) {
  console.log(backgroundLocalStorage);
  console.log(typeof backgroundLocalStorage); // string
  if (backgroundLocalStorage === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  //Remove Active Class Form All ELements
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalStorage === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

//Switch Random Backgrounds
const randomBackground = document.querySelectorAll(".random-backgrounds span");
randomBackground.forEach((span) => {
  span.addEventListener("click", (event) => {
    handleActive(event);

    if (event.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

let backgroundInterval;
//Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

//Get Array of Images
let imgsArray = [
  "images0.jpg",
  "images1.jpg",
  "images2.jpg",
  "images3.jpg",
  "images4.jpg",
];

function randomizeImgs() {
  backgroundInterval = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * imgsArray.length);
    landingPage.style.backgroundImage =
      'url("imgs/' + imgsArray[randomNumber] + '")';
  }, 5000);
}
randomizeImgs();
/* Our Skills */
//Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  //Window Height
  let windowHeight = this.innerHeight;

  //Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let skills = document.querySelectorAll(".skill-box .skill-progress span");
    skills.forEach((element) => {
      element.style.width = element.dataset.progress;
    });
  }
};
// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (event) => {
    // Create Overlay Element
    let overlayElement = document.createElement("div");

    // Add Class To Overlay
    overlayElement.className = "popup-overlay";

    // Append Overlay To Body
    document.body.append(overlayElement);

    //Create The Popup
    let popupBox = document.createElement("div");

    // Add Class To Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      //
      let imageHeading = document.createElement("h3");

      let imageAlt = document.createTextNode(img.alt);

      imageHeading.appendChild(imageAlt);

      popupBox.appendChild(imageHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Add Popup Box To Body
    document.body.appendChild(popupBox);

    //Create Close Span
    let closeButton = document.createElement("span");

    //Create Close Button Text
    let closeButtonText = document.createTextNode("X");

    //
    closeButton.appendChild(closeButtonText);

    closeButton.className = "close-button";

    popupBox.appendChild(closeButton);
  });
});
//Close Popup
document.addEventListener("click", function (event) {
  if (event.target.className === "close-button") {
    event.target.parentNode.remove();

    document.querySelector(".popup-overlay").remove();
  }
});
//Select All Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");

//Select All Links
let allLinks = document.querySelectorAll(".landing-page .links a");

function scrollToSomeWhere(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector(event.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);
// Handle Active State
function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  //Add Class Active on self
  event.target.classList.add("active");
}
// Reset Button
document.querySelector(".settings-box .reset-option").onclick = () => {
  localStorage.clear();
  /* localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option"); */
  // Reload Window
  window.location.reload();
};

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullet_option");
if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
    if (bulletLocalItem === "block") {
      bulletsContainer.style.display = "block";
      document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
      bulletsContainer.style.display = "none";
      document.querySelector(".bullets-option .no").classList.add("active");
    }
    span.classList.add("active");
  });
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (event) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullet_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullet_option", "none");
    }
    handleActive(event);
  });
});
//Toggle Menu
let theLinks = document.querySelector(".header-area .links");
let toggleBtn = document.querySelector(".header-area .toggle-menu");
toggleBtn.onclick = function (event) {
  // Stop Propagation on Button
  event.stopPropagation();
  //Toggle Class "menu-active" on Button
  this.classList.toggle("menu-active");
  //Toggle Class "open" on Links
  theLinks.classList.toggle("open");
};
//Click AnyWhere Outside Menu And toggle button
document.addEventListener("click", (event) => {
  if (event.target !== toggleBtn && event.target !== theLinks) {
    // Cuick is menu is open
    if (theLinks.classList.contains("open")) {
      //Toggle Class "menu-active" on Button
      toggleBtn.classList.toggle("menu-active");
      //Toggle Class "open" on Links
      theLinks.classList.toggle("open");
    }
  }
});
theLinks.onclick = (event) => {
  event.stopPropagation();
};
