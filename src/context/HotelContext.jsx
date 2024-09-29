import { createContext, useEffect, useState, useContext } from "react";
import useAlert from "../hooks/useAlert";
import { v4 as uuidv4 } from "uuid";
import AuthContext from "./AuthContext";

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotel, setHotel] = useState([]);
  const [searchedHotel, setSearchedHotel] = useState([]);
  const { alertInfo, showAndHide } = useAlert();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingCart, setBookingCart] = useState([]);
  const [userProfile, setUserProfile] = useState({})
  const [state, dispatch] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = state.accessToken !== null;

  // useEffect to fetch all hotels when page loads
  useEffect(() => {
    fetchHotel();
    getUserProfile();
  }, []);

  // async function to fetch all hotels
  const fetchHotel = async () => {
    const res = await fetch("http://localhost:8000/bookvialajo/hotels");
    const data = await res.json();
    setHotel(data);
  };

  // variable for storing today's date
  const today = new Date().toISOString().split("T")[0];

  const getUserProfile = async () => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      try {
        const res = await fetch(
          "http://localhost:8000/bookvialajo/userProfile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        const data = await res.json();
        setUserProfile(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };


  // function to handle booking of rooms and adding them to cart
  const handleBookingCart = (hotelName, bookedRoom, occupants, totalAmount) => {
    console.log(bookedRoom);
    
    if (!bookedRoom || !bookedRoom.roomName) {
      showAndHide("error", "Kindly select a room to proceed");
      return;
    }

    const existingbookingId = bookingCart.findIndex(
      (item) => item.name === bookedRoom.roomName
    );
    console.log(existingbookingId);

    if (existingbookingId !== -1) {
      showAndHide("error", `${bookedRoom.roomName} has been booked already`);
      return;
    } else {
      const selectedRoom = {
        bookingId: uuidv4(),
        hotel: hotelName,
        name: bookedRoom.roomName,
        image: bookedRoom.roomImage,
        checkIn: checkIn,
        checkOut: checkOut,
        occupants: occupants,
        totalAmount: totalAmount,
      };
      setBookingCart([...bookingCart, selectedRoom]);
      showAndHide(
        "success",
        "Booking verified, proceed to profile to make payment"
      );
      setCheckIn("")
      setCheckOut("")
    }
  };

  const deletebookedRoom = (id)=>{
    const updatedBookingCart = bookingCart.filter((item)=> item.bookingId !== id)
    setBookingCart(updatedBookingCart)

    showAndHide("success", "room has been successfully removed from booking")
  }



  

  return (
    <HotelContext.Provider
      value={{
        hotel,
        searchedHotel,
        setSearchedHotel,
        showAndHide,
        alertInfo,
        today,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        bookingCart,
        handleBookingCart,
        userProfile,
        setUserProfile,
        deletebookedRoom,
        isAuthenticated,
        setBookingCart,
        getUserProfile
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelContext;
