// ===== Бургер-меню =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    const header = document.querySelector('.site-header');

    // Проверяем существование элементов
    if (!menuToggle || !navMenu || !overlay) return;

    // Функция открытия меню
    function openMenu() {
        menuToggle.classList.add('active');
        navMenu.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
    }

    // Функция закрытия меню
    function closeMenu() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Обработчик клика по бургеру
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Закрытие по клику на оверлей
    overlay.addEventListener('click', closeMenu);

    // Закрытие по клику на ссылки в меню
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Закрытие по нажатию Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Запрет прокрутки при открытом меню (дополнительная защита)
    window.addEventListener('scroll', function() {
        if (navMenu.classList.contains('active')) {
            window.scrollTo(0, 0);
        }
    });

    // Убираем мигание при загрузке
    setTimeout(() => {
        document.body.style.transition = 'none';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 100);
    }, 100);
});

// ===== Подсветка активной ссылки в навигации =====
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a, .footer-nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===== Переключение вкладок в словаре =====
function switchTab(tabName) {
    // Скрываем все секции
    const sections = document.querySelectorAll('.vocabulary-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Показываем выбранную секцию
    const activeSection = document.getElementById(tabName + '-section');
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Обновляем классы у кнопок
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('onclick')?.includes(tabName)) {
            tab.classList.add('active');
        }
    });
}

// ===== Поиск по таблицам =====
function searchInSection(sectionId) {
    const input = document.getElementById(sectionId + 'Search');
    if (!input) return;

    const searchTerm = input.value.toLowerCase().trim();
    const table = document.getElementById(sectionId + 'Table');
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm) || searchTerm === '') {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function resetSearch(sectionId) {
    const input = document.getElementById(sectionId + 'Search');
    if (input) {
        input.value = '';
        searchInSection(sectionId);
    }
}

// ===== Поиск по карточкам =====
function searchCards() {
    const searchInput = document.getElementById('cardSearch');
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.flashcard-wrapper');

    cards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(searchTerm) || searchTerm === '') {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function resetCardSearch() {
    const searchInput = document.getElementById('cardSearch');
    if (searchInput) {
        searchInput.value = '';
        searchCards();
    }
}

// ===== Фильтрация карточек =====
function filterCards(category) {
    const cards = document.querySelectorAll('.flashcard-wrapper');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Обновляем классы кнопок
    filterBtns.forEach(btn => {
        btn.classList.remove('button-primary');
        if (btn.dataset.filter === category) {
            btn.classList.add('button-primary');
        }
    });

    // Фильтруем карточки
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== Переворот карточек =====
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация переворота карточек
    const flashcards = document.querySelectorAll('.flashcard');

    flashcards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Предотвращаем всплытие, чтобы не переворачивать при клике на кнопки
            if (e.target.closest('button')) return;
            this.classList.toggle('flipped');
        });
    });
});

function flipAllCards() {
    const cards = document.querySelectorAll('.flashcard');
    cards.forEach(card => {
        card.classList.add('flipped');
    });
}

function resetAllCards() {
    const cards = document.querySelectorAll('.flashcard');
    cards.forEach(card => {
        card.classList.remove('flipped');
    });
}

function shuffleCards() {
    const container = document.getElementById('flashcardsContainer');
    if (!container) return;

    const cards = Array.from(container.children);

    // Перемешиваем массив
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    // Очищаем контейнер и добавляем перемешанные карточки
    container.innerHTML = '';
    cards.forEach(card => {
        container.appendChild(card);
    });
}

// ===== Переключение вкладок авторизации =====
function switchAuthTab(tabName) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabs = document.querySelectorAll('.auth-tab');

    if (tabName === 'login') {
        loginForm?.classList.add('active');
        registerForm?.classList.remove('active');
        tabs[0]?.classList.add('active');
        tabs[1]?.classList.remove('active');
    } else {
        loginForm?.classList.remove('active');
        registerForm?.classList.add('active');
        tabs[0]?.classList.remove('active');
        tabs[1]?.classList.add('active');
    }
}

// ===== Обработка форм =====
function handleLogin(event) {
    event.preventDefault();
    alert('Демо-режим: вход в систему');
}

function handleRegister(event) {
    event.preventDefault();

    const password = document.getElementById('register-password')?.value;
    const confirm = document.getElementById('register-confirm')?.value;

    if (password !== confirm) {
        alert('Пароли не совпадают!');
        return;
    }

    alert('Демо-режим: регистрация прошла успешно');
}

// ===== Анимации при скролле =====
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== Обработка отправки формы обратной связи =====
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за обратную связь! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
});

// ===== Делаем функции глобальными =====
window.switchTab = switchTab;
window.searchInSection = searchInSection;
window.resetSearch = resetSearch;
window.searchCards = searchCards;
window.resetCardSearch = resetCardSearch;
window.filterCards = filterCards;
window.flipAllCards = flipAllCards;
window.resetAllCards = resetAllCards;
window.shuffleCards = shuffleCards;
window.switchAuthTab = switchAuthTab;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;