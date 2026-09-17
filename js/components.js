// ==========================================================
// Maison Aris
// Components Loader
// ==========================================================
// ==========================================================
// INITIALIZATION
// ==========================================================
document.addEventListener(
    "DOMContentLoaded",
    initializeComponents
);
// ==========================================================
// INITIALIZE COMPONENTS
// ==========================================================
async function initializeComponents() {
    await Promise.all([
    loadComponent(
        "navbar",
        "/components/navbar.html"
    ),
    loadComponent(
        "footer",
        "/components/footer.html"
    )
]);
initializeGlobalComponents();

document.dispatchEvent(new Event("componentsLoaded"));
}
// ==========================================================
// LOAD COMPONENT
// ==========================================================
async function loadComponent(containerId, filePath) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(
            `${containerId} container not found.`
        );
        return;
    }
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(
                `Failed to load ${filePath}`
            );
        }
        const html = await response.text();
        container.innerHTML = html;
    }
    catch (error) {
        console.error(
    `Failed to load component: ${filePath}`,
    error
);
    }
}
// ==========================================================
// INITIALIZE GLOBAL COMPONENTS
// ==========================================================
function initializeGlobalComponents() {
    initializeDropdownMenus();
    initializeMobileMenu();
}
// ==========================================================
// NAVBAR DROPDOWNS
// ==========================================================
function initializeDropdownMenus() {
    const menuItems = document.querySelectorAll(
        ".menu-item"
    );
    menuItems.forEach(menuItem => {
        const targetId = menuItem.dataset.target;
        const dropdown = document.getElementById(
            targetId
        );
        if (!dropdown) {
            return;
        }
        let hideTimeout;
        menuItem.addEventListener(
            "mouseenter",
            () => {
                clearTimeout(hideTimeout);
                dropdown.style.marginTop = "0";
                dropdown.style.opacity = "1";
                dropdown.style.visibility = "visible";
                dropdown.style.pointerEvents = "auto";
            }
        );
        menuItem.addEventListener(
            "mouseleave",
            () => {
                hideTimeout = setTimeout(
                    () => {
                        dropdown.style.marginTop = "-70vh";
                        dropdown.style.opacity = "0";
                        dropdown.style.visibility = "hidden";
                        dropdown.style.pointerEvents = "none";
                    },
                    180
                );
            }
        );
        dropdown.addEventListener(
            "mouseenter",
            () => {
                clearTimeout(hideTimeout);
            }
        );
        dropdown.addEventListener(
            "mouseleave",
            () => {
                dropdown.style.marginTop = "-70vh";
            }
        );
    });
}
// ==========================================================
// MOBILE MENU TOGGLE
// ==========================================================
function initializeMobileMenu() {
    const toggle = document.getElementById(
        "mobile_menu_toggle"
    );
    const header = document.querySelector(
        "header"
    );
    if (!toggle || !header) {
        return;
    }
    const icon = toggle.querySelector("i");
    toggle.addEventListener(
        "click",
        () => {
            const isOpen = header.classList.toggle(
                "mobile-nav-open"
            );
            toggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
            if (icon) {
                icon.className = isOpen
                    ? "ri-close-line"
                    : "ri-menu-line";
            }
        }
    );
}
// ==========================================================
// END OF FILE
// ==========================================================