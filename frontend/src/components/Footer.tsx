import { useSelector } from 'react-redux';
import s from './Footer.module.css';
import { selectMode } from '../stores/selectors/selectors';
import cn from 'classnames';

export default function Footer() {
    const mode = useSelector(selectMode)
    const darkMode = mode === 'dark'
    return (
        <div className={s.container}>
            <p>Created by <a className={cn(s.link, {[s.darkMode]: darkMode, [s.lightMode]: !darkMode})}href='https://github.com/fourhtyoz' target='_blank' rel="noreferrer">Boris T.</a></p>
            <p>Cringomba! 2024</p>
        </div>
    )
}