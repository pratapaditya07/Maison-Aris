// MAISON ARIS - LUXURY SMOOTH SCROLLING EXPERIENCE
// Saint Laurent inspired smooth section transitions

// Dropdown functionality (keep your existing code)
document.querySelectorAll(".menu-item").forEach(item => {
    const targetId = item.getAttribute("data-target");
    const targetBox = document.getElementById(targetId);
    let hideTimeout;

    item.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
        targetBox.style.marginTop = "0";
        targetBox.style.transition = "margin-top 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    });

    item.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
            targetBox.style.marginTop = "-70vh";
            targetBox.style.transition = "margin-top 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        }, 200);
    });

    targetBox.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
    targetBox.addEventListener("mouseleave", () => {
        targetBox.style.marginTop = "-70vh";
    });
});

function findInStore() {
            const selectedSize = document.getElementById('size-select').value;
            if (!selectedSize) {
                alert('Please select a size first.');
                return;
            }
            alert('Finding stores with your selected size...');
        }