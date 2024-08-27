import { createContext, useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";
import { v4 as uuidv4 } from "uuid";

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotel, setHotel] = useState([]);
  const [searchedHotel, setSearchedHotel] = useState([]);
  const { alertInfo, showAndHide } = useAlert();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingCart, setBookingCart] = useState([]);
  const [userProfile, setUserProfile] = useState([])

  // useEffect to fetch all hotels when page loads
  useEffect(() => {
    fetchHotel();
  }, []);

  // async function to fetch all hotels
  const fetchHotel = async () => {
    const res = await fetch("http://localhost:3000/hotels");
    const data = await res.json();
    setHotel(data);
  };

  // variable for storing today's date
  const today = new Date().toISOString().split("T")[0];


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
        image: bookedRoom.image,
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
    }
  };

  const deletebookedRoom = (id)=>{
    const updatedBookingCart = bookingCart.filter((item)=> item.bookingId !== id)
    setBookingCart(updatedBookingCart)

    showAndHide("success", "room has been successfully removed from booking")
  }



  const handleRegistration = (e) =>{
    e.preventDefault()

    const firstName = e.target.elements.firstname.value
    const lastName = e.target.elements.lastname.value
    const email = e.target.elements.email.value
    const phone = e.target.elements.phone.value
    const password = e.target.elements.password.value
    const confirmPassword = e.target.elements.confirmPassword.value

    if (password !== confirmPassword) {
      showAndHide("error", "password must be the same")
    }else {
      const newUserProfile = [firstName, lastName, email, phone, password]
      setUserProfile(newUserProfile)

      setTimeout(() => {
        console.log(userProfile);
        
      }, 3000);
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
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        bookingCart,
        handleBookingCart,
        userProfile,
        setUserProfile,
        handleRegistration,
        deletebookedRoom
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelContext;
