import { useContext } from "react";
import HotelContext from "../../context/HotelContext";
import { IoMdTime } from "react-icons/io";
import { MdCalendarToday } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function BookingPayment() {
  const { bookingCart, deletebookedRoom } = useContext(HotelContext);

  const bookedRooms = (
    <div
      className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden transform hover:scale-105 transition-transform duration-300"
    >
      <div className="flex flex-col md:flex-row">
        <div
          className="md:w-1/3 bg-cover bg-center h-64 md:h-auto"
          style={{
            backgroundImage: `url(http://localhost:8000/${bookingCart?.image})`,
          }}
        >
          <img src={`http://localhost:8000/${bookingCart?.image}`} alt="" className="w-full h-full object-cover " />
        </div>
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            <Link to={`/searchedhotel?query=${bookingCart.hotel}`}>{bookingCart?.hotel}</Link>
          </h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              <Link to={`/searchedhotel?query=${bookingCart.hotel}`}>
                {bookingCart?.name}
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
              Arrival: {bookingCart?.checkIn}
              <FaLongArrowAltRight className="text-xl mx-2 text-gray-500" />
              Departure: {bookingCart?.checkOut}
            </p>
          </div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg text-gray-600">{bookingCart?.occupants} Adults</p>
            <p className="text-xl font-semibold text-gray-800">
              ₦{bookingCart?.totalAmount}
            </p>
          </div>
          <div className="flex flex-row text-center justify-between">
            <button className="py-3 px-6 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
              Make Payment
            </button>
            <button onClick={()=>deletebookedRoom(bookingCart.bookingId)}>
            <BsFillTrashFill className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-lg mx-auto p-6 min-h-screen">
      {bookingCart.length === 0 ? "Please Book a room first" : bookedRooms}
    </div>
  );
}

export default BookingPayment;
