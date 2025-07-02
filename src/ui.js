const pages = document.querySelectorAll('.page');
const allNavLinks = document.querySelectorAll('a[data-page], button[data-page]');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
let vantaEffect = null; 


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.1 });




/**
 * 
 * @param {string} pageId 
 */
const showPage = (pageId = 'home') => {
    
    if (vantaEffect) {
        vantaEffect.destroy();
        vantaEffect = null;
    }

    
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0); 

        
        targetPage.querySelectorAll('.reveal').forEach((el) => {
            el.classList.remove('visible'); 
            observer.observe(el); 
        });


        if (pageId === 'home' && typeof VANTA !== 'undefined') {
            vantaEffect = VANTA.GLOBE({
                el: "#globe-container",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x2563eb,
                color2: 0x93c5fd,
                backgroundColor: 0x02040a,
                size: 1.20
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

/**
 * Tüm arayüz etkileşimlerini başlatan ana fonksiyon.
 * Bu fonksiyon main.js'den çağrılır.
 */
export const initUI = () => {
    allNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            showPage(link.dataset.page);
        });
    });

    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('menu-open');
        });
    }

    
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (scrollToTopButton) {
      scrollToTopButton.addEventListener('click', () => { 
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
      });
      window.addEventListener('scroll', () => {
        scrollToTopButton.classList.toggle('is-visible', window.scrollY > 400);
      });
    }

    // SSS 
    const faqAccordion = document.getElementById('faq-accordion');
    if (faqAccordion) {
        const faqItems = faqAccordion.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const questionButton = item.querySelector('.faq-question');
            questionButton.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

               
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

 
    const contactForm = document.getElementById('contact-form');
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


    showPage('home');
};
