import { FaHotel } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoBook } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useContext, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import HotelContext from "../context/HotelContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useContext(AuthContext);
  const { setUserProfile, isAuthenticated } = useContext(HotelContext)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const redirect = useNavigate()

  const logout = ()=>{
    localStorage.removeItem("auth-token")
    dispatch({ type: "setToken", payload: null });
    setUserProfile(null)
    redirect("/")
  }

  const AuthenticatedHeader = (
    <header className="bg-stone-200 sticky top-0 z-30 shadow-sm shadow-gray-900">
      <div className="flex justify-between items-center px-6 py-4 md:px-12">
        {/* Logo Section */}
        <div className="text-2xl text-gray-900 font-bold flex items-center">
          <FaHotel className="mr-2" />
          <p className="text-lg">
            BookVia<span className="text-xl font-extrabold">Lajo</span>
          </p>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-900 text-3xl focus:outline-none">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } absolute md:static top-full left-0 w-full md:w-auto bg-stone-200 md:bg-transparent z-20 md:flex md:items-center md:space-x-6 text-gray-900 xs:flex-col md:flex-row xs:items-center transition-transform duration-300`}
        >
          <Link
            to="/"
            className="block py-2 px-6 md:px-0 hover:bg-gray-300 md:hover:bg-transparent md:hover:text-gray-700"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/profile"
            className="py-2 px-6 md:px-0 hover:bg-gray-300 md:hover:bg-transparent md:hover:text-gray-700 flex items-center"
            onClick={toggleMenu}
          >
            <CgProfile className="mr-2" /> Profile
          </Link>
          <Link
            to="/bookingpayment"
            className=" py-2 px-6 md:px-0 hover:bg-gray-300 md:hover:bg-transparent md:hover:text-gray-700 flex items-center"
            onClick={toggleMenu}
          >
            <IoBook className="mr-2" /> Booking
          </Link>
          <button
            to="/"
            className=" py-2 px-6 md:px-0 hover:bg-gray-300 md:hover:bg-transparent md:hover:text-gray-700 flex items-center"
            onClick={logout}
          >
            <BiLogOut className="mr-2 font-extrabold text-xl"/>
            Logout
          </button>
          
        </nav>
      </div>
    </header>
  )

  const unAuthHeader = (
    <header className="bg-stone-200 sticky top-0 z-30 shadow-sm shadow-gray-900">
      <div className="flex justify-between items-center px-6 py-4 md:px-12">
        {/* Logo Section */}
        <div className="text-2xl text-gray-900 font-bold flex items-center">
          <FaHotel className="mr-2" />
          <p className="text-lg">
            BookVia<span className="text-xl font-extrabold">Lajo</span>
          </p>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-900 text-3xl focus:outline-none">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } absolute md:static top-full left-0 w-full md:w-auto bg-stone-200 md:bg-transparent z-20 md:flex md:items-center md:space-x-6 text-gray-900 xs:flex-col md:flex-row xs:items-center transition-transform duration-300`}
        >
          <Link
            to="/"
            className="block py-2 px-6 md:px-0 hover:bg-gray-300 md:hover:bg-transparent md:hover:text-gray-700"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/register"
            className="block py-2 px-6 md:px-0 hover:bg-gray-300 md:hover:bg-transparent md:hover:text-gray-700"
            onClick={toggleMenu}
          >
            SignUp
          </Link>
          <Link
            to="/login"
            className="block py-2 px-6 md:px-0 hover:bg-gray-300 md:hover:bg-transparent md:hover:text-gray-700"
            onClick={toggleMenu}
          >
            Login
          </Link>
          
        </nav>
      </div>
    </header>
  )

  return (
    <>
    {
      isAuthenticated ? AuthenticatedHeader : unAuthHeader
    }</>
  );
}

export default Header;
