import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { Provider } from 'react-redux';
import store, { persistor } from './stores/store';
import { BrowserRouter } from 'react-router-dom';
import RouterPaths from './RouterPaths';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterPaths />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
