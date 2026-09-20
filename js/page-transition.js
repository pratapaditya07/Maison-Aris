/* ========================================
   MAISON ARIS
   PAGE TRANSITION
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       CREATE TRANSITION OVERLAY
    ======================================== */

    const transition = document.createElement("div");

    transition.className = "page-transition";

    document.body.appendChild(transition);


    /* ========================================
       PAGE ENTER
    ======================================== */

    gsap.set(transition, {
        opacity: 1
    });

    gsap.to(transition, {
        opacity: 0,
        duration: 3,
        ease: "power3.out"
    });


    /* ========================================
       PAGE LEAVE
    ======================================== */

    const links = document.querySelectorAll("a");

    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            if (!href) return;

            if (href.startsWith("#")) return;

            if (
                link.hostname &&
                link.hostname !== window.location.hostname
            ) {
                return;
            }

            if (
                link.target === "_blank" ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            event.preventDefault();


            /* ========================================
               SMOOTH BLACK TRANSITION
            ======================================== */

            gsap.to(transition, {

                opacity: 1,

                duration: 3,

                ease: "power3.inOut",

                onComplete: () => {

                    window.location.href = href;

                }

            });

        });

    });

});