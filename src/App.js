import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Practice from "./Components/Practice";
import Statistics from "./Components/Statistics";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/typerless">
            <Practice />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
