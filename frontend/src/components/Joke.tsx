import React, { useState } from 'react';
import s from './Joke.module.css';
import JokeButton from './JokeButton';
import axios from 'axios';
import addFakeLaugh from '../utils/addFakeLaugh';

export default function Joke() {
    const [jokeText, setJokeText] = useState('')

    const handleClick = async () => {
        try {
            const res: any = await axios.get('http://localhost:8000/')
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
        </div>
        <JokeButton onClick={handleClick}/>
        </>
    )
}