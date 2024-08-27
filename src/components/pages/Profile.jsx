import { useContext, useEffect, useState } from "react";
import HotelContext from "../../context/HotelContext";
import { CgProfile } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { IoSendSharp } from "react-icons/io5";

function Profile() {
  const { userProfile, setUserProfile, showAndHide } = useContext(HotelContext);
  const [isDisabled, setIsDisabled] = useState(true)

  console.log(userProfile);

  const editProfile = () => {
    setIsDisabled(!isDisabled)
    const profileInputs = document.querySelectorAll(`.profileInputs`)
    profileInputs.disabled = isDisabled
  };
  

  const handleEditSubmission =(e)=>{
    e.preventDefault()

    const firstName = e.target.elements.firstname.value
    const lastName = e.target.elements.lastname.value
    const email = e.target.elements.email.value
    const phone = e.target.elements.phone.value

    setUserProfile([firstName, lastName, email, phone, userProfile[4]])
    setIsDisabled(!isDisabled)
    showAndHide("success", "profile successfully edited")

    // const dupUserProfile = userProfile[0]
    // console.log(dupUserProfile);
    
  }
  
    
  return (
    <div className="min-h-screen">
      {
        <div className="mx-auto xs:w-[90%] md:w-[50%] border-[2px] p-[5%] bg-stone-200 rounded-[10px] shadow-lg shadow-zinc-400 transition-all duration-1000">
          <CgProfile className="m-auto text-[40px]" />
          <form action="" className="flex flex-col" onSubmit={(e)=> handleEditSubmission(e)}>
            <label htmlFor="firstname" className="text-[12px]">
              First name
            </label>
            <div className="flex space-x-2">
              <input
                className={`profileInputs p-[5%] font-Gupter ${!isDisabled ? "border-[1px] border-stone-600 outline-none" : ""} bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2 w-[80%]`}
                type="text"
                name="firstname"
                defaultValue={userProfile[0]}
                disabled={isDisabled}
                id="firstName"
              />
            </div>
            <label htmlFor="Lastname" className="text-[12px]">
              Last name
            </label>
            <div className="flex space-x-2">
              <input
                className={`profileInputs p-[5%] font-Gupter ${!isDisabled ? "border-[1px] border-stone-600 outline-none" : ""} bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2 w-[80%]`}
                type="text"
                name="lastname"
                defaultValue={userProfile[1]}
                disabled={isDisabled}
                id="lastName"
              />
            </div>

            <label htmlFor="email" className="text-[12px]">
              Email Address
            </label>
            <div className="flex space-x-2">
              <input
                className={`profileInputs p-[5%] font-Gupter ${!isDisabled ? "border-[1px] border-stone-600 outline-none" : ""} bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2 w-[80%]`}
                type="text"
                name="email"
                defaultValue={userProfile[2]}
                disabled={isDisabled}
                id="email"
              />
            </div>

            <label htmlFor="phone" className="text-[12px]">
              Phone Number
            </label>
            <div className="flex space-x-2">
              <input
                className={`profileInputs p-[5%] font-Gupter ${!isDisabled ? "border-[1px] border-stone-600 outline-none" : ""} bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2 w-[80%]`}
                type="text"
                name="phone"
                defaultValue={userProfile[3]}
                disabled={isDisabled}
                id="phone"
              />
            </div>
              <button className={`text-center bg-emerald-900 text-white p-[10px] hover:bg-emerald-600  ${isDisabled ? "hidden": ""}`} >
                Confirm Edit
              </button>
          </form>
              <button onClick={editProfile} className="flex bg-stone-800 hover:bg-stone-900 text-white p-[10px] m-2">
                <CiEdit className="text-[20px] " />
              </button>
        </div>
      }
    </div>
  );
}

export default Profile;
