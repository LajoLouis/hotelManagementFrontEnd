import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import HotelContext from "../../context/HotelContext";
import HotelCard from "../HotelCard";

function SearchedHotels() {
  const { hotel, searchedHotel, setSearchedHotel } = useContext(HotelContext);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");

    if (query) {
      const filteredHotels = hotel.filter(
        (item) =>
          item.state.toLowerCase().includes(query.toLowerCase()) ||
          item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchedHotel(filteredHotels);
    }
  }, [location.search, hotel, setSearchedHotel]);

  return (
    <div>
      <div>
        {searchedHotel.length > 0 ? (
          searchedHotel.map((item) => <HotelCard key={item._id} item={item} />)
        ) : (
          <div>No hotels found.</div>
        )}
      </div>
    </div>
  );
}

export default SearchedHotels;