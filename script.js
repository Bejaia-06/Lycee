    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#f0f9ff',
                            100: '#e0f2fe',
                            200: '#bae6fd',
                            300: '#7dd3fc',
                            400: '#38bdf8',
                            500: '#0ea5e9',
                            600: '#0284c7',
                            700: '#0369a1',
                            800: '#075985',
                            900: '#0c4a6e',
                        },
                        secondary: {
                            50: '#f8fafc',
                            100: '#f1f5f9',
                            200: '#e2e8f0',
                            300: '#cbd5e1',
                            400: '#94a3b8',
                            500: '#64748b',
                            600: '#475569',
                            700: '#334155',
                            800: '#1e293b',
                            900: '#0f172a',
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        heading: ['Montserrat', 'sans-serif'],
                    },
                    animation: {
                        'fade-in': 'fadeIn 0.5s ease-in-out',
                        'slide-up': 'slideUp 0.5s ease-out',
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' },
                        }
                    }
                }
            }
        }
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
<!-- Firebase SDKs (compat) -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
  <script>
    // Config Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyCdJSSt92W9zT4HeECq9vV6NMW97ONTxcw",
      authDomain: "lycee-be595.firebaseapp.com",
      projectId: "lycee-be595",
      storageBucket: "lycee-be595.appspot.com",
      messagingSenderId: "711125923660",
      appId: "1:711125923660:web:86b20d9c10524f4fca81e9",
      measurementId: "G-Z7CZ6P0JDT"
    };
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    function toggleForms() {
      const reg = document.getElementById("registerForm");
      const log = document.getElementById("loginForm");
      reg.style.display = reg.style.display === "none" ? "block" : "none";
      log.style.display = log.style.display === "none" ? "block" : "none";
    }

    function registerUser() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const prenom = document.getElementById("prenom").value;

      const response = grecaptcha.getResponse();
      if (!response) return alert("Veuillez valider le reCAPTCHA.");

      auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => userCredential.user.updateProfile({ displayName: prenom }))
        .then(() => alert("Inscription réussie !"))
        .catch(error => alert("Erreur : " + error.message));
    }

    function loginUser() {
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const response = grecaptcha.getResponse();
      if (!response) return alert("Veuillez valider le reCAPTCHA.");

      auth.signInWithEmailAndPassword(email, password)
        .then(() => alert("Connexion réussie !"))
        .catch(error => alert("Erreur : " + error.message));
    }

    auth.onAuthStateChanged(user => {
      if (user) {
        document.getElementById("authOverlay").style.display = "none";
      } else {
        document.getElementById("authOverlay").style.display = "flex";
      }
    });
  </script>
      <script>
        // Dark mode toggle
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        
        function toggleTheme() {
            if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
        
        themeToggle.addEventListener('click', toggleTheme);
        themeToggleMobile.addEventListener('click', toggleTheme);
        
        // Set initial theme based on localStorage or preference
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const isOpen = mobileMenu.classList.contains('open');
            mobileMenuButton.setAttribute('aria-expanded', isOpen);
            mobileMenuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenuButton.setAttribute('aria-label', 'Open menu');
            });
        });
        
        // Back to top button
        const backToTopButton = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (mobileMenu.classList.contains('open')) {
                        mobileMenu.classList.remove('open');
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                        mobileMenuButton.setAttribute('aria-label', 'Open menu');
                    }
                }
            });
        });

        // Système de recherche pour les professeurs
        document.getElementById('teacherSearch').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#teachersTable tbody tr');
            
            rows.forEach(row => {
                const name = row.cells[0].textContent.toLowerCase();
                const subject = row.cells[1].textContent.toLowerCase();
                const day = row.cells[2].textContent.toLowerCase();
                const time = row.cells[3].textContent.toLowerCase();
                
                if (name.includes(searchTerm) || 
                    subject.includes(searchTerm) || 
                    day.includes(searchTerm) || 
                    time.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        // Animation on scroll
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        function checkScroll() {
            animateElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        }
        
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);
        
        // Set delay for each animated element
        animateElements.forEach((element, index) => {
            const delay = element.dataset.delay || 0;
            element.style.transitionDelay = `${delay}ms`;
        });
    </script>
