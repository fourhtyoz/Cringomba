import { FUNNY_JOKE } from "../constants/synonyms"

export default function addFakeLaugh():string {
    return FUNNY_JOKE[Math.floor(Math.random() * FUNNY_JOKE.length)]
}