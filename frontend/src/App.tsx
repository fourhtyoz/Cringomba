import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import s from './App.module.css';
import Joke from './components/Joke';

export default function App() {
  

  return (
    <div className={s.wrapper}>
      <Header />
      <Joke />
      <Footer />
    </div>
  );
};

