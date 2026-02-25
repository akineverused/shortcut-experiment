import React, { useState, useEffect } from "react";
import { saveResult } from "../utils/api";
import {useNavigate} from "react-router-dom";

export default function MouseSavePage() {
    const [started, setStarted] = useState(false);
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [finished, setFinished] = useState(false);
    const [position, setPosition] = useState({ top: 100, left: 100 });
    const navigate = useNavigate();

    useEffect(() => {
        if (!started) return;

        const blockKeyboard = (e) => e.preventDefault();
        document.addEventListener("keydown", blockKeyboard);

        return () => document.removeEventListener("keydown", blockKeyboard);
    }, [started]);

    const moveButton = () => {
        const top = Math.random() * 400;
        const left = Math.random() * 600;
        setPosition({ top, left });
    };

    const handleStart = () => {
        setStarted(true);
        setStartTime(Date.now());
    };

    const handleClick = () => {
        setCount(count + 1);
        moveButton();
    };

    const handleFinish = async () => {
        const totalTime = Date.now() - startTime;
        const avgTime = totalTime / 5;

        await saveResult({
            participantId: parseInt(localStorage.getItem("participantId")),
            task: "mouse_save",
            totalTime,
            avgTime,
        });

        setFinished(true);
        navigate("/5")
    };

    return (
        <div>
            <h2>Сохранение</h2>
            <p>Цель: проверить скорость сохранения с помощью мыши.</p>

            {!started && (
                <>
                    <p>
                        Нажмите на кнопку Сохранения 5 раз как можно быстрее. Кнопка будет менять расположение каждый раз при клике.
                    </p>
                    <button onClick={handleStart}>Start</button>
                </>
            )}

            {started && !finished && (
                <>
                    <p>Completed: {count}/5</p>
                    <button
                        onClick={handleClick}
                        disabled={count === 5}
                        style={{
                            position: "absolute",
                            top: position.top,
                            left: position.left
                        }}
                    >Save</button>
                    <button
                        onClick={handleFinish}
                        disabled={count !== 5}
                    >
                        Finish
                    </button>
                </>
            )}

            {finished && <h3>Done!</h3>}
        </div>
    );
}