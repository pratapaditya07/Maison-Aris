document.querySelectorAll(".menu-item").forEach(item => {
const targetId = item.getAttribute("data-target");
const targetBox = document.getElementById(targetId);

item.addEventListener("mouseenter", () => {
    targetBox.style.marginTop = "0"; // slide down
});

item.addEventListener("mouseleave", () => {
    targetBox.style.marginTop = "-70vh"; // hide again
});

  // Extra: also hide when mouse leaves the dropbox itself
targetBox.addEventListener("mouseleave", () => {
    targetBox.style.marginTop = "-70vh";
});
});
