import React from "react";
import Icon from "@material-ui/core/Icon";
import Badge from "@material-ui/core/Badge";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import GoogleMapReact from "google-map-react";
import SearcherMarker from "./SearcherMarker.js";
import { getLocation } from "../utils.js";
import { socket, init, sendLocation, sendFoundClue } from "../socket.js";

import deepOrange from "@material-ui/core/colors/deepOrange";

const theme = createMuiTheme({
  typography: {
    fontFamily: "-apple-system"
  },
  palette: {
    primary: { main: deepOrange[200] },
    secondary: { main: deepOrange[400] }
  }
});

const primary = deepOrange[200];
const secondary = deepOrange[400];

const styles = {
  badge: {
    width: 100,
    fontSize: 100
  },
  icon: {
    fontSize: 100,
    //margin: 40,
    color: "white"
  },
  iconContainer: {
    position: "absolute",
    bottom: 60,
    left: 40,
    right: 40,
    marginLeft: "auto",
    marginRight: "auto"
  },
  button: {
    height: 160,
    width: 160,
    margin: 30,
    borderRadius: 320, // > twice height/width
    backgroundColor: primary
  }
};

// Import custom styles to customize the style of Google Map
const mapStyle = require("./mapStyle.json");

class SearchRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 42.3583566,
        lng: -71.101722
      },
      zoom: 17,
      makeClue: false
      // grid:
      // more attributes here
    };
  }

  componentDidMount() {
    let splitPath = window.location.pathname.split("/");
    let search_id = splitPath[splitPath.length - 1];
    console.log(getLocation());
    init("foo", search_id);
    sendLocation("42.3583277,71.10173499999999", "foo", search_id);
    socket.on("grid", data => {
      // TODO: DO STUFF WHEN YOU GET THE GRID HERE.
      // update stuff from database
      //console.log(data);
    });

    socket.on("orders", data => {
      // TODO: DO STUFF WHEN RECEIVING ORDERS HERE.
      // update stuff from manager, ex manager
      console.log("got some orders");
      console.log(data);
    });
  }

  smsClicked() {
    console.log("view messages");
  }

  infoClicked() {
    console.log("show info page");
  }

  clueClicked() {
    console.log("show clue popup");
    this.setState({ makeClue: !this.state.makeClue });
    console.log(this.state.makeClue);
  }

  contactClicked() {
    console.log("contact manager");
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.MAPS_KEY }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          options={{
            disableDefaultUI: true, // disable default map UI
            styles: mapStyle // change default map styles
          }}
        >
          <SearcherMarker lat={42.3583566} lng={-71.101722} />
        </GoogleMapReact>

        {this.state.makeClue && <Clue />}

        <div style={styles.iconContainer}>
          <button style={styles.button} onClick={() => this.smsClicked()}>
            <Badge badgeContent={4} color="secondary" style={styles.badge}>
              <Icon style={styles.icon}> sms </Icon>
            </Badge>
          </button>
          <button style={styles.button} onClick={() => this.infoClicked()}>
            <Icon style={styles.icon}> info </Icon>
          </button>
          <button style={styles.button} onClick={() => this.clueClicked()}>
            <Icon style={styles.icon}> photo_size_select_actual </Icon>
          </button>
          <button style={styles.button} onClick={() => this.contactClicked()}>
            <Icon style={styles.icon}> phone </Icon>
          </button>
        </div>
      </div>
    );
  }
}

export default SearchRoot;
