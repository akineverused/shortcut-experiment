import React, { useState, useEffect } from "react";
import { saveResult } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function MouseSearchPage() {
    const [started, setStarted] = useState(false);
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [finished, setFinished] = useState(false);
    const [clickedIndexes, setClickedIndexes] = useState([]);
    const navigate = useNavigate();

    // создаём 5 TARGET и 20 обычных кнопок
    const generateButtons = () => {
        const arr = [
            ...Array(5).fill("TARGET"),
            ...Array(20).fill(0).map((_, i) => `Button ${i + 1}`)
        ];
        return arr.sort(() => Math.random() - 0.5); // перемешиваем
    };

    const [buttons, setButtons] = useState(generateButtons());

    useEffect(() => {
        if (!started) return;

        const blockKeyboard = (e) => e.preventDefault();
        document.addEventListener("keydown", blockKeyboard);

        return () => document.removeEventListener("keydown", blockKeyboard);
    }, [started]);

    const handleStart = () => {
        setButtons(generateButtons()); // новый порядок каждый раз
        setCount(0);
        setStarted(true);
        setStartTime(Date.now());
    };

    const handleClick = async (text, index) => {
        if (clickedIndexes.includes(index)) return;
        if (text === "TARGET") {

            const newCount = count + 1;
            setClickedIndexes([...clickedIndexes, index]);
            setCount(newCount);

            if (newCount === 5) {
                const totalTime = Date.now() - startTime;
                const avgTime = totalTime / 5;

                await saveResult({
                    participantId: parseInt(localStorage.getItem("participantId")),
                    task: "mouse_search",
                    totalTime,
                    avgTime,
                });

                setFinished(true);
                navigate("/results");
            }
        }
    };

    return (
        <div>
            <h2>Mouse Search Task</h2>
            <p>Цель: проверить скорость поиска целевых элементов с помощью мыши.</p>

            {!started && (
                <>
                    <p>
                        Найдите и нажмите на 5 кнопок с текстом "TARGET" используя только мышь. Клавиатура отключена
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
                                onClick={() => handleClick(text, index)}
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