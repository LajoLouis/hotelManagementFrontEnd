import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HotelCard from "./components/HotelCard";
import LandingPage from "./components/LandingPage";
import { HotelProvider } from "./context/HotelContext";
import StatesHotels from "./components/pages/StatesHotels";
import HotelDetails from "./components/pages/HotelDetails";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import SearchedHotels from "./components/pages/SearchedHotels";
import Alert from "./components/pages/Alert";
import BookRoom from "./components/pages/BookRoom";
import BookingPayment from "./components/pages/BookingPayment";
import Profile from "./components/pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from "./components/pages/Loading";
// import HotelMap from "./components/pages/HotelMap";
import BookingConfirmed from "./components/pages/BookingConfirmed";
import SkeletonProfile from "./skeletons/SkeletonProfile";

const queryClient = new QueryClient();

function App() {
  const { getItem } = useLocalStorage("auth-token");
  const token = getItem();
  let authInitialState = { accessToken: token ?? null };
  return (
    <div >
      <QueryClientProvider client={queryClient}>
      <AuthProvider defaultState={authInitialState}>
      <HotelProvider>
        <Router>
          <Header />
          <Alert/>
          <Routes>
            <Route
              path = "/"
              element={
                <>
                  <LandingPage />
                </>
              }
            />
            <Route path="/statesHotels/:name" element={<StatesHotels/>}/>
            <Route path = "/hoteldetails/:id" element={<HotelDetails/>}/>
            <Route path = "/login" element={<Login/>}/>
            <Route path = "/register" element={<Register/>}/>
            <Route path = "/searchedhotel" element={<SearchedHotels/>}/>
            <Route path = "/bookroom" element={<BookRoom/>}/>
            <Route path = "/bookingpayment" element={<BookingPayment/>}/>
            <Route path = "/profile" element={<Profile/>}/>
            <Route path = "/loading" element={<Loading/>}/>
            {/* <Route path = "/hotelmap" element={<HotelMap/>}/> */}
            <Route path = "/bookingconfirmed" element={<BookingConfirmed/>}/>
            <Route path = "/skeletonprofile" element={<SkeletonProfile/>}/>
          </Routes>
          <Footer />
        </Router>
      </HotelProvider>
      </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
