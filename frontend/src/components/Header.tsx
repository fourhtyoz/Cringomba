import React, { useState } from "react"
import s from './Header.module.css'
import generateRandomColor from "../utils/randomColorGenerator"
import { Switch, Modal, Box } from "@mui/material"
import store from "../stores/store"
import { useSelector } from "react-redux"
import { selectMode } from "../stores/selectors/selectors"
import { useForm, SubmitHandler } from "react-hook-form"
import { httpServer } from "../api/httpServer"
import axios from "axios"

type Inputs = {
    firstName: string
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}
type InputsLogin = {
    email: string,
    password: string,
}

export default function Header() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
                setOpenLogin(false)
            }
        } catch (e) {
            console.error(e)
        } 
    }

    const onSubmitTest = async () => {
        try {
            const res = await httpServer.get('/test')
            console.log(res)
        } catch (e) {
            console.error(e)
        }
    }

    const [open, setOpen] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const accentColor = '#' + generateRandomColor()
    const handleSwitch = () => {
        store.dispatch({type: 'changeMode'})
    }

    const handleOpenModal = () => {
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false)
    }

    const handleOpenLogin = () => {
        setOpenLogin(true)
    }

    const handleCloseLogin = () => {
        setOpenLogin(true)
    }

    const mode = useSelector(selectMode)
    const darkMode = mode === 'dark'
    return (
        <div className={s.container}>
            <Switch checked={darkMode} onChange={handleSwitch}/>
            {/* <button onClick={handleOpenModal}>Регистрация</button>

            <Modal open={open} onClose={handleCloseModal}>
                <Box className={s.box}>
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <label>First Name:</label>
                    <input {...register("firstName", { required: true })} />
                    {errors.firstName && <span>This field is required</span>}
                    
                    <label>Last Name:</label>
                    <input {...register("lastName", { required: true })} />
                    {errors.lastName && <span>This field is required</span>}
                    
                    <label>Email:</label>
                    <input {...register("email", { required: true })} />
                    {errors.email && <span>This field is required</span>}
                    
                    <label>Password:</label>
                    <input {...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>}
                    
                    <input type="submit" />
                </form>
                </Box>
            </Modal> */}

            <button onClick={handleOpenLogin}>Вход</button>
            <button onClick={onSubmitTest}>LOL</button>
            <Modal open={openLogin} onClose={handleCloseLogin}>
                <Box className={s.box}>
                <form className={s.form} onSubmit={handleSubmit(onSubmitLogin)}>
                    <label>Email:</label>
                    <input {...register("email", { required: true })} />
                    {errors.email && <span>This field is required</span>}
                    
                    <label>Password:</label>
                    <input {...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>}
                    
                    <input type="submit" />
                </form>
                </Box>
            </Modal>


            <h1 className={s.title}>Cringomba<span style={{ color: `${accentColor}` }}>!</span></h1>
            {!darkMode
            ? 
            <span className={s.subtitle}>Your source of hilarity</span>
            : 
            <span className={s.subtitleDark}>Your source of hilarity</span>}
        </div>
    )
}