import React from "react";
import Icon from "@material-ui/core/Icon";
import Badge from "@material-ui/core/Badge";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import GoogleMapReact from "google-map-react";
import SearcherMarker from "./SearcherMarker.js";
import CardMedia from "@material-ui/core/CardMedia";
import ClueModal from "./ClueModal.js";
import InfoModal from "./InfoModal.js";
import { locationToString, getLocation } from "../utils.js";
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
    backgroundColor: "primary"
  },
  infoModal: {
    fontSize: 200,
    backgroundColor: primary
  }
};

// Import custom styles to customize the style of Google Map
const mapStyle = require("./mapStyle.json");

class SearchRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 42.3583566,
        long: -71.101722
      },
      infoModalOpen: false,
      clueModalOpen: false,
      center: {
        lat: 42.3583566,
        lng: -71.101722
      },
      zoom: 17
      // grid:
      // more attributes here
    };
    let splitPath = window.location.pathname.split("/");
    this.search_id = splitPath[splitPath.length - 1];
  }

  componentDidMount() {
    let splitPath = window.location.pathname.split("/");
    let search_id = splitPath[splitPath.length - 1];
    console.log(getLocation());
    init("foo", search_id);
    // sendLocation("42.3583277,71.10173499999999", "foo", search_id);

    var tid = setTimeout(sendNewLoc, 200);
    function sendNewLoc() {
      // for (var search_id in searches) {
      //   var search = searches[search_id];
      //   // console.log("sending out locs")
      //   io.in(search_id).emit("grid", search.coverage);
      // }
      tid = setTimeout(sendNewLoc, 200); // repeat myself
      getLocation().then(res => {
        sendLocation(
          locationToString(res.coords.latitude, res.coords.longitude),
          "foo",
          search_id
        );
        // console.log(res)
      });
    }

    socket.on("grid", data => {
      // TODO: DO STUFF WHEN YOU GET THE GRID HERE.
      console.log(data);
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
    this.setState({
      infoModalOpen: true
    });
  }

  clueClicked() {
    console.log("show clue popup");
    this.setState({
      clueModalOpen: true
    });
  }

  contactClicked() {
    console.log("contact manager");
    window.open("tel:+5302200866", "_blank");
  }

  sendClue(clue) {
    console.log(clue);
    sendFoundClue(
      {
        image: null,
        location: locationToString(
          this.state.location.lat,
          this.state.location.long
        ),
        text: clue,
        time: Date.now()
      },
      "foo",
      this.search_id
    );
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div theme={theme} style={{ height: "100vh", width: "100%" }}>
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

        <InfoModal
          style={styles.infoModal}
          infoOpen={this.state.infoModalOpen}
          onInfoClose={() => {
            this.setState({ infoModalOpen: false });
          }}
        />

        <ClueModal
          onSendClue={clue => {
            this.sendClue(clue);
          }}
          clueOpen={this.state.clueModalOpen}
          onClueCancel={() => {
            this.setState({ clueModalOpen: false });
          }}
        />

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
