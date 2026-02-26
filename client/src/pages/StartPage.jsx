import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const handleStart = async () => {
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            try {
                const response = await fetch("https://shortcut-experiment.onrender.com/api/participants", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                localStorage.setItem("participantId", data.id);

                navigate("/1");
            } catch (err) {
                setError("Server error. Try again.");
            }
        } else {
            alert("Извините, эксперимент доступен только на ПК с физической клавиатурой.");
        }


    };

    return (
        <div style={{ maxWidth: 700, margin: "50px auto", fontFamily: "Arial" }}>
            <h1>Эксперимент по повышению эффективности сочетаний клавиш</h1>

            <h3>Цель исследования</h3>
            <p>
                В этом эксперименте измеряется, сколько времени пользователи могут сэкономить, используя сочетания клавиш вместо взаимодействия с помощью мыши.
            </p>

            <h3>Что вы будете делать</h3>
            <ul>
                <li>Вам предстоит выполнить 6 коротких заданий.
                </li>
                <li>Каждое задание необходимо повторить 5 раз.</li>
                <li>Для некоторых заданий требуется только клавиатура.</li>
                <li>Для некоторых заданий требуется только мышь.</li>
                <li>Время выполнения будет записано.</li>
            </ul>

            <h3>Важные правила</h3>
            <ul>
                <li><strong>Строго следуйте инструкциям:</strong> используйте только тот метод ввода (мышь или клавиатура), который указан в задании.</li>
                <li><strong>Устройства:</strong> эксперимент предназначен <strong>только для десктопных компьютеров и ноутбуков</strong>. Использование сенсорных экранов или планшетов запрещено, так как это исказит результаты.</li>
                <li><strong>Скорость и точность:</strong> выполняйте задания максимально быстро, но старайтесь не допускать ошибок.</li>
                <li><strong>Стабильность:</strong> не закрывайте и не обновляйте страницу до завершения всех этапов.</li>
                <li><strong>Раскладка клавиатуры:</strong> пожалуйста, переключитесь на английскую раскладку (EN). Это необходимо для корректного распознавания сочетаний клавиш системой.</li>
            </ul>

            <h3>Перед началом</h3>
            <p>
                Пожалуйста, введите ваш email. Он будет использоваться исключительно для идентификации ваших результатов в базе данных.
            </p>

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    padding: 10,
                    width: "100%",
                    marginBottom: 10,
                    fontSize: 16
                }}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button
                onClick={handleStart}
                style={{
                    padding: "12px 20px",
                    fontSize: 16,
                    cursor: "pointer"
                }}
            >
                Начать эксперимент
            </button>
        </div>
    );
}