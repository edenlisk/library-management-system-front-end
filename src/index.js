import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import  globalReducer  from './states/slice';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import authReducer from './states/authSlice';
import { apiSlice } from './states/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const store= configureStore({
  reducer:{
    global:globalReducer,
    auth: authReducer,
    [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),
})
setupListeners(store.dispatch)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>

  </React.StrictMode>
);


