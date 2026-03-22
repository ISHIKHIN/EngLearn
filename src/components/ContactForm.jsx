import React, { useState } from 'react'

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic: '',
        message: '',
        agreement: false
    })
    const [errors, setErrors] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const validateField = (name, value) => {
        switch(name) {
            case 'name':
                if (!value.trim()) return 'Пожалуйста, введите ваше имя.'
                const words = value.trim().split(' ').filter(w => w.length > 0)
                if (words.length < 2) return 'Введите имя и фамилию (минимум 2 слова).'
                if (words.length > 5) return 'Слишком много слов. Введите имя, фамилию и отчество (максимум 5 слов).'
                return ''
            case 'email':
                if (!value.trim()) return 'Пожалуйста, введите ваш email.'
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailPattern.test(value)) return 'Введите корректный email (например, name@domain.com).'
                return ''
            case 'topic':
                if (!value) return 'Пожалуйста, выберите тему сообщения.'
                return ''
            case 'message':
                if (value.length > 0 && value.length < 10) return 'Сообщение должно содержать минимум 10 символов.'
                if (value.length > 500) return 'Сообщение не должно превышать 500 символов.'
                return ''
            case 'agreement':
                if (!value) return 'Необходимо согласие на обработку персональных данных.'
                return ''
            default:
                return ''
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        const newValue = type === 'checkbox' ? checked : value
        setFormData(prev => ({ ...prev, [name]: newValue }))
        // Очищаем ошибку при изменении
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleBlur = (e) => {
        const { name, value, type, checked } = e.target
        const fieldValue = type === 'checkbox' ? checked : value
        const error = validateField(name, fieldValue)
        if (error) {
            setErrors(prev => ({ ...prev, [name]: error }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Валидация всех полей
        const newErrors = {}
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key])
            if (error) newErrors[key] = error
        })

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            console.log('%c❌ ФОРМА НЕ ПРОШЛА ВАЛИДАЦИЮ', 'color: #ef4444; font-weight: bold;')
            return
        }

        // Формируем данные для отправки
        const submitData = {
            ...formData,
            timestamp: new Date().toLocaleString(),
            validationStatus: '✅ Все поля проверены и валидны'
        }

        console.log('%c✅ ФОРМА УСПЕШНО ВАЛИДИРОВАНА', 'color: #22c55e; font-weight: bold;')
        console.log('Данные формы:', submitData)

        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 5000)

        // Очищаем форму
        setFormData({
            name: '',
            email: '',
            topic: '',
            message: '',
            agreement: false
        })
    }

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            topic: '',
            message: '',
            agreement: false
        })
        setErrors({})
        setIsSubmitted(false)
    }

    const topics = [
        { value: '', label: 'Выберите тему' },
        { value: 'Предложение', label: 'Предложение' },
        { value: 'Жалоба', label: 'Жалоба' },
        { value: 'Вопрос', label: 'Вопрос' },
        { value: 'Благодарность', label: 'Благодарность' },
        { value: 'Сотрудничество', label: 'Сотрудничество' }
    ]

    return (
        <div className="contact-page-section fade-in">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">Контакты и обратная связь</h1>
                    <p style={{ textAlign: 'center' }}>Заполните форму для отправки сообщения</p>
                </div>

                <div className="contact-grid">
                    <div className="contact-form">
                        <h3 style={{ marginTop: 0, marginBottom: '2rem' }}>Напишите нам</h3>

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="field">
                                <label className="label" htmlFor="name">
                                    ФИО <span style={{ color: 'var(--tag-adverb)' }}>*</span>
                                </label>
                                <div className="control has-icons-left" style={{ position: 'relative' }}>
                                    <input
                                        className={`input ${errors.name ? 'is-error' : ''}`}
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Иванов Иван Иванович"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <i className="fas fa-user" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                                </div>
                                {errors.name && <p className="error-message">{errors.name}</p>}
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="email">
                                    Email <span style={{ color: 'var(--tag-adverb)' }}>*</span>
                                </label>
                                <div className="control has-icons-left" style={{ position: 'relative' }}>
                                    <input
                                        className={`input ${errors.email ? 'is-error' : ''}`}
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="example@mail.ru"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <i className="fas fa-envelope" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                                </div>
                                {errors.email && <p className="error-message">{errors.email}</p>}
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="topic">
                                    Тема <span style={{ color: 'var(--tag-adverb)' }}>*</span>
                                </label>
                                <select
                                    className={`select ${errors.topic ? 'is-error' : ''}`}
                                    id="topic"
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {topics.map(topic => (
                                        <option key={topic.value} value={topic.value}>{topic.label}</option>
                                    ))}
                                </select>
                                {errors.topic && <p className="error-message">{errors.topic}</p>}
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="message">Сообщение</label>
                                <textarea
                                    className={`textarea ${errors.message ? 'is-error' : ''}`}
                                    id="message"
                                    name="message"
                                    placeholder="Текст сообщения..."
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></textarea>
                                {errors.message && <p className="error-message">{errors.message}</p>}
                                <p className="help-text" style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                    До 500 символов
                                </p>
                            </div>

                            <div className="field checkbox-field">
                                <label className="checkbox" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        name="agreement"
                                        checked={formData.agreement}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <span>Я согласен на обработку персональных данных <span style={{ color: 'var(--tag-adverb)' }}>*</span></span>
                                </label>
                                {errors.agreement && <p className="error-message">{errors.agreement}</p>}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button className="button button-primary" type="submit" style={{ flex: 1 }}>
                                    <i className="fas fa-paper-plane" style={{ marginRight: '0.5rem' }}></i>
                                    Отправить отзыв
                                </button>
                                <button className="button button-secondary" type="button" onClick={handleReset}>
                                    <i className="fas fa-undo" style={{ marginRight: '0.5rem' }}></i>
                                    Очистить
                                </button>
                            </div>
                        </form>

                        {isSubmitted && (
                            <div className="success-message">
                                <i className="fas fa-check-circle"></i> Форма успешно отправлена!
                            </div>
                        )}
                    </div>

                    <div className="contact-info">
                        <h3 style={{ marginTop: 0 }}>Наши контакты</h3>
                        <div style={{ marginBottom: '2rem' }}>
                            <p><i className="fas fa-phone"></i> 8 (800) 555-35-35</p>
                            <p><i className="fas fa-envelope"></i> info@englearn.ru</p>
                        </div>

                        <h4>Мы в соцсетях</h4>
                        <div className="social-links">
                            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-telegram fa-2x"></i></a>
                            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-vk fa-2x"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm