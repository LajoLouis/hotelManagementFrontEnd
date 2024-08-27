import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="mx-auto xs:w-[90%] sm:w-[30%] border-[2px] p-[5%] bg-stone-200 rounded-[10px] shadow-lg shadow-zinc-400">
        <h1 className="text-[25px] font-extrabold text-center my-[10px]">
          Sign in
        </h1>
        <div className=" ">
          <form action="" className="flex flex-col">
            <label htmlFor="email" className="text-[12px]">
              Email Address
            </label>
            <input
              className="font-Gupter p-[5%] pb-2 focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6"
              type="text"
              name="email"
              placeholder="Enter your email address"
            />
            <label htmlFor="password" className="text-[12px]">
              Password
            </label>
            <input
              className="font-Gupter p-[5%] pb-2 focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6"
              type="password"
              placeholder="passsword"
            />
          </form>
          <button className="p-[10px] bg-gray-900 hover:bg-gray-700 my-4 text-white">
            Register
          </button>
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
