import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { verifyPaymentAPI } from "../../apis/stripePayment/stripePayment";

const PaymentSuccess = () => {
  //get the params
  const [searchParams] = useSearchParams();
  const paymentIntentID = searchParams.get("payment_intent");
  //UseQuery

  const { isLoading, isError, data, isPending, isSuccess } = useQuery({
    queryFn: () => verifyPaymentAPI(paymentIntentID),
  });
  console.log(data);
  return (
  <div className="relative isolate min-h-screen bg-gradient-to-r from-[#ff80b5] to-[#9089fc] font-inter px-4 py-12 sm:px-6 lg:px-8 flex justify-center items-center">
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-60 -z-10"></div>

    {/* Payment Box */}
    <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg text-center">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mb-3" />
          <p className="text-lg text-gray-600">
            Verifying your payment, please wait...
          </p>
        </div>
      ) : isError ? (
        <div className="text-red-500">
          <FaTimesCircle className="text-5xl mb-3 mx-auto" />
          <p className="text-xl">Payment verification failed</p>
          <p>An error occurred</p>
        </div>
      ) : (
        <div className="text-green-500">
          <FaCheckCircle className="text-5xl mb-3 mx-auto" />
          <h1 className="text-2xl font-bold mb-3">Payment Successful</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your payment. Your transaction ID is {paymentIntentID}.
          </p>
          <Link
            to="/dashboard"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Using AI
          </Link>
        </div>
      )}
    </div>
  </div>
);
};

export default PaymentSuccess;
