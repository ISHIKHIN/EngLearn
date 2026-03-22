import React from 'react'

function TenseCard({ title, usage, tableData, markers }) {
    return (
        <div className="tense-card">
            <h3>{title}</h3>
            <p><strong>Употребление:</strong> {usage}</p>
            <div style={{ overflowX: 'auto' }}>
                <table className="tense-table">
                    <thead>
                    <tr><th>Тип предложения</th><th>Формула</th><th>Пример</th></tr>
                    </thead>
                    <tbody>
                    {tableData.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row.type}</td>
                            <td dangerouslySetInnerHTML={{ __html: row.formula }} />
                            <td dangerouslySetInnerHTML={{ __html: row.example }} />
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <p><strong>Слова-маркеры:</strong> {markers}</p>
        </div>
    )
}

function MaterialsPage() {
    const presentSimpleData = [
        { type: 'Утверждение', formula: 'I/You/We/They + V1<br>He/She/It + V1 + (e)s', example: '<span class="example-highlight">I work</span> every day.<br><span class="example-highlight">She works</span> every day.' },
        { type: 'Отрицание', formula: 'I/You/We/They + do not (don\'t) + V1<br>He/She/It + does not (doesn\'t) + V1', example: '<span class="example-highlight">I don\'t work</span> on Sundays.<br><span class="example-highlight">He doesn\'t work</span> on Sundays.' },
        { type: 'Вопрос', formula: 'Do + I/you/we/they + V1?<br>Does + he/she/it + V1?', example: '<span class="example-highlight">Do you work</span> here?<br><span class="example-highlight">Does she work</span> here?' }
    ]

    const pastSimpleData = [
        { type: 'Утверждение', formula: 'V2 (правильные: V+ed / неправильные: 2 форма)', example: '<span class="example-highlight">I worked</span> yesterday.<br><span class="example-highlight">She went</span> to London.' },
        { type: 'Отрицание', formula: 'did not (didn\'t) + V1', example: '<span class="example-highlight">I didn\'t work</span> yesterday.<br><span class="example-highlight">She didn\'t go</span> to London.' },
        { type: 'Вопрос', formula: 'Did + подлежащее + V1?', example: '<span class="example-highlight">Did you work</span> yesterday?<br><span class="example-highlight">Did she go</span> to London?' }
    ]

    const futureSimpleData = [
        { type: 'Утверждение', formula: 'will + V1', example: '<span class="example-highlight">I will call</span> you tomorrow.<br><span class="example-highlight">She will come</span> later.' },
        { type: 'Отрицание', formula: 'will not (won\'t) + V1', example: '<span class="example-highlight">I won\'t be</span> late.<br><span class="example-highlight">She won\'t come</span> to the party.' },
        { type: 'Вопрос', formula: 'Will + подлежащее + V1?', example: '<span class="example-highlight">Will you come</span> to the party?<br><span class="example-highlight">Will she call</span> me?' }
    ]

    return (
        <div className="materials-section fade-in">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">Учебные материалы</h1>
                    <p style={{ textAlign: 'center' }}>Правила, таблицы и полезная информация для изучения английского</p>
                </div>

                <h2 style={{ marginBottom: '2rem' }}>Базовые времена</h2>

                <TenseCard
                    title="Present Simple (Настоящее простое время)"
                    usage="Факты, привычки, регулярные действия, расписания."
                    tableData={presentSimpleData}
                    markers="always, usually, often, sometimes, never, every day/week/month"
                />

                <TenseCard
                    title="Past Simple (Прошедшее простое время)"
                    usage="Завершенные действия в прошлом, последовательность событий в прошлом."
                    tableData={pastSimpleData}
                    markers="yesterday, last week/month/year, in 2020, ago"
                />

                <TenseCard
                    title="Future Simple (Будущее простое время)"
                    usage="Решения, принятые в момент речи, предсказания, обещания, спонтанные действия."
                    tableData={futureSimpleData}
                    markers="tomorrow, next week/month/year, soon, in the future"
                />

                <div className="notification">
                    <p><i className="fas fa-info-circle"></i> Раздел "Материалы" будет постепенно пополняться новыми темами.</p>
                </div>
            </div>
        </div>
    )
}

export default MaterialsPage