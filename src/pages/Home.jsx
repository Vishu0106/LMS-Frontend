import HomeLayout from "../layouts/HomeLayout.jsx";
import { Link } from "react-router-dom";
import homeMainImage from '../assets/images/homePageMainImage.png'

function Home() {
    return(

        <HomeLayout>
            <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
                <div className="w-1/2 space-y-6">
                    <h1 className="text-5xl font-semibold">Fond out best <span className="text-yellow-500 font-bold">Online Courses</span></h1>
                    <p className="text-xl text-gray-200">
                        we have large library of course taught by highly skilled qualified facultites at very affordable cost
                    </p>
                    <div className="space-x-6">
                        <Link to='/courses'>
                            <button className="bg-yellow-500 py-3 px-5 rounded-md font-semibold text-lg cursor-pointer
                            hover:bg-yellow-600 transition-all ease-in-out">
                                Explore courses
                            </button>
                        </Link>
                        <Link to='/contact'>
                            <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer">
                                Contact Us
                            </button>
                        </Link>
                    </div>                   
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <img src={homeMainImage} alt="Home-Image" />
                </div>
            </div>
        </HomeLayout>
    )
}

export default Home;