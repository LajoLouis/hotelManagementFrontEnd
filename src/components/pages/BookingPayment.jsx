import { useContext, useState, useEffect } from "react";
import HotelContext from "../../context/HotelContext";
import { IoMdTime } from "react-icons/io";
import { MdCalendarToday } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import Loading from "./Loading";

function BookingPayment() {
  // debugger
  const { deletebookedRoom, showAndHide, bookingCart, isAuthenticated, getUserProfile } = useContext(HotelContext);
  const [showConfirmation, setShowConfirmation] = useState(false)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>
  }

  useEffect(() => {
    
    console.log(typeof bookingCart);
    console.log(bookingCart);
    
  }, [])


  const booked = Array.isArray(bookingCart) ? Object.values(bookingCart) : bookingCart
  
  
  const handleConfirmation = ()=>{
    setShowConfirmation(true)
  }
  
  const confirmDelete = (id) =>{
    deletebookedRoom(id)
    setShowConfirmation(false)
  }
  
  const refuseDeletion =()=>{
    setShowConfirmation(false)
    showAndHide("success", "Aborted")
  }

  const handleMakePayment = async (bookingId, amount) => {
    const currency = "NGN"
    try {
      const res = await fetch("https://bookvialajo.onrender.com/bookvialajo/payment/initiate", {
        method : "POST",
        headers:{
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token")
        },
        body: JSON.stringify({bookingId, amount, currency})
      })

      const data = await res.json()
      if (res.ok) {
        window.location.href = data.link;
      } else {
        console.error(data.msg || "Failed to intitiate payment");
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }
  

  

  const bookedRooms = (
    <div>
      {typeof(bookingCart) == "string" ? <Loading message={"No booking Yet"}/> : bookingCart.map((reservation)=>(
        <div
        className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden transform hover:scale-105 transition-transform duration-300"
       key={reservation._id}>
        <div className="flex flex-col md:flex-row">
          <div
            className="md:w-1/3 bg-cover bg-center h-64 md:h-auto"
            style={{
              backgroundImage: `url(https://bookvialajo.onrender.com/${reservation?.room?.roomImage})`,
            }}
          >
            <img src={`https://bookvialajo.onrender.com/${reservation?.room?.roomImage}`} alt="" className="w-full h-full object-cover " />
          </div>
          <div className="md:w-2/3 p-6 flex flex-col justify-between">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              <Link to={`/searchedhotel?query=${reservation.room.hotel?.name}`}>{reservation?.room.hotel.name}</Link>
            </h1>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700">
                <Link to={`/searchedhotel?query=${reservation.room.hotel.name}`}>
                  {reservation?.room.roomName}
                </Link>
              </h2>
              <p className="flex items-center text-gray-600 mt-2">
                <IoMdTime className="text-xl mr-2" /> Check-in: 2:00 PM |
                Check-out: 12:00 PM
              </p>
            </div>
            <div className="mb-6">
              <p className="flex items-center text-gray-700">
                <MdCalendarToday className="text-xl mr-2" />
                Arrival: {reservation?.checkIn}
                <FaLongArrowAltRight className="text-xl mx-2 text-gray-500" />
                Departure: {reservation?.checkOut}
              </p>
            </div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg text-gray-600">{reservation?.occupants} Adults</p>
              <p>{reservation.numberOfNights} days</p>
              <p className="text-xl font-semibold text-gray-800">
                ₦ {new Intl.NumberFormat('en-US').format(reservation?.totalCost)}
              </p>
            </div>
            <div className="flex flex-row text-center justify-between">
              <button className="py-3 px-6 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-300" onClick={()=>handleMakePayment(reservation._id, reservation.totalCost)}>
                Make Payment
              </button>
              <button onClick={handleConfirmation} className={showConfirmation ? "hidden" : "visible"}>
              <BsFillTrashFill className="text-2xl" />
              </button>

              {showConfirmation && 
                <div className="border-[1px] font-Gupter space-y-4 p-[10px] rounded-[10px]">
                  <h1 className="font-extrabold">Confirm Booking Deletion</h1>
                  <p className="font-extralight">Are you sure you want to delete?</p>
                  <div className="flex justify-between">
                  <button onClick={()=> confirmDelete(reservation._id)} className="border-[1px] border-red-700 text-red-700 font-bold rounded-[10px] p-[3px] shadow-sm shadow-red-600">Yes, Delete</button>
                  <button onClick={refuseDeletion} className="border-[1px] border-green-700 text-green-700 font-bold rounded-[10px] p-[3px] shadow-sm shadow-green-700">Cancel</button>
                  </div>
                </div>
              }

            </div>
          </div>
        </div>
      </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-screen-lg mx-auto p-6 min-h-screen">
      {bookingCart.length === 0 ? "Please Book a room first" : bookedRooms}
    </div>
  );
}

export default BookingPayment;
