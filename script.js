// Gerenciar Navegação Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer para animações de fade/slide-in (Gatilhos de Rolamento)
const isMobile = window.innerWidth <= 768;

const defaultObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const mobileCenterOptions = {
    root: null,
    rootMargin: '-20% 0px -30% 0px', // Aciona apenas quando o elemento estiver bem no centro
    threshold: 0
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, defaultObserverOptions);

const mobileObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, mobileCenterOptions);

document.querySelectorAll('.reveal').forEach(el => {
    // Se for mobile e for um card de projeto, usa o observer centralizado
    if (isMobile && el.classList.contains('project-card')) {
        mobileObserver.observe(el);
    } else {
        observer.observe(el);
    }
});

const mobileGlowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('glow-active');
        } else {
            entry.target.classList.remove('glow-active');
        }
    });
}, mobileCenterOptions);

if (isMobile) {
    document.querySelectorAll('.stack-item, .project-card').forEach(el => {
        mobileGlowObserver.observe(el);
    });
}

// Efeito de digitação no Hero Section
const heroTyping = document.getElementById('hero-typing');
const words = ["arquitetura_backend_&_dados", "orquestração_de_apis_e_llms", "automação_de_alta_disponibilidade", "modelagem_relacional_(rls)", "controle_de_concorrência"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        heroTyping.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroTyping.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;

    if (isDeleting) {
        typeSpeed /= 2;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2500; // Tempo de pausa na palavra completa
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Inicia dps de um tempinho
setTimeout(typeEffect, 1500);

// Mouse Move Parallax sutil no background
document.addEventListener('mousemove', (e) => {
    const bgGlow = document.querySelector('.bg-glow');
    if (bgGlow) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        bgGlow.style.transform = `translate(-50%, -50%) translate(${x * -20}px, ${y * -20}px)`;
    }
});

// Particles.js Initialization (Data Flow / Node Background)
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 40,
                "density": { "enable": true, "value_area": 800 }
            },
            "color": { "value": "#00ff88" },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.2,
                "random": false,
            },
            "size": {
                "value": 3,
                "random": true,
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00e5ff",
                "opacity": 0.15,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 0.3 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}
