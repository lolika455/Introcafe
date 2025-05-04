window.onscroll = function () {
  myFunction();
};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

//change navbar color function
var toggler = document.getElementById("nav-toggler");
var togglerLinks = document.getElementById("navbarText");
var logo = document.getElementById("logo");
var open = false;
toggler.addEventListener("click", function () {
  open = !open;
  console.log(logo);
  if (open) {
    togglerLinks.classList.add("show-nav");
  } else {
    togglerLinks.classList.remove("show-nav");
  }
});

