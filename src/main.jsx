import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { Provider } from 'react-redux'

import './index.css'
import store from './redux/store.js'



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
    <BrowserRouter>
    <App />
    <Toaster />
    </BrowserRouter>
    </Provider>
 
)
