import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import { useEffect } from 'react';
import 'leaflet-routing-machine';

const hotelIcon = new L.Icon({
  iconUrl: '/images/hotelicon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '/images/markershadow2.png', 
  shadowSize: [41, 41],
  shadowAnchor: [20, 25],
});
const userIcon = new L.Icon({
  iconUrl: '/images/userIcon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '/images/markershadow2.png', 
  shadowSize: [41, 41],
  shadowAnchor: [20, 25],
});

function HotelMap({specificHotelLocation, specificHotelName}) {
    const center = [specificHotelLocation?.coordinates[0]||0, specificHotelLocation?.coordinates[1]||0]
    const position =[specificHotelLocation?.coordinates[0]||0, specificHotelLocation?.coordinates[1]||0]

    const ShowDirections = () => {
      const hotelLocation = { lat: specificHotelLocation?.coordinates[0]||0, lng: specificHotelLocation?.coordinates[1]||0 }
      const map = useMap(); // Get access to the Leaflet map instance
  
      useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            console.log("User location:", latitude, longitude);
  
            // Set the view to user's location and add routing
            map.setView([hotelLocation.lat, hotelLocation.lng], 13);

            L.marker([latitude, longitude], { icon: userIcon }).addTo(map)
            .bindPopup("You are here!").openPopup(); // Optional popup
  
          // Add hotel marker with custom icon
           L.marker([hotelLocation.lat, hotelLocation.lng], { icon: hotelIcon }).addTo(map)
            .bindPopup(`${specificHotelName}`).openPopup(); // Optional popup

            const routingControl = L.Routing.control({
              waypoints: [
                L.latLng(hotelLocation.lat, hotelLocation.lng), // Hotel's location
                L.latLng(latitude, longitude)   // User's location
              ],
              routeWhileDragging: true,
              createMarker: function() { return null; }
            }).addTo(map);

            routingControl.on('routesfound', function(e) {
              const routes = e.routes;
              const hotelMarker = L.marker([hotelLocation.lat, hotelLocation.lng], { icon: hotelIcon });
              const userMarker = L.marker([latitude, longitude], { icon: userIcon });
  
              // Add custom markers after routing is calculated
              userMarker.addTo(map).bindPopup("You are here!").openPopup();
              hotelMarker.addTo(map).bindPopup(`${specificHotelName}`).openPopup();
            });
  
            return () => map.removeControl(routingControl); // Cleanup routing on unmount
          });
        }
      }, [map]);
  
      return null; // No UI to render
    };

  return (
    <div className='h-screen w-screen fixed top-0 left-0'>
      <MapContainer center={center} zoom={13} className="h-full w-full">
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ShowDirections/>
      <Marker  position={position} icon={hotelIcon}>
          <Popup>A pretty place in london</Popup>
        </Marker>
    </MapContainer>
    </div>
  )
}

export default HotelMap