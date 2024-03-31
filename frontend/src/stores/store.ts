import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        mode: darkModeReducer
    }
})

function darkModeReducer(state = false, action: any) {
    if (action.type === 'darkmode') {
        console.log(1)
        return !state
    }
    console.log(2)
    return state
} 