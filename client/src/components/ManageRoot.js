import React from "react";
import GoogleMapReact from "google-map-react";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { Snackbar } from "@material-ui/core";

import SearchData from "./SearchData.js";
import UserDot from "./UserDot.js";

import { getLocation } from "../utils.js";
import { getLatLongBounds } from "./Helpers.js";

import {
  socket,
  init,
  sendLocation,
  sendFoundClue,
  sendDirectSearcher
} from "../socket.js";

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
      allBlocks: [],
      searchedBlocks: [],
      unsearchedBlocks: [],
      polylinesJSX: [],
      gridData: {},
      snack: false,
      snackMessage: null,
      map: null
    };
  }

  // "coords" meaning "coord string"
  coordsToData = coords => {
    let comma = coords.indexOf(",");
    return {
      lat: parseFloat(coords.substring(0, comma)),
      lng: parseFloat(coords.substring(comma + 1))
    };
  };

  rerenderGrid = () => {
    let eps = 0.00001;
    let allBlocksUpdated = Array.from(this.state.allBlocks);

    for (var coords in this.state.gridData) {
      let data = this.coordsToData(coords);
      let bounds = getLatLongBounds(data.lat + eps, data.lng + eps);
      console.log(bounds);
      let paths = [
        { lat: bounds[0][0], lng: bounds[0][1] },
        { lat: bounds[0][0], lng: bounds[1][1] },
        { lat: bounds[1][0], lng: bounds[1][1] },
        { lat: bounds[1][0], lng: bounds[0][1] }
      ];

      let color = this.state.gridData[coords] > 0 ? "#FF0000" : "#0000FF";

      let flightPath = new google.maps.Polygon({
        map: this.state.map,
        paths: paths,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 0,
        fillColor: color,
        fillOpacity: 0.35,
        draggable: false,
        geodesic: true
      });
      flightPath.setMap(this.state.map);

      // if we've already added this block before, don't add it again
      for (var i = 0; i < this.state.allBlocks.length; i++) {
        if (
          paths[0].lat == this.state.allBlocks[i][0].lat &&
          paths[0].lng == this.state.allBlocks[i][0].lng
        ) {
          return;
        }
      }

      allBlocksUpdated.push(paths);
    }

    this.setState({
      allBlocks: allBlocksUpdated
    });
  };

  onMapLoaded = (map, maps) => {
    this.setState({
      map: map
    });
  };

  onMapClick = data => {
    if (!this.state.currentUser) {
      this.setState({
        snack: true,
        snackMessage: "Please select a user first!"
      });
    } else {
      let bounds = getLatLongBounds(data.lat, data.lng);
      let bottomLeft = bounds[0][0].toString() + "," + bounds[0][1].toString();
      sendDirectSearcher(
        bottomLeft,
        this.state.currentUser.name,
        this.state.searchID
      );
    }
  };

  onMapChildClick = (key, childProps) => {
    console.log(childProps);
    this.setState({
      currentUser: childProps.name
    });
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
      this.setState(
        {
          gridData: data
        },
        () => {
          this.rerenderGrid();
        }
      );
    });

    socket.on("found_clue", data => {
      // TODO: DO STUFF WHEN CLUE HAS BEEN FOUND HERE.
      console.log("found clue");
      console.log(data);
    });

    this.setState({
      searchID: search_id
    });
  }

  render() {
    let userDots = this.state.users.map(user => {
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
          onGoogleApiLoaded={({ map, maps }) => this.onMapLoaded(map, maps)}
          yesIWantToUseGoogleMapApiInternals={true}
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
