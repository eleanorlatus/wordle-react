import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle( { solution, validWords }) {
    const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys} = useWordle(solution, validWords)
    const [showModal, setShowModal] = useState(false)
    useEffect(()=> {
        window.addEventListener('keyup', handleKeyUp)

        if(isCorrect){
          setTimeout(() => setShowModal(true), 2500)
          window.removeEventListener('keyup', handleKeyUp)
        }

        if(turn > 5){
          setTimeout(() => setShowModal(true), 2500)
          window.removeEventListener('keyup', handleKeyUp)
        }

        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [handleKeyUp, isCorrect, turn])

  return (
    <>
    <div id='error'></div>
    <Grid currentGuess = {currentGuess} guesses={guesses} turn={turn}/>
    <Keypad usedKeys = {usedKeys}/>
    {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
    </>
  )
}
