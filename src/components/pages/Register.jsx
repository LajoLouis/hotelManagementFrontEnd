import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import HotelContext from "../../context/HotelContext";

function Register() {
  
  const {handleRegistration} = useContext(HotelContext)

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="mx-auto xs:w-[90%] sm:w-[30%] border-[2px] p-[5%] bg-stone-200 rounded-[10px] shadow-lg shadow-zinc-400">
        <h1 className="text-[25px] font-extrabold text-center my-[10px]">Register</h1>
        <div className=" ">
          <form onSubmit={(e)=> handleRegistration(e)} className="flex flex-col">
            <label htmlFor="firstname" className="text-[12px]">
              First name
            </label>
            <input
              className="p-[5%] font-Gupter focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2"
              type="text"
              name="firstname"
              placeholder="FirstName"
            />
            <label htmlFor="Lastname" className="text-[12px]">
              Last name
            </label>
            <input
              className="p-[5%] font-Gupter focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2"
              type="text"
              name="lastname"
              placeholder="LastName"
            />
            <label htmlFor="email" className="text-[12px]">
              Email Address
            </label>
            <input
              className="p-[5%] font-Gupter focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2"
              type="text"
              name="email"
              placeholder="Enter your email address"
            />
            <label htmlFor="phone" className="text-[12px]">
              Phone Number
            </label>
            <input
              className="p-[5%] font-Gupter focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2"
              type="text"
              name="phone"
              placeholder="Phone Number"
            />
            <label htmlFor="password" className="text-[12px]">
              Password
            </label>
            <input
              className="p-[5%] font-Gupter focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2"
              type="password"
              name="password"
              placeholder="password"
            />
            <label htmlFor="confirmPassword" className="text-[12px]">
              Confirm password
            </label>
            <input
              className="p-[5%] font-Gupter focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <button className="p-[10px] bg-gray-900 hover:bg-gray-700 my-4 text-white">Register</button>
          </form>
          <p className="text-10px font-Gupter">Already existing user ? <Link to="/login" className="text-blue-700 hover:text-blue-600">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
