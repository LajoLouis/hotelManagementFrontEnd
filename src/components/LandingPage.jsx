import { Link, useNavigate } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { useContext, useState } from "react";
import HotelContext from "../context/HotelContext";

function LandingPage() {
  const states = ["Abuja", "Lagos", "Imo"];
  const { hotel, searchedHotel, setSearchedHotel, showAndHide, today, checkIn, setCheckIn, setCheckOut } =
    useContext(HotelContext);


  // function to get checkIn date
  const getDate = (e) => {
    setCheckIn(e.target.value);
  };

  const redirect = useNavigate();

  // function to search for hotel based on search criteria
  function hotelSearch(e) {
    e.preventDefault();

    const locationInput = e.target.elements.location.value.toLowerCase();
    const checkinInput = e.target.elements.checkin.value.toLowerCase();
    const checkoutInput = e.target.elements.checkout.value.toLowerCase();
    const filteredHotels = hotel.filter(
      (item) =>
        item.state.toLowerCase().includes(locationInput) ||
        item.name.toLowerCase().includes(locationInput)
    );

    if (filteredHotels.length > 0) {
      setSearchedHotel(filteredHotels);
      setCheckIn(checkinInput)
      setCheckOut(checkoutInput)
      console.log(locationInput);
      console.log(filteredHotels);
      redirect(`/searchedhotel?query=${locationInput}`);
    } else {
      redirect("/");
      showAndHide("error", "Hotel not found");
    }
  }
  
  // code for getting yesterday's date
  const yesterday = new Date(Date.now()- 86400000).toISOString().split("T")[0]

  return (
    // search div for users
    <div className="">
      <div className="h-[400px] bg-[url('/images/plush.jpg')] bg-center bg-auto flex justify-center ">
        <div className=" m-auto bg-[#f5f5f5] w-[80%] font-Gupter p-[18px] md:rounded-[60px] shadow-md shadow-gray-800">
          <form
            action=""
            className="flex md:flex-row xs:flex-col xs:space-y-2 justify-around text-black"
            onSubmit={(e) => hotelSearch(e)}
          >
            <div>
              <input
                type="reset"
                className="my-3 text-[#f5f5f5] bg-red-950 p-2"
              />
            </div>
            <div className="flex flex-col border-l-2 border-gray-900">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="font-Gupter p-[5%] pb-2 focus:border-[1px] focus:border-stone-600 focus:outline-none "
                required
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
                onChange={getDate}
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
              />
            </div>
            <div className="my-3 text-[#f5f5f5]">
              <button className="p-3 bg-gray-950  flex">
                <span>
                  <ImSearch className="text-[20px] space-x-4" />
                </span>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* div for exploring based on states */}
      <div className=" flex flex-col items-center py-[30px] space-y-4 ">
        <h1 className="text-[30px] font-extrabold border-l-2 border-l-red-950">
          Explore hotels based on popular states
        </h1>
        <div className="flex xs:items-center md:justify-around w-[90%]  overflow-hidden xs:flex-col md:flex-row xs:space-y-6 md:space-y-0">
          <div className="md:w-[30%] xs:w-[90%] flex flex-col items-center space-y-6 rounded-[5px] overflow-hidden shadow-lg shadow-slate-500 bg-[#f5f5f5]">
            <p className="text-[20px] font-bold">Abuja</p>
            <Link to={`/statesHotels/${states[0]}`}>
              <img
                src="/images/abujaImage.jpeg"
                alt=""
                className="w-full h-[300px]  transition hover:scale-110 duration-1000"
              />
            </Link>
          </div>
          <div className="md:w-[30%] xs:w-[90%] flex flex-col items-center space-y-6 rounded-[5px] overflow-hidden shadow-lg shadow-slate-500 bg-[#f5f5f5]">
            <p className="text-[20px] font-bold">Lagos</p>
            <Link to={`/statesHotels/${states[1]}`}>
              <img
                src="/images/lagosImage.jpeg"
                alt=""
                className="w-full h-[300px]  transition hover:scale-110 duration-1000"
              />
            </Link>
          </div>
          <div className="md:w-[30%] xs:w-[90%] flex flex-col items-center space-y-6 rounded-[5px] overflow-hidden shadow-lg shadow-slate-500 bg-[#f5f5f5]">
            <p className="text-[20px] font-bold">Imo</p>
            <Link to={`/statesHotels/${states[2]}`}>
              <img
                src="/images/Owerri.jpeg"
                alt=""
                className="w-full  h-[300px] transition hover:scale-110 duration-1000"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
