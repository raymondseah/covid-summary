/* eslint-disable no-unused-vars */
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Switch } from "react-router-dom";

import "./App.css";
import summaryPage from "./components/covid_summary_page";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={summaryPage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
