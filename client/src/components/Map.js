import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useEffect, useState } from "react";
import { getSightings } from "../services/map-routes";

const mapStyle = {
  width: "50%",
  height: "100%",
  position: "relative",
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: 10,
  width: "100%",
  height: "50%",
};

const MapPage = (props) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    getSightings().then((sightings) => {
      setMarkers(sightings);
    });
  }, []);

  return (
    <Map
      google={props.google}
      zoom={6}
      initialCenter={{ lat: 35.378389, lng: -97.517313 }}
      style={mapStyle}
      containerStyle={containerStyle}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          name={marker.title}
          position={{
            lat: marker.location.coordinates[1],
            lng: marker.location.coordinates[0],
          }}
        />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper((props) => ({
  apiKey: process.env.REACT_APP_API_KEY,
}))(MapPage);
