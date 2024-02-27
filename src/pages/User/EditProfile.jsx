import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfile, updateProfile } from "../../redux/slices/authSlice";
import HomeLayout from "../../layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function EditProfile() {

    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const [data, setData] = useState({  
        fullName: "",
        previewImage: "",
        avatar: undefined,
        userId: useSelector((state) => state?.auth?.data?.user?._id)
    });

    function handleImageUpload(e) {
        e.preventDefault();

        const uploadedImage = e.target.files[0];
        if(uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function() {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                });
            })
        }
    }

    function handleInputeChange(e) {
        e.preventDefault();
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if(!data.avatar || !data.fullName) {
            toast.error("All fileds are mandatory");
            return;
        }
        if(data.fullName.length < 5) {
            toast.error("Full name should be atleast 5 characters long");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar); 
        await dispatch(updateProfile(formData));
        await dispatch(fetchProfile());
        navigate('/user/profile');
    }

  return (
    <HomeLayout>
        <div className="flex items-center justify-center h-[90vh]">
            <form
            onSubmit={onFormSubmit}
            className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
            >
                <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
                <label className="cursor-pointer" htmlFor="image_upload">{
                    data.previewImage ? 
                    (<img src={data.previewImage} className="w-20 h-20 m-auto rounded-full border border-black" />) :
                    (<BsPersonCircle className="w-28 h-28 rounded-full m-auto" />)
                }</label>
                <input
                type="file"
                onChange={handleImageUpload}
                id="image_upload"
                name='image_uploads'
                accept=".jgp,.png,.jpeg, .svg"
                className="hidden"
                 />

                 <div className="flex flex-col gap-1">
                        <label
                        className="text-g font-semibold"
                        htmlFor="fullName">Full Name</label>
                        <input
                        type="text"
                        name="fullName"
                        value={data.fullName}
                        onChange={handleInputeChange}
                        className="rounded-md p-2 bg-transparent border"
                        />
                 </div>
                 <button
                 type="submit"
                 className="w-full bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 py-2 cursor-pointer text-lg rounded-md">
                    Update Profile
                 </button>
                 <Link
                 className="text-accent cursor-pointer "
                 to='/user/profile'>
                    <p>
                        Go back to profile
                    </p>
                 </Link>
            </form>
        </div>
    </HomeLayout>
  );
}

export default EditProfile;