import 'leaflet/dist/leaflet.css';


import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';

const Map = ({ setPoints, points, weightedMidpoint }) => {

  const mapRef = useRef(null);
  const [lineCoordinates, setLineCoordinates] = useState([]);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    if (points.length < 2) {
      setPoints([...points, { lat, lng }]);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  useEffect(() => {
    if (points.length === 2) {
      setLineCoordinates(points);
    } else {
      setLineCoordinates([]);
    }
  }, [points]);




  return (
    <MapContainer
      center={[41.7151, 44.8271]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
      language="en"
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"/>
      <MapClickHandler />
      {points.map((point, index) => (
        <Marker key={index} position={[point.lat, point.lng]}></Marker>
      ))}
      {weightedMidpoint &&
        <Marker position={[weightedMidpoint.lat, weightedMidpoint.lng]}>

        </Marker>}
      {lineCoordinates.length === 2 && (
        <Polyline
          positions={lineCoordinates.map((point) => [point.lat, point.lng])}
        />
      )}
    </MapContainer>
  );
};

export default Map;
