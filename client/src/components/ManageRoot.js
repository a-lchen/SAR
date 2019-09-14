import React from "react";

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
      </div>
    )
    ;
  }
}

export default ManageRoot;
