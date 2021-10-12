import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const Map = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/motasemkwaik/ckuo7k9rf6jsh17q1y9rpuuw1'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
    ></ReactMapGL>
  );
};

export default Map;
