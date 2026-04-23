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
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Opcional: observer.unobserve(entry.target); para animar apenas 1 vez.
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Efeito de digitação no Hero Section
const heroTyping = document.getElementById('hero-typing');
const words = ["Onde Engenharia Encontra a IA.", "Desenvolvimento Web Ágil.", "A Nova Era da Automação.", "Lógica, Dados e Resultados."];
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
