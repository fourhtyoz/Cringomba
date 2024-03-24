import React, { useState } from 'react';
import s from './Joke.module.css';
import JokeButton from './JokeButton';
import addFakeLaugh from '../utils/addFakeLaugh';
import ActionBar from './ActionBar';
import { httpServer } from '../api/httpServer';


export default function Joke() {
    const [jokeText, setJokeText] = useState('')

    const handleClick = async () => {
        try {
            const res: any = await httpServer.get('/')
            if (res.status === 200) {
                setJokeText(res.data.randomJoke[0].text)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
        <div className={s.container}>
            {jokeText && <><p>{jokeText}</p><p className={s.fakeLaugh}>{addFakeLaugh()}</p></>}
            {jokeText && <ActionBar text={jokeText} />}
        </div>
        <JokeButton onClick={handleClick}/>
        </>
    )
}