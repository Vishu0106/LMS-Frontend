import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { getRazorPayId, purchaseCourseBundel, verifyUserPayment } from "../../redux/slices/razorPaySlice.js";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const razorpayKey = useSelector(state => state.razorpay?.key);
    const subscription_id = useSelector(state => state?.razorpay?.subscription_id);
    const isPaymentVerified = useSelector(state => state?.razorpay?.isPaymentVerified);
    const userData = useSelector(state => state?.auth?.data);

    const payementDetails = {
        razorpay_payment_id: '',
        razorpay_subscription_id: '',
        razorpay_signature: '',
    };

    async function handleSubscription(e) {
        e.preventDefault();

        // Ensure razorpayKey and subscription_id are available
        if (!razorpayKey || !subscription_id) {
            toast.error('Payment gateway not available. Please try again later.');
            return;
        }

        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Vishnu .pvt ltd",
            description: "Subscription",
            theme: {
                color: "#3399cc"
            },
            handler: async (response) => {
                payementDetails.razorpay_payment_id = response.razorpay_payment_id;
                payementDetails.razorpay_subscription_id = response.razorpay_subscription_id;
                payementDetails.razorpay_signature = response.razorpay_signature;
                toast.success('Payment successful');
                console.log("payementDetails", payementDetails);
                const res = await dispatch(verifyUserPayment(payementDetails));
                res?.payload?.data?.success ? navigate('/checkout/success') : navigate('/checkout/fail');
            },
            modal: {
                ondismiss: () => {
                    toast.error('Payment cancelled');
                }
            }
        };

        const paymentOptions = new window.Razorpay(options);
        paymentOptions.open();
    }

    async function load() {
        try {
            await dispatch(getRazorPayId());
            await dispatch(purchaseCourseBundel());
        } catch (error) {
            toast.error('Failed to load payment details. Please try again.');
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <HomeLayout>
            <form
                onSubmit={handleSubscription}
                className="min-h-[90vh] flex items-center justify-center text-white"
            >
                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
                        Subscription Bundle
                    </h1>
                    <div className="px-4 space-y-5 text-center">
                        <p className="text-[17px]">
                            This purchase will allow you to access all the courses available on our platform for <span className="font-bold text-yellow-500">1 year. </span>
                            All the existing and new courses will be available for you to access.
                        </p>
                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee />
                            <span>499</span> only
                        </p>
                        <div className="text-gray-200">
                            <p>100% refund on cancellation</p>
                            <p>Terms and conditions apply</p>
                        </div>
                        <button
                            type="submit"
                            className={`bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2`}
                            
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </form>
        </HomeLayout>
    );
};

export default Checkout;
