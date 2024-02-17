import { useEffect } from 'react'
import './App.css'
import{ toast} from 'react-hot-toast'
import Footer from './components/footer'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import ContactUs from './pages/ContactUs'

function App() {

  return (
    <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/contact' element={<ContactUs />}/>
        <Route path='*' element={<NotFound />}/>

    </Routes>
  )
}

export default App
