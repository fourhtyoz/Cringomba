import React from "react"
import s from './JokeButton.module.css'

export default function JokeButton({onClick}:{onClick:any}) {

    return (
        <div className={s.container}>
        <button onClick={onClick} className={s.button}>
            Сгенерировать новую шутку!
        </button>
        </div>
    )

}