import React, { useState } from 'react'

const faqItems = [
    {
        id: 1,
        question: 'Как начать пользоваться сервисом?',
        answer: 'Зарегистрируйтесь на сайте, подтвердите email и начните пользоваться сервисом. Все функции доступны сразу после регистрации.'
    },
    {
        id: 2,
        question: 'Как работают карточки для запоминания?',
        answer: 'Изучаете иностранное слово, читаете пример, переворачиваете карточку и смотрите перевод этого слова.'
    },
    {
        id: 3,
        question: 'Как отслеживать свой прогресс?',
        answer: 'В личном кабинете доступна подробная статистика: изученные слова, пройденные уроки, достижения.'
    },
    {
        id: 4,
        question: 'Можно ли использовать сервис бесплатно?',
        answer: 'Да, все основные функции доступны бесплатно. Дополнительные материалы и продвинутые функции могут быть доступны по подписке.'
    },
    {
        id: 5,
        question: 'Как добавить свои слова в словарь?',
        answer: 'В разделе "Карточки" есть возможность добавлять собственные карточки с новыми словами.'
    }
]

function FAQItem({ item, isOpen, onToggle }) {
    return (
        <details className="accordion-item" open={isOpen}>
            <summary className="accordion-header" onClick={onToggle}>
                {item.question}
            </summary>
            <div className="accordion-body">{item.answer}</div>
        </details>
    )
}

function FAQPage() {
    const [openId, setOpenId] = useState(1)

    const toggleItem = (id) => {
        setOpenId(openId === id ? null : id)
    }

    return (
        <div className="faq-section fade-in">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">Часто задаваемые вопросы</h1>
                </div>

                <div className="accordion">
                    {faqItems.map(item => (
                        <FAQItem
                            key={item.id}
                            item={item}
                            isOpen={openId === item.id}
                            onToggle={() => toggleItem(item.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQPage