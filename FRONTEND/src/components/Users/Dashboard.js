import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUserProfileAPI } from "../../apis/user/usersAPI";
import StatusMessage from "../Alert/StatusMessage";

const Dashboard = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["profile"],
  });

  if (isLoading) {
    return <StatusMessage type="loading" message="Loading please wait..." />;
  }

  if (isError) {
    return (
      <StatusMessage type="error" message={error?.response?.data?.message} />
    );
  }

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-r from-[#ff80b5] to-[#9089fc] font-inter min-h-screen">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 -z-10"></div>

      <div className="px-6 pt-10 pb-24 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8 pt-16 sm:pt-24">
          Welcome to User <span className="text-indigo-400">Dashboard !</span>
       </h1>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          {/* Profile Section */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <p className="mb-2"><strong>Name:</strong> {data?.user?.username}</p>
            <p><strong>Email:</strong> {data?.user?.email}</p>
          </div>

          {/* Credit Usage Section */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Credit Usage</h2>
            <p className="mb-2"> <strong> Monthly Credit: </strong> {data?.user?.monthlyRequestCount}</p>
            <p className="mb-2"> <strong> Credit Used: </strong> {data?.user?.apiRequestCount}</p>
             <p className="mb-2"> <strong>
              Credit Remaining:</strong>{" "}
              {data?.user?.monthlyRequestCount - data?.user?.apiRequestCount}
            </p>
            <p> <strong>
              Next Billing Date: </strong>{" "}
              {data?.user?.nextBillingDate
                ? new Date(data?.user?.nextBillingDate).toDateString()
                : "No Billing date"}
            </p>
          </div>

          {/* Payment & Plan Section */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Payment & Plans</h2>
            <p className="mb-2">
              <strong> Current Plan:</strong>  {data?.user?.subscriptionPlan}
            </p>
           {["Trial", "Free", "Basic", "Premium"].includes(data?.user?.subscriptionPlan) && (
            <p className="mb-4">
              {{
                Trial: <><strong>Trial:</strong> 1000 monthly requests</>,
                Free: <><strong>Free:</strong> 5 monthly requests</>,
                Basic: <><strong>Basic:</strong> 50 monthly requests</>,
                Premium: <><strong>Premium:</strong> 100 monthly requests</>,
              }[data?.user?.subscriptionPlan]}
            </p>
           )}

            <Link
              to="/plans"
              className="inline-block py-2 px-4 mt-2 rounded-md bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition"
            >
              Upgrade Plan
            </Link>
          </div>

          {/* Trial Info */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Trial Information</h2>
            <p className="mb-2">
             <strong> Trial Status: </strong>{" "}
              {data?.user?.trialActive ? (
                <span className="text-green-600 font-semibold">Active</span>
              ) : (
                <span className="text-yellow-500 font-semibold">Inactive</span>
              )}
            </p>
            <p> <strong> Expires on: </strong> {new Date(data?.user?.trialExpires).toDateString()}</p>
            <Link
              to="/plans"
              className="inline-block py-2 px-4 mt-4 rounded-md bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition"
            >
              Upgrade to Premium
            </Link>
          </div>

          {/* Payment History */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment History</h2>
            {data?.user?.payments?.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {data?.user?.payments.map((payment) => (
                  <li key={payment._id} className="py-4">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div>
                        <p className="text-indigo-600 font-medium">
                          {payment.subscriptionPlan}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(payment.createdAt).toDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p
                          className={`text-sm font-semibold ${
                            payment.status === "succeeded"
                              ? "text-green-500"
                              : "text-green-500"
                          }`}
                        >
                          {payment.status}
                        </p>
                        <p className="text-sm text-gray-700">$ {payment.amount}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-black">No Payment History</p>
            )}
          </div>
        </div>
      </div>     
    </div>
  );
};

export default Dashboard;