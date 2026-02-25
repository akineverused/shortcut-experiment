import React, { useEffect, useState } from "react";

export default function ResultsPage() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            const participantId = localStorage.getItem("participantId");

            const res = await fetch(
                `https://shortcut-experiment.onrender.com/api/results/participant/${participantId}`
            );

            const data = await res.json();
            setResults(data);
            setLoading(false);
        };

        fetchResults();
    }, []);

    if (loading) return <h2>Loading results...</h2>;

    // берём последнюю запись по каждому типу задачи
    const getLastTime = (taskName) => {
        const filtered = results.filter(r => r.task === taskName);
        if (filtered.length === 0) return 0;
        return filtered[filtered.length - 1].avgTime;
    };

    const keyboardAvg =
        (getLastTime("keyboard_copy") +
            getLastTime("keyboard_save") +
            getLastTime("keyboard_search")) / 3;

    const mouseAvg =
        (getLastTime("mouse_copy") +
            getLastTime("mouse_save") +
            getLastTime("mouse_search")) / 3;

    const savedPerAction = mouseAvg - keyboardAvg;

    const actionsPerDay = 200; // можно поменять
    const yearlySaved = (savedPerAction * actionsPerDay * 265) / 1000 / 60;

    const yearlySavedHours = (savedPerAction * actionsPerDay * 265) / 1000 / 60 / 60;

    return (
        <div style={{ maxWidth: 800, margin: "50px auto" }}>
            <h1>Результаты эксперимента</h1>

            <h3>Среднее время на операцию (мс)</h3>
            <ul>
                <li>Копирование (Клавиатура): {getLastTime("keyboard_copy").toFixed(2)}</li>
                <li>Копирование (Мышь): {getLastTime("mouse_copy").toFixed(2)}</li>
                <li>Сохранение (Клавиатура): {getLastTime("keyboard_save").toFixed(2)}</li>
                <li>Сохранение (Мышь): {getLastTime("mouse_save").toFixed(2)}</li>
                <li>Поиск (Клавиатура): {getLastTime("keyboard_search").toFixed(2)}</li>
                <li>Поиск (Мышь): {getLastTime("mouse_search").toFixed(2)}</li>
            </ul>

            <h3>Сравнение методов</h3>
            <p>Среднее время (Клавиатура): {keyboardAvg.toFixed(2)} ms</p>
            <p>Среднее время (Мышь): {mouseAvg.toFixed(2)} ms</p>

            <h2>
                Прогноз экономии: {yearlySaved.toFixed(2)} минут в год ({yearlySavedHours.toFixed(2)} часов)
            </h2>

            <h3>Спасибо за участие в исследовании! 🎉</h3>
        </div>
    );
}