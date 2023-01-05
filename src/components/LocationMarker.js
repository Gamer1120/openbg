import { Popup, Marker, useMap } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import icon, { locationIcon } from "../constants";

export default function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);

  const map = useMap();

  const [time, setTime] = useState(Date.now());

  useEffect (() => {
    console.log('runnin')
    const interval = setInterval(() => {setTime(Date.now())
      map.locate().on("locationfound", function (e) {
        console.log('location found!')
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        // setBbox(e.bounds.toBBoxString().split(","));
      })}, 250);
    return () => {
      clearInterval(interval);
    };
  }, [])

  // useEffect(() => {
  //   map.locate().on("locationfound", function (e) {
  //     setPosition(e.latlng);
  //     map.flyTo(e.latlng, map.getZoom());
  //     // setBbox(e.bounds.toBBoxString().split(","));
  //   });
  // }, [map, position]);

  return position === null ? null : (
    <Marker position={position} icon={locationIcon}>
      {/* <Popup>
        You are here. <br />
        Map bbox: <br />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
      </Popup> */}
    </Marker>
  );
}
