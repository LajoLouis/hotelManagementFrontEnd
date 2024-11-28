import { useContext, useEffect, useState } from "react";
import HotelContext from "../../context/HotelContext";
import { CgProfile } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { IoSendSharp } from "react-icons/io5";

function Profile() {
  const { userProfile, setUserProfile, showAndHide, loading } = useContext(HotelContext);
  const [isDisabled, setIsDisabled] = useState(true);
  

  

  const editProfile = () => {
    setIsDisabled(!isDisabled);
    const profileInputs = document.querySelectorAll(`.profileInputs`);
    profileInputs.disabled = isDisabled;
  };

  const handleEditSubmission = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("auth-token");
    const firstName = e.target.elements.firstname.value;
    const lastName = e.target.elements.lastname.value;
    const phone = e.target.elements.phone.value;
    const email = e.target.elements.email.value;

    try {
      const res = await fetch(
        "https://bookvialajo.onrender.com/bookvialajo/editUserProfile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ firstName, lastName, phone, email }),
        }
      );

      const data = await res.json();
      setUserProfile(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // setUserProfile([firstName, lastName, email, phone, userProfile[4]])
    setIsDisabled(!isDisabled);
    showAndHide("success", "profile successfully edited");

    // const dupUserProfile = userProfile[0]
    // console.log(dupUserProfile);
  };

  if (loading) {
    return <div>Loading... </div>;
  }

  return (
    <>
      {userProfile ? (
        <div className="min-h-screen">
          {
            <div className="mx-auto xs:w-[90%] md:w-[50%] border-[2px] p-[5%] bg-stone-200 rounded-[10px] shadow-lg shadow-zinc-400 transition-all duration-1000">
              <div className="m-auto h-[80px] w-[80px] rounded-full overflow-hidden">
                {userProfile.image ? (
                  <img
                    src={`https://bookvialajo.onrender.com/${userProfile.image}`}
                    alt={userProfile.firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CgProfile className="m-auto text-[40px]" />
                )}
              </div>
              <form
                action=""
                className="flex flex-col"
                onSubmit={(e) => handleEditSubmission(e)}
              >
                <label htmlFor="firstname" className="text-[12px]">
                  First name
                </label>
                <div className="flex space-x-2">
                  <input
                    className={`profileInputs p-[5%] font-Gupter ${
                      !isDisabled
                        ? "border-[1px] border-stone-600 outline-none"
                        : ""
                    } bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2 w-[80%]`}
                    type="text"
                    name="firstname"
                    defaultValue={userProfile.firstName}
                    disabled={isDisabled}
                    id="firstName"
                  />
                </div>
                <label htmlFor="Lastname" className="text-[12px]">
                  Last name
                </label>
                <div className="flex space-x-2">
                  <input
                    className={`profileInputs p-[5%] font-Gupter ${
                      !isDisabled
                        ? "border-[1px] border-stone-600 outline-none"
                        : ""
                    } bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2 w-[80%]`}
                    type="text"
                    name="lastname"
                    defaultValue={userProfile.lastName}
                    disabled={isDisabled}
                    id="lastName"
                  />
                </div>

                <label htmlFor="email" className="text-[12px]">
                  Email Address
                </label>
                <div className="flex space-x-2">
                  <input
                    className={`profileInputs p-[5%] font-Gupter ${
                      !isDisabled
                        ? "border-[1px] border-stone-600 outline-none"
                        : ""
                    } bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2 w-[80%]`}
                    type="text"
                    name="email"
                    defaultValue={userProfile.email}
                    disabled={isDisabled}
                    id="email"
                  />
                </div>

                <label htmlFor="phone" className="text-[12px]">
                  Phone Number
                </label>
                <div className="flex space-x-2">
                  <input
                    className={`profileInputs p-[5%] font-Gupter ${
                      !isDisabled
                        ? "border-[1px] border-stone-600 outline-none"
                        : ""
                    } bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2 w-[80%]`}
                    type="text"
                    name="phone"
                    defaultValue={userProfile.phone}
                    disabled={isDisabled}
                    id="phone"
                  />
                </div>
                <button
                  className={`text-center bg-emerald-900 text-white p-[10px] hover:bg-emerald-600  ${
                    isDisabled ? "hidden" : ""
                  }`}
                >
                  Confirm Edit
                </button>
              </form>
              <button
                onClick={editProfile}
                className="flex bg-stone-800 hover:bg-stone-900 text-white p-[10px] m-2"
              >
                <CiEdit className="text-[20px] " />
              </button>
              <div className="p-8 bg-gray-100 min-h-screen">
  <h1 className="text-center font-extrabold text-4xl mb-8 text-gray-800">Booking History</h1>
  {userProfile?.bookingHistory?.length > 0 ? (
    userProfile.bookingHistory.map((history) => (
      <div
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden mb-6"
        key={history._id}
      >
        {/* Room Image */}
        <div className="md:w-1/3">
          <img
            src={`https://bookvialajo.onrender.com/${history?.room?.roomImage}`}
            alt="Room"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Booking Details */}
        <div className="md:w-2/3 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{history?.room?.hotel?.name}</h2>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Hotel Address:</span> {history?.room?.hotel?.address}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Room Name:</span> {history?.room?.roomName}
          </p>

          {/* Booking Dates */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Check-In:</span> {history?.checkIn}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Check-Out:</span> {history?.checkOut}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Nights:</span> {history?.numberOfNights}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Occupants:</span> {history?.occupants}
            </p>
          </div>

          {/* Payment Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Order ID:</span> {history?.orderId}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Transaction ID:</span> {history?.transactionId}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Cost:</span> ₦{history?.totalCost?.toLocaleString()}
            </p>
            <p
              className={`font-semibold ${
                history?.paymentStatus === "Completed"
                  ? "text-green-500"
                  : history?.paymentStatus === "Pending"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              <span>Payment Status:</span> {history?.paymentStatus}
            </p>
          </div>

          <p className="text-gray-600">
            <span className="font-semibold">Date Booked:</span> {new Date(history?.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-600 text-lg font-semibold">
      No booking history found. Start booking your favorite rooms!
    </p>
  )}
</div>

            </div>
          }
        </div>
      ) : (
        <p>Please login to view your profile</p>
      )}
    </>
  );
}

export default Profile;
