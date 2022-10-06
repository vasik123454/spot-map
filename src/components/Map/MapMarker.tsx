import { Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { MapDetail } from "./MapDetail/MapDetail";

export const MapMarker: React.FC<{
  lat: number;
  lng: number;
}> = ({ lat, lng }) => {
  const [opened, setOpened] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!opened) {
      setTimeout(() => {
        setClicked(false);
      }, 500);
    }
  }, [opened]);

  return (
    <>
      <Marker
        position={{
          lat,
          lng,
        }}
        icon={{
          url: "/images/place-marker.svg",
          scaledSize: new window.google.maps.Size(50, 50),
        }}
        animation={google.maps.Animation.DROP}
        onClick={() => {
          setOpened(!opened);
          setClicked(true);
        }}
      />
      {clicked && (
        <MapDetail setOpened={setOpened} opened={opened} clicked={clicked} />
      )}
    </>
  );
};
