import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import s from './App.module.css';
import Joke from './components/Joke';
import { ThemeProvider, createTheme, Switch, CssBaseline } from '@mui/material';

export default function App() {
  // TODO:
  // mobile
  // more jokes
  // like/dislike
  // login/logout
  // profile
  // premium jokes
  // express admin
  // translations
  // ai generated punchline
  // redux joke
  // dockerize
  // fullstack deploy

  const [toggleDarkMode, setToggleDarkMode] = useState(true);

  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  const darkTheme = createTheme({
    palette: {
      mode: toggleDarkMode ? 'dark' : 'light',
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
    <div className={s.wrapper}>
    <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
      <Header />
      <Joke darkMode={toggleDarkMode} />
      <Footer />
    </div>
    </ThemeProvider>
  );
};

