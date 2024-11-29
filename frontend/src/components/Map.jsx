import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const ClickHandler = ({ setPoint }) => {
  useMapEvents({
    click: (e) => {
      setPoint(e.latlng);
    },
  });
  return null;
};
export default function Map({ setListData }) {
  const [point, setPoint] = useState(null);
  useEffect(() => {
    if (point) {
      setListData((prev) => ({
        ...prev,
        coordinate: [point.lat, point.lng],
      }));
    }
  }, [point]);
  return (
    <div className="h-[500px] mb-5">
      <MapContainer
        center={[35.6892, 51.389]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler setPoint={setPoint} />
        {point && <Marker position={point} />}
      </MapContainer>
    </div>
  );
}
