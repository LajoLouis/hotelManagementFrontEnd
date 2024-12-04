import { IoMdTime } from "react-icons/io";
import { MdCalendarToday } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuMinusCircle } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";
import { useContext, useState, useEffect } from "react";
import HotelContext from "../../context/HotelContext";
import { Link, useNavigate, Navigate } from "react-router-dom";

function BookRoom({ hotelName, bookedRoom }) {
  const { checkIn, checkOut, showAndHide, bookingCart, setBookingCart, handleBookingCart, getBookings, isAuthenticated } = useContext(HotelContext);
  const [occupants, setOccupants] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState(false)
  const [loading, setLoading] = useState(false);

  const checkInDate = new Date(checkIn).getTime();
  const checkOutDate = new Date(checkOut).getTime();
  const duration = checkOutDate - checkInDate;
  const numberOfNights = duration / (1000 * 60 * 60 * 24);
  const bookingDate = new Date().toISOString()
  const navigate = useNavigate()


  const totalCost = bookedRoom.price
    ? ((occupants*1/100)*bookedRoom.price) + (numberOfNights * bookedRoom.price)
    : 0;

  const formattedTotalCost = new Intl.NumberFormat('en-US').format(totalCost)

  const handleRoomBooking = async()=>{
    setLoading(true);
    if (!isAuthenticated) {
      return <Navigate to="/login" replace/>
    }
 
    const room = bookedRoom._id
    try {
      const res = await fetch("https://bookvialajo.onrender.com/bookvialajo/makebooking",{
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "auth-token" : localStorage.getItem("auth-token")
        },
        body: JSON.stringify({room, checkIn, checkOut, numberOfNights, totalCost, occupants, bookingDate, paymentStatus })
      })

      const data = await res.json()
      if (data === "Input checkIn and CheckOut date") {
        showAndHide("error", "Please Input checkIn and checkOut date")
        return
      }else if (data === "Unauthorized access") {
        showAndHide("error", "Kindly Login")
        navigate("/bookingpayment")
        return
        
      }else if (data === "please select a room") {
        showAndHide("error", "Kindly select a room")
        
      }else if (res.ok) {
        navigate("/bookingpayment");
        console.log("Response Data:", data);
      }
      
      setTimeout(() => {
        getBookings()
      }, 0);

    } catch (error) {
      console.log(error);
      
    }finally {
      setLoading(false);
    }
  }
  


  

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


  

  useEffect(() => {
    console.log(bookingCart);
  }, [bookingCart])
  

  return (
    <div className="mx-auto xs:w-full md:w-[70%] my-[2%] shadow-md shadow-gray-950 rounded-[10px]">
      <div className=" mx-[10%] ">
        <h1 className="border-b-[2px] border-gray-300  my-[10px] text-center p-[10px] font-extrabold">
          {hotelName}
        </h1>
        <div className="flex xs:flex-col-reverse md:flex-row justify-between border-b-[2px] border-gray-300  my-[10px]">
          <div className="xs:w-full md:w-[70%]">
            <h1 className="font-bold text-center">{bookedRoom.roomName}</h1>
            <p className="flex">
              <IoMdTime className="text-xl" /> Check-in 2:00 PM | Check-out
              12:00 PM
            </p>
          </div>
          <div
            className="xs:w-full md:w-[30%]  min-h-[100px] bg-cover bg-center rounded-[5px]"
            style={{
              backgroundImage: `url(${bookedRoom.roomImage})`,
            }}
          >
            <img src={`https://bookvialajo.onrender.com/${bookedRoom.roomImage}`} alt="Chosen room Image" className="w-full h-full object-cover " />
          </div>
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
          <p>Duration</p>
          <p>{numberOfNights? numberOfNights : 0}Days</p>
        </div>
        <div className="flex justify-between border-b-[2px] border-gray-300  my-[10px] p-[10px]">
          <p>Total</p>
          <p>₦{formattedTotalCost}</p>
        </div>
        <div className="flex justify-center ">
          <button className={`p-[10px] bg-gray-900 text-white rounded-[10px] my-[20px] hover:bg-gray-800 ${loading ? "bg-opacity-80": ""}`} onClick={handleRoomBooking} disabled={loading}>
            {loading ? "Loading" : "Add to Booking Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookRoom;
