// main.js
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');
    const header = document.querySelector('.site-header');
    let headerHeight = header ? header.offsetHeight : 0;

    // Функция для обновления высоты хедера
    function updateHeaderHeight() {
        headerHeight = header ? header.offsetHeight : 0;
        document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
    }

    // Обновляем высоту при загрузке и изменении размера окна
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    // Функция открытия/закрытия меню
    function toggleMenu(force) {
        const isActive = navMenu.classList.contains('active');

        navMenu.classList.toggle('active', force);
        menuToggle.classList.toggle('active', force);
        overlay.classList.toggle('active', force);

        if (force || !isActive) {
            document.body.classList.add('menu-open');
            // При открытии меню делаем хедер фиксированным
            header.style.position = 'fixed';
        } else {
            document.body.classList.remove('menu-open');
            // При закрытии возвращаем sticky
            header.style.position = 'sticky';
        }
    }

    // Обработчик для бургер-меню
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });
    }

    // Закрытие меню при клике на оверлей
    if (overlay) {
        overlay.addEventListener('click', function() {
            toggleMenu(false);
        });
    }

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                toggleMenu(false);
            }
        });
    });

    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu(false);
        }
    });

    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
            toggleMenu(false);
        }
        updateHeaderHeight();
    });

    // Подсветка активной ссылки
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Функции для карточек (flashcards)
    window.flipCard = function(card) {
        card.classList.toggle('flipped');
    };

    // Инициализация карточек
    document.querySelectorAll('.flashcard').forEach(card => {
        card.addEventListener('click', function() {
            flipCard(this);
        });
    });

    // Функция для фильтрации карточек
    window.filterCards = function(category) {
        const cards = document.querySelectorAll('.flashcard-wrapper');
        const filterBtns = document.querySelectorAll('.filter-btn');

        filterBtns.forEach(btn => {
            if (btn.dataset.filter === category) {
                btn.classList.add('button-primary');
            } else {
                btn.classList.remove('button-primary');
            }
        });

        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Функция для переворота всех карточек
    window.flipAllCards = function() {
        document.querySelectorAll('.flashcard').forEach(card => {
            card.classList.add('flipped');
        });
    };

    // Функция для сброса всех карточек
    window.resetAllCards = function() {
        document.querySelectorAll('.flashcard').forEach(card => {
            card.classList.remove('flipped');
        });
    };

    // Функция для перемешивания карточек
    window.shuffleCards = function() {
        const container = document.getElementById('flashcardsContainer');
        if (!container) return;

        const cards = Array.from(container.children);
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            container.insertBefore(cards[j], cards[i]);
        }
    };

    // Поиск по карточкам
    window.searchCards = function() {
        const searchTerm = document.getElementById('cardSearch')?.value.toLowerCase() || '';
        const cards = document.querySelectorAll('.flashcard-wrapper');

        cards.forEach(card => {
            const frontText = card.querySelector('.front .title')?.textContent.toLowerCase() || '';
            if (frontText.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    window.resetCardSearch = function() {
        const searchInput = document.getElementById('cardSearch');
        if (searchInput) {
            searchInput.value = '';
            searchCards();
        }
    };

    // Функции для вкладок словаря
    window.switchTab = function(tabName) {
        // Деактивируем все вкладки
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Активируем нужную вкладку
        const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(
            btn => btn.textContent.toLowerCase().includes(tabName === 'common' ? 'обычные' :
                tabName === 'intuitive' ? 'интуитивно' : 'глаголы')
        );
        if (activeBtn) activeBtn.classList.add('active');

        // Показываем нужную секцию
        document.querySelectorAll('.vocabulary-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(tabName + '-section').classList.add('active');
    };

    // Функции для поиска в таблицах
    window.searchInSection = function(section) {
        const searchInput = document.getElementById(section + 'Search');
        const table = document.getElementById(section + 'Table');
        if (!searchInput || !table) return;

        const searchTerm = searchInput.value.toLowerCase();
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    };

    window.resetSearch = function(section) {
        const searchInput = document.getElementById(section + 'Search');
        if (searchInput) {
            searchInput.value = '';
            searchInSection(section);
        }
    };

    // Функции для авторизации
    window.switchAuthTab = function(tab) {
        document.querySelectorAll('.auth-tab').forEach(t => {
            t.classList.remove('active');
        });
        document.querySelectorAll('.auth-form').forEach(f => {
            f.classList.remove('active');
        });

        const activeTab = Array.from(document.querySelectorAll('.auth-tab')).find(
            t => t.textContent.toLowerCase().includes(tab === 'login' ? 'вход' : 'регистрация')
        );
        if (activeTab) activeTab.classList.add('active');

        document.getElementById(tab + '-form').classList.add('active');
    };

    window.handleLogin = function(e) {
        e.preventDefault();
        alert('Функция входа будет доступна после подключения бэкенда');
    };

    window.handleRegister = function(e) {
        e.preventDefault();
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;

        if (password !== confirm) {
            alert('Пароли не совпадают!');
            return false;
        }

        alert('Функция регистрации будет доступна после подключения бэкенда');
    };

    // Обработка формы обратной связи
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за обратную связь! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
});