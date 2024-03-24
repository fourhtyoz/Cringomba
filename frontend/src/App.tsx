import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import s from './App.module.css';
import Joke from './components/Joke';

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

  return (
    <div className={s.wrapper}>
      <Header />
      <Joke />
      <Footer />
    </div>
  );
};

