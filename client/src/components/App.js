import React from "react";
import "../css/app.css";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch"
import Root from "./Root"
import ManageRoot from "./ManageRoot"
import SearchRoot from "./SearchRoot"

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Root} />
          <Route exact path="/manage/:number" render={() => <ManageRoot />} />
          <Route exact path="/search/:number" render={() => <SearchRoot />} />
        </Switch>
      </div>
    )
    ;
  }
}

export default App;
