import React from "react";
import Icon from "@material-ui/core/Icon";
import GoogleMapReact from "google-map-react";
import SearcherMarker from "./SearcherMarker.js";
import ClueModal from "./ClueModal.js";
import { locationToString, getLocation } from "../utils.js";
import { socket, init, sendLocation, sendFoundClue } from "../socket.js";

const styles = {
  icon: {
    fontSize: 100,
    //margin: 40,
    color: "white"
  },
  iconContainer: {
    position: "absolute",
    bottom: 80,
    left: 80,
    right: 80,
    marginLeft: "auto",
    marginRight: "auto"
  },
  button: {
    height: 160,
    width: 160,
    margin: 20,
    borderRadius: 320, //twice height/width
    backgroundColor: "rgb(195, 125, 198)" //TODO: change to theme color
  }
};

class SearchRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 42.3583566,
        long: -71.101722
      },
      clueModalOpen: false,
      center: {
        lat: 42.3583566,
        lng: -71.101722
      },
      zoom: 17
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
      // console.log(data);
    });

    socket.on("orders", data => {
      // TODO: DO STUFF WHEN RECEIVING ORDERS HERE.
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
    this.setState({
      clueModalOpen: true
    });
  }

  contactClicked() {
    console.log("contact manager");
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
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.MAPS_KEY }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <SearcherMarker lat={42.3583566} lng={-71.101722} />
        </GoogleMapReact>
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
            <Icon style={styles.icon}> sms </Icon>
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
