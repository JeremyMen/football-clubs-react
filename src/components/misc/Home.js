import React, { Component } from 'react';
import Navbar from './Navbar'
// import Club from '../club/Club';
import '../../stylesheets/Home.css'
import ClubsList from '../club/ClubsList';
import { WithAuthConsumer } from '../../contexts/AuthContext';

class Home extends Component {

  state = {  }
  render() { 
    return ( 
      <div className="Home container">
        <Navbar />
        <div className="container">
          <ClubsList />
        </div>
      </div>
    );
  }
}
 
export default WithAuthConsumer(Home);

