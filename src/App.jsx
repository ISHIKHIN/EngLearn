import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import FlashcardsPage from './pages/FlashcardsPage'
import VocabularyPage from './pages/VocabularyPage'
import MaterialsPage from './pages/MaterialsPage'
import FAQPage from './pages/FAQPage'
import ContactsPage from './pages/ContactsPage'
import LoginPage from './pages/LoginPage'

function App() {
    const location = useLocation()

    // Определяем активную страницу на основе текущего пути
    const getCurrentPage = () => {
        const path = location.pathname
        if (path === '/' || path === '/home') return 'home'
        if (path === '/flashcards') return 'flashcards'
        if (path === '/vocabulary') return 'vocabulary'
        if (path === '/materials') return 'materials'
        if (path === '/faq') return 'faq'
        if (path === '/contacts') return 'contacts'
        if (path === '/login') return 'login'
        return 'home'
    }

    return (
        <div className="app">
            <Header currentPage={getCurrentPage()} />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/flashcards" element={<FlashcardsPage />} />
                    <Route path="/vocabulary" element={<VocabularyPage />} />
                    <Route path="/materials" element={<MaterialsPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App