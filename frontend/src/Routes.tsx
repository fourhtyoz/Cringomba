import React from "react"
import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectMode } from "./stores/selectors/selectors";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import MainPage from "./components/pages/MainPage";
import ProfilePage from "./components/pages/ProfilePage";
import AboutPage from "./components/pages/AboutPage";
import PageNotFound from "./components/pages/PageNotFound";

export default function AllRoutes() {

    const mode = useSelector(selectMode)
    const darkTheme = createTheme({
    palette: {
      mode: mode === 'dark' ? 'dark' : 'light',
      primary: {
        main: '#FFA500',
      },
      secondary: {
        main: '#131052',

      },
    },
  });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </ThemeProvider>
    )
}