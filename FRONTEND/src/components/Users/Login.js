import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import StatusMessage from "../Alert/StatusMessage";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../apis/user/usersAPI";
import { useAuth } from "../../AuthContext/AuthContext";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  //custom auth hook
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  //Redirect if a user is login
  useEffect(() => {
    if (isAuthenticated) {
      console.log(isAuthenticated);
      
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  //mutation
  const mutation = useMutation({ mutationFn: loginAPI });
  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Here, you would typically handle form submission
      console.log("form submit");
      
      mutation.mutate(values);

      console.log(mutation);
      

      // Simulate login success and navigate to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    },
  });
  //Update is authenticated
  useEffect(() => {
    if (mutation.isSuccess) {
      console.log("after login:", mutation);
      
      login();
    }
  }, [mutation.isSuccess, login]);
  return (
   <div className="relative isolate min-h-screen bg-gradient-to-r from-[#ff80b5] to-[#9089fc] font-inter px-4 py-12 sm:px-6 lg:px-8 flex justify-center items-center">
     {/* Dark overlay like FreeTrial */}
  <div className="absolute inset-0 bg-black bg-opacity-60 -z-10"></div>  
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Login to Your Account
        </h2>
        {/* display loading */}
        {mutation.isPending && (
          <StatusMessage type="loading" message="Loading..." />
        )}
        {/* display error */}
        {mutation.isError && (
          <StatusMessage
            type="error"
            message={mutation?.error?.response?.data?.message}
          />
        )}
        {/* display success */}
        {mutation.isSuccess && (
          <StatusMessage type="success" message="Login success" />
        )}
        {/* Form for login */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email input field */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
              placeholder="you@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Password input field */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Your Password
            </label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Don't have an account? Register
              </Link>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
