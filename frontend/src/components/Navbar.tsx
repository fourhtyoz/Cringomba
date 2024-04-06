
import React, { useState } from "react";
import { Modal, Box, Switch } from "@mui/material";
import { useForm } from "react-hook-form";
import s from './Navbar.module.css'
import { httpServer } from "../api/httpServer";
import store from "../stores/store";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectMode, selectUser } from "../stores/selectors/selectors";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { 
            errors 
        },
      } = useForm()


    const onSubmitSignUp = async (data) => {
        try {
            const res = await httpServer.post('/register', data)
            if (res.status === 200) {
                setOpen(false)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const onSubmitLogin = async (data) => {
        try {
            const res = await httpServer.post('/login', data)
            if (res.status === 200) {
                const token = res.data.token
                if (token) {
                    localStorage.setItem('access_token', token)
                }
                store.dispatch({type: 'user/login', payload: res.data.user})
                setOpen(false)
            }
            console.log(res)
        } catch (e) {
            console.error(e)
        } 
    }

    const handleLogin = () => {
        setOpen(true)
    }

    const handleLogout = () => {
        store.dispatch({type: 'user/logout'})
        localStorage.removeItem('access_token')
    }

    const handleSwitch = () => {
        store.dispatch({type: 'mode/change'})
    }
    const user = useSelector(selectUser)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const mode = useSelector(selectMode)
    const darkMode = mode === 'dark'
    return (
        <div className={s.wrapper}>
        {isLoggedIn ? user.email : <span>Guest</span>}
        <Switch className={s.switcher} checked={darkMode} onChange={handleSwitch}/>
        {!isLoggedIn && <button onClick={handleLogin}>Вход</button>}
        {isLoggedIn && <button onClick={handleLogout}>Выход</button>}
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box className={s.box}>
            <form className={s.form} onSubmit={handleSubmit(onSubmitLogin)}>
                <label>Email:</label>
                <input {...register("email", { required: true })} />
                {errors.email && <span>This field is required</span>}
                
                <label>Пароль:</label>
                <input type="password" {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}
                
                <input value='Войти' type="submit" />
            </form>
            </Box>
        </Modal>
        </div>
    )
}