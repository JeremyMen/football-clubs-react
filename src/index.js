import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheets/index.css';
import App from './components/App'
import {
  BrowserRouter as Router
} from "react-router-dom";
import AuthContextProvider from './contexts/AuthContext';
import ClubContextProvider from './contexts/ClubContext';


ReactDOM.render(
  <Router>
    <AuthContextProvider>
      <ClubContextProvider>
        <App /> 
      </ClubContextProvider>
    </AuthContextProvider>
  </Router>,
  document.getElementById('root')
)
