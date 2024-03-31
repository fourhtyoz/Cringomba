import React from "react"
import s from './Header.module.css'
import generateRandomColor from "../utils/randomColorGenerator"
import { Switch } from "@mui/material"
import store from "../stores/store"

export default function Header() {
    const accentColor = '#' + generateRandomColor()
    const handleSwitch = () => {
        store.dispatch({type: 'darkmode'})
    }
    return (
        <div className={s.container}>
            <Switch onChange={handleSwitch}/>
            <h1 className={s.title}>Cringomba<span style={{ color: `${accentColor}` }}>!</span></h1>
            <span className={s.subtitle}>Your source of hilarity</span>
        </div>
    )
}