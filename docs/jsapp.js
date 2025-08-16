// Ripplab Music Application JavaScript

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const progressFill = document.querySelector('.progress-fill');
const ctaButton = document.querySelector('.cta-button');
const themeToggleBtn = document.querySelector('.theme-toggle');

// Sample Music Data
const musicData = [
    {
        title: "Ocean Waves",
        artist: "Nature Sounds",
        cover: "assets/album-cover.jpg"
    },
    {
        title: "Midnight Jazz",
        artist: "Smooth Vibes",
        cover: "assets/album-cover.jpg"
    },
    {
        title: "Sunset Melody",
        artist: "Chill Beats",
        cover: "assets/album-cover.jpg"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let currentTime = 0;
let duration = 100;

// Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Music Player Controls
if (playBtn) {
    playBtn.addEventListener('click', togglePlay);
}

if (prevBtn) {
    prevBtn.addEventListener('click', playPrevious);
}

if (nextBtn) {
    nextBtn.addEventListener('click', playNext);
}

// Play/Pause Toggle
function togglePlay() {
    isPlaying = !isPlaying;
    const icon = playBtn.querySelector('i');
    
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        startProgress();
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        stopProgress();
    }
}

// Play Previous Track
function playPrevious() {
    currentTrackIndex = (currentTrackIndex - 1 + musicData.length) % musicData.length;
    updateTrackInfo();
    resetProgress();
}

// Play Next Track
function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % musicData.length;
    updateTrackInfo();
    resetProgress();
}

// Update Track Information
function updateTrackInfo() {
    const trackTitle = document.querySelector('.track-title');
    const trackArtist = document.querySelector('.track-artist');
    
    if (trackTitle && trackArtist) {
        trackTitle.textContent = musicData[currentTrackIndex].title;
        trackArtist.textContent = musicData[currentTrackIndex].artist;
    }
}

// Progress Bar Animation
let progressInterval;

function startProgress() {
    progressInterval = setInterval(() => {
        currentTime += 1;
        if (currentTime >= duration) {
            currentTime = 0;
            playNext();
        }
        updateProgressBar();
    }, 1000);
}

function stopProgress() {
    clearInterval(progressInterval);
}

function resetProgress() {
    currentTime = 0;
    updateProgressBar();
}

function updateProgressBar() {
    if (progressFill) {
        const progress = (currentTime / duration) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

// CTA Button Animation
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Smooth scroll to music section
        const musicSection = document.querySelector('#music');
        if (musicSection) {
            musicSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Add click animation
        ctaButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            ctaButton.style.transform = 'scale(1)';
        }, 150);
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.playlist-card, .player-container, .about-content').forEach(el => {
    observer.observe(el);
});

// Add CSS animation classes
const style = document.createElement('style');
style.textContent = `
    .playlist-card, .player-container, .about-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 1rem;
        box-shadow: var(--shadow);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Wave Animation Enhancement
function enhanceWaveAnimation() {
    const waves = document.querySelectorAll('.wave');
    waves.forEach((wave, index) => {
        wave.addEventListener('mouseenter', () => {
            wave.style.borderColor = 'var(--accent-blue)';
            wave.style.transform = 'translate(-50%, -50%) scale(1.2)';
        });
        
        wave.addEventListener('mouseleave', () => {
            wave.style.borderColor = 'var(--light-blue)';
            wave.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Initialize Wave Animation Enhancement
document.addEventListener('DOMContentLoaded', () => {
    enhanceWaveAnimation();
    updateTrackInfo();
    initializeTheme();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add loading animation CSS
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .wave {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(loadingStyle);

// Playlist Card Interactions
document.querySelectorAll('.playlist-card').forEach(card => {
    card.addEventListener('click', () => {
        // Add click effect
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
        
        // Simulate playlist opening
        console.log('Opening playlist:', card.querySelector('.playlist-name').textContent);
    });
});

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            togglePlay();
            break;
        case 'ArrowLeft':
            playPrevious();
            break;
        case 'ArrowRight':
            playNext();
            break;
    }
});

// Console Welcome Message
console.log(`
🎵 Ripplab Music Application 🎵
🌊 Welcome to the wave of music! 🌊
🚀 Built with modern web technologies
✨ Enjoy the smooth animations and beautiful design
`);

// THEME: Dark/Light toggle support
function updateLogosForTheme(theme) {
    const headerLogo = document.querySelector('.header .logo-img');
    const footerLogo = document.querySelector('.footer .logo-img');
    if (!headerLogo || !footerLogo) return;
    if (theme === 'dark') {
        headerLogo.src = 'assets/logo-030818.png';
        footerLogo.src = 'assets/logo-030818.png';
    } else {
        headerLogo.src = 'assets/logo-ffffff.png';
        footerLogo.src = 'assets/logo-030818.png';
    }
}

function applyTheme(theme) {
    const isDarkMode = theme === 'dark';
    const isLightMode = theme === 'light';
    document.body.classList.toggle('theme-dark', isDarkMode);
    document.body.classList.toggle('theme-light', isLightMode);

    const icon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    if (icon) {
        icon.classList.toggle('fa-moon', isLightMode);
        icon.classList.toggle('fa-sun', isDarkMode);
    }

    try {
        localStorage.setItem('theme', theme);
    } catch (_) {}

    updateLogosForTheme(theme);
}

function initializeTheme() {
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('theme');
    } catch (_) {
        savedTheme = null;
    }

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeToApply = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(themeToApply);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
        applyTheme(nextTheme);
    });
}