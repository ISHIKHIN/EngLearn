document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        // Получаем данные из события
        const formData = event.detail;

        // Очищаем консоль для наглядности
        console.clear();

        // Красивое форматирование вывода
        console.log('%c═══════════════════════════════════════════════════════════════════', 'color: #14b8a6; font-size: 14px;');
        console.log('%c               ✅ ФОРМА ПРОШЛА ПОЛНУЮ ВАЛИДАЦИЮ ✅               ', 'color: #14b8a6; font-size: 16px; font-weight: bold; background: #f0fdfa; padding: 8px; border-radius: 8px;');
        console.log('%c═══════════════════════════════════════════════════════════════════', 'color: #14b8a6; font-size: 14px;');

        console.log('%c📋 ДАННЫЕ ФОРМЫ (все поля проверены):', 'color: #06b6d4; font-weight: bold; font-size: 14px;');
        console.log('─────────────────────────────────────────────────');

        // Основные данные
        console.groupCollapsed('%c👤 Персональные данные', 'color: #14b8a6;');
        console.log('   ФИО:', formData.name);
        console.log('   Email:', formData.email);
        console.groupEnd();

        console.groupCollapsed('%c💬 Содержание сообщения', 'color: #14b8a6;');
        console.log('   Тема:', formData.topic);
        console.log('   Сообщение:', formData.message);
        console.groupEnd();

        console.groupCollapsed('%c⚙️ Дополнительная информация', 'color: #14b8a6;');
        console.log('   ✅ Согласие на обработку:', formData.agreement ? 'Да' : 'Нет');
        console.log('   🕐 Время отправки:', formData.timestamp);
        console.log('   🔍 Статус валидации:', formData.validationStatus || '✅ Все поля проверены');
        console.groupEnd();

        console.log('─────────────────────────────────────────────────');
        console.log('%c📤 ОТПРАВКА ДАННЫХ НА СЕРВЕР...', 'color: #22c55e; font-weight: bold;');

        // Симуляция отправки на сервер
        setTimeout(() => {
            console.log('%c✅ Данные успешно отправлены на сервер', 'color: #22c55e;');
            console.log('%c📦 Пакет данных:', 'color: #a0a3bd;', formData);

            console.log('%c═══════════════════════════════════════════════════════════════════', 'color: #14b8a6; font-size: 14px;');
            console.log('%c                    🎉 ГОТОВО К ДАЛЬНЕЙШЕЙ ОБРАБОТКЕ 🎉            ', 'color: #14b8a6; font-size: 14px; font-weight: bold;');
            console.log('%c═══════════════════════════════════════════════════════════════════', 'color: #14b8a6; font-size: 14px;');
        }, 500);

        // Дополнительная информация для отладки
        console.groupCollapsed('%c🔧 Техническая информация (для разработчиков)', 'color: #a0a3bd;');
        console.log('   Объект данных:', formData);
        console.log('   Тип события:', event.type);
        console.log('   Временная метка:', Date.now());
        console.groupEnd();
    });

    // Приветственное сообщение
    console.log('%c═══════════════════════════════════════════════════════════════════', 'color: #14b8a6;');
    console.log('%c              📋 ConsoleLogger загружен и готов к работе              ', 'color: #14b8a6; font-size: 14px; font-weight: bold;');
    console.log('%c═══════════════════════════════════════════════════════════════════', 'color: #14b8a6;');
});