import { Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./views/LandingPage/LandingPage";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/detail/:id">
          <Detail />
        </Route>
        <Route path="/pokemon">
          <Form />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
