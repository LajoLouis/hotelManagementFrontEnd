import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import useLocalStorage from "../../hooks/useLocalStorage"
import HotelContext from "../../context/HotelContext";

function Login() {
  const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {showAndHide, isAuthenticated, setUserProfile} = useContext(HotelContext)
    const [state, dispatch] = useContext(AuthContext)
    const {setItem} = useLocalStorage("auth-token")
    const [invalid, setInvalid] = useState(false)

    // if (isAuthenticated) {
    //     return <Navigate to="/"/>
    //   }

    const redirect = useNavigate()

    const loginHandler = async(e)=>{
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:8000/bookvialajo/login", {
                method : "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({email, password})
            })

            const data = await res.json()
            if (data === "invalid email/password") {
                showAndHide("error", "invalid email/password")
                setInvalid(true)
            }else {
                dispatch({type: "setToken", payload:data.token})
                setItem(data.token)
                setUserProfile(data.user)
                redirect("/")
                showAndHide("success", "Login successful")
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="mx-auto xs:w-[90%] sm:w-[30%] border-[2px] p-[5%] bg-stone-200 rounded-[10px] shadow-lg shadow-zinc-400">
        <h1 className="text-[25px] font-extrabold text-center my-[10px]">
          Sign in
        </h1>
        <div className=" ">
          <form action="" className="flex flex-col" onSubmit={loginHandler}>
            <label htmlFor="email" className="text-[12px]">
              Email Address
            </label>
            <input
              className="font-Gupter p-[5%] pb-2 focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6"
              type="text"
              name="email"
              placeholder="Enter your email address"
              onChange={(e)=> setEmail(e.target.value)}
            />
            <p className={`${invalid? "text-red-600 text-sm" : "hidden"}`}>Invalid Email/password</p>
            <label htmlFor="password" className="text-[12px]">
              Password
            </label>
            <input
              className="font-Gupter p-[5%] pb-2 focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6"
              type="password"
              placeholder="passsword"
              onChange={(e)=> setPassword(e.target.value)}
            />
            <p className={`${invalid? "text-red-600 text-sm" : "hidden"}`}>Invalid Email/password</p>
          <button className="p-[10px] bg-gray-900 hover:bg-gray-700 my-4 text-white">
            Login
          </button>
          </form>
          <p className="text-10px font-Gupter">
            Don't have an account ?{" "}
            <Link to="/register" className="text-blue-700 hover:text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
