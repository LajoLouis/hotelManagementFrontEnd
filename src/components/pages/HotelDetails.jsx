import { useContext, useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import HotelContext from "../../context/HotelContext";
import BookRoom from "./BookRoom";
import { TfiHandPointDown } from "react-icons/tfi";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhone } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { LuInstagram } from "react-icons/lu";
import { FaPerson } from "react-icons/fa6";
import HotelMap from "./HotelMap";

function HotelDetails() {
  // Using the parameters to find hotel chosen
  const params = useParams();
  const hotelId = params.id;
  const {
    hotel,
    today,
    showAndHide,
    setCheckIn,
    setCheckOut,
    checkIn,
    checkOut,
    dayAfterCheckIn
  } = useContext(HotelContext);

  
  const specificHotel = hotel.find((item) => item._id == hotelId);
  const [mainImage, setMainImage] = useState(specificHotel?.image);
  const [bookedRoom, setBookedRoom] = useState({});
  const [readMore, setReadMore] = useState(false)
  const [openMap, setOpenMap] = useState(false)

  const handleSelection = (room) => {
    if (checkIn && checkOut !== "") {
      setBookedRoom(room);
      showAndHide("success", `${room.roomName} chosen`);
    } else {
      showAndHide("error", "please input checkIn and checkOut date");
    }
  };
  

  const handleMapSize = ()=>{
    setOpenMap(!openMap)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative top-0">
      <div>
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">
          {specificHotel?.name}
        </h1>
      </div>
      <div className="md:flex w-[90%] mx-auto my-4">
        <div className="flex flex-col md:flex-row md:flex-wrap xs:flex-nowrap xs:w-[90%] md:w-[70%] m-auto justify-between shadow-lg rounded-lg bg-white overflow-hidden">
          <img
            src={"https://bookvialajo.onrender.com/" + mainImage}
            alt={specificHotel?.name}
            className="w-full md:h-[40%] object-cover rounded-lg"
          />
          <div className="flex overflow-x-auto w-full mt-4 space-x-4 p-2 bg-gray-50 rounded-b-lg">
            {[
              specificHotel?.image,
              specificHotel?.rooms[0]?.roomImage,
              specificHotel?.rooms[1]?.roomImage,
              specificHotel?.rooms[2]?.roomImage,
              specificHotel?.rooms[0]?.roomImage,
              specificHotel?.rooms[1]?.roomImage,
              specificHotel?.rooms[2]?.roomImage,
              specificHotel?.image,
            ].map((image, index) => (
              <img
                key={index}
                src={`https://bookvialajo.onrender.com/${image}`}
                alt={`Image ${index + 1}`}
                className="flex-shrink-0 xs:w-[43%] md:w-[22%] h-[150px] object-cover rounded-lg cursor-pointer transform hover:scale-110 transition-transform"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="xs:w-full md:w-[30%] mx-auto mt-6 md:mt-0 md:ml-6 p-4 bg-white shadow-lg rounded-lg space-y-8">
          <p className="font-bold font-Gupter text-gray-700 text-lg mb-4">
            {specificHotel?.description}
          </p>
          <address className="text-gray-600">{specificHotel?.address}</address>
          <div className="flex flex-wrap w-full overflow-auto">
            <HiOutlineMail className="text-2xl" />
            <p>{specificHotel?.email}</p>
          </div>
          <div className="flex space-x-4">
            <FaPhone className="text-2xl" />
            <p>{specificHotel?.phone}</p>
          </div>
          <>
            {specificHotel?.whatsapp == "" ? (
              <div className="hidden">
                <BsWhatsapp />
                <p>Unavailable</p>
              </div>
            ) : (
              <div className="flex p-[10px]">
                <BsWhatsapp className="text-2xl pr-2 text-gray-900" />
                <p>{specificHotel?.whatsapp}</p>
              </div>
            )}
          </>
          <>
            {specificHotel?.facebook == "" ? (
              <p className="hidden">
                <BsFacebook />
                Unavailable
              </p>
            ) : (
              <div className="flex p-[10px]">
                <BsFacebook className="text-2xl pr-2 text-gray-900" />
                <p>{specificHotel?.facebook}</p>
              </div>
            )}
          </>
          <>
            {specificHotel?.instagram == "" ? (
              <p className="hidden">
                <LuInstagram />
                Unavailable
              </p>
            ) : (
              <div className="flex p-[10px]">
                <LuInstagram className="text-2xl pr-2 text-gray-900" />
                <p>{specificHotel?.instagram}</p>
              </div>
            )}
          </>
          <h1 className="text-center font-extrabold m-[2%] underline">
            Hotel Amenities
          </h1>
          <ul className="list-disc font-Gupter font-light p-[2%]">
            {specificHotel?.amenities?.map((amenity) => (
              <li key={amenity._id}>{amenity.name}</li>
            ))}
          </ul>
          {/* <Link to="/hotelmap" className="h-[200px] overflow-hidden">
            <HotelMap  specificHotelLocation = {specificHotel?.location} specificHotelName = {specificHotel?.name}/>
          </Link> */}
          <div onClick={handleMapSize} className={`${openMap ? "h-[80%] w-[80%] fixed top-8 left-8": "h-[200px]"}`}>
              <HotelMap specificHotelLocation = {specificHotel?.location} specificHotelName = {specificHotel?.name}/>
          </div>
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
                value={checkIn}
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
                min={dayAfterCheckIn}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex xs:flex-col md:flex-row font-Gupter text-center">
        {/* <div className="xs:w-[90%]xs:m-auto md:w-[60%]">
          {specificHotel?.rooms.map((room, index) => (
            <div
              key={index}
              className=" flex md:flex-row xs:flex-col my-4 shadow-lg shadow-gray-900 rounded-[10px] overflow-hidden"
            >
              <div
                className="xs:w-full md:w-[40%] bg-cover bg-center"
                style={{
                  backgroundImage: `url("https://bookvialajo.onrender.com/${room.roomImage}")`,
                  minHeight: "200px",
                }}
              >
                <img
                  src={`https://bookvialajo.onrender.com/${room.roomImage}`}
                  alt=""
                  className="w-full h-full object-cover "
                />
              </div>
              <div className={`xs:w-full md:w-[60%] space-y-5 p-[15px] bg-[url('/images/notavailable.jpg')] bg-cover ${specificHotel?.rooms?.available? "bg-opacity-0": "bg-opacity-80"}`}>
                <h1 className="text-3xl">{room.roomName}</h1>
                <div>
                <p className={`${readMore ? "h-full": "overflow-hidden h-[100px] transition ease duration-1000"}`}>{room.description} </p>
                <button className="underline hover:text-blue-950 text-blue-700 flex justify-start" onClick={() => setReadMore(!readMore)}>{readMore ? <span>Show Less...</span> : <span>Show More...</span>}</button>
                </div>
                <div className="flex justify-center space-x-1">
                  <p className="text-2xl font-extralight">Capacity: </p>
                  <p className="text-2xl font-extrabold">{room.capacity}</p>
                  <FaPerson  className="text-3xl"/>
                </div>
                <p>₦ {new Intl.NumberFormat('en-US').format(room.price)} / Night</p>
                <button
                  className="bg-gray-900 p-[10px] my-[20px] text-white hover:bg-gray-800"
                  onClick={() => handleSelection(room)}
                  disabled={specificHotel?.rooms?.available}
                >
                  <a href="#booker">{specificHotel?.rooms?.available ? "Not Available" : "Choose Room" }</a>
                </button>
              </div>
            </div>
          ))}
        </div> */}
        <div className="xs:w-[90%] xs:m-auto md:w-[60%]">
      {specificHotel?.rooms.map((room, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row my-4 shadow-lg shadow-gray-900 rounded-[10px] overflow-hidden`}
        >
          {/* Room Image */}
          <div
            className={`xs:w-full md:w-[40%] bg-cover bg-center ${
              !room.available ? "opacity-50 filter blur-sm" : ""
            }`}
            style={{
              backgroundImage: `url("https://bookvialajo.onrender.com/${room.roomImage}")`,
              minHeight: "200px",
            }}
          >
            <img
              src={`https://bookvialajo.onrender.com/${room.roomImage}`}
              alt={`${room.roomName}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Room Details */}
          <div
            className={`xs:w-full md:w-[60%] p-[15px] space-y-5 ${
              !room.available
                ? "bg-gray-300 bg-opacity-80"
                : "bg-white"
            }`}
          >
            <h1 className="text-2xl font-bold">{room.roomName}</h1>
            <div>
              <p
                className={`text-sm ${
                  readMore
                    ? "h-full"
                    : "overflow-hidden h-[100px] transition-all duration-1000 ease-in-out"
                }`}
              >
                {room.description}
              </p>
              <button
                className="underline text-blue-700 hover:text-blue-900"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Show Less..." : "Show More..."}
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <p className="text-xl font-light">Capacity:</p>
              <p className="text-xl font-bold">{room.capacity}</p>
              <FaPerson className="text-xl" />
            </div>

            <p className="text-lg font-semibold">
              ₦ {new Intl.NumberFormat("en-US").format(room.price)} / Night
            </p>

            <button
              className={`p-[10px] my-[20px] text-white rounded-md w-full ${
                room.available
                  ? "bg-gray-900 hover:bg-gray-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={() => room.available && handleSelection(room)}
              disabled={!room.available}
            >
              {room.available ? "Choose Room" : "Not Available"}
            </button>
          </div>
        </div>
      ))}
    </div>
        <div className="xs:w-full md:w-[40%] sticky top-[100px] h-full " id="booker">
          <BookRoom hotelName={specificHotel?.name} bookedRoom={bookedRoom} />
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
