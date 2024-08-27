import { useContext, useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useParams } from "react-router-dom";
import HotelContext from "../../context/HotelContext";
import BookRoom from "./BookRoom";
import { TfiHandPointDown } from "react-icons/tfi";

function HotelDetails() {
  // Using the parameters to find hotel chosen
  const params = useParams();
  const hotelId = params.id;
  const { hotel, today, showAndHide, setCheckIn, setCheckOut, checkIn, checkOut } = useContext(HotelContext);
  const specificHotel = hotel.find((item) => item.id == hotelId);
  const [mainImage, setMainImage] = useState(specificHotel?.hotelImage);
  const [bookedRoom, setBookedRoom] = useState({});

  const handleBooking = (room) => {
    if (checkIn && checkOut !== "") {
      setBookedRoom(room);
      showAndHide("success", `${room.roomName} chosen`)
    }else{
      showAndHide("error", "please input checkIn and checkOut date")
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div>
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">
          {specificHotel?.name}
        </h1>
      </div>
      <div className="md:flex w-[90%] mx-auto my-4">
        <div className="flex flex-col md:flex-row md:flex-wrap xs:flex-nowrap xs:w-[90%] md:w-[70%] m-auto justify-between shadow-lg rounded-lg bg-white overflow-hidden">
          <img
            src={mainImage}
            alt=""
            className="w-full md:h-[40%] object-cover rounded-lg"
          />
          <div className="flex overflow-x-auto w-full mt-4 space-x-4 p-2 bg-gray-50 rounded-b-lg">
            {[
              specificHotel?.hotelImage,
              specificHotel?.rooms[0]?.image,
              specificHotel?.rooms[1]?.image,
              specificHotel?.rooms[2]?.image,
              specificHotel?.rooms[0]?.image,
              specificHotel?.rooms[1]?.image,
              specificHotel?.rooms[2]?.image,
              specificHotel?.hotelImage,
            ].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="flex-shrink-0 xs:w-[43%] md:w-[22%] h-[150px] object-cover rounded-lg cursor-pointer transform hover:scale-110 transition-transform"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="md:w-[30%] mx-auto mt-6 md:mt-0 md:ml-6 p-4 bg-white shadow-lg rounded-lg">
          <p className="font-bold font-Gupter text-gray-700 text-lg mb-4">
            {specificHotel?.description}
          </p>
          <address className="text-gray-600">{specificHotel?.city}</address>
        </div>
      </div>
      <div className="bg-gray-900 bg-opacity-90 opacity-80 bg-center bg-cover flex flex-col items-center p-[10px]">
        <h1 className="text-4xl font-Gupter text-white">Book Here</h1>
        <p className="text-2xl text-center text-white flex">
          Add dates for arrival and departure below
          <TfiHandPointDown />
        </p>
        <div className=" m-auto bg-[#f5f5f5] w-[80%] font-Gupter p-[8px] md:rounded-[60px] shadow-md shadow-gray-800">
          <form
            action=""
            className="flex md:flex-row xs:flex-col xs:space-y-2 justify-around text-black"
          >
            <div>
              <input
                type="reset"
                className="my-3 text-[#f5f5f5] bg-red-950 p-2"
              />
            </div>
            <div className="flex flex-col border-l-2 border-gray-900">
              <label htmlFor="checkin">Check-In</label>
              <input
                type="date"
                id="checkin"
                placeholder="Check-In"
                name="checkin"
                className="font-Gupter p-[5%] pb-2 focus:border-[1px] focus:border-stone-600 focus:outline-none "
                required
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="flex flex-col border-l-2 border-gray-900">
              <label htmlFor="checkout">Check-out</label>
              <input
                type="date"
                id="checkout"
                placeholder="Check-out"
                name="checkout"
                className="font-Gupter p-[5%] pb-2 focus:border-[1px] focus:border-stone-600 focus:outline-none "
                required
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex xs:flex-col md:flex-row font-Gupter text-center relative top-0">
        <div className="xs:w-[90%]xs:m-auto md:w-[60%]">
          {specificHotel?.rooms.map((item, index) => (
            <div
              key={index}
              className=" flex md:flex-row xs:flex-col my-4 shadow-lg shadow-gray-900 rounded-[10px] overflow-hidden"
            >
              <div
                className="xs:w-full md:w-[40%] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.image})`,
                  minHeight: "200px",
                }}
              ></div>
              <div className="xs:w-full md:w-[60%] space-y-5">
                <h1 className="text-3xl">{item.roomName}</h1>
                <p>Maximum Capacity: {item.capacity}</p>
                <p>{item.price} per Night</p>
                <button
                  className="bg-gray-900 p-[10px] my-[20px] text-white hover:bg-gray-800"
                  onClick={() => handleBooking(item)}
                >
                  Choose Room
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="xs:w-full md:w-[40%] sticky top-0 left-0">
          <BookRoom
            hotelName={specificHotel?.name}
            bookedRoom={bookedRoom}
          />
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
