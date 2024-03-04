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
import Denied from './pages/Denied'
import CourseList from './pages/course/CourseList'
import CourseDescription from './pages/course/CourseDescription'
import CreateCourse from './pages/course/CreateCourse'
import RequireAuth from './components/Auth/RequireAuth'
import Profile from './pages/User/Profile'
import EditProfile from './pages/User/EditProfile'
import Checkout from './pages/Payment/Checkout'
import CheckoutSuccess from './pages/Payment/CheckoutSuccess'
import CheckoutFail from './pages/Payment/CheckoutFail'
import DisplayLecture from './pages/Dashboard/DisplayLecture'
import AddLecture from './pages/Dashboard/AddLecture'
import AdminDashboard from './pages/Dashboard/AdminDashboard'

function App() {

  return (
    <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/contact' element={<ContactUs />}/>
        <Route path='/denied' element={<Denied/>}/>
        <Route path='/courses' element={<CourseList />}></Route>
        <Route path='/course/description' element={<CourseDescription />} />
        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
        <Route path='/user/profile' element={<Profile />}/> 
        <Route path='/user/editprofile' element={<EditProfile />}/>
        <Route path='/checkout' element={<Checkout />}/>
        <Route path='/checkout/success' element={<CheckoutSuccess />}/>
        <Route path='/checkout/fail' element={<CheckoutFail />}/>
        <Route path='/course/displayLectures' element={<DisplayLecture />}/>
        <Route path='/course/addlecture' element={<AddLecture />}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
          <Route path='/course/create' element={<CreateCourse />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />}/>
        </Route>
        <Route path='*' element={<NotFound />}/>

    </Routes>
  )
}

export default App
