// Update footer year automatically
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Create floating shapes background
        function createShapes() {
            const shapesContainer = document.getElementById('shapes');
            const shapeCount = 15;

            for (let i = 0; i < shapeCount; i++) {
                const shape = document.createElement('div');
                shape.className = 'shape';
                
                const size = Math.random() * 60 + 20;
                shape.style.width = size + 'px';
                shape.style.height = size + 'px';
                shape.style.left = Math.random() * 100 + '%';
                shape.style.animationDelay = Math.random() * 20 + 's';
                shape.style.animationDuration = (Math.random() * 10 + 15) + 's';
                
                shapesContainer.appendChild(shape);
            }
        }

        // Smooth scrolling function
        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }

        // Add scroll animations
        function addScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                observer.observe(section);
            });
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            createShapes();
            addScrollAnimations();
        });

        // Add parallax effect on scroll
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = (index % 3 + 1) * 0.3;
                shape.style.transform += ` translateY(${scrolled * speed}px)`;
            });
        });