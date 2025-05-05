window.onscroll = function () {
  myFunction();
};

var header = document.getElementById("stickyheader");

function myFunction() {
  header.classList.add("sticky");
}
document.addEventListener("DOMContentLoaded", () => {
  myFunction();
});

var toggler = document.getElementById("nav-toggler");
var togglerLinks = document.getElementById("navbarText");
var open = false;
toggler.addEventListener("click", function () {
  open = !open;
  if (open) {
    togglerLinks.classList.add("show-nav");
  } else {
    togglerLinks.classList.remove("show-nav");
  }
});