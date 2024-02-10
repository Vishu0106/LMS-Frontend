import Footer from "../components/footer";
import {FiMenu} from 'react-icons/fi'
import { Link } from "react-router-dom";
import {AiFillCloseCircle} from 'react-icons/ai'
import { BsFillUsbCFill } from "react-icons/bs";
function HomeLayout({ children }) {

    function chageWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }
    function closeDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';

    }
    return(
        <div className="min-h-[90vh] ">
            <div className="drawer absolute left-0 z-50 w-full">
                <input id='my-drawer' type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer">
                        <FiMenu onClick={chageWidth} size={"32px"} className="font-bold text-white m-4"/>
                    </label>
                </div>
                <div className="drawer-side w-0 transition-all ease-in-out duration-300">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-40 sm:w-80 bg-base-200 text-base-content relative">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={closeDrawer}>
                            <AiFillCloseCircle size={24}/>
                            </button>
                        </li>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        <li>
                            <Link to='/contact'>Contact</Link>
                        </li>
                        <li>
                            <Link to='/courses'>Courses</Link>
                        </li>
                    </ul>
                </div>
            </div>  
            {children}
            <Footer/>         
        </div>
    );
}

export default HomeLayout;