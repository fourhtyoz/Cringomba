import React, { useEffect, useState } from 'react';
import s from './Joke.module.css';
import JokeButton from './JokeButton';
import addFakeLaugh from '../utils/addFakeLaugh';
import ActionBar from './ActionBar';
import { httpServer } from '../api/httpServer';
import { useSelector } from 'react-redux';
import { selectMode } from '../stores/selectors/selectors';


export default function Joke() {
    const [jokeText, setJokeText] = useState('')
    const mode = useSelector(selectMode)
    const darkMode = mode === 'dark'
    const handleClick = async () => {
        try {
            const res: any = await httpServer.get('/')
            if (res.status === 200) {
                setJokeText(res.data.randomJoke[0].text)
                const hash = localStorage.getItem('cringombaGeneratedJoke')
                if (hash) {
                    let newValue = String(parseInt(hash) + 1)
                    localStorage.setItem('cringombaGeneratedJoke', newValue)
                } else {
                    localStorage.setItem('cringombaGeneratedJoke', '1')
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    // TODO: subscribe to the website modal
    useEffect(() => {
        let hash: string | null = localStorage.getItem('cringombaGeneratedJoke')
        if (hash && parseInt(hash) >= 3) {
            localStorage.removeItem('cringombaGeneratedJoke')
        }
        }, [jokeText])

    return (
        <>
            <div className={s.container}>
                {jokeText 
                ? 
                    <>
                        <p>{jokeText}</p>
                        <p className={s.fakeLaugh}>{addFakeLaugh()}</p>
                    </> 
                : 
                    <p>Нажми на кнопку, чтобы получить ржачный анекдот!</p>
                }

                {jokeText && <ActionBar text={jokeText} />}
            </div>
            <JokeButton darkMode={darkMode} onClick={handleClick}/>
        </>
    )
}