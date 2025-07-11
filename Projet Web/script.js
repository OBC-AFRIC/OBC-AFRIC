function showAlert() {
  alert("Pour vous inscrire, appelez le ‪+228 90 03 53 05‬ ou rendez-vous à OBC Afric !");
}

document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.slide');
            const controlBtns = document.querySelectorAll('.control-btn');
            const indicators = document.querySelectorAll('.indicator');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            const timerBar = document.querySelector('.timer-bar');
            
            let currentSlide = 0;
            let slideInterval;
            let timerInterval;
            const slideDuration = 3000; // 3 secondes
            
            // Précharger les images
            function preloadImages() {
                slides.forEach(slide => {
                    const img = slide.querySelector('img');
                    if (img) {
                        const imgSrc = img.src;
                        new Image().src = imgSrc;
                    }
                });
            }
            
            // Initialisation du carrousel
            function initCarousel() {
                preloadImages();
                startSlideShow();
                updateTimerBar();
            }
            
            // Afficher un slide spécifique
            function showSlide(index) {
                // Réinitialiser toutes les slides
                slides.forEach(slide => slide.classList.remove('active'));
                controlBtns.forEach(btn => btn.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                // Afficher la slide demandée
                slides[index].classList.add('active');
                controlBtns[index].classList.add('active');
                indicators[index].classList.add('active');
                
                currentSlide = index;
                resetTimerBar();
            }
            
            // Slide suivant
            function nextSlide() {
                let nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            }
            
            // Slide précédent
            function prevSlide() {
                let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(prevIndex);
            }
            
            // Démarrer le défilement automatique
            function startSlideShow() {
                slideInterval = setInterval(nextSlide, slideDuration);
            }
            
            // Arrêter le défilement automatique
            function stopSlideShow() {
                clearInterval(slideInterval);
                clearInterval(timerInterval);
            }
            
            // Mise à jour de la barre de progression du timer
            function updateTimerBar() {
                let width = 0;
                timerBar.style.width = '0';
                
                timerInterval = setInterval(() => {
                    if (width >= 100) {
                        width = 0;
                    } else {
                        width += 0.5;
                        timerBar.style.width = width + '%';
                    }
                }, slideDuration / 200);
            }
            
            // Réinitialiser la barre de timer
            function resetTimerBar() {
                clearInterval(timerInterval);
                updateTimerBar();
            }
            
            // Événements
            nextBtn.addEventListener('click', () => {
                stopSlideShow();
                nextSlide();
                startSlideShow();
            });
            
            prevBtn.addEventListener('click', () => {
                stopSlideShow();
                prevSlide();
                startSlideShow();
            });
            
            // Navigation avec les boutons de contrôle
            controlBtns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    stopSlideShow();
                    showSlide(index);
                    startSlideShow();
                });
            });
            
            // Navigation avec les indicateurs
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    stopSlideShow();
                    showSlide(index);
                    startSlideShow();
                });
            });
            
            // Arrêter le défilement automatique quand la souris survole le carrousel
            const carousel = document.querySelector('.carousel');
            carousel.addEventListener('mouseenter', stopSlideShow);
            carousel.addEventListener('mouseleave', startSlideShow);
            
            // Démarrer le carrousel
            initCarousel();
        });