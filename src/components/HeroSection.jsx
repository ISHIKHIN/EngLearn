import React from 'react'

function HeroSection() {
    return (
        <section className="hero-section fade-in">
            <div className="container">
                <div className="hero-flex-container">
                    <div className="hero-image">
                        <img
                            src="/EngLearn/images/friend.jpg"
                            alt="Друзья учат английский"
                            loading="lazy"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"%3E%3Cpath d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"%3E%3C/path%3E%3Ccircle cx="12" cy="12" r="3"%3E%3C/circle%3E%3C/svg%3E';
                            }}
                        />
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