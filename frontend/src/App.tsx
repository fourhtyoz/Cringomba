import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import s from './App.module.css';
import Joke from './components/Joke';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectMode } from './stores/selectors/selectors';

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
  // redux
  // dockerize
  // fullstack deploy

  const mode = useSelector(selectMode)
  console.log(mode)
  const darkTheme = createTheme({
    palette: {
      mode: mode === 'dark' ? 'dark' : 'light',
      primary: {
        main: '#FFA500',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className={s.wrapper}>
        <Header />
        <Joke />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

