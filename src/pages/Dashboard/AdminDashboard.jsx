import HomeLayout from '../../layouts/HomeLayout.jsx';
import { ArcElement,  BarElement, CategoryScale, Chart as ChartJS, Legend,LinearScale, Title , Tooltip } from 'chart.js';
import {Bar,Pie} from 'react-chartjs-2';
import {FcSalesPerformance} from 'react-icons/fc';
import {GiMoneyStack} from 'react-icons/gi';
import {FaUsers} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { deleteCourse, getAllCourses } from '../../redux/slices/courseSlice.js';
import { useEffect } from 'react';
import { getPaymentRecord } from '../../redux/slices/razorPaySlice.js';
import { fetchUserStats } from '../../redux/slices/userStatsSlice.js';
import { BsCollectionPlayFill } from 'react-icons/bs';
ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {allUsersCount , subscriberCount} = useSelector(state => state.userStats);
    console.log("redering pi",allUsersCount, subscriberCount)
    const {allPayments, monthlySalesRecord} = useSelector(state => {
        console.log("payment Admin",state.razorpay);
        return state.razorpay;
    });
    console.log("paymenst admin",allPayments, monthlySalesRecord);

    const userData = {
        labels: ["Registered User", "Enrolled User"],
        fontColor: "white",
        datasets: [
            {
                label: "User Details",
                data: [allUsersCount, subscriberCount],
                backgroundColor: ["yellow", "green"],
                borderWidth: 1,
                borderColor: ["yellow","green"]
            },
        ]
    };

    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        fontColor: 'white',
        datasets:[
            {
                label: 'sales / Month',
                data: monthlySalesRecord,
                backgroundColor:['red'],
                borderColor:['white'],
                borderWidth:2
            }
        ]
    };

    const myCourses = useSelector(state => state?.course?.courseList);

    console.log("redering",myCourses)

    async function onCourseDelete(courseId) {
        if(window.confirm('Are you sure to delete this course?')){
            const response = await dispatch(deleteCourse(courseId));
            if(response?.success){
               await dispatch(getAllCourses());
            }
            window.location.reload();
        }
    }

    useEffect(()=>{
        (async () => {
            await dispatch(getAllCourses());
            await dispatch(fetchUserStats());
            await dispatch(getPaymentRecord());
        })();
    },[]);

  return (
    <HomeLayout>
        <div className='min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white'>
            <h1 className='text-center text-5xl font-semibold text-yellow-500'>
                Admin Dashboard
            </h1>

            <div className='grid grid-col-2 gap-5 m-auto mx-10'>
                <div className='flex flex-xol items-center justify-center gap-10 p-5 shadow-lg'>
                    <div className='w-80 h-80'>
                        <Pie data={userData}/>
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                            <div className='flex flex-col items-center'>
                                <p className='font-semibold'>Registred Users</p>
                                <h3 className='text-4xl font-bold'>{allUsersCount}</h3>
                            </div>
                            <FaUsers className='text-yellow-500 text-5xl'/>
                        </div>
                        <div className='flex  items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                            <div className='flex flex-col items-center'>
                                <p className='font-semibold'>Subscribed Users</p>
                                <h3 className='text-4xl font-bold'>{subscriberCount}</h3>
                            </div>
                            <FaUsers className='text-green-500 text-5xl' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-10 p-5 shadow-lg rounded-md'>
                    <div className='h-80 w-full relative'>
                        <Bar className='absolute bottom-0 h-80 w-full' data={salesData}/>
                    </div>
                    <div className='grid grid-cols-2 gap-5'>
                        <div className='flex items-center justify-between p-5 gap-5'>
                            <div className='flex flex-col items-center'>
                                <p className='font-semibold'>Subscription Count</p>
                                <h3 className='text-4xl font-bold'>{allPayments?.count}</h3>
                            </div>
                            <FcSalesPerformance  className='text-yellow-500 text-5xl'/>
                        </div>
                        <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                            <div className='flex flex-col items-center'>
                                <p className='font-semibold'>Total Revenue</p>
                                <h3 className='text-4xl font-bold'>{allPayments?.count * 499}</h3>
                            </div>
                            <GiMoneyStack className='text-green-500 text-5xl'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10'>
                <div className='flex w-full items-center justify-between'>
                    <h1 className='text-center text-3xl font-semibold'>
                        Course overview
                    </h1>
                    <button
                        onClick={()=>{
                            navigate('/course/create');
                        }}
                        className='w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer'>
                            Create new course
                    </button>
                </div>
                <table className='table overflow-x-scroll'>
                        <thead>
                            <tr>
                                <th>S No</th>
                                <th>Course Title</th>
                                <th>Course Category</th>
                                <th>Instructor</th>
                                <th>Total Lectures</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myCourses?.map((course, index) => {
                                return (
                                    <tr key={course._id}>
                                        <td>{index+1}</td>
                                        <td>
                                            <textarea 
                                            readOnly 
                                            value={course?.title}
                                            className='w-40 h-auto bg-transparent resize-none'>   
                                            </textarea>
                                        </td>
                                        <td>
                                            {course?.category}
                                        </td>
                                        <td>
                                            {course?.createdBy}
                                        </td>
                                        <td>
                                            {course?.numberOfLectures}
                                        </td>
                                        <td
                                        className='max-w-28 overflow-hidden text-ellipsis whitespace-nowrap'>
                                            <textarea
                                            value={course?.description} 
                                            readOnly
                                            className='w-80 h-auto bg-transparent resize-none'>
                                            </textarea>
                                        </td>
                                        <td className='flex items-center gap-4'>
                                            <button
                                            className='bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-500 text-xl py-2 px-4 rounded-md font-bold'
                                            onClick={()=>{
                                                navigate('/course/displaylectures',{state:{...course}})
                                            }}>
                                               <BsCollectionPlayFill /> 
                                            </button>
                                            <button
                                            className='bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-500 text-xl py-2 px-4 rounded-md font-bold'
                                            onClick={()=>{
                                                onCourseDelete(course?._id);
                                            }}>
                                                Delete Course
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                </table>
            </div>
        </div>
    </HomeLayout>
  );
}

export default AdminDashboard;