
import React, { useState } from "react";
import { Modal, Switch } from "@mui/material";
import { useForm } from "react-hook-form";
import s from './Navbar.module.css'
import { httpServer } from "../api/httpServer";
import store from "../stores/store";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectMode, selectUser } from "../stores/selectors/selectors";
import cn from 'classnames';

export default function Navbar() {
    const [registrationOpen, setRegistrationOpen] = useState(false)
    const [loggingInOpen, setLoggingInOpen] = useState(false);
    const {
        register: login,
        handleSubmit: handleSubmitLogin,
      } = useForm()

    const {
        register: signup,
        handleSubmit: handleSubmitSignUp,
      } = useForm()


    const onSubmitSignUp = async (data) => {
        try {
            const res = await httpServer.post('/register', data)
            if (res.status === 200) {
                store.dispatch({type: 'user/login', payload: res.data.user})
                setRegistrationOpen(false)
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
                setLoggingInOpen(false)
            }
            console.log(res)
        } catch (e) {
            console.error(e)
        } 
    }

    const handleRegistrationClick = () => {
        setLoggingInOpen(false)
        setRegistrationOpen(true)
    }

    const handleLogin = () => {
        setLoggingInOpen(true)
        setRegistrationOpen(false)
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
        {isLoggedIn ? `Добро пожаловать, ${user.firstName} ${user.lastName}` : <span>Привет, гость</span>}
        <Switch className={s.switcher} checked={darkMode} onChange={handleSwitch}/>
        {!isLoggedIn && <button onClick={handleLogin}>Вход</button>}
        {isLoggedIn && <button onClick={handleLogout}>Выход</button>}

        <Modal open={loggingInOpen} onClose={() => setLoggingInOpen(false)}>
            <div className={cn(s.box, {[s.darkMode]: darkMode, [s.lightMode]: !darkMode})}>
                <h1>Авторизация:</h1>
                <form className={s.form} onSubmit={handleSubmitLogin(onSubmitLogin)}>
                    <label>Email:</label>
                    <input {...login("email", { required: true })} />
                    {/* {errors.email && <span>This field is required</span>} */}
                    
                    <label>Пароль:</label>
                    <input type="password" {...login("password", { required: true })} />
                    {/* {errors.password && <span>This field is required</span>} */}
                    <input value='Войти' type="submit" />
                </form>
                <span>Если у вас еще не аккаунта, вы можете его создать -&nbsp;</span>
                <span className={cn(s.link, {[s.darkModeText]: darkMode, [s.lightModeText]: !darkMode})} 
                onClick={handleRegistrationClick}>зарегистрироваться</span>
            </div>
        </Modal>

        <Modal open={registrationOpen} onClose={() => setRegistrationOpen(false)}>
            <div className={cn(s.box, {[s.darkMode]: darkMode, [s.lightMode]: !darkMode})}>
                <h1>Регистрация:</h1>
                <form className={s.form} onSubmit={handleSubmitSignUp(onSubmitSignUp)}>
                    <label>Имя:</label>
                    <input {...signup("firstName", { required: true })} />
                    {/* {errors.firstName && <span>This field is required</span>} */}

                    <label>Фамилия:</label>
                    <input {...signup("lastName", { required: true })} />
                    {/* {errors.lastName && <span>This field is required</span>} */}

                    <label>Email:</label>
                    <input {...signup("email", { required: true })} />
                    {/* {errors.email && <span>This field is required</span>} */}
                    
                    <label>Пароль:</label>
                    <input type="password" {...signup("password", { required: true })} />
                    {/* {errors.password && <span>This field is required</span>} */}

                    <label>Повторите пароль:</label>
                    <input type="password" {...signup("password", { required: true })} />
                    {/* {errors.password && <span>This field is required</span>} */}
                    <input value='Создать аккаунт' type="submit" />
                </form>
            </div>
        </Modal>

        </div>
    )
}