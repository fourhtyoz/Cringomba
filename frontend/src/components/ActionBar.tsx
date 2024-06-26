import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import s from './ActionBar.module.css';
import { GOOD_SYNONYMS, BAD_SYNONYMS } from '../constants/synonyms';
//@ts-ignore
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { useSelector } from 'react-redux';
import { selectMode } from '../stores/selectors/selectors';
import cn from 'classnames';

export default function ActionBar({text}:{text:any}) {

    const handleCopy = () => {
        alertify.message('Скопировано')
        return navigator.clipboard.writeText(text)
    }

    const handleLike = () => {
        alertify.success(GOOD_SYNONYMS[Math.floor(Math.random() * GOOD_SYNONYMS.length)])
    }

    const handleDislike = () => {
        alertify.error(BAD_SYNONYMS[Math.floor(Math.random() * BAD_SYNONYMS.length)]);
    }

    const mode = useSelector(selectMode)
    const darkMode = mode === 'dark'
    return (
        <div className={cn(s.container, {[s.darkMode]: darkMode, [s.lightMode]: !darkMode})}>
        <div onClick={handleDislike}><ThumbDownAltIcon fontSize='inherit' /></div>
        <div onClick={handleCopy}><ContentCopyIcon fontSize='inherit' /></div>
        <div onClick={handleLike}><ThumbUpIcon fontSize='inherit' /></div>
    </div>
    )
}