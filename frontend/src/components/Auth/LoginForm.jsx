import React, { useState } from "react";
import { Input } from "../index.js";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useDispatch } from "react-redux";
import { loginUser } from "../../service/index.js";

const LoginForm = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const submitLoginForm = async (data) => {
    console.log("This is login form data = ", data);
    dispatch(loginUser(data, navigate));
  };

  return (
    <div className='mx-auto w-9/12 rounded-lg p-3 shadow-lg'>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(submitLoginForm)}
          className='flex flex-col gap-6'
        >
          <Input
            type={"text"}
            placeholder={"Enter your username"}
            name={"userName"}
            label={
              <>
                User name
                <sup className='text-[13px] text-[#F5004F]'>*</sup>
              </>
            }
          />

          <div className='relative'>
            <Input
              name={"password"}
              type={`${showPassword ? "text" : "password"}`}
              placeholder={"Enter your password"}
              label={
                <>
                  Password
                  <sup className='text-[13px] text-[#F5004F]'>*</sup>
                </>
              }
            />
            <span className='absolute right-4 top-[60%] z-10 cursor-pointer'>
              {showPassword ? (
                <IoMdEyeOff onClick={togglePassword} />
              ) : (
                <IoMdEye onClick={togglePassword} />
              )}
            </span>
          </div>

          <div className='flex flex-col items-center gap-2'>
            <Link
              to='/forget-password'
              className='mt-4 block text-center text-blue-600 hover:underline'
            >
              Forgot Password?{" "}
            </Link>

            <button className='w-fit rounded-md bg-blue-500 px-6 py-3 text-white transition duration-200 hover:bg-blue-600'>
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
