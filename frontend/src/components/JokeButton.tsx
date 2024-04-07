import React from "react"
import s from './JokeButton.module.css'
import { useSelector } from "react-redux"
import { selectMode } from "../stores/selectors/selectors"
import cn from 'classnames';

export default function JokeButton({onClick}:{onClick:any}) {
    const mode = useSelector(selectMode)
    const darkMode = mode === 'dark'
    return (
        <div className={s.container}>
            <button onClick={onClick} className={cn(s.button, {[s.darkMode]: darkMode, [s.lightMode]: !darkMode})}>Сгенерировать анекдот</button>
        </div>
    )

}