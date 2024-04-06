import React from "react"
import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectMode } from "./stores/selectors/selectors";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import MainPage from "./components/pages/MainPage";
import ProfilePage from "./components/pages/ProfilePage";
import AboutPage from "./components/pages/AboutPage";
import PageNotFound from "./components/pages/PageNotFound";

export default function RouterPaths() {
    const mode = useSelector(selectMode)
    const darkTheme = createTheme({
      components: {
        MuiSwitch: {
          styleOverrides: {
            track: {
              backgroundColor: '#d3d3d3',
            }
          }
        }
      },
      palette: {
        mode: mode === 'dark' ? 'dark' : 'light',
        primary: { main: '#fAA50A'},
      }
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