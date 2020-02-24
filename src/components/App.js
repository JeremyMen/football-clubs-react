import React from 'react'
import '../stylesheets/App.css'
import {
  Switch,
  Route
} from "react-router-dom";
import Login from "./misc/Login"
import Signup from './misc/Signup';
import AuthenticatedRoute from './misc/AuthenticatedRoute';
import Home from './misc/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login }/>
        <Route exact path="/login" component={ Login }/>
        <Route exact path="/register" component={ Signup }/>

        <AuthenticatedRoute>
          <Route exact path="/Home" component={ Home } />
        </AuthenticatedRoute>
      </Switch>
    </div>
  )
}

export default App;
