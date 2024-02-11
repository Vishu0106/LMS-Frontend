import { useEffect } from 'react'
import './App.css'
import{ toast} from 'react-hot-toast'
import Footer from './components/footer'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'

function App() {

  return (
    <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<AboutUs/>}/>

    </Routes>
  )
}

export default App
