/* ==========================================
   JAVASCRIPT - PORTFOLIO MAIN FILE
   ========================================== */

/* ==========================================
   TIME UTILITIES
   ========================================== */

// Updates the real-time clock in the footer
function updateSystemTime() {
    const timeEl = document.getElementById('current-time');
    if (!timeEl) return;

    const update = () => {
        const now = new Date();
        const formatted = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeEl.textContent = formatted;
    };

    update();
    setInterval(update, 1000);
}

// Sets the "last login" timestamp in the hero section
function setLastLogin() {
    const el = document.getElementById('last-login');
    if (!el) return;

    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    el.textContent = formatted;
}

/* ==========================================
   PROJECT DATA
   ========================================== */

// Array of project objects for dynamic rendering
const projects = [
    {
        title: 'Police Surveillance & Case Intelligence Dashboard',
        description: 'Scam-tracking system built with Python, using MS Excel as a database for intelligence logging.',
        tools: ['Python', 'MS Excel', 'Pandas'],
        category: 'Cybersecurity & Intelligence'
    },
    {
        title: 'Home Motion & Radar Intrusion System',
        description: 'Arduino-based hardware security featuring motion sensors and radar-based detection.',
        tools: ['Arduino', 'C++', 'Radar Sensors', 'PIR'],
        category: 'Cybersecurity & Intelligence'
    },
    {
        title: 'UPNG MSCS Student Info System',
        description: 'Robust MySQL-driven student database architecture for university records management.',
        tools: ['MySQL', 'PHP', 'HTML/CSS'],
        category: 'Enterprise Software & Databases'
    },
    {
        title: 'Health DBMS',
        description: 'Healthcare management system using MS Access SQL and Visual Basic for data operations.',
        tools: ['MS Access', 'VBA', 'SQL'],
        category: 'Enterprise Software & Databases'
    },
    {
        title: 'Banking GUI System',
        description: 'Desktop application for transaction management including withdrawals and deposits with MySQL backend.',
        tools: ['Java', 'MySQL', 'Swing GUI'],
        category: 'Enterprise Software & Databases'
    },
    {
        title: 'Car Rental Platform',
        description: 'Fully functional web application for vehicle management and booking systems.',
        tools: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        category: 'Web & Full-Stack'
    },
    {
        title: 'CMS Blog Engine',
        description: 'Full-stack CRUD website for content management with admin dashboard.',
        tools: ['Node.js', 'Express', 'MongoDB', 'EJS'],
        category: 'Web & Full-Stack'
    },
    {
        title: 'WAN Simulation (3 Provinces)',
        description: 'Cisco Packet Tracer configuration of a Wide Area Network across three PNG provinces.',
        tools: ['Cisco Packet Tracer', 'Networking', 'WAN'],
        category: 'Infrastructure & Geospatial'
    },
    {
        title: 'Geospatial Reef Mapping',
        description: 'Using QGIS to survey and map local reefs in Daru, Western Province.',
        tools: ['QGIS', 'GPS', 'Geospatial Analysis'],
        category: 'Infrastructure & Geospatial'
    }
];

/* ==========================================
   PROJECT RENDERING
   ========================================== */

// Renders project cards dynamically to the DOM
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('article');
        card.className = 'border border-slate-800 bg-slate-900/30 hover:bg-slate-900/50 hover:border-green-500 hover:scale-105 transition-all duration-300';
        card.innerHTML = `
            <div class="p-4 border-b border-slate-800">
                <span class="text-[10px] text-green-400/60 uppercase tracking-wider">${project.category}</span>
            </div>
            <div class="p-4">
                <h3 class="text-sm font-semibold text-slate-200 mb-2 leading-tight">${project.title}</h3>
                <p class="text-slate-500 text-xs mb-3 leading-relaxed">${project.description}</p>
                <div class="flex flex-wrap gap-1.5">
                    ${project.tools.map(tool => `<span class="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-400">${tool}</span>`).join('')}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ==========================================
   MOBILE MENU
   ========================================== */

// Toggles mobile navigation menu
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}

/* ==========================================
   CONTACT FORM
   ========================================== */

// Handles contact form submission
function handleContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span class="animate-pulse">sending_</span>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<span>✓ message_sent</span>';
            btn.classList.remove('bg-emerald-400/10', 'border-emerald-400/30', 'text-emerald-400');
            btn.classList.add('bg-emerald-400/20', 'text-emerald-400');
            form.reset();

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.classList.add('bg-emerald-400/10', 'border-emerald-400/30', 'text-emerald-400');
                btn.classList.remove('bg-emerald-400/20');
            }, 2500);
        }, 1500);
    });
}

/* ==========================================
   SMOOTH SCROLL
   ========================================== */

// Enables smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ==========================================
   SCROLL REVEAL ANIMATIONS
   ========================================== */

// Observes elements and adds reveal class when visible
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ==========================================
   APPLICATION INITIALIZATION
   ========================================== */

// Master initialization function
export function initApp() {
    setLastLogin();
    updateSystemTime();
    renderProjects();
    initMobileMenu();
    handleContactForm();
    initSmoothScroll();
    initScrollReveal();
}
