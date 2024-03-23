import React from "react"
import s from './Header.module.css'
import generateRandomColor from "../utils/randomColorGenerator"

export default function Header() {
    const accentColor = '#' + generateRandomColor()
    return (
        <div className={s.container}>
            <h1 className={s.title}>Cringomba<span style={{ color: `${accentColor}` }}>!</span></h1>
            <span className={s.subtitle}>Your source of hilarity</span>
        </div>
    )
}