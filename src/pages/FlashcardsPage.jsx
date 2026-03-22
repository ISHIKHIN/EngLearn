import React, { useState } from 'react'

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

function Flashcard({ card, isFlipped, onFlip }) {
    const getCategoryLabel = (category) => {
        const labels = {
            noun: 'Существительное',
            verb: 'Глагол',
            adjective: 'Прилагательное',
            adverb: 'Наречие'
        }
        return labels[category] || category
    }

    const getCategoryClass = (category) => {
        const classes = {
            noun: 'tag-noun',
            verb: 'tag-verb',
            adjective: 'tag-adjective',
            adverb: 'tag-adverb'
        }
        return classes[category] || ''
    }

    return (
        <div className="flashcard-wrapper">
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
                <div className="front">
                    <p className="title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{card.word}</p>
                    <p style={{ color: 'var(--text-muted)' }}>{card.transcription}</p>
                    <span className={`tag ${getCategoryClass(card.category)}`}>
                        {getCategoryLabel(card.category)}
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

function FlashcardsPage() {
    const [cards, setCards] = useState(initialCards)
    const [flippedStates, setFlippedStates] = useState({})
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')

    const toggleFlip = (id) => {
        setFlippedStates(prev => ({ ...prev, [id]: !prev[id] }))
    }

    const flipAllCards = () => {
        const newStates = {}
        cards.forEach(card => { newStates[card.id] = true })
        setFlippedStates(newStates)
    }

    const resetAllCards = () => {
        setFlippedStates({})
    }

    const shuffleCards = () => {
        const shuffled = [...cards]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        setCards(shuffled)
    }

    const filteredCards = cards.filter(card => {
        const matchesSearch = card.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.translation.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const categories = [
        { id: 'all', label: 'Все'},
        { id: 'noun', label: 'Существительные'},
        { id: 'verb', label: 'Глаголы'},
        { id: 'adjective', label: 'Прилагательные'},
        { id: 'adverb', label: 'Наречия'}
    ]

    return (
        <div className="flashcards-section fade-in">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">Карточки для запоминания слов</h1>
                    <p style={{ textAlign: 'center' }}>Кликните на карточку, чтобы увидеть перевод</p>
                </div>

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

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Всего карточек: <strong>{cards.length}</strong> |
                        Показано: <strong>{filteredCards.length}</strong>
                    </p>
                </div>

                <div className="features-grid">
                    {filteredCards.map(card => (
                        <Flashcard
                            key={card.id}
                            card={card}
                            isFlipped={flippedStates[card.id] || false}
                            onFlip={() => toggleFlip(card.id)}
                        />
                    ))}
                </div>

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
                </div>
            </div>
        </div>
    )
}

export default FlashcardsPage