// scripts/main.js

// ===== Общие функции =====
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop();
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===== Функции для страницы словаря (vocabulary.html) =====
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('.vocabulary-section').forEach(section => {
        section.classList.remove('active');
    });

    let sectionId = '';
    switch(tabName) {
        case 'common': sectionId = 'common-section'; break;
        case 'intuitive': sectionId = 'intuitive-section'; break;
        case 'verbs': sectionId = 'verbs-section'; break;
    }
    document.getElementById(sectionId).classList.add('active');
}

function searchInSection(section) {
    const searchTerm = document.getElementById(section + 'Search').value.toLowerCase();

    if (section === 'common') {
        document.querySelectorAll('#commonTable tbody tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(searchTerm) ? '' : 'none';
        });
    } else if (section === 'intuitive') {
        document.querySelectorAll('#intuitiveTable tbody tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(searchTerm) ? '' : 'none';
        });
    } else if (section === 'verbs') {
        document.querySelectorAll('#verbs-section .vocabulary-table tbody tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(searchTerm) ? '' : 'none';
        });
    }
}

function resetSearch(section) {
    document.getElementById(section + 'Search').value = '';
    if (section === 'common') {
        document.querySelectorAll('#commonTable tbody tr').forEach(row => row.style.display = '');
    } else if (section === 'intuitive') {
        document.querySelectorAll('#intuitiveTable tbody tr').forEach(row => row.style.display = '');
    } else if (section === 'verbs') {
        document.querySelectorAll('#verbs-section .vocabulary-table tbody tr').forEach(row => row.style.display = '');
    }
}

// ===== Функции для страницы карточек (flashcards.html) =====
function initFlashcards() {
    document.querySelectorAll('.flashcard').forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('flipped');
        });
    });
}

function searchCards() {
    const searchTerm = document.getElementById('cardSearch').value.toLowerCase();
    document.querySelectorAll('.flashcard-wrapper').forEach(wrapper => {
        const frontText = wrapper.querySelector('.front .title').textContent.toLowerCase();
        wrapper.style.display = frontText.includes(searchTerm) ? 'block' : 'none';
    });
}

function resetCardSearch() {
    document.getElementById('cardSearch').value = '';
    document.querySelectorAll('.flashcard-wrapper').forEach(w => w.style.display = 'block');
    filterCards('all');
}

function filterCards(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('button-primary'));
    document.querySelector(`.filter-btn[data-filter="${category}"]`).classList.add('button-primary');

    document.querySelectorAll('.flashcard-wrapper').forEach(wrapper => {
        wrapper.style.display = (category === 'all' || wrapper.dataset.category === category) ? 'block' : 'none';
    });
    document.getElementById('cardSearch').value = '';
}

function flipAllCards() {
    document.querySelectorAll('.flashcard').forEach(card => card.classList.add('flipped'));
}

function resetAllCards() {
    document.querySelectorAll('.flashcard').forEach(card => card.classList.remove('flipped'));
}

function shuffleCards() {
    const container = document.getElementById('flashcardsContainer');
    const cards = Array.from(container.children);
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        container.appendChild(cards[j]);
    }
}

// ===== Инициализация при загрузке страницы =====
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем активную ссылку в навигации
    setActiveNavLink();

    // Инициализация для страницы карточек
    if (document.querySelector('.flashcards-section')) {
        initFlashcards();

        // Устанавливаем обработчики для поиска по Enter
        const cardSearch = document.getElementById('cardSearch');
        if (cardSearch) {
            cardSearch.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') searchCards();
            });
        }

        // Устанавливаем фильтр "Все" по умолчанию
        filterCards('all');
    }

    // Инициализация для страницы словаря
    if (document.querySelector('.vocabulary-tabs')) {
        // Устанавливаем обработчики для поиска по Enter
        const commonSearch = document.getElementById('commonSearch');
        if (commonSearch) {
            commonSearch.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') searchInSection('common');
            });
        }

        const intuitiveSearch = document.getElementById('intuitiveSearch');
        if (intuitiveSearch) {
            intuitiveSearch.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') searchInSection('intuitive');
            });
        }

        const verbsSearch = document.getElementById('verbsSearch');
        if (verbsSearch) {
            verbsSearch.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') searchInSection('verbs');
            });
        }
    }

    // Инициализация для контактной формы
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.onsubmit = function(e) {
            e.preventDefault();
            alert('Спасибо! Ваше сообщение отправлено (демо-режим).');
        };
    }

    // Инициализация для уроков
    document.querySelectorAll('.feature-card .button-primary').forEach(button => {
        if (button.closest('.lessons-section')) {
            button.onclick = function() {
                alert('Урок запущен! (демо-режим)');
            };
        }
    });
});