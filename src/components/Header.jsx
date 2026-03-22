import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Закрываем меню при изменении маршрута
    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    const navItems = [
        { path: '/', label: 'Главная', icon: 'fas fa-home' },
        { path: '/flashcards', label: 'Карточки', icon: 'fas fa-layer-group' },
        { path: '/vocabulary', label: 'Словарь', icon: 'fas fa-book' },
        { path: '/materials', label: 'Материалы', icon: 'fas fa-graduation-cap' },
        { path: '/lessons', label: 'Уроки', icon: 'fas fa-chalkboard-user' },
        { path: '/faq', label: 'FAQ', icon: 'fas fa-question-circle' },
        { path: '/contacts', label: 'Контакты', icon: 'fas fa-envelope' },
        { path: '/login', label: 'Войти', icon: 'fas fa-user' }
    ]

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true
        if (path !== '/' && location.pathname.startsWith(path)) return true
        return false
    }

    return (
        <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="container nav-bar">
                <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
                    EngLearn
                </Link>
                <button
                    className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Меню"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {navItems.map(item => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={isActive(item.path) ? 'active' : ''}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <i className={item.icon} style={{ marginRight: '0.5rem' }}></i>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={`overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
        </header>
    )
}

export default Header