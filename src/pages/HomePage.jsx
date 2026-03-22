import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'  // Добавьте импорт

function HomePage() {
    return (
        <>
            <main>
                <section className="page-header">
                    <div className="container">
                        <h1 className="section-title">Учите английский с удовольствием</h1>
                    </div>
                </section>

                {/* Используйте компонент HeroSection вместо дублирования кода */}
                <HeroSection />

                <section className="page-header">
                    <div className="container">
                        <h2 className="section-title">Начнем обучение?</h2>
                        <div className="action-buttons">
                            <Link to="/vocabulary" className="button button-secondary action-btn">
                                Словарь
                            </Link>
                            <Link to="/flashcards" className="button button-secondary action-btn">
                                Карточки
                            </Link>
                            <Link to="/lessons" className="button button-secondary action-btn">
                                Уроки
                            </Link>
                            <Link to="/materials" className="button button-secondary action-btn">
                                Материалы
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default HomePage