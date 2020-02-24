import React, { Component } from 'react';
import Navbar from './Navbar'
import Club from '../club/Club';
import '../../stylesheets/Home.css'

class Home extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="Home browse_catgs container">
        <Navbar />
        <div className="row">
          <Club />
          <Club />
          <Club />
          <Club />
          <Club />
          <Club />
          <Club />
          <Club />
          <Club />
          <Club />
          <Club />
        </div>
      </div>
    );
  }
}
 
export default Home;

