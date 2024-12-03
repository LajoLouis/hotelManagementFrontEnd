import { createContext, useEffect, useState, useContext } from "react";
import useAlert from "../hooks/useAlert";
import { v4 as uuidv4 } from "uuid";
import AuthContext from "./AuthContext";
import { json } from "react-router-dom";

const HotelContext = createContext();
const today = new Date().toISOString().split("T")[0];

export const HotelProvider = ({ children }) => {
  
  const [hotel, setHotel] = useState([]);
  const [searchedHotel, setSearchedHotel] = useState([]);
  const { alertInfo, showAndHide } = useAlert();
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState("");
  const [bookingCart, setBookingCart] = useState([])
  const [userProfile, setUserProfile] = useState({})
  const [state, dispatch] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  
  const isAuthenticated = state.accessToken !== null;
  
  // useEffect to fetch all hotels when page loads
  useEffect(() => {
    fetchHotel();
    getUserProfile();
    getBookings();
  }, []);
  
  const checkInMIl = new Date(checkIn).getTime()
  const dayAfterCheckIn = new Date(checkInMIl + 86400000).toISOString().split("T")[0]
  // async function to fetch all hotels
  const fetchHotel = async () => {
    const res = await fetch("https://bookvialajo.onrender.com/bookvialajo/hotels");
    const data = await res.json();
    setHotel(data);
  };

  // variable for storing today's date

  const getUserProfile = async () => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      try {
        const res = await fetch(
          "https://bookvialajo.onrender.com/bookvialajo/userProfile",
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


  const getBookings = async() =>{
    const token = localStorage.getItem("auth-token");

    if (token) {
      try {
        const res = await fetch(
          "https://bookvialajo.onrender.com/bookvialajo/getBooking",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        const data = await res.json();
        setBookingCart(data)
        console.log(typeof(data));
        
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    } else {
      console.log("Unauthorized access");
    }
  }


  const deletebookedRoom = async(id)=>{
    const bookingId = id
    const token = localStorage.getItem("auth-token")

    try {
      const res = await fetch("https://bookvialajo.onrender.com/bookvialajo/deletebooking", {
        method: "POST",
        headers : {
          "Content-Type" : "application/json",
          "auth-token" : token
        },
        body : JSON.stringify({bookingId})
      })
      const data = await res.json()
      getBookings()
      showAndHide("success", "Booking deleted")
    } catch (error) {
      console.log(error);
      
    }
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
        dayAfterCheckIn,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        bookingCart,
        userProfile,
        setUserProfile,
        deletebookedRoom,
        isAuthenticated,
        setBookingCart,
        getUserProfile,
        getBookings
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelContext;
