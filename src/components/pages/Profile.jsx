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
        "http://localhost:8000/bookvialajo/editUserProfile",
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
                    src={`http://localhost:8000/${userProfile.image}`}
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
              <div>
                <h1 className="text-center font-extrabold text-3xl p-[10px]">Booking History</h1>
                {userProfile?.bookingHistory?.map((history)=> (
                  <div className="border-[1px] m-[2px] border-black flex" key={history._id}>
                    <div className="w-[70%]">
                    <h1>Date: {history?.date}</h1>
                    <div>
                      <h1 className="text-2xl font-extrabold">{history?.room?.hotel?.name}</h1>
                      <h1>Room:{history?.room?.roomName}</h1>
                    </div>
                    </div>
                    <div className="w-[30%]">
                      <img src={`http://localhost:8000/${history?.room?.roomImage}`} alt="" className="object-cover h-full"/>
                    </div>
                  </div>
                ))}
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
