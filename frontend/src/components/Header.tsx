import React from "react"
import s from './Header.module.css'
import generateRandomColor from "../utils/randomColorGenerator"
import { Switch } from "@mui/material"
import store from "../stores/store"
import { useSelector } from "react-redux"
import { selectMode } from "../stores/selectors/selectors"

export default function Header() {
    const accentColor = '#' + generateRandomColor()
    const handleSwitch = () => {
        store.dispatch({type: 'changeMode'})
    }
    const mode = useSelector(selectMode)
    const darkMode = mode === 'dark'
    return (
        <div className={s.container}>
            <Switch checked={darkMode} onChange={handleSwitch}/>
            <h1 className={s.title}>Cringomba<span style={{ color: `${accentColor}` }}>!</span></h1>
            {!darkMode
            ? 
            <span className={s.subtitle}>Your source of hilarity</span>
            : 
            <span className={s.subtitleDark}>Your source of hilarity</span>}
        </div>
    )
}