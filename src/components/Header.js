import React from 'react'
import DarkMode from './DarkMode/DarkMode'

export default function Header({theme, setTheme}) {
  return (
    <div className="header">
        <DarkMode theme={theme} setTheme={setTheme}/>
        <h1>Wordle</h1>
    </div>
  )
}
