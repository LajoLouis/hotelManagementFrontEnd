import { Link } from "react-router-dom";

function HotelCard({ item }) {
  return (
    <Link to={`/hoteldetails/${item.id}`}>
         <div className="xs:w-full md:w-[90%] shadow-lg shadow-slate-700 mx-auto rounded-[10px] xs:my-0 xs:mb-[2%] md:my-[2%] overflow-hidden bg-white">
      <div className="flex xs:flex-col md:flex-row">
        <div
          className={`xs:w-full md:w-[40%] bg-cover bg-center transition hover:scale-110 duration-1000`}
          style={{
            backgroundImage: `url(${item.hotelImage})`,
            minHeight: "200px",
          }}
        >
          {/* <img src="" alt="" className="h-[200px]" /> */}
        </div>
        <div className="xs:w-full md:w-[60%] p-6">
          <h1 className="text-center text-[34px] font-extrabold">
            {item.name}
          </h1>
          <p className="text-center font-bold">{item.state}</p>
          <p className="text-center font-bold">{item.city}</p>
          <p className="font-Gupter">{item.description}</p>
          <p className="font-Gupter">It has a total of {item.rooms.length} rooms</p>
          <p className="font-Gupter p-3">Rating: {item.rating}/5</p>

          <button className="flex bg-gray-900 p-[5px] text-white hover:bg-gray-700 ">
            Explore
          </button>
        </div>
      </div>
    </div>     
    </Link>
  );
}

export default HotelCard;
