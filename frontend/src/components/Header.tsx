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
        store.dispatch({type: ''})
    }
    const mode = useSelector(selectMode)
    return (
        <div className={s.container}>
            <Switch onChange={handleSwitch}/>
            <h1 className={s.title}>Cringomba<span style={{ color: `${accentColor}` }}>!</span></h1>
            {!mode 
            ? 
            <span className={s.subtitle}>Your source of hilarity</span>
            : 
            <span className={s.subtitleDark}>Your source of hilarity</span>}
        </div>
    )
}