import React from "react"
import s from './Header.module.css'
import generateRandomColor from "../utils/randomColorGenerator"
import { useSelector } from "react-redux"
import { selectMode } from "../stores/selectors/selectors"

export default function Header() {
    const accentColor = '#' + generateRandomColor()
    const mode = useSelector(selectMode)
    const darkMode = mode === 'dark'
    return (
        <div className={s.container}>
            <h1 className={s.title}>Cringomba<span style={{ color: `${accentColor}` }}>!</span></h1>
            {!darkMode
            ? 
            <span className={s.subtitle}>Your source of hilarity</span>
            : 
            <span className={s.subtitleDark}>Your source of hilarity</span>}
        </div>
    )
}