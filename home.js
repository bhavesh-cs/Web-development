document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        navbar.style.background = "rgba(8,8,8,0.92)";
        navbar.style.backdropFilter = "blur(18px)";
        navbar.style.boxShadow = "0 8px 30px rgba(0,0,0,.35)";
    } else {
        navbar.style.background = "rgba(0,0,0,.55)";
        navbar.style.boxShadow = "none";
    }

});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });

});



const revealElements = document.querySelectorAll(
    ".class-card, .amenity-card, .price-card, .location-content, .contact form"
);
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {
    element.classList.add("hidden");
    observer.observe(element);
});

window.addEventListener("load", () => {
    const hero = document.querySelector(".hero-content");
    hero.style.opacity = "0";
    hero.style.transform = "translateY(40px)";
    setTimeout(() => {
        hero.style.transition = "all .9s ease";
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";
    }, 250);
});

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function (e) {
        const circle = document.createElement("span");
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        circle.style.width = circle.style.height = diameter + "px";
        circle.style.left =
            e.clientX - this.getBoundingClientRect().left - diameter / 2 + "px";
        circle.style.top =
            e.clientY - this.getBoundingClientRect().top - diameter / 2 + "px";
        circle.classList.add("ripple");
        const ripple = this.getElementsByClassName("ripple")[0];
        if (ripple) {
            ripple.remove();
        }
        this.appendChild(circle);
    });
});



const footer = document.querySelector(".footer-bottom");
if (footer) {
    footer.innerHTML =
        `© ${new Date().getFullYear()} Muscle Monk Gymnasium. All Rights Reserved.`;
}
