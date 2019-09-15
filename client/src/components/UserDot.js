import React from "react";

import AccessibilityIcon from "@material-ui/icons/Accessibility";

const styles = {
  largeIcon: {
    width: 60,
    height: 60
  }
};

class UserDot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      lat: props.lat,
      lng: props.lng
    };
  }

  componentDidMount() {}

  render() {
    return <AccessibilityIcon style={styles.largeIcon} />;
  }
}

export default UserDot;
