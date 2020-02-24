import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheets/index.css';
import App from './components/App'
import {
  BrowserRouter as Router
} from "react-router-dom";
import AuthContextProvider from './contexts/AuthContext';


ReactDOM.render(
  <Router>
    <AuthContextProvider>
      <App /> 
    </AuthContextProvider>
  </Router>,
  document.getElementById('root')
)
