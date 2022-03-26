
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '../App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoia3Vyb2RldnMiLCJhIjoiY2wxNHE0dXk3MDh6NDNqdGVkbnhteHczeSJ9.D74G6X7FCju8ASr5NqbUCw';

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


  return (
    <div className="App">
      <div>
        <input type="file" />
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
