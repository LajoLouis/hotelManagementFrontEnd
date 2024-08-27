import { useContext } from "react";
import HotelCard from "../HotelCard";
import { Link, useParams } from "react-router-dom";
import HotelContext from "../../context/HotelContext";

function StatesHotels() {
  // Using the parameters to find hotel in chosen state
  const params = useParams();
  const stateName = params.name;
  const { hotel } = useContext(HotelContext);
  const hotelsInState = hotel.filter((item) => item.state === stateName);
  const firstHotelImage =
    hotelsInState.length > 0 ? hotelsInState[0].stateImage : null;

  return (
    <div className="w-full flex justify-center ">
      <div className="w-[90%] my-[20px] flex shadow-md shadow-red-950 rounded-[10px] overflow-hidden bg-slate-100">
        <div
          className="xs:w-[0%] md:w-[40%] bg-center bg-cover "
          style={{
            backgroundImage: `url(${firstHotelImage})`,
            minHeight: "200px",
          }}
        ></div>
        <div className=" xs:w-full md:w-[60%] space-y-4">
          {hotelsInState.map((item) => (
            <HotelCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatesHotels;
