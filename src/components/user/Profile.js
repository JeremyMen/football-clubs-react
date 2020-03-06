import React, { Component } from 'react'
import '../../stylesheets/Profile.css'
import Navbar from '../misc/Navbar';
import { Link } from 'react-router-dom';
import FootballClubsService from '../../services/FootballClubsService';

class Profile extends Component {
  state = {
    currentUser: undefined,
    userClub: undefined
  }

  _setCurrentUser = (username) => {
    FootballClubsService.getUser(username)
      .then(user => {
        this.setState({
          currentUser: user.data,
        })
      })
  }

  _setUserClub = (clubId) => {
    FootballClubsService.getClub(clubId)
      .then(club => {
        this.setState({
          userClub: club.data
        })
      })
  }

  componentDidUpdate = () => {
    if (this.state.currentUser.club) {
      this._setUserClub(this.state.currentUser.club)
    }
  }

  componentDidMount = () => {
    this._setCurrentUser(this.props.match.params.username)
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (JSON.stringify(nextState.userClub) !== JSON.stringify(this.state.userClub)) {
      return true
    } else if (JSON.stringify(nextState.currentUser) !== JSON.stringify(this.state.currentUser)) {
      return true
    } else {
      return false
    }
  }

  render() {
    const { currentUser, userClub } = this.state
    return (  
      <div className="Profile">
        <Navbar />
        <div className="profile-page container pt-5">
        <div className="main main-raised">
          <div className="background-field">


          <div className="profile-content">
            <div className="container">
              <div className="row">
                <div className="col-md-6 ml-auto mr-auto">
                  <div className="profile">
                    <div className="avatar">
                        <img src={currentUser ? currentUser.profilePicture : null} alt="CircleImage" className="img-raised rounded img-fluid" />
                    </div>
                    <div className="name">
                        <h1 className="user-name d-flex flex-column">{ currentUser ? currentUser.fullName : null }<small>({ currentUser ? currentUser.username : null })</small></h1>
                    </div> 
                    </div> 
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
              </div>
              <div className="row">
                <div className="col-md-12 ml-auto mr-auto">
                  <div className="profile-tabs d-flex justify-content-center">
                    <img className="mw-200 pr-3" src="../../../New Project.png" alt="beerBackground" />
                    <ul className="justify-content-center list-unstyled align-self-center text-left text-larger">
                    <li><b>Supporter of:</b> { userClub ? userClub.team : "doesn't have any favourite team yet" }</li>
                    <li><b>Club:</b> { userClub ? <Link to={`/clubs/${userClub.username}`}>{userClub.name}</Link> : "doesn't have any club yet" }</li>
                    <li><b>Joined:</b> { currentUser ? currentUser.createdAt.slice(0, 7): null }</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>


          </div>
        </div>
      </div>
    );
  }
}
 
export default Profile