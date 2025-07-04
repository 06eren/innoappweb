const pages = document.querySelectorAll('.page');
const allNavLinks = document.querySelectorAll('a[data-page], button[data-page]');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const scrollToTopButton = document.getElementById('scroll-to-top');
const contactForm = document.getElementById('contact-form');
let vantaEffect = null;
let adminChart = null; 


const initRevealOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });
};


const initProjectSlider = () => {
    const prevButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");
    const slider = document.querySelector(".project-slider");

    if (!slider || !prevButton || !nextButton) return;

    const slide = (direction) => {
        const slideWidth = slider.querySelector('.slider-item').clientWidth;
        slider.scrollBy({ left: slideWidth * direction, behavior: "smooth" });
    };

    prevButton.addEventListener("click", () => slide(-1));
    nextButton.addEventListener("click", () => slide(1));

    const handleSlideButtons = () => {
        prevButton.disabled = slider.scrollLeft <= 0;
        nextButton.disabled = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth;
    };

    slider.addEventListener("scroll", handleSlideButtons);
    handleSlideButtons(); 
};


const initPricingToggle = () => {
    const checkbox = document.getElementById('pricing-checkbox');
    if (!checkbox) return;

    const monthlyLabel = document.getElementById('monthly-label');
    const annualLabel = document.getElementById('annual-label');
    const priceTags = document.querySelectorAll('.price-tag');
    const periodTags = document.querySelectorAll('.period-tag');

    checkbox.addEventListener('change', () => {
        const isAnnual = checkbox.checked;

        
        monthlyLabel.classList.toggle('text-gray-500', isAnnual);
        annualLabel.classList.toggle('text-gray-500', !isAnnual);

        
        priceTags.forEach(priceTag => {
            if (priceTag.dataset.monthly && priceTag.dataset.annual) {
                const newPrice = isAnnual ? priceTag.dataset.annual : priceTag.dataset.monthly;
                
                
                priceTag.style.opacity = '0';
                setTimeout(() => {
                    priceTag.textContent = `₺${newPrice}`;
                    priceTag.style.opacity = '1';
                }, 200);
            }
        });

        periodTags.forEach(periodTag => {
            if(periodTag.textContent.trim() !== '') { // Sadece dolu olanları değiştir
                 periodTag.textContent = isAnnual ? '/yıllık' : '/aylık';
            }
        });
    });
};


const init3dCardTilt = () => {
    const cards = document.querySelectorAll('.feature-card-final');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15; 
            const rotateY = (centerX - x) / 15; 

            card.style.transition = 'transform 0.1s linear'; 
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(.21,.6,.35,1)'; 
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
};


const initAdminPanelChart = () => {
    const ctx = document.getElementById('financial-chart');
    if (!ctx) return;

    if (adminChart) {
        adminChart.destroy();
    }

    const data = {
        labels: ['Aidat Gelirleri', 'Dış Cephe Gideri', 'Personel Maaşları', 'Diğer Giderler'],
        datasets: [{
            label: 'Bu Ayki Finansal Dağılım',
            data: [12500, 5000, 3500, 1500],
            backgroundColor: [
                'rgba(59, 130, 246, 0.7)',
                'rgba(239, 68, 68, 0.7)',
                'rgba(245, 158, 11, 0.7)',
                'rgba(139, 92, 246, 0.7)'
            ],
            borderColor: [
                '#3b82f6',
                '#ef4444',
                '#f59e0b',
                '#8b5cf6'
            ],
            borderWidth: 2,
            hoverOffset: 8
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#d1d5db',
                    font: { size: 14 }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(context.parsed);
                        }
                        return label;
                    }
                }
            }
        }
    };

    adminChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options,
    });
};


const initSupportImageUpload = () => {
    const imageInput = document.getElementById('troubleshoot-image');
    const previewContainer = document.getElementById('image-preview-container');
    const previewImage = document.getElementById('image-preview');
    const removeButton = document.getElementById('remove-image-btn');
    const attachButton = document.querySelector('.support-attach-btn');

    if (!imageInput || !previewContainer || !previewImage || !removeButton || !attachButton) return;

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewContainer.classList.remove('hidden');
                attachButton.classList.add('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    removeButton.addEventListener('click', () => {
        imageInput.value = ''; // Dosya seçimini temizle
        previewImage.src = '';
        previewContainer.classList.add('hidden');
        attachButton.classList.remove('hidden');
    });
};

/**

 * @param {string} navId i
 * @param {string} sectionClass 
 */
const initLegalPageNav = (navId, sectionClass) => {
    const navLinks = document.querySelectorAll(`#${navId} a`);
    const sections = document.querySelectorAll(`.${sectionClass}`);

    if (navLinks.length === 0 || sections.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href').substring(1) === entry.target.id);
                });
            }
        });
    }, { rootMargin: "-40% 0px -60% 0px" });

    sections.forEach(section => observer.observe(section));

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
};



const initMobileMenu = () => {
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('menu-open');
        });
    }
};


const initScrollToTop = () => {
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        window.addEventListener('scroll', () => {
            scrollToTopButton.classList.toggle('is-visible', window.scrollY > 400);
        });
    }
};


const initContactForm = () => {
    if (contactForm) {
        const successMessage = document.getElementById('contact-success-message');
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            contactForm.classList.add('hidden');
            if (successMessage) {
                successMessage.classList.remove('hidden');
            }
        });
    }
};




/**
 * 
 * @param {string} pageId - 
 */
const showPage = (pageId = 'home') => {
    if (vantaEffect) {
        vantaEffect.destroy();
        vantaEffect = null;
    }
    if (adminChart) {
        adminChart.destroy();
        adminChart = null;
    }

    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);

        targetPage.querySelectorAll('.reveal').forEach((el) => {
            el.classList.remove('visible');
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    entries[0].target.classList.add('visible');
                    observer.disconnect();
                }
            }, { threshold: 0.1 });
            observer.observe(el);
        });

        if (pageId === 'panel') {
            initAdminPanelChart();
        }

        if (pageId === 'terms') {
            initLegalPageNav('terms-nav', 'terms-section');
        }
        
        if (pageId === 'privacy') {
            initLegalPageNav('privacy-nav', 'privacy-section');
        }

        if (pageId === 'home' && typeof VANTA !== 'undefined') {
            vantaEffect = VANTA.GLOBE({
                el: "#globe-container", mouseControls: true, touchControls: true, gyroControls: false,
                minHeight: 200.00, minWidth: 200.00, scale: 1.00, scaleMobile: 1.00,
                color: 0x2563eb, color2: 0x93c5fd, backgroundColor: 0x02040a, size: 1.20
            });
        }
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });

    if (mobileMenu) {
       mobileMenu.classList.remove('menu-open');
    }
};



export const initUI = () => {
    allNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            showPage(link.dataset.page);
        });
    });

    
    initMobileMenu();
    initScrollToTop();
    initContactForm();
    initProjectSlider();
    initPricingToggle();
    init3dCardTilt();
    initSupportImageUpload(); 
    
    
    initRevealOnScroll();
    
    
    showPage('home');
};
