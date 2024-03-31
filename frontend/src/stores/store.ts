import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        mode: darkModeReducer
    }
})

function darkModeReducer(state = false, action: any) {
    if (action.type === 'darkmode') {
        return !state
    }
    return state
} 