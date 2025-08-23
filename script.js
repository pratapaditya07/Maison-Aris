document.querySelectorAll(".menu-item").forEach(item => {
    const targetId = item.getAttribute("data-target");
    const targetBox = document.getElementById(targetId);
    let hideTimeout;

    item.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
        targetBox.style.marginTop = "0";
        targetBox.style.transition = "margin-top 0.3s ease";
    });

    item.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
            targetBox.style.marginTop = "-70vh";
        }, 200);
    });

    targetBox.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
    });

    targetBox.addEventListener("mouseleave", () => {
        targetBox.style.marginTop = "-70vh";
    });
});

// FIXED DROPDOWN MENU SCRIPT
    document.querySelectorAll(".menu-item").forEach(item => {
        const targetId = item.getAttribute("data-target");
        const targetBox = document.getElementById(targetId);
        let hideTimeout;

        item.addEventListener("mouseenter", () => {
            clearTimeout(hideTimeout);
            targetBox.style.marginTop = "0";
            targetBox.style.transition = "margin-top 1200ms ease";
        });

        item.addEventListener("mouseleave", () => {
            hideTimeout = setTimeout(() => {
                targetBox.style.marginTop = "-70vh";
            }, 200);
        });

        targetBox.addEventListener("mouseenter", () => {
            clearTimeout(hideTimeout);
        });

        targetBox.addEventListener("mouseleave", () => {
            targetBox.style.marginTop = "-70vh";
        });
    });