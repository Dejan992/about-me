// ===== Typing Animation =====
const typingTexts = [
    "Senior MLOps Engineer",
    "Cloud Architect", 
    "AI Infrastructure Expert",
    "DevSecOps Advocate",
    "Platform Engineer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');
const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

function typeText() {
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500; // Pause before new word
    }
    
    setTimeout(typeText, typeSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (prefersReducedMotion) {
        if (typingElement) typingElement.textContent = typingTexts[0];
        return;
    }

    setTimeout(typeText, 1000);
});

// ===== Mobile Navigation =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(var(--bg-rgb), 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(var(--bg-rgb), 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Section entrance animations removed (keep page snappy and avoid scroll-triggered motion)

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple form validation visual feedback
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        button.textContent = 'Message sent';
        button.style.background = 'var(--gradient)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 3000);
    }, 1500);
});

// ===== Active Navigation Link Highlight =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Hero parallax removed (avoid scroll-triggered motion)

// Skill tags hover effect is handled purely in CSS (keeps animations consistent and non-staggered)

console.log('Portfolio loaded successfully!');
