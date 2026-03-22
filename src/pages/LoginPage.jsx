import React, { useState } from 'react'

function LoginPage() {
    const [activeTab, setActiveTab] = useState('login')
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', confirm: '' })

    const handleLogin = (e) => {
        e.preventDefault()
        console.log('Вход:', loginData)
        alert('Функция входа будет доступна после подключения бэкенда')
    }

    const handleRegister = (e) => {
        e.preventDefault()
        if (registerData.password !== registerData.confirm) {
            alert('Пароли не совпадают!')
            return
        }
        console.log('Регистрация:', registerData)
        alert('Функция регистрации будет доступна после подключения бэкенда')
    }

    return (
        <div className="auth-section fade-in">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">Добро пожаловать!</h1>
                </div>

                <div className="auth-container" style={{ maxWidth: '500px', margin: '0 auto', background: 'var(--surface)', borderRadius: '32px', padding: '2.5rem' }}>
                    <div className="auth-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid light-dark(#e2e8f0, #2d2d3a)', paddingBottom: '1rem' }}>
                        <button
                            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => setActiveTab('login')}
                            style={{ flex: 1, textAlign: 'center', padding: '0.75rem', cursor: 'pointer', fontWeight: '600', background: activeTab === 'login' ? 'var(--surface-soft)' : 'transparent', color: activeTab === 'login' ? 'var(--primary)' : 'var(--text-muted)', borderRadius: '12px' }}
                        >
                            Вход
                        </button>
                        <button
                            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => setActiveTab('register')}
                            style={{ flex: 1, textAlign: 'center', padding: '0.75rem', cursor: 'pointer', fontWeight: '600', background: activeTab === 'register' ? 'var(--surface-soft)' : 'transparent', color: activeTab === 'register' ? 'var(--primary)' : 'var(--text-muted)', borderRadius: '12px' }}
                        >
                            Регистрация
                        </button>
                    </div>

                    {activeTab === 'login' && (
                        <form onSubmit={handleLogin}>
                            <div className="field">
                                <label className="label">Никнейм или Email</label>
                                <input
                                    className="input"
                                    type="text"
                                    value={loginData.username}
                                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                    placeholder="Введите никнейм или email"
                                    required
                                />
                            </div>
                            <div className="field">
                                <label className="label">Пароль</label>
                                <input
                                    className="input"
                                    type="password"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    placeholder="Введите пароль"
                                    required
                                />
                            </div>
                            <div className="field checkbox-field">
                                <label className="checkbox">
                                    <input type="checkbox" /> Запомнить меня
                                </label>
                            </div>
                            <button className="button button-primary" type="submit" style={{ width: '100%' }}>Войти</button>
                            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                                Нет аккаунта? <a href="#" onClick={() => setActiveTab('register')} style={{ color: 'var(--primary)' }}>Зарегистрируйтесь</a>
                            </p>
                        </form>
                    )}

                    {activeTab === 'register' && (
                        <form onSubmit={handleRegister}>
                            <div className="field">
                                <label className="label">Никнейм</label>
                                <input
                                    className="input"
                                    type="text"
                                    value={registerData.username}
                                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                    placeholder="Придумайте никнейм"
                                    required
                                />
                            </div>
                            <div className="field">
                                <label className="label">Email</label>
                                <input
                                    className="input"
                                    type="email"
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                    placeholder="Ваш email"
                                    required
                                />
                            </div>
                            <div className="field">
                                <label className="label">Пароль</label>
                                <input
                                    className="input"
                                    type="password"
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                    placeholder="Придумайте пароль"
                                    required
                                />
                            </div>
                            <div className="field">
                                <label className="label">Подтверждение пароля</label>
                                <input
                                    className="input"
                                    type="password"
                                    value={registerData.confirm}
                                    onChange={(e) => setRegisterData({ ...registerData, confirm: e.target.value })}
                                    placeholder="Повторите пароль"
                                    required
                                />
                            </div>
                            <div className="field checkbox-field">
                                <label className="checkbox">
                                    <input type="checkbox" required /> Соглашаюсь с условиями использования
                                </label>
                            </div>
                            <button className="button button-primary" type="submit" style={{ width: '100%' }}>Зарегистрироваться</button>
                            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                                Уже есть аккаунт? <a href="#" onClick={() => setActiveTab('login')} style={{ color: 'var(--primary)' }}>Войдите</a>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoginPage