import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function LessonsPage() {
    const [selectedLesson, setSelectedLesson] = useState(null)

    const lessons = [
        {
            id: 1,
            title: 'Урок 1: Приветствие',
            description: 'Научитесь здороваться, представляться и вести простые диалоги.',
            duration: '15 мин',
            level: 'Начинающий',
            topics: ['Hello', 'Goodbye', 'Introductions', 'Basic phrases'],
            icon: 'fas fa-hand-peace'
        },
        {
            id: 2,
            title: 'Урок 2: Семья',
            description: 'Изучите слова по теме "Семья" и научитесь рассказывать о родственниках.',
            duration: '20 мин',
            level: 'Начинающий',
            topics: ['Mother', 'Father', 'Brother', 'Sister', 'Family tree'],
            icon: 'fas fa-users'
        },
        {
            id: 3,
            title: 'Урок 3: Еда и напитки',
            description: 'Выучите названия продуктов, научитесь заказывать еду в ресторане.',
            duration: '25 мин',
            level: 'Средний',
            topics: ['Fruits', 'Vegetables', 'Drinks', 'Ordering food'],
            icon: 'fas fa-utensils'
        },
        {
            id: 4,
            title: 'Урок 4: Путешествия',
            description: 'Подготовьтесь к поездке: аэропорт, отель, ориентирование в городе.',
            duration: '30 мин',
            level: 'Средний',
            topics: ['Airport', 'Hotel', 'Directions', 'Transportation'],
            icon: 'fas fa-plane'
        },
        {
            id: 5,
            title: 'Урок 5: Работа и карьера',
            description: 'Деловая лексика, составление резюме, прохождение собеседования.',
            duration: '35 мин',
            level: 'Продвинутый',
            topics: ['Job interview', 'CV', 'Office vocabulary', 'Business meetings'],
            icon: 'fas fa-briefcase'
        },
        {
            id: 6,
            title: 'Урок 6: Здоровье',
            description: 'Медицинская лексика, визит к врачу, описание симптомов.',
            duration: '25 мин',
            level: 'Средний',
            topics: ['Doctor visit', 'Symptoms', 'Medicine', 'Healthy lifestyle'],
            icon: 'fas fa-heartbeat'
        }
    ]

    const startLesson = (lessonId) => {
        setSelectedLesson(lessonId)
        // Здесь будет логика начала урока
        alert(`Урок ${lessonId} будет доступен в следующем обновлении!`)
    }

    const getLevelColor = (level) => {
        switch(level) {
            case 'Начинающий':
                return '#22c55e'
            case 'Средний':
                return '#f97316'
            case 'Продвинутый':
                return '#ef4444'
            default:
                return 'var(--primary)'
        }
    }

    return (
        <div className="lessons-section fade-in">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">Интерактивные уроки английского</h1>
                </div>


                <div className="features-grid">
                    {lessons.map(lesson => (
                        <div key={lesson.id} className="feature-card" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                background: getLevelColor(lesson.level),
                                padding: '0.25rem 1rem',
                                borderRadius: '0 24px 0 24px',
                                fontSize: '0.75rem',
                                color: 'white',
                                fontWeight: 'bold'
                            }}>
                                {lesson.level}
                            </div>

                            <i className={lesson.icon} style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
                            <h3 style={{ marginBottom: '0.5rem' }}>{lesson.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                {lesson.description}
                            </p>

                            <div style={{ marginBottom: '1rem' }}>
                                <span style={{
                                    display: 'inline-block',
                                    background: 'var(--surface-soft)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem',
                                    marginRight: '0.5rem'
                                }}>
                                    <i className="fas fa-clock"></i> {lesson.duration}
                                </span>
                                <span style={{
                                    display: 'inline-block',
                                    background: 'var(--surface-soft)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem'
                                }}>
                                    <i className="fas fa-book"></i> {lesson.topics.length} тем
                                </span>
                            </div>

                            <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {lesson.topics.slice(0, 3).map(topic => (
                                    <span key={topic} style={{
                                        fontSize: '0.7rem',
                                        background: 'rgba(20, 184, 166, 0.1)',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '8px',
                                        color: 'var(--primary)'
                                    }}>
                                        {topic}
                                    </span>
                                ))}
                                {lesson.topics.length > 3 && (
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                        +{lesson.topics.length - 3}
                                    </span>
                                )}
                            </div>

                            <button
                                className="button button-primary"
                                onClick={() => startLesson(lesson.id)}
                                style={{ marginTop: 'auto', width: '100%' }}
                            >
                                <i className="fas fa-play" style={{ marginRight: '0.5rem' }}></i>
                                Начать урок
                            </button>
                        </div>
                    ))}
                </div>

                {/* Дополнительная информация */}
                <div className="notification">
                    <p><i className="fas fa-info-circle"></i> Уроки будут постепенно пополняться.</p>
                </div>
            </div>

            {/* Стили для статистики */}
            <style>{`
                .stats-grid {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                    flex-wrap: wrap;
                }
                
                .stat-card {
                    text-align: center;
                    padding: 1.5rem;
                    background: var(--surface);
                    border-radius: 24px;
                    min-width: 150px;
                    border: 1px solid light-dark(rgba(0,0,0,0.05), rgba(255,255,255,0.05));
                }
                
                .stat-number {
                    font-size: 2.5rem;
                    font-weight: bold;
                    background: linear-gradient(135deg, var(--primary), var(--accent));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .stat-label {
                    color: var(--text-muted);
                    margin-top: 0.5rem;
                }
            `}</style>
        </div>
    )
}

export default LessonsPage