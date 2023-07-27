
function openMenu() {
    document.getElementById("menuSlide").style.width = "250px";
}

function closeMenu() {
    document.getElementById("menuSlide").style.width = "0";
    var menu = document.getElementById("menuSlide");
    var isClickInside = menu.contains(event.target);
    if (!isClickInside) {
      menu.style.width = "0";
    }
}

