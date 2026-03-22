import React, { useState } from 'react'

// Начальные данные карточек
const initialCards = [
    { id: 1, word: 'Apple', translation: 'Яблоко', transcription: '/ˈæp.əl/', category: 'noun', example: 'I eat an apple every day.' },
    { id: 2, word: 'Book', translation: 'Книга', transcription: '/bʊk/', category: 'noun', example: 'This book is interesting.' },
    { id: 3, word: 'House', translation: 'Дом', transcription: '/haʊs/', category: 'noun', example: 'My house is big.' },
    { id: 4, word: 'Learn', translation: 'Учить', transcription: '/lɜːrn/', category: 'verb', example: 'I learn English.' },
    { id: 5, word: 'Run', translation: 'Бежать', transcription: '/rʌn/', category: 'verb', example: 'I run every morning.' },
    { id: 6, word: 'Happy', translation: 'Счастливый', transcription: '/ˈhæp.i/', category: 'adjective', example: 'I am happy today.' },
    { id: 7, word: 'Beautiful', translation: 'Красивый', transcription: '/ˈbjuː.tɪ.fəl/', category: 'adjective', example: 'The flowers are beautiful.' },
    { id: 8, word: 'Quickly', translation: 'Быстро', transcription: '/ˈkwɪk.li/', category: 'adverb', example: 'He runs quickly.' }
]

// Компонент одной карточки
function Flashcard({ card, isFlipped, onFlip }) {
    return (
        <div className="flashcard-wrapper">
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
                <div className="front">
                    <p className="title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{card.word}</p>
                    <p style={{ color: 'var(--text-muted)' }}>{card.transcription}</p>
                    <span className={`tag tag-${card.category}`}>
            {card.category === 'noun' && 'Существительное'}
                        {card.category === 'verb' && 'Глагол'}
                        {card.category === 'adjective' && 'Прилагательное'}
                        {card.category === 'adverb' && 'Наречие'}
          </span>
                </div>
                <div className="back">
                    <p className="title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{card.translation}</p>
                    <p style={{ marginTop: '1rem' }}>{card.example}</p>
                </div>
            </div>
        </div>
    )
}

// Основной компонент приложения карточек
function FlashcardApp() {
    const [cards, setCards] = useState(initialCards)
    const [flippedStates, setFlippedStates] = useState({})
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [newWord, setNewWord] = useState({ word: '', translation: '', category: 'noun', example: '' })
    const [showAddForm, setShowAddForm] = useState(false)

    // Переворот карточки
    const toggleFlip = (id) => {
        setFlippedStates(prev => ({ ...prev, [id]: !prev[id] }))
    }

    // Перевернуть все карточки
    const flipAllCards = () => {
        const newStates = {}
        cards.forEach(card => { newStates[card.id] = true })
        setFlippedStates(newStates)
    }

    // Сбросить все карточки
    const resetAllCards = () => {
        setFlippedStates({})
    }

    // Перемешать карточки
    const shuffleCards = () => {
        const shuffled = [...cards]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        setCards(shuffled)
    }

    // Добавить новую карточку
    const addCard = () => {
        if (!newWord.word.trim() || !newWord.translation.trim()) {
            alert('Пожалуйста, заполните слово и перевод')
            return
        }

        const newCard = {
            id: Date.now(),
            word: newWord.word.trim(),
            translation: newWord.translation.trim(),
            transcription: '',
            category: newWord.category,
            example: newWord.example.trim() || 'Пример будет добавлен позже.'
        }

        setCards([...cards, newCard])
        setNewWord({ word: '', translation: '', category: 'noun', example: '' })
        setShowAddForm(false)
    }

    // Удалить карточку
    const deleteCard = (id) => {
        if (confirm('Вы уверены, что хотите удалить эту карточку?')) {
            setCards(cards.filter(card => card.id !== id))
            // Удаляем состояние переворота
            const newFlipped = { ...flippedStates }
            delete newFlipped[id]
            setFlippedStates(newFlipped)
        }
    }

    // Фильтрация карточек
    const filteredCards = cards.filter(card => {
        const matchesSearch = card.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.translation.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const categories = [
        { id: 'all', label: 'Все', icon: 'fas fa-globe' },
        { id: 'noun', label: 'Существительные', icon: 'fas fa-box' },
        { id: 'verb', label: 'Глаголы', icon: 'fas fa-running' },
        { id: 'adjective', label: 'Прилагательные', icon: 'fas fa-palette' },
        { id: 'adverb', label: 'Наречия', icon: 'fas fa-tachometer-alt' }
    ]

    return (
        <div className="flashcards-section fade-in">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">Карточки для запоминания слов</h1>
                    <p style={{ textAlign: 'center' }}>Кликните на карточку, чтобы увидеть перевод</p>
                </div>

                {/* Поиск и фильтры */}
                <div className="search-bar">
                    <input
                        className="input"
                        type="text"
                        placeholder="Поиск слова или перевода..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <button className="button button-primary" onClick={() => setSearchTerm('')}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>

                {/* Категории */}
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-btn ${selectedCategory === cat.id ? 'button-primary' : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            <i className={cat.icon} style={{ marginRight: '0.5rem' }}></i>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Статистика */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Всего карточек: <strong>{cards.length}</strong> |
                        Показано: <strong>{filteredCards.length}</strong>
                    </p>
                </div>

                {/* Карточки */}
                <div className="features-grid" id="flashcardsContainer">
                    {filteredCards.map(card => (
                        <div key={card.id} className="flashcard-wrapper" style={{ position: 'relative' }}>
                            <button
                                onClick={() => deleteCard(card.id)}
                                style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    zIndex: 10,
                                    background: 'var(--tag-adverb)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    cursor: 'pointer',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                            <Flashcard
                                card={card}
                                isFlipped={flippedStates[card.id] || false}
                                onFlip={() => toggleFlip(card.id)}
                            />
                        </div>
                    ))}
                </div>

                {/* Кнопки управления */}
                <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="button button-primary" onClick={flipAllCards}>
                        <i className="fas fa-sync-alt"></i> Перевернуть все
                    </button>
                    <button className="button button-secondary" onClick={resetAllCards}>
                        <i className="fas fa-undo"></i> Сбросить все
                    </button>
                    <button className="button button-secondary" onClick={shuffleCards}>
                        <i className="fas fa-random"></i> Перемешать
                    </button>
                    <button className="button button-primary" onClick={() => setShowAddForm(!showAddForm)}>
                        <i className="fas fa-plus"></i> Добавить карточку
                    </button>
                </div>

                {/* Форма добавления карточки */}
                {showAddForm && (
                    <div className="contact-form" style={{ marginTop: '3rem' }}>
                        <h3 style={{ marginTop: 0 }}>Добавить новую карточку</h3>
                        <div className="field">
                            <label className="label">Слово *</label>
                            <input
                                className="input"
                                type="text"
                                value={newWord.word}
                                onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
                                placeholder="Например: Apple"
                            />
                        </div>
                        <div className="field">
                            <label className="label">Перевод *</label>
                            <input
                                className="input"
                                type="text"
                                value={newWord.translation}
                                onChange={(e) => setNewWord({ ...newWord, translation: e.target.value })}
                                placeholder="Например: Яблоко"
                            />
                        </div>
                        <div className="field">
                            <label className="label">Часть речи</label>
                            <select
                                className="select"
                                value={newWord.category}
                                onChange={(e) => setNewWord({ ...newWord, category: e.target.value })}
                            >
                                <option value="noun">Существительное</option>
                                <option value="verb">Глагол</option>
                                <option value="adjective">Прилагательное</option>
                                <option value="adverb">Наречие</option>
                            </select>
                        </div>
                        <div className="field">
                            <label className="label">Пример использования</label>
                            <textarea
                                className="textarea"
                                rows="3"
                                value={newWord.example}
                                onChange={(e) => setNewWord({ ...newWord, example: e.target.value })}
                                placeholder="Например: I eat an apple every day."
                            ></textarea>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button className="button button-primary" onClick={addCard}>Сохранить</button>
                            <button className="button button-secondary" onClick={() => setShowAddForm(false)}>Отмена</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FlashcardApp