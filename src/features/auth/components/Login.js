import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserAsync, increment, incrementAsyn,} from '../authSlice';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Login() {
  const loginError = useSelector(state => state.auth.error)
  const userLoggedIn = useSelector(state => state.auth.loggedInUser)
  const dispatch = useDispatch();
  const {register, handleSubmit, watch, formState:{errors}} = useForm()
  const formSubmit = data => {
    dispatch(fetchUserAsync(data))
    
  }
  



  return (
    <>
    {userLoggedIn && <Navigate to="/" replace={true}/>}
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log In to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit(formSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email",{required:"Email is required.", pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:"Not a valide email"}})}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <p className='text-red-500'>{errors?.email?.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password",{required:"Password is required.",maxLength:20,pattern:{value:/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm,message:`Password should be at least one capital letter, one small letter, one number and 8 character length`}})}
                  type="password"
                  autoComplete="curren-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className='text-red-500'>{errors?.password?.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </button>
            </div>
            {loginError&& <p className='text-red-500'>{loginError.message}</p>}

          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an Account?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Signup
            </Link>
          </p>
        </div>
      </div>

    </div>
    </>
  );
}