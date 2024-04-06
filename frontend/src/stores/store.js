import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const initialState = {
    mode: 'light',
    user: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'user/login':
            return {
                ...state,
                user: action.payload
            }
        case 'user/logout':
            return {
                ...state,
                user: {}
            }
        case 'mode/change':
            const sessionStorageMode = sessionStorage.getItem('cringombaMode')
            if (sessionStorageMode) {
                if (sessionStorageMode === 'light') {
                    sessionStorage.setItem('cringombaMode', 'dark')
                    return {
                        ...state,
                        mode: 'dark'
                    }
                } else {
                    sessionStorage.setItem('cringombaMode', 'light')
                    return {
                        ...state,
                        mode: 'light'
                    }
                } 
            } else {
                const sessionStorageMode = sessionStorage.getItem('cringombaMode')
                if (sessionStorageMode) {
                    return {
                        ...state,
                        mode: sessionStorageMode
                    }
                } else {
                    sessionStorage.setItem('cringombaMode', 'light')
                    return {
                        ...state,
                        mode: 'light'
                    }
                }
            }
        default: 
            return {
                ...state,
            }
    }
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'user/login':
            return {
                ...state,
                user: action.payload
            }
        case 'user/logout':
            return {
                ...state,
                user: {}
            }
        default: 
            return {
                ...state,
                user: {}
            }
    }
} 

const preloadedState = {}
const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
)
const store = configureStore({
    reducer: persistedReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'development',
    preloadedState,
    enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers({
      autoBatch: false,
    })
})
export const persistor = persistStore(store)
export default store;