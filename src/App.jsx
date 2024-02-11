import { useEffect } from 'react'
import './App.css'
import{ toast} from 'react-hot-toast'
import Footer from './components/footer'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import NotFound from './pages/NotFound'

function App() {

  return (
    <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='*' element={<NotFound />}/>

    </Routes>
  )
}

export default App
