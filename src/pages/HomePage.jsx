import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'

function HomePage() {
    return (
        <div className="home-page">
            <HeroSection />
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Наши возможности</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <i className="fas fa-layer-group"></i>
                            <h3>Умные карточки</h3>
                            <p>Слова, перевод и их употребление в разговоре.</p>
                            <Link to="/flashcards" className="button button-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                                Попробовать
                            </Link>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-book-open"></i>
                            <h3>Интерактивные уроки</h3>
                            <p>Множество бесплатных материалов для изучения.</p>
                            <Link to="/materials" className="button button-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                                Изучать
                            </Link>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-file-alt"></i>
                            <h3>Разделы словарей</h3>
                            <p>Для разного восприятия и заучивания слов.</p>
                            <Link to="/vocabulary" className="button button-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                                Смотреть
                            </Link>
                        </div>
                    </div>
                    <div className="action-buttons" style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <Link to="/flashcards" className="button button-primary">
                            Начать обучение
                        </Link>
                        <Link to="/materials" className="button button-secondary">
                            Узнать больше
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage