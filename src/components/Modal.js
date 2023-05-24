import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
  return (
    <div className="modal">
        {isCorrect && (
            <div>
                <h1>You win!</h1>
                <p>The solution is: <span className="solution">{solution}</span></p>
                <p>You found the solution in {turn} {turn === 1 ? "guess" : "guesses"} :)</p>
                <p>Refresh the page to play again</p>
            </div>
        )}
        {!isCorrect && (
            <div>
                <h1>Nevermind!</h1>
                <p>The solution is: <span className="solution">{solution}</span></p>
                <p>Better luck next time :)</p>
                <p>Refresh the page to play again</p>
            </div>
        )}
    </div>
  )
}
