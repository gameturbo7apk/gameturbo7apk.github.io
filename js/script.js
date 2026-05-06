// ============================================================
// GAME TURBO 7.0 — script.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // =================== GLOBAL IMAGE FALLBACK ===================
    const fallbackSvg = "data:image/svg+xml;utf8," + encodeURIComponent(
        "<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>" +
        "<rect width='512' height='512' rx='96' fill='#1a1a2e'/>" +
        "<text x='50%' y='54%' text-anchor='middle' font-size='170' font-family='Segoe UI, Arial, sans-serif' fill='#E87304'>⚡</text>" +
        "</svg>"
    );

    document.querySelectorAll('img').forEach((img) => {
        img.addEventListener('error', () => {
            if (img.dataset.fallbackApplied === 'true') return;
            img.dataset.fallbackApplied = 'true';
            img.src = fallbackSvg;
            img.classList.add('image-fallback');
            if (!img.alt || !img.alt.trim()) {
                img.alt = 'Image unavailable';
            }
        }, { once: true });
    });

    // =================== LOADING SCREEN ===================
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('loaded');
        }, 2600);
    }

    // =================== HEADER SCROLL ===================
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 60);
        }
    }, { passive: true });

    // =================== NAV ACTIVE STATE ===================
    const navLinks  = document.querySelectorAll('nav .nav-link');
    const sections  = document.querySelectorAll('section[id]');

    function setActiveNav() {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav, { passive: true });
    setActiveNav();

    // =================== SMOOTH SCROLL ===================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerH = header ? header.offsetHeight : 76;
                const top = target.getBoundingClientRect().top + window.scrollY - headerH;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // =================== MOBILE MENU ===================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav          = document.getElementById('mainNav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            const open = mainNav.classList.toggle('mobile-nav-open');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.className = open ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        // Close on link click
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('mobile-nav-open');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    // =================== PHONE MOCKUP — BOOST ANIMATION ===================
    window.triggerBoostAnimation = function(btn) {
        btn.classList.add('boosting');
        btn.textContent = '✅ BOOSTED!';
        setTimeout(() => {
            btn.classList.remove('boosting');
            btn.innerHTML = '<i class="fas fa-rocket"></i> BOOST NOW';
        }, 2000);

        // Animate FPS counter
        const fpsEl = document.getElementById('fpsCounter');
        if (fpsEl) {
            let fps = 42;
            const target = 60 + Math.floor(Math.random() * 5);
            const interval = setInterval(() => {
                fps = Math.min(fps + 2, target);
                fpsEl.textContent = fps;
                if (fps >= target) clearInterval(interval);
            }, 60);
        }

        // Animate Ping counter
        const pingEl = document.getElementById('pingCounter');
        if (pingEl) {
            let ping = 80;
            const target = 28 + Math.floor(Math.random() * 12);
            const interval = setInterval(() => {
                ping = Math.max(ping - 3, target);
                pingEl.textContent = ping;
                if (ping <= target) clearInterval(interval);
            }, 60);
        }
    };

    // =================== GAMES CAROUSEL ===================
    const gamesData = [
        { name: 'PUBG Mobile',          genre: 'Battle Royale',   emoji: '🔫', color: '#c0392b', image: 'images/games/PUBG Mobile.png' },
        { name: 'COD Mobile',           genre: 'FPS Shooter',     emoji: '💥', color: '#2c3e50', image: 'images/games/COD Mobile.jpg' },
        { name: 'Free Fire',            genre: 'Battle Royale',   emoji: '🔥', color: '#e67e22', image: 'images/games/free-fire.png' },
        { name: 'Genshin Impact',       genre: 'Open World RPG',  emoji: '⚔️', color: '#2980b9', image: 'images/games/Genshin Impact.png' },
        { name: 'Mobile Legends',       genre: 'MOBA',            emoji: '🏆', color: '#8e44ad', image: 'images/games/Mobile Legends.jpg' },
        { name: 'Honkai: Star Rail',    genre: 'Turn-based RPG',  emoji: '🌟', color: '#16a085', image: 'images/games/Honkai Star Rail.jpg' },
        { name: 'Clash of Clans',       genre: 'Strategy',        emoji: '⚡', color: '#f39c12', image: 'images/games/Clash of Clans.jpg' },
        { name: 'Arena of Valor',       genre: 'MOBA',            emoji: '🗡️', color: '#d35400', image: 'images/games/Arena of Valor.png' },
        { name: 'Minecraft',            genre: 'Sandbox',         emoji: '⛏️', color: '#27ae60', image: 'images/games/Minecraft.png' },
    ];

    const carouselContainer = document.getElementById('gamesCarousel');
    if (carouselContainer) {
        gamesData.forEach(game => {
            const card = document.createElement('article');
            card.classList.add('game-card');
            const imageContent = game.image
                ? `<img src="${game.image}" alt="${game.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.outerHTML='<div class=&quot;game-image-placeholder&quot;>${game.emoji}</div>';">`
                : `<div class="game-image-placeholder">${game.emoji}</div>`;
            card.innerHTML = `
                <div class="game-image" style="background:linear-gradient(135deg,${game.color}22,${game.color}44)">
                    ${imageContent}
                </div>
                <div class="game-info">
                    <h3>${game.name}</h3>
                    <p>${game.genre}</p>
                    <div class="game-turbo-badge"><i class="fas fa-bolt"></i> Optimized</div>
                </div>`;
            carouselContainer.appendChild(card);
        });
    }

    // Carousel navigation
    const prevBtn      = document.querySelector('.carousel-control.prev');
    const nextBtn      = document.querySelector('.carousel-control.next');

    const getScrollAmt = () => {
        if (window.innerWidth <= 576) return 175;
        if (window.innerWidth <= 768) return 215;
        return 230;
    };

    if (nextBtn && carouselContainer) {
        nextBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({ left: getScrollAmt(), behavior: 'smooth' });
        });
    }
    if (prevBtn && carouselContainer) {
        prevBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({ left: -getScrollAmt(), behavior: 'smooth' });
        });
    }

    // Touch swipe for carousel
    if (carouselContainer) {
        let touchStartX = 0;
        carouselContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        carouselContainer.addEventListener('touchend', e => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diff) > 40) {
                carouselContainer.scrollBy({ left: diff > 0 ? -getScrollAmt() : getScrollAmt(), behavior: 'smooth' });
            }
        }, { passive: true });
    }

    // =================== FAQ ACCORDION ===================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all others
            faqItems.forEach(i => {
                i.classList.remove('open');
                const q = i.querySelector('.faq-question');
                if (q) q.setAttribute('aria-expanded', 'false');
            });
            // Toggle current
            if (!isOpen) {
                item.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // =================== DOWNLOAD MODAL ===================
    const downloadModal  = document.getElementById('download-modal');
    const closeModalBtn  = document.getElementById('closeModal');
    const startDownload  = document.getElementById('start-download');
    const progressBar    = document.getElementById('downloadProgress');
    const statusText     = document.getElementById('downloadStatus');
    const downloadBtns   = document.querySelectorAll('.download-btn');

    const DOWNLOAD_URL = 'https://dm.1024tera.com/sharing/link?surl=xDTPUBT0B3TonubUjiJaXA&clearCache=1';

    function openModal() {
        if (downloadModal) {
            downloadModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            resetModal();
        }
    }

    function closeModal() {
        if (downloadModal) {
            downloadModal.classList.remove('show');
            document.body.style.overflow = '';
            resetModal();
        }
    }

    function resetModal() {
        if (progressBar) progressBar.style.width = '0%';
        if (statusText)  statusText.textContent = 'Preparing download...';
        if (startDownload) {
            startDownload.disabled = false;
            startDownload.innerHTML = '<i class="fas fa-download"></i> Start Download';
        }
    }

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeModalBtn) { closeModalBtn.addEventListener('click', closeModal); }

    if (downloadModal) {
        downloadModal.addEventListener('click', e => {
            if (e.target === downloadModal) closeModal();
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && downloadModal && downloadModal.classList.contains('show')) {
            closeModal();
        }
    });

    if (startDownload) {
        startDownload.addEventListener('click', () => {
            startDownload.disabled = true;
            startDownload.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 12;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    if (progressBar) progressBar.style.width = '100%';
                    if (statusText)  statusText.textContent = 'Download complete! Redirecting…';
                    if (startDownload) startDownload.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                    setTimeout(() => {
                        window.location.href = DOWNLOAD_URL;
                    }, 1200);
                } else {
                    if (progressBar) progressBar.style.width = `${progress}%`;
                    if (statusText)  statusText.textContent = `Downloading… ${Math.round(progress)}%`;
                }
            }, 220);
        });
    }

    // =================== SCROLL REVEAL (lightweight) ===================
    if ('IntersectionObserver' in window) {
        const revealTargets = document.querySelectorAll(
            '.feature-card, .why-card, .review-card, .faq-item, .step, .download-card-main, .system-requirements'
        );

        revealTargets.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity  = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealTargets.forEach(el => observer.observe(el));
    }

});
