import './App.css';
import {useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

import {loadUser} from "./actions/auth";
import setAuthToken from "./utills/setAuthToken";
import {Provider} from "react-redux";

import store from "./store";

if(localStorage.getItem("token") !== null){
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser());
  },[])
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing}/>
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
