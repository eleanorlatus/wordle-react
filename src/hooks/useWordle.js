import {useState} from 'react'
const [turn, setTurn] = useState(0) 
const [currentGuess, setCurrentGuess] = useState('')
const [guesses, setGuesses] = useState([]) // each guess is an array
const [history, setHistory] = useState([]) // each guess is a string
const [isCorrect, setIsCorrect] = useState(false)

const useWordle = (solution) => {
    

    // format a guess into an array of letter objects
    const formatGuess = () => {

    }

    //add a new guess to the guesses state (guess history)
    const addNewGuess = () => {

    }

    //track typing and submit guess
    const handleKeyUp = () => {

    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyUp}

}

export default useWordle