'use client';
import React, {useEffect, useState } from "react"
import Square from "./Square";
import { type } from "os";
type Player = "X" | "O" | "Both" | null;

function calculateWinner(squares: Player[]) {
    const lines = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,4,8],
[0,4,8],
[2,4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
const [a, b, c] = lines[i];
  
    if ( 
        squares[a] && 
        squares[a] == squares[b] && 
        squares[a] == squares[c])
        {
            return squares[a]
        }
} 
return null
}
const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [currentPlayer, setCureentPlayer] = useState <'X' | 'O'>(
        Math.round(Math.random() * 1) === 1 ? "X" : "O"
    );
    const [winner, setWinner] = useState<Player> (null)
    function reset () {
        setSquares(Array(9).fill(null))
        setWinner(null);
        setCureentPlayer (Math.round(Math.random() * 1) === 1 ? "X" : "O")
        
    }
    function SetSquareValue(index: number){
        const newData = squares.map((val, i) => {
            if(i === index) {
                return currentPlayer;
            }
            return val;
        });
        setSquares(newData)
        setCureentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
    useEffect(() => {
        const w =calculateWinner(squares)
        if(w) {
            setWinner(w)
        }

        if (!w && !squares.filter((Square) => !Square).length)
        {
            setWinner("Both")
        }
    })

    return <div>
        <p>Hey {currentPlayer},It's your Trun</p>
        {winner && winner !== "Both" && <p>Congratulations {winner}</p>}
        {winner && winner == "Both" && (<p>Congratulations you are both winner</p>) }
        <div className="grid">
       {Array(9).fill(null).map((_, i) =>{
        return (
        <Square
        winner={winner} 
        key={i}
        onClick={() => SetSquareValue(i) } 
        value={squares[i]}
        />
        )
       })}
    </div>
    <button className="reset" onClick={reset}>Reset</button>
    </div>
}
export default Board;