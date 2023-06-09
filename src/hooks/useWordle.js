import {useState} from 'react'

const useWordle = (solution, validWords) => {
    const [turn, setTurn] = useState(0) 
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})

    // format a guess into an array of letter objects
    const formatGuess = () => {
        let solutionArray = [...solution]        
        let formattedGuess = [...currentGuess].map((letter)=>{
            return {key:letter, color: "grey"}
        })

        // find green letters
        formattedGuess.forEach((letter, i) => {
            if(solutionArray[i] === letter.key){
                formattedGuess[i].color = "green"
                solutionArray[i] = null
            }
        })

        // find yellow letters
        formattedGuess.forEach((letter, i) => {
            if(solutionArray.includes(letter.key) && letter.color !== "green"){
                formattedGuess[i].color = "yellow"
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })

        return formattedGuess
    }

    //add a new guess to the guesses state (guess history)
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) =>{
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) =>{
            return prevTurn + 1
        })
        setUsedKeys((prevUsedKeys) =>{
            let newKeys = {...prevUsedKeys}
            formattedGuess.forEach((letter) =>{
                const currentColor = newKeys[letter.key]
                if(letter.color === "green"){
                    newKeys[letter.key] = "green"
                    return
                }
                if(letter.color === "yellow" && currentColor !== "green"){
                    newKeys[letter.key] = "yellow"
                    return
                }
                if(letter.color === "grey" && currentColor !== "green" && currentColor !== "yellow"){
                    newKeys[letter.key] = "grey"
                    return
                }
            })
            return newKeys
        })
        setCurrentGuess('')
    }

    //track typing and submit guess
    const handleKeyUp = ({ key }) => {
        if(key === 'Enter'){
            if(turn > 5){
                console.log("You've used all your guesses!")
                return
            }

            if(history.includes(currentGuess)){
                document.querySelector('#error').innerText = "You've already guessed this word!"
                setTimeout(function(){
                    document.querySelector("#error").innerHTML = '';
                }, 2500);
                return
            }

            if(currentGuess.length !== 5){
                document.querySelector('#error').innerText = "Word must be 5 letters long"
                setTimeout(function(){
                    document.querySelector("#error").innerHTML = '';
                }, 2500);
                return
            }
            
            //check if currentGuess is a real word using dictionary API
            const resultChecker = async () => {
                const result = await invalidResult(currentGuess)
                if(result){
                    document.querySelector('#error').innerText = "Invalid word, try a different word"
                    setTimeout(function(){
                        document.querySelector("#error").innerHTML = '';
                    }, 2500);
                }else{
                    const formatted = formatGuess()
                addNewGuess(formatted)
                }
              }
                
              resultChecker()
            
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

    // check for valid guess
    async function invalidResult(currentGuess) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentGuess}`, {});
        const json = await response.json();
        if(json.title === "No Definitions Found"){
            return true
        }
    }

    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp }

}

export default useWordle