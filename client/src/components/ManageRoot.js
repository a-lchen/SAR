import React from "react";
import GoogleMapReact from "google-map-react";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { Snackbar } from "@material-ui/core";

import SearchData from "./SearchData.js";
import UserDot from "./UserDot.js";

import { getLocation } from "../utils.js";
import { getLatLongBounds } from "./Helpers.js";

import { socket, init, sendLocation, sendFoundClue } from "../socket.js";

class ManageRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 42.3583566,
        lng: -71.101722
      },
      zoom: 17,
      users: [{ name: "abc", lat: 42.35, lng: -71.11 }],
      currentUser: null,
      searchedBlocks: [],
      unsearchedBlocks: [],
      snack: false,
      snackMessage: null
    };
  }

  onMapClick = data => {
    if (!this.state.currentUser) {
      this.setState({
        snack: true,
        snackMessage: "Please select a user first!"
      });
    }
  };

  onMapChildClick = (key, childProps) => {
    console.log(childProps);
  };

  hideSnack = () => {
    console.log("HI");
    this.setState({
      snack: false
    });
  };

  componentDidMount() {
    let splitPath = window.location.pathname.split("/");
    let search_id = splitPath[splitPath.length - 1];
    console.log(getLocation());

    init("foo", search_id);
    // sendLocation('42.3583277,71.10173499999999', 'foo', search_id)
    socket.on("grid", data => {
      // TODO: DO STUFF WHEN YOU GET THE GRID HERE.
      console.log("grid");
      console.log(data);
    });

    socket.on("found_clue", data => {
      // TODO: DO STUFF WHEN CLUE HAS BEEN FOUND HERE.
      console.log("found clue");
      console.log(data);
    });
  }

  render() {
    var userDots = this.state.users.map(user => {
      return <UserDot name={user.name} lat={user.lat} lng={user.lng} />;
    });

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.MAPS_KEY }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          onClick={this.onMapClick}
          onChildClick={this.onMapChildClick}
        >
          {userDots}
        </GoogleMapReact>
        <Snackbar
          open={this.state.snack}
          message={this.state.snackMessage || ""}
          autoHideDuration={4000}
          onClose={this.hideSnack}
          action=""
          resumeHideDuration={0}
        />
      </div>
    );
  }
}

export default ManageRoot;
