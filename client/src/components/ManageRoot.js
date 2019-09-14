import React from "react";
import GoogleMapReact from "google-map-react";
import { getLocation } from "../utils.js";
import { getLatLongBounds } from "./Helpers.js";
import AcUnitIcon from "@material-ui/icons/AcUnit";

class ManageRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 42.3583566,
        lng: -71.101722
      },
      zoom: 17
    };
  }

  onClick(data) {
    console.log(data);
  }

  componentDidMount() {
    let splitPath = window.location.pathname.split("/");
    console.log(splitPath[splitPath.length - 1]);
    console.log(getLocation());
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.MAPS_KEY }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          onClick={this.onClick}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default ManageRoot;
