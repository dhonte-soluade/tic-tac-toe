import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle from '../assets/circle.png';
import cross from '../assets/cross.png';

let data = Array(9).fill("");

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);
    const boxesRef = useRef([]);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") return;

        if (count % 2 === 0) {
            e.target.innerHTML = `<img src=${cross} />`;
            data[num] = "x";
        } else {
            e.target.innerHTML = `<img src=${circle} />`;
            data[num] = "o";
        }
        setCount(count + 1);
        checkWinner();
    };

    const checkWinner = () => {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let [a, b, c] of wins) {
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                wonGame(data[a]);
                return;
            }
        }

        // Check for draw
        if (data.every((cell) => cell !== "")) {
            setLock(true);
            titleRef.current.innerHTML = "It's a Draw!";
        }
    };

    const wonGame = (winner) => {
        setLock(true);
        titleRef.current.innerHTML =
            winner === "x" ? "Crosses Won!" : "Circles Won!";
    };

    const restartGame = () => {
        setLock(false);
        data = Array(9).fill("");
        boxesRef.current.forEach((box) => {
            if (box) box.innerHTML = "";
        });
        titleRef.current.innerHTML = 'Click on a box to <span>Begin</span>!';
        setCount(0);
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>
                Click on a box to <span>Begin</span>!
            </h1>

            <div className={`board ${count % 2 === 0 ? "x-turn" : "o-turn"}`}>
                {Array(9).fill(null).map((_, idx) => (
                    <div
                        key={idx}
                        className="box"
                        ref={(el) => (boxesRef.current[idx] = el)}
                        onClick={(e) => toggle(e, idx)}
                    ></div>
                ))}
            </div>

            <div className="players">
                <h3 className='player1'>Player 1 = X</h3>
                <h3 className='player2'>Player 2 = O</h3>
            </div>

            <button className="btn-restart" onClick={restartGame}>
                Restart Game
            </button>
        </div>
    );
};

export default TicTacToe;