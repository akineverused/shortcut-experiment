import { useState, useEffect } from "react";
import { saveResult } from "./utils/api";

export default function TaskPage() {
    const [mode, setMode] = useState("mouse"); // mouse | shortcut
    const [text, setText] = useState("Copy this text");
    const [startTime, setStartTime] = useState(null);
    const [time, setTime] = useState(null);

    const startTask = () => {
        setTime(null);
        setStartTime(performance.now());
    };

    const finishTask = () => {
        const end = performance.now();
        const duration = (end - startTime) / 1000;
        setTime(duration);

        saveResult({
            mode,
            duration,
            timestamp: new Date()
        });
    };

    // блокировка shortcut в mouse mode
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (mode === "mouse" && e.ctrlKey) {
                e.preventDefault();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [mode]);

    return (
        <div style={{ padding: 40 }}>
            <h2>Shortcut Efficiency Experiment</h2>

            <select onChange={(e) => setMode(e.target.value)}>
                <option value="mouse">Mouse Mode</option>
                <option value="shortcut">Shortcut Mode</option>
            </select>

            <p>{text}</p>

            <textarea rows={4} cols={40}></textarea>

            <br /><br />

            <button onClick={startTask}>Start</button>
            <button onClick={finishTask}>Finish</button>

            {time && <h3>Time: {time.toFixed(2)} sec</h3>}
        </div>
    );
}