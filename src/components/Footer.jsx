import { FaHotel } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-stone-200 sticky top-0">
      <div className="flex justify-between xs:flex-col md:flex-row px-[70px] py-[20px] xs:space-y-3">
        <div className="text-[50px] text-gray-900 font-bold flex">
          <FaHotel />
          <p className="text-[24px]">
            BookVia<span className="text-[40px] font-extrabold">Lajo</span>
          </p>
        </div>
        <div className="text-gray-900 flex flex-col">
            <a href="" className="hover:underline">AboutUs</a>
            <a href="" className="hover:underline">Hotels in Your Area</a>
            <a href="" className="hover:underline">FAQ</a>
            <a href=""></a>
            <a href=""></a>
        </div>
        <div className="flex space-x-4 text-gray-900 text-[30px]">
          <a href=""><FaFacebook /></a>
          <a href=""><GrInstagram /></a>
          <a href=""><BsTwitterX /></a>
          <a href=""><FaTiktok /></a>
        </div>
      </div>
    </div>
  )
}

export default Footer