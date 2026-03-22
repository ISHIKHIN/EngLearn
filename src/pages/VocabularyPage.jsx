import React, { useState } from 'react'
// Добавляем импорт стилей, если нужно
import '../../styles/style.css'

const commonWords = [
    { id: 1, word: 'Apple', transcription: '/ˈæp.əl/', translation: 'Яблоко', part: 'noun', example: 'I eat an apple every day.' },
    { id: 2, word: 'Book', transcription: '/bʊk/', translation: 'Книга', part: 'noun', example: 'This book is interesting.' },
    { id: 3, word: 'House', transcription: '/haʊs/', translation: 'Дом', part: 'noun', example: 'My house is big.' },
    { id: 4, word: 'Car', transcription: '/kɑːr/', translation: 'Машина', part: 'noun', example: 'I drive a red car.' },
    { id: 5, word: 'Beautiful', transcription: '/ˈbjuː.tɪ.fəl/', translation: 'Красивый', part: 'adjective', example: 'The flowers are beautiful.' },
    { id: 6, word: 'Happy', transcription: '/ˈhæp.i/', translation: 'Счастливый', part: 'adjective', example: 'I am happy today.' },
    { id: 7, word: 'Big', transcription: '/bɪɡ/', translation: 'Большой', part: 'adjective', example: 'This is a big house.' },
    { id: 8, word: 'Small', transcription: '/smɔːl/', translation: 'Маленький', part: 'adjective', example: 'I have a small car.' }
]

const intuitiveWords = [
    { id: 1, word: 'Student', transcription: '/ˈstjuː.dənt/', translation: 'Студент', part: 'noun', example: 'I am a student.' },
    { id: 2, word: 'Professor', transcription: '/prəˈfes.ər/', translation: 'Профессор', part: 'noun', example: 'The professor is kind.' },
    { id: 3, word: 'Doctor', transcription: '/ˈdɒk.tər/', translation: 'Доктор', part: 'noun', example: 'The doctor helps people.' },
    { id: 4, word: 'Director', transcription: '/daɪˈrek.tər/', translation: 'Директор', part: 'noun', example: 'He is the director.' },
    { id: 5, word: 'Creative', transcription: '/kriˈeɪ.tɪv/', translation: 'Креативный', part: 'adjective', example: 'She is very creative.' },
    { id: 6, word: 'Intelligent', transcription: '/ɪnˈtel.ɪ.dʒənt/', translation: 'Интеллигентный', part: 'adjective', example: 'He is an intelligent man.' }
]

const regularVerbs = [
    { infinitive: 'Work', past: 'Worked', participle: 'Worked', translation: 'Работать' },
    { infinitive: 'Play', past: 'Played', participle: 'Played', translation: 'Играть' },
    { infinitive: 'Study', past: 'Studied', participle: 'Studied', translation: 'Учить(ся)' },
    { infinitive: 'Walk', past: 'Walked', participle: 'Walked', translation: 'Гулять' },
    { infinitive: 'Talk', past: 'Talked', participle: 'Talked', translation: 'Говорить' },
    { infinitive: 'Watch', past: 'Watched', participle: 'Watched', translation: 'Смотреть' }
]

const irregularVerbs = [
    { infinitive: 'Be', past: 'Was/Were', participle: 'Been', translation: 'Быть' },
    { infinitive: 'Have', past: 'Had', participle: 'Had', translation: 'Иметь' },
    { infinitive: 'Do', past: 'Did', participle: 'Done', translation: 'Делать' },
    { infinitive: 'Go', past: 'Went', participle: 'Gone', translation: 'Идти' },
    { infinitive: 'See', past: 'Saw', participle: 'Seen', translation: 'Видеть' },
    { infinitive: 'Come', past: 'Came', participle: 'Come', translation: 'Приходить' },
    { infinitive: 'Take', past: 'Took', participle: 'Taken', translation: 'Брать' },
    { infinitive: 'Get', past: 'Got', participle: 'Got/Gotten', translation: 'Получать' }
]

function VocabularyPage() {
    const [activeTab, setActiveTab] = useState('common')
    const [searchTerm, setSearchTerm] = useState('')

    // Добавляем логирование для отладки
    console.log('VocabularyPage rendered, activeTab:', activeTab)
    console.log('Common words count:', commonWords.length)
    console.log('Intuitive words count:', intuitiveWords.length)

    const getCurrentWords = () => {
        if (activeTab === 'common') {
            console.log('Returning common words:', commonWords)
            return commonWords
        }
        if (activeTab === 'intuitive') {
            console.log('Returning intuitive words:', intuitiveWords)
            return intuitiveWords
        }
        return []
    }

    const filteredWords = getCurrentWords().filter(word => {
        const matchesSearch = searchTerm === '' ||
            word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
            word.translation.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
    })

    console.log('Filtered words count:', filteredWords.length)

    const getPartTagClass = (part) => {
        const classes = {
            noun: 'tag-noun',
            verb: 'tag-verb',
            adjective: 'tag-adjective',
            adverb: 'tag-adverb'
        }
        return classes[part] || ''
    }

    const getPartLabel = (part) => {
        const labels = {
            noun: 'Существительное',
            verb: 'Глагол',
            adjective: 'Прилагательное',
            adverb: 'Наречие'
        }
        return labels[part] || part
    }

    return (
        <div className="vocabulary-section active" style={{ padding: '2rem 0' }}>
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">Словарь английских слов</h1>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                        Изучайте новые слова с примерами и транскрипцией
                    </p>
                </div>

                <div className="vocabulary-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'common' ? 'active' : ''}`}
                        onClick={() => {
                            console.log('Switching to common tab')
                            setActiveTab('common')
                            setSearchTerm('')
                        }}
                    >
                        <i className="fas fa-book" style={{ marginRight: '0.5rem' }}></i>
                        Обычные слова
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'intuitive' ? 'active' : ''}`}
                        onClick={() => {
                            console.log('Switching to intuitive tab')
                            setActiveTab('intuitive')
                            setSearchTerm('')
                        }}
                    >
                        <i className="fas fa-lightbulb" style={{ marginRight: '0.5rem' }}></i>
                        Интуитивно понятные
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'verbs' ? 'active' : ''}`}
                        onClick={() => {
                            console.log('Switching to verbs tab')
                            setActiveTab('verbs')
                            setSearchTerm('')
                        }}
                    >
                        Глаголы
                    </button>
                </div>

                {activeTab !== 'verbs' && (
                    <>
                        <div className="search-bar" style={{ marginBottom: '2rem' }}>
                            <input
                                className="input"
                                type="text"
                                placeholder="Поиск слова или перевода..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ flex: 1 }}
                            />
                            {searchTerm && (
                                <button
                                    className="button button-secondary"
                                    onClick={() => setSearchTerm('')}
                                    style={{ marginLeft: '0.5rem' }}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            )}
                        </div>

                        {filteredWords.length === 0 ? (
                            <div className="notification" style={{ textAlign: 'center' }}>
                                <i className="fas fa-search"></i>
                                <p>Ничего не найдено. Попробуйте изменить поисковый запрос.</p>
                            </div>
                        ) : (
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
                                            <td>
                                                    <span className={`tag ${getPartTagClass(word.part)}`}>
                                                        {getPartLabel(word.part)}
                                                    </span>
                                            </td>
                                            <td>{word.example}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'verbs' && (
                    <>
                        <div className="verb-group">
                            <h3>
                                <i className="fas fa-check-circle" style={{ color: 'var(--primary)' }}></i>
                                Правильные глаголы (Regular Verbs)
                            </h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="vocabulary-table">
                                    <thead>
                                    <tr>
                                        <th>Infinitive</th>
                                        <th>Past Simple</th>
                                        <th>Past Participle</th>
                                        <th>Перевод</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {regularVerbs.map((verb, idx) => (
                                        <tr key={idx}>
                                            <td><strong>{verb.infinitive}</strong></td>
                                            <td>{verb.past}</td>
                                            <td>{verb.participle}</td>
                                            <td>{verb.translation}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="verb-group">
                            <h3>
                                <i className="fas fa-exclamation-triangle" style={{ color: 'var(--primary)' }}></i>
                                Неправильные глаголы (Irregular Verbs)
                            </h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="vocabulary-table">
                                    <thead>
                                    <tr>
                                        <th>Infinitive</th>
                                        <th>Past Simple</th>
                                        <th>Past Participle</th>
                                        <th>Перевод</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {irregularVerbs.map((verb, idx) => (
                                        <tr key={idx}>
                                            <td><strong>{verb.infinitive}</strong></td>
                                            <td>{verb.past}</td>
                                            <td>{verb.participle}</td>
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

export default VocabularyPage