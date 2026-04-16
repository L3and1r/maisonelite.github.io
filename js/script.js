document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const heroBg = document.querySelector('.hero-bg');

    // 1. Кастомный курсор (только для десктопа)
    if (window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        });
    }

    // 2. Параллакс для фона Hero
    window.addEventListener('scroll', () => {
        let scroll = window.pageYOffset;
        if (heroBg) {
            heroBg.style.transform = `scale(${1.1 + scroll * 0.0003}) translateY(${scroll * 0.1}px)`;
        }
    });

    // 3. Анимация появления при скролле
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        // Добавляем начальные стили через JS, если их нет в CSS
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        
        // Создаем класс для видимого состояния
        const style = document.createElement('style');
        style.innerHTML = `.is-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
        document.head.appendChild(style);

        observer.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Переключение меню
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Блокировка скролла при открытом меню
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Закрытие при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});