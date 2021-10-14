import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import Image from 'next/image';

const Map = ({ searchResult }) => {
  const [selectedLocation, setSelectedLocation] = useState({});

  //    transform the search results object into the
  //    { latitude: 51.5103, longitude: 7.49347 } object

  const coordinates = searchResult.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  // The latitude and longitude of the center of locations coordinates

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/motasemkwaik/ckuo7k9rf6jsh17q1y9rpuuw1'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResult.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetTop={-20}
            offsetLeft={-10}
          >
            <p
              role='img'
              onClick={() => setSelectedLocation(result)}
              className='cursor-pointer animate-bounce text-lg'
              aria-label='push-pin'
            >
              <LocationMarkerIcon className='h-7 text-blue-400 ' />
            </p>
          </Marker>

          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
              className='z-50 text-red-500 text-sm font-bold'
            >
              <div className='relative  '>
                <Image
                  src={result.img}
                  height={100}
                  width={220}
                  className='rounded-lg '
                />
                <div className=''>
                  <p className='text-red-500 text-xs '>{result.title}</p>
                  <p className='text-black font-semibold text-xs'>
                    {result.price}
                  </p>
                </div>
              </div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
