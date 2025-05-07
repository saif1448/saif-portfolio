document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('backToTop');
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.getElementById('navbar').querySelector('ul');
    const navLinks = document.querySelectorAll('.nav-link');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const contactForm = document.getElementById('contactForm');

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTopBtn.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            backToTopBtn.classList.remove('show');
        }
    });

    // Back to Top Button
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close mobile menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Active Link Based on Scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Experience Tabs
    tabBtns.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding content
            const target = button.dataset.target;
            document.getElementById(target).classList.add('active');
        });
    });

    // Contact Form Submission (placeholder functionality)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (name && email && subject && message) {
                // In a real application, you would send this data to a server
                // Since this is a GitHub pages site, we'll just show an alert
                alert('Thank you for your message!');

                // Reset form
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Animation on scroll (simple implementation)
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .publication-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;

            if (elementPosition < screenPosition - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial setup for animated elements
    const setupAnimatedElements = () => {
        const elements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .publication-card');

        elements.forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    };

    setupAnimatedElements();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Typewriter effect for hero section
    const runTypewriter = () => {
        const text = "Software Developer & Educator";
        const heroTitle = document.querySelector('.hero-content');

        if (heroTitle) {
            heroTitle.textContent = "";
            let i = 0;

            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };

            typeWriter();
        }
    };

    // Uncomment to enable typewriter effect
    runTypewriter();
});

document.querySelector("#sendMsgButton").addEventListener("click", handleSendMessage);

function handleSendMessage(event) {
    event.preventDefault();
    handleSendMessage(event);
}


async function handleSendMessage(event) {
    event.preventDefault(); // prevent form from refreshing page

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();
    console.log("Message sent successfully!");
    alert(data.message);
}
