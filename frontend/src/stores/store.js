import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        mode: darkModeReducer
    }
})

function darkModeReducer(state = false, action) {
    if (action.type === 'changeMode') {
        const sessionStorageMode = sessionStorage.getItem('cringombaMode')
        if (sessionStorageMode) {
            if (sessionStorageMode === 'light') {
                sessionStorage.setItem('cringombaMode', 'dark')
                return 'dark'
            } else {
                sessionStorage.setItem('cringombaMode', 'light')
                return 'light'
            }
        }
    } else {
        const sessionStorageMode = sessionStorage.getItem('cringombaMode')
        if (sessionStorageMode) {
            return sessionStorageMode
        }
        const defaultMode = 'light'
        sessionStorage.setItem('cringombaMode', defaultMode)
        return defaultMode
    }
}