import React from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function BookingConfirmed() {
  const [searchParams] = useSearchParams()
  const tx_ref = searchParams.get("tx_ref")
  const transaction_id = searchParams.get("transaction_id")
  const createHistory = async (transaction_id, orderId) => {
    try {
      const response = await fetch(
        "http://localhost:8000/bookvialajo/payment/verify",
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
    <div>BookingConfirmed</div>
  )
}

export default BookingConfirmed