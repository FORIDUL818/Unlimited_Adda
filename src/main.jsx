import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '../public/Image/firebase.config.js'
import './App.css';
import './CustomCss/Login.css'
import './CustomCss/Header.css'
import store from '../src/Redux/Store.js'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
)
