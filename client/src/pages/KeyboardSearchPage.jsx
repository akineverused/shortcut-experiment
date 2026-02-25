import React, { useState, useEffect } from "react";
import { saveResult } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function KeyboardSearchPage() {
    const [started, setStarted] = useState(false);
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [finished, setFinished] = useState(false);
    const [clickedIndexes, setClickedIndexes] = useState([]);
    const navigate = useNavigate();

    // 5 TARGET + 20 обычных
    const generateButtons = () => {
        const arr = [
            ...Array(5).fill("TARGET"),
            ...Array(20).fill(0).map((_, i) => `Button ${i + 1}`)
        ];
        return arr.sort(() => Math.random() - 0.5);
    };

    const [buttons, setButtons] = useState(generateButtons());

    // 🚫 Блокируем мышь
    useEffect(() => {
        if (!started) return;

        const blockMouse = (e) => e.preventDefault();
        document.addEventListener("mousedown", blockMouse);

        return () => document.removeEventListener("mousedown", blockMouse);
    }, [started]);

    const handleStart = () => {
        setButtons(generateButtons());
        setCount(0);
        setStarted(true);
        setStartTime(Date.now());
    };

    useEffect(() => {
        if (count === 5 && started && !finished) {
            handleFinish();
        }
    }, [count]);

    const handleClick = (index) => {
        setCount(v => v+1);
        setClickedIndexes([...clickedIndexes, index]);
    };

    const handleFinish = async (text) => {
        const totalTime = Date.now() - startTime;
        const avgTime = totalTime / 5;

        await saveResult({
            participantId: parseInt(localStorage.getItem("participantId")),
            task: "keyboard_search",
            totalTime,
            avgTime,
        });

        setFinished(true);
        navigate("/6");
    };

    return (
        <div>
            <h2>Поиск кнопок клавиатурой</h2>
            <p>Цель: проверить скорость поиска целевых элементов с помощью клавиатуры.</p>
            {!started && (
                <>
                    <p>
                        Скопируйте слово "TARGET" и вставьте в окно поиска при нажатии на сочетание клавишь Ctrl+F после начала теста.
                        Нужное слово будет выделено браузером. Найдите 5 кнопок с данным текстом и нажмите на них.
                    </p>
                    <button onClick={handleStart}>Нажмите, чтобы начать</button>
                </>
            )}

            {started && !finished && (
                <>
                    <p>Found: {count}/5</p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 1fr)",
                            gap: "10px",
                            marginTop: "20px"
                        }}
                    >
                        {buttons.map((text, index) => (
                            <button
                                key={index}
                                disabled={clickedIndexes.includes(index)}
                                onClick={() =>{
                                    if(text === "TARGET"){
                                        handleClick(index)
                                    }
                                }}
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {finished && <h3>Done!</h3>}
        </div>
    );
}