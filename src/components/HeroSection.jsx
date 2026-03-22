import React from 'react'
import { Link } from 'react-router-dom'

function HeroSection() {
    return (
        <section className="hero-section fade-in">
            <div className="container">
                <div className="hero-flex-container">
                    <div className="hero-image">
                        <img src="../images/friend.jpg" alt="Друзья учат английский" loading="lazy" />
                    </div>
                    <div className="hero-cards-container">
                        <div className="hero-card">
                            <i className="fas fa-layer-group"></i>
                            <div className="hero-card-content">
                                <h3>Умные карточки</h3>
                                <p>Слова, перевод и их употребление в разговоре.</p>
                            </div>
                        </div>
                        <div className="hero-card">
                            <i className="fas fa-book-open"></i>
                            <div className="hero-card-content">
                                <h3>Интерактивные уроки</h3>
                                <p>Множество бесплатных материалов для изучения.</p>
                            </div>
                        </div>
                        <div className="hero-card">
                            <i className="fas fa-file-alt"></i>
                            <div className="hero-card-content">
                                <h3>Разделы словарей</h3>
                                <p>Для разного восприятия и заучивания слов.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection