import React, { useState, useEffect } from "react";
import { saveResult } from "../utils/api";
import {useNavigate} from "react-router-dom";
import {texts} from "../utils/texts";

export default function KeyboardCopyPage() {
    const [started, setStarted] = useState(false);
    const [input, setInput] = useState("");
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [finished, setFinished] = useState(false);
    const TEXT = texts[count];
    const navigate = useNavigate();

    useEffect(() => {
        if (!started) return;

        const blockMouse = (e) => e.preventDefault();
        document.addEventListener("click", blockMouse);

        return () => document.removeEventListener("click", blockMouse);
    }, [started]);

    const handleStart = () => {
        setStarted(true);
        setStartTime(Date.now());
    };

    const handleCheck = () => {
        if (input === TEXT) {
            setCount(prev => prev + 1);
            setInput("");
        }
    };

    useEffect(() => {
        if (count === 5 && started && !finished) {
            handleFinish();
        }
    }, [count]);

    const handleFinish = async () => {
        if (finished) return;

        const totalTime = Date.now() - startTime;
        const avgTime = totalTime / 5;

        await saveResult({
            participantId: parseInt(localStorage.getItem("participantId")),
            task: "keyboard_copy",
            totalTime,
            avgTime,
        });

        setFinished(true);
        navigate("/2");
    };

    return (
        <div>
            <h2>Копирование текста</h2>
            <p>Цель: проверить скорость копирования и вставки текста с помощью клавиатуры.</p>

            {!started && (
                <>
                    <p>
                        Выделите текст с экрана.
                        Используйте сочетания клавиш Ctrl+C → Ctrl+V, чтобы вставить текст в поле ввода.
                        После успешного ввода нажмите кнопку Submit Attempt. В случае не правильного ввода удалите текст в поле и попробуйте снова.
                        Не используйте ПКМ для данного теста. Повторите 5 раз.
                    </p>
                    <button onClick={handleStart}>Нажмите, чтобы начать</button>
                </>
            )}

            {started && !finished && (
                <>
                    <p>Completed: {count}/5</p>
                    <p>{TEXT}</p>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={handleCheck}>Submit Attempt</button>
                </>
            )}

            {finished && <h3>Done!</h3>}
        </div>
    );
}