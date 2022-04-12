
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '../App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Upload } from './Upload';

mapboxgl.accessToken = process.env.REACT_APP_PUBLIC_ACCESS_TOKEN;

function App() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  const HandleMapSource = (e) => {

     map.current.addSource(e.target.files[0].name, {
      type: 'geojson',
      data: 'https://kurodevs.github.io/test-abandoned/geo.geojson'
      });

      map.current.addLayer({
        'id': 'iss',
        'type': 'symbol',
        'source': e.target.files[0].name,
        'layout': {
        'icon-image': 'rocket-15'
        }
        });
  }

  return (
    <div className="App">
      <div>
        <Upload />
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
