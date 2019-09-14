import React from "react";
import GoogleMapReact from 'google-map-react';
import SearcherMarker from './SearcherMarker.js'
import {getLocation} from "../utils.js";

class SearchRoot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: {
      lat: 42.3583566,
      lng: -71.101722
    },
    zoom: 17
    }
  }

  componentDidMount() {
    let splitPath = window.location.pathname.split("/")
    console.log(splitPath[splitPath.length - 1])
    console.log(getLocation())
  }

  render() {
    return (
      <div>
        Searcher Root!
      </div>
    )
    ;
  }


  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
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
      </div>
    );
  }
}

export default SearchRoot;
