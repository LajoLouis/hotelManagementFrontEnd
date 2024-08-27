import { IoMdTime } from "react-icons/io";
import { MdCalendarToday } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuMinusCircle } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";
import { useContext, useState, useEffect } from "react";
import HotelContext from "../../context/HotelContext";
import { Link } from "react-router-dom";

function BookRoom({ hotelName, bookedRoom }) {
  const { checkIn, checkOut, showAndHide, bookingCart, handleBookingCart } = useContext(HotelContext);
  const [occupants, setOccupants] = useState(1);


  const checkInDate = new Date(checkIn).getTime();
  const checkOutDate = new Date(checkOut).getTime();
  const duration = checkOutDate - checkInDate;
  const days = duration / (1000 * 60 * 60 * 24);

  const handleOccupantsChange = (action) => {
    if (!bookedRoom || !bookedRoom.roomName) {
      showAndHide("error", "Kindly choose a room");
      return;
    }

    if (action === "increase") {
      if (occupants < bookedRoom.capacity) {
        setOccupants(occupants + 1);
      } else {
        showAndHide("error", "Maximum capacity reached");
      }
    } else if (action === "decrease") {
      if (occupants > 1) {
        setOccupants(occupants - 1);
      } else {
        showAndHide("error", "Cannot have less than 1 occupant");
      }
    }
  };

  const totalAmount = bookedRoom.price
    ? occupants * (days * bookedRoom.price)
    : 0;

  

  // useEffect(() => {
  //   console.log(bookingCart);
  // }, [bookingCart])
  

  return (
    <div className="mx-auto xs:w-full md:w-[70%] my-[2%] shadow-md shadow-gray-950 rounded-[10px]">
      <div className=" mx-[10%] ">
        <h1 className="border-b-[2px] border-gray-300  my-[10px] text-center p-[10px] font-extrabold">
          {hotelName}
        </h1>
        <div className="flex xs:flex-col-reverse md:flex-row justify-between border-b-[2px] border-gray-300  my-[10px]">
          <div className="xs:w-full md:w-[70%]">
            <h1 className="font-bold">{bookedRoom.roomName}</h1>
            <p className="flex">
              <IoMdTime className="text-xl" /> Check-in 2:00 PM | Check-out
              12:00 PM
            </p>
          </div>
          <div
            className="xs:w-full md:w-[30%]  min-h-[100px] bg-cover bg-center rounded-[5px]"
            style={{
              backgroundImage: `url(${bookedRoom.image})`,
            }}
          ></div>
        </div>
        <div className="border-b-[2px] border-gray-300  my-[10px] space-y-3">
          <p className="flex">
            <MdCalendarToday className="text-xl" />
            Arrival Date: {checkIn}{" "}
            <FaLongArrowAltRight className="text-[24px] border-x-2 border-black" />{" "}
            Departure Date: {checkOut}
          </p>
          <div className="flex justify-center border-[1px] border-gray-900 rounded-[5px] p-2 space-x-3">
            <button
              className="text-3xl"
              onClick={() => handleOccupantsChange("decrease")}
            >
              <LuMinusCircle />
            </button>
            <p className="text-xl">{occupants} Adults</p>
            <button
              className="text-3xl"
              onClick={() => handleOccupantsChange("increase")}
            >
              <FiPlusCircle />
            </button>
          </div>
        </div>
        <div className="flex justify-between border-b-[2px] border-gray-300  my-[10px] p-[10px]">
          <p>Total</p>
          <p>₦{totalAmount}</p>
        </div>
        <div className="flex justify-center ">
          <Link to="/bookingpayment">
          <button className="p-[10px] bg-gray-900 text-white rounded-[10px] my-[20px] hover:bg-gray-800" onClick={()=>{handleBookingCart(hotelName, bookedRoom, occupants, totalAmount)}}>
            Add to Booking Cart
          </button></Link>
        </div>
      </div>
    </div>
  );
}

export default BookRoom;
