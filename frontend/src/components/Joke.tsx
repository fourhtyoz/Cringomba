import React, { useState } from 'react';
import s from './Joke.module.css';
import JokeButton from './JokeButton';
import axios from 'axios';
import addFakeLaugh from '../utils/addFakeLaugh';

export default function Joke() {
    const [singleJoke, setSingleJoke] = useState('')
    const [twoPartJoke, setTwoPartJoke] = useState( {setup: null, delivery: null})

    const handleClick = async () => {
        try {
            const res: any = await axios.get('http://localhost:8000/')
            console.log(res)
            if (res.status === 200) {
              let joke: any = res.data
              if (joke) {
                console.log(joke)
                  if (joke.type === 'single') {
                      setTwoPartJoke({setup: null, delivery: null})
                      setSingleJoke(joke.joke)
                  } else if (joke.type === 'twopart') {
                      setTwoPartJoke(
                          {setup: joke.setup, 
                          delivery: joke.delivery}
                      )
                      setSingleJoke('')
                  }
              }
            }
          } catch (err) {
            console.log(err)
          }
    }

    return (
        <>
        <div className={s.container}>
            {singleJoke && <><p>{singleJoke}</p><p className={s.fakeLaugh}>{addFakeLaugh()}</p></>}
            {twoPartJoke.setup && <><p>{twoPartJoke.setup}</p><p className={s.punchLine}>{twoPartJoke.delivery}</p><p className={s.fakeLaugh}>{addFakeLaugh()}</p></>}
        </div>
        <JokeButton onClick={handleClick}/>
        </>
    )
}