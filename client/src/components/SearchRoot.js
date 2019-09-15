import React from "react";
import Icon from '@material-ui/core/Icon';
import GoogleMapReact from 'google-map-react';
import SearcherMarker from './SearcherMarker.js'
import {getLocation} from "../utils.js";
import {sendLocation, sendFoundClue} from "../socket.js"

const styles = {
  icon : {
    fontSize: 100,
    //margin: 40,
    color: 'white',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 80,
    left: 80,
    right: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    height: 160,
    width: 160,
    margin: 20,
    borderRadius: 320, //twice height/width
    backgroundColor:'rgb(195, 125, 198)', //TODO: change to theme color
  }
}

class SearchRoot extends React.Component {
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

  componentDidMount() {
    let splitPath = window.location.pathname.split("/");
    console.log(splitPath[splitPath.length - 1]);
    console.log(getLocation());
  }

  smsClicked() {
    console.log('view messages')
  }

  infoClicked() {
    console.log('show info page')
  }

  clueClicked() {
    console.log('show clue popup')
  }

  contactClicked() {
    console.log('contact manager')
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
          <SearcherMarker
            lat={42.3583566}
            lng={-71.101722}
          />
        </GoogleMapReact>

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
