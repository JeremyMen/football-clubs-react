import React from 'react'
import '../stylesheets/App.css'
import {
  Switch,
  Route
} from "react-router-dom";
import Login from "./misc/authentication/Login"
import Signup from './misc/authentication/Signup';
import AuthenticatedRoute from './misc/authentication/AuthenticatedRoute';
import Home from './misc/Home';
import Validation from './misc/authentication/Validation';
import NewClub from './club/NewClub';
import ClubPage from './club/ClubPage';
import Profile from './user/Profile';
import Edit from './user/Edit';
import EditClub from './club/EditClub';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login }/>
        <Route exact path="/login" component={ Login }/>
        <Route exact path="/register" component={ Signup }/>
        <Route exact path="/validation" component={ Validation } />
        <AuthenticatedRoute>
          <Switch>
            <Route exact path="/Clubs" component={ Home } />
            <Route exact path="/Clubs/new" component={ NewClub } />
            <Route exact strict path="/Clubs/:clubUsernameOrId" component={ ClubPage } />
            <Route exact strict path="/Clubs/:username/edit" component={ EditClub } />
            <Route exact strict path="/users/:username" component={ Profile } />
            <Route exact strict path="/users/:username/edit" component={ Edit } />
          </Switch>
        </AuthenticatedRoute>

      </Switch>
    </div>
  )
}

export default App;
