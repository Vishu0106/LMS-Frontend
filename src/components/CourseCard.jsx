import { Link, useNavigate } from "react-router-dom";
import vishwaSir from '../assets/images/Vishwasir.jpg'
import { IoArrowForward } from "react-icons/io5";

function CourseCard({data}) {

    const navigate = useNavigate();

    return(
        <div>
            

<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg" src={data?.thumbnail?.secure_url} alt="Thumbnial" />
    <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data?.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data?.description}</p>
        <Link onClick={() => navigate("/course/description", {state: {...data}})} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
            Explore Course <IoArrowForward className="rtl:rotate-180 w-4 h-4 pt-1" ></IoArrowForward>
        </Link>

    </div>
</div>

        </div>
    )
}

export default CourseCard;