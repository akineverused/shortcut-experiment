import React, { useState, useEffect } from "react";
import { saveResult } from "../utils/api";
import {useNavigate} from "react-router-dom";

export default function KeyboardSavePage() {
    const [started, setStarted] = useState(false);
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [finished, setFinished] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!started) return;

        const blockMouse = (e) => e.preventDefault();
        document.addEventListener("click", blockMouse);

        const handleKey = (e) => {
            if (e.ctrlKey && e.key === "s") {
                e.preventDefault();
                setCount((prev) => prev + 1);
            }
        };

        document.addEventListener("keydown", handleKey);

        return () => {
            document.removeEventListener("click", blockMouse);
            document.removeEventListener("keydown", handleKey);
        };
    }, [started]);

    const handleStart = () => {
        setStarted(true);
        setStartTime(Date.now());
    };

    useEffect(() => {
        if (count === 5 && !finished) {
            handleFinish();
        }
    }, [count]);

    const handleFinish = async () => {
        const totalTime = Date.now() - startTime;
        const avgTime = totalTime / 5;

        await saveResult({
            participantId: parseInt(localStorage.getItem("participantId")),
            task: "keyboard_save",
            totalTime,
            avgTime,
        });

        setFinished(true);
        navigate("/4")
    };

    return (
        <div>
            <h2>Сохранение</h2>
            <p>Цель: проверить скорость сохранения данных с клавиатуры.</p>

            {!started && (
                <>
                    <p>
                        Нажмите на сочетание клавишь Ctrl+S 5 раз как можно быстрее.
                    </p>
                    <button onClick={handleStart}>Нажмите, чтобы начать</button>
                </>
            )}

            {started && !finished && (
                <>
                    <p>Completed: {count}/5</p>
                </>
            )}

            {finished && <h3>Done!</h3>}
        </div>
    );
}