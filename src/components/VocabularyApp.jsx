import React, { useState } from 'react'

// Данные словаря
const commonWords = [
    { id: 1, word: 'Apple', transcription: '/ˈæp.əl/', translation: 'Яблоко', part: 'noun', example: 'I eat an apple every day.' },
    { id: 2, word: 'Book', transcription: '/bʊk/', translation: 'Книга', part: 'noun', example: 'This book is interesting.' },
    { id: 3, word: 'House', transcription: '/haʊs/', translation: 'Дом', part: 'noun', example: 'My house is big.' },
    { id: 4, word: 'Car', transcription: '/kɑːr/', translation: 'Машина', part: 'noun', example: 'I drive a red car.' },
    { id: 5, word: 'Beautiful', transcription: '/ˈbjuː.tɪ.fəl/', translation: 'Красивый', part: 'adjective', example: 'The flowers are beautiful.' },
    { id: 6, word: 'Happy', transcription: '/ˈhæp.i/', translation: 'Счастливый', part: 'adjective', example: 'I am happy today.' }
]

const intuitiveWords = [
    { id: 1, word: 'Student', transcription: '/ˈstjuː.dənt/', translation: 'Студент', part: 'noun', example: 'I am a student.' },
    { id: 2, word: 'Professor', transcription: '/prəˈfes.ər/', translation: 'Профессор', part: 'noun', example: 'The professor is kind.' },
    { id: 3, word: 'Doctor', transcription: '/ˈdɒk.tər/', translation: 'Доктор', part: 'noun', example: 'The doctor helps people.' },
    { id: 4, word: 'Creative', transcription: '/kriˈeɪ.tɪv/', translation: 'Креативный', part: 'adjective', example: 'She is very creative.' }
]

const regularVerbs = [
    { infinitive: 'Work', past: 'Worked', participle: 'Worked', translation: 'Работать' },
    { infinitive: 'Play', past: 'Played', participle: 'Played', translation: 'Играть' },
    { infinitive: 'Study', past: 'Studied', participle: 'Studied', translation: 'Учить(ся)' }
]

const irregularVerbs = [
    { infinitive: 'Be', past: 'Was/Were', participle: 'Been', translation: 'Быть' },
    { infinitive: 'Have', past: 'Had', participle: 'Had', translation: 'Иметь' },
    { infinitive: 'Go', past: 'Went', participle: 'Gone', translation: 'Идти' },
    { infinitive: 'See', past: 'Saw', participle: 'Seen', translation: 'Видеть' }
]

function VocabularyApp() {
    const [activeTab, setActiveTab] = useState('common')
    const [searchTerm, setSearchTerm] = useState('')

    const getCurrentWords = () => {
        if (activeTab === 'common') return commonWords
        if (activeTab === 'intuitive') return intuitiveWords
        return []
    }

    const filteredWords = getCurrentWords().filter(word =>
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translation.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getPartTagClass = (part) => {
        switch(part) {
            case 'noun': return 'tag-noun'
            case 'verb': return 'tag-verb'
            case 'adjective': return 'tag-adjective'
            default: return ''
        }
    }

    const getPartLabel = (part) => {
        switch(part) {
            case 'noun': return 'Существительное'
            case 'verb': return 'Глагол'
            case 'adjective': return 'Прилагательное'
            default: return part
        }
    }

    return (
        <div className="vocabulary-section fade-in">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">Словарь английских слов</h1>
                </div>

                {/* Вкладки */}
                <div className="vocabulary-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'common' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('common'); setSearchTerm('') }}
                    >
                        Обычные слова
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'intuitive' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('intuitive'); setSearchTerm('') }}
                    >
                        Интуитивно понятные
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'verbs' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('verbs'); setSearchTerm('') }}
                    >
                        Глаголы
                    </button>
                </div>

                {/* Поиск */}
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

                {/* Таблица слов */}
                {activeTab !== 'verbs' && (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="vocabulary-table">
                            <thead>
                            <tr>
                                <th>Английское слово</th>
                                <th>Транскрипция</th>
                                <th>Перевод</th>
                                <th>Часть речи</th>
                                <th>Пример</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredWords.map(word => (
                                <tr key={word.id}>
                                    <td><strong>{word.word}</strong></td>
                                    <td>{word.transcription}</td>
                                    <td>{word.translation}</td>
                                    <td><span className={`tag ${getPartTagClass(word.part)}`}>{getPartLabel(word.part)}</span></td>
                                    <td>{word.example}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Глаголы */}
                {activeTab === 'verbs' && (
                    <>
                        <div className="verb-group">
                            <h3><i className="fas fa-check-circle"></i> Правильные глаголы (Regular Verbs)</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="vocabulary-table">
                                    <thead>
                                    <tr><th>Infinitive</th><th>Past Simple</th><th>Past Participle</th><th>Перевод</th></tr>
                                    </thead>
                                    <tbody>
                                    {regularVerbs.map((verb, idx) => (
                                        <tr key={idx}>
                                            <td>{verb.infinitive}</td><td>{verb.past}</td><td>{verb.participle}</td><td>{verb.translation}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="verb-group">
                            <h3><i className="fas fa-exclamation-triangle"></i> Неправильные глаголы (Irregular Verbs)</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="vocabulary-table">
                                    <thead>
                                    <tr><th>Infinitive</th><th>Past Simple</th><th>Past Participle</th><th>Перевод</th></tr>
                                    </thead>
                                    <tbody>
                                    {irregularVerbs.map((verb, idx) => (
                                        <tr key={idx}>
                                            <td>{verb.infinitive}</td><td>{verb.past}</td><td>{verb.participle}</td>
                                            <td>{verb.translation}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default VocabularyApp