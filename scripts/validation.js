document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    // Функция для показа ошибки
    function showError(inputElement, message) {
        if (!inputElement) return;

        // Добавляем класс ошибки
        inputElement.classList.add('is-error');

        // Удаляем предыдущее сообщение об ошибке, если было
        const field = inputElement.closest('.field');
        const oldError = field?.querySelector('.error-message');
        if (oldError) oldError.remove();

        // Создаем новое сообщение
        const error = document.createElement('p');
        error.classList.add('error-message');
        error.textContent = message;

        if (field) {
            field.appendChild(error);
        }

        return false;
    }

    // Функция для показа ошибки у чекбокса
    function showCheckboxError(checkboxElement, message) {
        if (!checkboxElement) return false;

        const field = checkboxElement.closest('.field');
        if (field) {
            // Удаляем предыдущие ошибки
            field.querySelectorAll('.error-message').forEach(el => el.remove());

            const error = document.createElement('p');
            error.classList.add('error-message');
            error.textContent = message;
            field.appendChild(error);
        }

        return false;
    }

    // Функция очистки ошибок
    function clearErrors() {
        document.querySelectorAll('.input.is-error, .textarea.is-error, .select.is-error').forEach(el => {
            el.classList.remove('is-error');
        });
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    }

    // Функция валидации всей формы
    function validateForm() {
        // Очищаем предыдущие ошибки
        clearErrors();

        let isValid = true;
        const errors = [];

        // Получаем элементы формы
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const topicSelect = document.getElementById('topic');
        const messageInput = document.getElementById('message');
        const agreementCheckbox = document.getElementById('agreement');

        // Получаем значения
        const nameValue = nameInput ? nameInput.value.trim() : '';
        const emailValue = emailInput ? emailInput.value.trim() : '';
        const topicValue = topicSelect ? topicSelect.value : '';
        const messageValue = messageInput ? messageInput.value.trim() : '';
        const isAgreed = agreementCheckbox ? agreementCheckbox.checked : false;

        // 1. Валидация ФИО (не пустое, минимум 2 слова)
        if (nameValue === '') {
            showError(nameInput, 'Пожалуйста, введите ваше имя.');
            errors.push('ФИО: поле обязательно');
            isValid = false;
        } else {
            const words = nameValue.split(' ').filter(word => word.length > 0);
            if (words.length < 2) {
                showError(nameInput, 'Введите имя и фамилию (минимум 2 слова).');
                errors.push('ФИО: должно содержать минимум 2 слова');
                isValid = false;
            } else if (words.length > 5) {
                showError(nameInput, 'Слишком много слов. Введите имя, фамилию и отчество (максимум 5 слов).');
                errors.push('ФИО: слишком много слов');
                isValid = false;
            }
        }

        // 2. Валидация Email (обязательный, корректный формат)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === '') {
            showError(emailInput, 'Пожалуйста, введите ваш email.');
            errors.push('Email: поле обязательно');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(emailInput, 'Введите корректный email (например, name@domain.com).');
            errors.push('Email: некорректный формат');
            isValid = false;
        } else {
            // Дополнительная проверка на распространенные домены
            const validDomains = ['.ru', '.com', '.org', '.net', '.edu', '.gov', '.рф'];
            const hasValidDomain = validDomains.some(domain => emailValue.toLowerCase().includes(domain));
            if (!hasValidDomain) {
                showError(emailInput, 'Используйте корректный домен (.ru, .com, .org, и т.д.)');
                errors.push('Email: некорректный домен');
                isValid = false;
            }
        }

        // 3. Валидация темы (должна быть выбрана)
        if (!topicValue || topicValue === '') {
            showError(topicSelect, 'Пожалуйста, выберите тему сообщения.');
            errors.push('Тема: не выбрана');
            isValid = false;
        }

        // 4. Валидация сообщения (необязательное, но с проверкой длины)
        if (messageValue.length > 0) {
            if (messageValue.length < 10) {
                showError(messageInput, 'Сообщение должно содержать минимум 10 символов (сейчас ' + messageValue.length + ').');
                errors.push('Сообщение: слишком короткое');
                isValid = false;
            } else if (messageValue.length > 500) {
                showError(messageInput, 'Сообщение не должно превышать 500 символов (сейчас ' + messageValue.length + ').');
                errors.push('Сообщение: превышает лимит');
                isValid = false;
            }
        }

        // 5. Валидация согласия на обработку данных
        if (!isAgreed) {
            showCheckboxError(agreementCheckbox, 'Необходимо согласие на обработку персональных данных.');
            errors.push('Согласие: не отмечено');
            isValid = false;
        }

        // Логируем ошибки в консоль для отладки
        if (!isValid) {
            console.groupCollapsed('%c❌ Ошибки валидации формы', 'color: #ef4444; font-weight: bold;');
            errors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error}`);
            });
            console.groupEnd();
        }

        return isValid;
    }

    // Добавляем обработчики для очистки ошибок при вводе
    document.querySelectorAll('.input, .textarea, .select').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-error');
            const field = this.closest('.field');
            if (field) {
                field.querySelectorAll('.error-message').forEach(el => el.remove());
            }
        });

        // Добавляем валидацию при потере фокуса (blur)
        input.addEventListener('blur', function() {
            // Не показываем ошибки при пустом поле, если это сообщение (необязательное)
            if (this.id === 'message') return;

            const value = this.value.trim();
            if (this.id === 'name' && value !== '' && value.split(' ').filter(w => w.length > 0).length < 2) {
                showError(this, 'Введите имя и фамилию (минимум 2 слова).');
            } else if (this.id === 'email' && value !== '') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    showError(this, 'Введите корректный email.');
                }
            }
        });
    });

    // Обработчик для чекбокса
    const agreementCheckbox = document.getElementById('agreement');
    if (agreementCheckbox) {
        agreementCheckbox.addEventListener('change', function() {
            const field = this.closest('.field');
            if (field) {
                field.querySelectorAll('.error-message').forEach(el => el.remove());
            }
        });
    }

    // Обработчик для селекта темы
    const topicSelect = document.getElementById('topic');
    if (topicSelect) {
        topicSelect.addEventListener('change', function() {
            this.classList.remove('is-error');
            const field = this.closest('.field');
            if (field) {
                field.querySelectorAll('.error-message').forEach(el => el.remove());
            }
        });
    }

    // Основной обработчик отправки формы
    form.addEventListener('submit', function(event) {
        // ОСТАНАВЛИВАЕМ отправку формы
        event.preventDefault();

        // Запускаем ПОЛНУЮ валидацию ВСЕХ полей
        const isFormValid = validateForm();

        // Отправляем форму ТОЛЬКО если все поля валидны
        if (isFormValid) {
            // Получаем актуальные значения
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const topicSelect = document.getElementById('topic');
            const messageInput = document.getElementById('message');
            const agreementCheckbox = document.getElementById('agreement');

            // Формируем объект с данными
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                topic: topicSelect.value,
                message: messageInput.value.trim() || '(не заполнено)',
                agreement: agreementCheckbox.checked,
                timestamp: new Date().toLocaleString(),
                validationStatus: '✅ Все поля проверены и валидны'
            };

            // Создаем и диспатчим кастомное событие
            const validationSuccessEvent = new CustomEvent('formValid', {
                detail: formData
            });
            document.dispatchEvent(validationSuccessEvent);

            // Показываем сообщение об успехе
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                Форма успешно отправлена! Проверьте консоль (F12) для просмотра данных.
            `;

            // Вставляем сообщение после формы
            const formContainer = document.querySelector('.contact-form');
            if (formContainer) {
                // Удаляем предыдущее сообщение об успехе
                const oldSuccess = document.querySelector('.success-message');
                if (oldSuccess) oldSuccess.remove();

                formContainer.appendChild(successMessage);

                // Автоматически скрываем сообщение через 5 секунд
                setTimeout(() => {
                    if (successMessage.parentNode) {
                        successMessage.remove();
                    }
                }, 5000);
            }

            // Логируем успех в консоль
            console.log('%c✅ ФОРМА УСПЕШНО ВАЛИДИРОВАНА И ГОТОВА К ОТПРАВКЕ', 'color: #22c55e; font-size: 14px; font-weight: bold;');

            // Опционально: очищаем форму
            // form.reset();
        } else {
            // Показываем сообщение об ошибках
            console.log('%c❌ ФОРМА НЕ ПРОШЛА ВАЛИДАЦИЮ', 'color: #ef4444; font-size: 14px; font-weight: bold;');

            // Прокручиваем к первому полю с ошибкой
            const firstError = document.querySelector('.is-error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });

    // Добавляем обработчик на кнопку очистки
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', function(e) {
            // Очищаем все ошибки
            clearErrors();

            // Удаляем сообщение об успехе
            const successMessage = document.querySelector('.success-message');
            if (successMessage) {
                successMessage.remove();
            }

            console.log('%c🔄 Форма очищена', 'color: #a0a3bd;');
        });
    }

    console.log('%c📋 Валидация формы загружена и готова к работе', 'color: #14b8a6;');
});