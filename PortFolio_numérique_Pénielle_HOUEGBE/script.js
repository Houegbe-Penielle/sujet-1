/* =========================================
   01. INITIALISATION
========================================= */

document.documentElement.classList.add("js-ready");


/* =========================================
   02. MENU MOBILE
========================================= */

const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const navigationLinks = document.querySelectorAll(".nav-link");


function closeMenu() {

    navLinks.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Ouvrir le menu");

}


menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );

});


navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});


document.addEventListener("click", (event) => {

    const clickedInsideMenu = navLinks.contains(event.target);

    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {

        closeMenu();

    }

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMenu();

    }

});


/* =========================================
   03. ANIMATIONS AU DÉFILEMENT
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


if ("IntersectionObserver" in window && !reduceMotion) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


/* =========================================
   04. BOUTON RETOUR EN HAUT
========================================= */

const backToTop = document.querySelector("#back-to-top");


function updateBackToTop() {

    if (window.scrollY > 500) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


updateBackToTop();


/* =========================================
   05. ANNÉE AUTOMATIQUE
========================================= */

const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();


/* =========================================
   06. NAVIGATION ACTIVE
========================================= */

const sections = document.querySelectorAll(
    "main section[id]"
);


if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const sectionId = entry.target.id;

                    navigationLinks.forEach((link) => {

                        const isActive =
                            link.getAttribute("href") === `#${sectionId}`;

                        link.classList.toggle("active", isActive);

                    });

                }

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });

}


/* =========================================
   07. FERMETURE DU MENU AU REDIMENSIONNEMENT
========================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {

        closeMenu();

    }

});


/* =========================================
   08. MESSAGE DANS LA CONSOLE
========================================= */

console.log(
    "%c FG Portfolio ",
    "background: #a78bfa; color: #080910; padding: 8px; font-weight: bold;"
);

console.log(
    "Bienvenue dans mon univers numérique. Merci de visiter mon portfolio !"
);