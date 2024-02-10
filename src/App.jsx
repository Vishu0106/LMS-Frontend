import { useEffect } from 'react'
import './App.css'
import{ toast} from 'react-hot-toast'
import Footer from './components/footer'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'

function App() {

  return (
    <Routes>

        <Route path='/' element={<Home/>}/>

    </Routes>
  )
}

export default App
