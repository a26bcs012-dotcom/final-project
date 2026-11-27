
// =====================================
// KAVIYA PERSONAL PORTFOLIO
// JAVASCRIPT FILE
// =====================================


// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});

// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// 2. DARK AND LIGHT MODE

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const isLight =
        document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "☾" : "☀";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );

});


// 3. TYPING ANIMATION

const typingText = document.getElementById("typingText");

const roles = [
    "Web Developer",
    "College Student",
    "Python Programmer",
    "AI Enthusiast",
    "Creative Learner"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

let typingTimer;

function typeEffect() {

    if (reducedMotion) {

        typingText.textContent = roles[0];

        return;

    }

    const currentRole = roles[roleIndex];

    if (deleting) {

        charIndex--;

    } else {

        charIndex++;

    }

    typingText.textContent =
        currentRole.substring(0, charIndex);

    let delay = deleting ? 60 : 110;

    if (!deleting && charIndex === currentRole.length) {

        deleting = true;

        delay = 1300;

    } else if (deleting && charIndex === 0) {

        deleting = false;

        roleIndex = (roleIndex + 1) % roles.length;

        delay = 400;

    }

    typingTimer = setTimeout(typeEffect, delay);

}

typeEffect();


// 4. SCROLL REVEAL ANIMATION

const revealElements =
    document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {

    revealElements.forEach(element => {
        element.classList.add("show");
    });

} else {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}


// 5. ANIMATED SKILL PROGRESS BARS

const skillSection = document.getElementById("skills");

const skillBars = document.querySelectorAll(".progress");

function showSkillBars() {

    skillBars.forEach(bar => {

        const progressValue = bar.dataset.progress;

        bar.style.width = progressValue + "%";

    });

}

if (reducedMotion || !("IntersectionObserver" in window)) {

    showSkillBars();

} else {

    const skillObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    showSkillBars();

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.2
        }
    );

    skillObserver.observe(skillSection);

}


// 6. BACK TO TOP BUTTON

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 350) {

        backToTop.style.display = "block";

    } else {

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: reducedMotion ? "auto" : "smooth"

    });

});


// 7. CONTACT FORM VALIDATION

const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();

    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const messageError =
        document.getElementById("messageError");

    const formStatus =
        document.getElementById("formStatus");


    // Clear previous errors

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formStatus.textContent = "";

    let isValid = true;


    // NAME VALIDATION

    if (name.length < 2) {

        nameError.textContent =
            "Please enter at least 2 characters.";

        isValid = false;

    }


    // EMAIL VALIDATION

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        emailError.textContent =
            "Please enter a valid email address.";

        isValid = false;

    }


    // MESSAGE VALIDATION

    if (message.length < 10) {

        messageError.textContent =
            "Message must contain at least 10 characters.";

        isValid = false;

    }


    // SUCCESS MESSAGE

    if (isValid) {

        formStatus.textContent =
            "Success! Your form passed validation. This demo does not send emails.";

        contactForm.reset();

    }

});


// 8. AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// 9. ACTIVE NAVIGATION LINK

const sections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {

    const activeObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navigationLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        );

                    });

                }

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    sections.forEach(section => {

        activeObserver.observe(section);

    });

}
