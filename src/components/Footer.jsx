import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = [
        { path: '/', label: 'Главная' },
        { path: '/flashcards', label: 'Карточки' },
        { path: '/vocabulary', label: 'Словарь' },
        { path: '/materials', label: 'Материалы' },
        { path: '/lessons', label: 'Уроки' },
        { path: '/faq', label: 'FAQ' },
        { path: '/contacts', label: 'Контакты' },
        { path: '/login', label: 'Войти' }
    ]

    return (
        <footer className="site-footer">
            <div className="container footer-content">
                <p>© {currentYear} EngLearn. Все права защищены.</p>
                <nav className="footer-nav">
                    {footerLinks.map(link => (
                        <Link key={link.path} to={link.path}>
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    )
}

export default Footer