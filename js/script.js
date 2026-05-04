document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const heroBg = document.querySelector('.hero-bg');
    const modal = document.getElementById('modal-overlay');
    const openBtn = document.getElementById('open-modal');
    const closeBtn = document.getElementById('modal-close');
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 1. УПРАВЛЕНИЕ КУРСОРМ (только для десктопа)
    if (window.innerWidth > 992 && cursor) {
        document.addEventListener('mousemove', (e) => {
            // Используем translate3d для плавности и производительности
            cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        });

        // Эффект увеличения при наведении на интерактивные элементы
        const interactiveElements = document.querySelectorAll('a, button, .nav-link, .brand-item, .checkbox-wrapper label');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-active'));
        });
    }

    // 2. МОДАЛЬНОЕ ОКНО
    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Блокировка скролла
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // 3. БУРГЕР МЕНЮ
    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 4. ПАРАЛЛАКС И ЭФФЕКТЫ СКРОЛЛА
    window.addEventListener('scroll', () => {
        let scroll = window.pageYOffset;
        if (heroBg) {
            heroBg.style.transform = `scale(${1.1 + scroll * 0.0003}) translateY(${scroll * 0.1}px)`;
        }
    });

    // 5. АНИМАЦИЯ ПОЯВЛЕНИЯ (Intersection Observer)
    const observerOptions = { threshold: 0.15 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Инициализация анимаций для элементов .fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Добавляем стиль для активного состояния анимации в HEAD
    if (!document.getElementById('fade-in-styles')) {
        const style = document.createElement('style');
        style.id = 'fade-in-styles';
        style.innerHTML = `.is-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
        document.head.appendChild(style);
    }
});