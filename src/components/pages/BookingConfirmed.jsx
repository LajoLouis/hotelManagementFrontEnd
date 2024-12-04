import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import HotelContext from '../../context/HotelContext'

function BookingConfirmed() {
  const [searchParams] = useSearchParams()
  const tx_ref = searchParams.get("tx_ref")
  const transaction_id = searchParams.get("transaction_id")
  const {getBookings, getUserProfile} = useContext(HotelContext)
  const createHistory = async (transaction_id, orderId) => {
    try {
      const response = await fetch(
        "https://bookvialajo.onrender.com/bookvialajo/payment/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
          body: JSON.stringify({ transaction_id, orderId }),
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("sharp");
        
      } else {
        console.error(data.msg);
      }
      setTimeout(() => {
        getBookings()
        getUserProfile()
      }, 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (transaction_id && tx_ref) {
      createHistory(transaction_id, tx_ref)
    }
  }, [transaction_id, tx_ref, createHistory])


  return (
    <div className='bg-[url("/images/sunrise1.jpg")] h-screen bg-no-repeat bg-cover flex justify-center items-center'>
      <div className='bg-white md:w-[50%] xs:w-full md:h-fit xs:h-fit bg-opacity-70 rounded-[20px] '>
        <h1 className='text-center text-[30px] font-extrabold'>BookingConfirmed</h1>
        <p className='text-center p-[20px] text-[20px]'>Thank you for trusting our platform</p>
        <div className='w-[90%] mx-auto'>
          <h1 className='font-bold'>Steps after booking</h1>
          <ul className='list-disc '>
            <li>Drive Carefully to the booked hotel Using our in-app Map</li>
            <li>Present the booking_id to the necessary staff</li>
            <li>Enjoy your stay</li>
            <li>Thanks</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmed