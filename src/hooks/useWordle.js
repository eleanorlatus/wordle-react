import {useState} from 'react'

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0) 
    const [guesses, setGuesses] = useState([]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [currentGuess, setCurrentGuess] = useState('')

    // format a guess into an array of letter objects
    const formatGuess = () => {
        console.log(`Formatting guess- ${currentGuess}`)
    }

    //add a new guess to the guesses state (guess history)
    const addNewGuess = () => {

    }

    //track typing and submit guess
    const handleKeyUp = ({ key }) => {
        if(key === 'Enter'){
            if(turn > 5){
                console.log("You've used all your guesses!")
                return
            }
            if(history.includes(currentGuess)){
                console.log("You've already guessed this word!")
                return
            }
            if(currentGuess.length !== 5){
                console.log("Word must be 5 letters long")
                return
            }

            formatGuess()
        }

        if(key === 'Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        if(/^[A-za-z]$/.test(key)){
            if(currentGuess.length < 5){
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyUp}

}

export default useWordle