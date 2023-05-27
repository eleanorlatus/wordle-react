import { useEffect, useState } from "react";
import Wordle from "./components/Wordle"
import Header from "./components/Header"

function App() {
  const [solution, setSolution] = useState(null)
  const [validWords, setValidWords] = useState(null)
  const [theme, setTheme] = useState('light');

    useEffect(() => {
      fetch('https://wordle-api.cyclic.app/words')
        .then(res => res.json())
        .then(json => {
          //random int between 0 & 14
          const randomSolution = json[Math.floor(Math.random() * json.length)]
          setSolution(randomSolution.word)
          setValidWords(json)
          console.log(`Solution: ${randomSolution.word}`)
        })
    }, [setSolution, setValidWords])

  return (
    <div className={`App ${theme}`}>
      <Header theme={theme} setTheme={setTheme} />
      {solution && <Wordle solution= {solution} validWords = {validWords} />}
    </div>
  );
}

export default App