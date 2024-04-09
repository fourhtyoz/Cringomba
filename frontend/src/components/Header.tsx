import React from "react"
import s from './Header.module.css'
import generateRandomColor from "../utils/randomColorGenerator"
import { useSelector } from "react-redux"
import { selectMode } from "../stores/selectors/selectors"
import cn from 'classnames';
import { Link } from "react-router-dom"

export default function Header() {
    const accentColor = '#' + generateRandomColor()
    const mode = useSelector(selectMode)
    const darkMode = mode === 'dark'
    return (
        <div className={s.container}>
           <h1 className={s.title}>Cringomba<span style={{ color: `${accentColor}` }}>!</span></h1>
            <span className={cn(!darkMode ? s.subtitle : s.subtitleDark)}>Your source of hilarity</span>
        </div>
    )
}