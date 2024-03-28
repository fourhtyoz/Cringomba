import React from "react"
import s from './JokeButton.module.css'

export default function JokeButton({darkMode, onClick}:{darkMode:boolean, onClick:any}) {
    return (
        <div className={s.container}>
            {darkMode 
            ? <button onClick={onClick} className={s.button} style={{backgroundColor: '#FFA500', color: '#000000'}}>Сгенерировать анекдот</button>
            : <button onClick={onClick} className={s.button}>Сгенерировать анекдот</button>}
        </div>
    )

}