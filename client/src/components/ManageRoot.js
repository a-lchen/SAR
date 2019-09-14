import React from "react";
import { getLocation } from "../utils.js"

import AcUnitIcon from '@material-ui/icons/AcUnit';

class ManageRoot extends React.Component {

  componentDidMount() {
    let splitPath = window.location.pathname.split("/")
    console.log(splitPath[splitPath.length - 1])


    console.log(getLocation())
  }
  render() {
    return (
      <div>
        Manager!
        <AcUnitIcon />
      </div>
    )
    ;
  }
}

export default ManageRoot;
