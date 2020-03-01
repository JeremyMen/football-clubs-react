import React, { Component } from 'react'
import '../../stylesheets/ClubPage.css'
import Navbar from '../misc/Navbar'
import FootballTable from '../tables/FootballTable';
import { WithClubConsumer } from '../../contexts/ClubContext';
import FootballClubsService from '../../services/FootballClubsService';
import ClubMiniTable from '../tables/ClubMiniTable';
import Match from './Match';

class ClubPage extends Component {
  state = { 
    currentClub: {},
    currentTeamInfo: {},
    numberOfMembers: 0,
    admin: undefined,
  }

  _isMounted = false

  _setCurrentClub = () => {
    const { clubUsernameOrId } = this.props.match.params
    FootballClubsService.getClub(clubUsernameOrId)
      .then(club => {
        if (this._isMounted) {
          this.setState({
            currentClub: club.data
          })
          this.props.setCurrentClub(club.data)
          const { team } = this.state.currentClub
          this._setCurrentTeamInfo(team)
        }
      })
      .catch(error => {
        this.setState({
          error
        })
      })
  }

  _setAdmin = (adminId) => {
    FootballClubsService.getUser(adminId)
    .then(admin => {
      if (this._isMounted) {
        this.setState({
          admin: admin.data
        })
      }
    })
    .catch(error => {
      this.setState({
        error
      })
    })
  }
  
  _filterTeamsSearched = (teams, teamSearched) => {
    return teams.reduce((result, team) => {
      if (team.name === teamSearched) {
        result = team
      }
      return result
    })
  }

  _setCurrentTeamInfo = (teamName) => {
    FootballClubsService.getTeam(teamName)
      .then(teams => {
        if (this._isMounted) {
          const currentTeam = this._filterTeamsSearched(teams.data, teamName)
          this.setState({
            currentTeamInfo: currentTeam
          })
        }
      })
      .catch(error => {
        this.setState({
          error
        })
      })
  }

  _setNumberOfMembers = (clubUsername) => {
    FootballClubsService.getMembers(clubUsername)
      .then(members => {
        if (this._isMounted) {
          this.setState({
            numberOfMembers: members.length
          })
        }
      })
      .catch(error => {
        this.setState({
          error
        })
      })
  }

  componentDidMount = () => {
    this._isMounted = true
    const { username } = this.props.myClub
    const { admin } = this.props.currentClub
    this._setCurrentClub()
    this._setNumberOfMembers(username)
    this._setAdmin(admin)
  }

  shouldComponentUpdate(nextProps, nextState) {        
    if (nextState !== this.state) {      
      return true 
    } else if (nextProps !== this.props) {
      return true 
    } else {
      return false
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  render() {     
    const { 
      currentClub, 
      numberOfMembers, 
      currentTeamInfo, 
      admin, 
    } = this.state

    return (  
      <div className="ClubPage container">

        <Navbar />

        <div className="pt-2 d-flex justify-content-between">
          <div className="mw-80 d-flex">
            <img src={ currentClub.emblem } alt=""  className="mw-100 rounded-circle"/>
            <div className="align-self-center p-2">
              <h5 className="w-300 d-flex"><b>{ currentClub.name } { currentClub.isOfficialClub ? '✓' : null }</b></h5>
              <small className="text-muted d-flex">{ numberOfMembers } members</small>
            </div>
          </div>
          <div className="align-self-center d-flex">
            <button className="button subscribe-button">Subscribe</button>
            <button className="button unsubscribe-button">Unubscribe</button>
            <button className="button settings-button">Settings</button>
          </div>
        </div>

        <section className="container mt-5">
          <div className="row d-flex">
            <ClubMiniTable 
              logoClub={ currentClub.emblem }
              team={ currentClub.team }
              city={ currentClub.city }
              address={ currentClub.address }
              admin={ admin ? admin.username : null }
              createdAt={ currentClub.createdAt }
              logoTeam={ currentTeamInfo.logo }
              founded={ currentTeamInfo.founded }
              venueName={ currentTeamInfo.venue_name }
              venueAddress={ currentTeamInfo.venue_address }
              venueCapacity={ currentTeamInfo.venue_capacity }
            />
            <div className="text-left description col-sm-8 mt-4">
              <h5><b>Description</b></h5>
              <p>
              Welcome to the official Saturday Night Live channel on YouTube!  Here you will find your favorite sketches, behind the scenes clips and web exclusives, featuring all your favorite hosts and cast members.  Check out more SNL at 
              </p>
              <hr />
              <FootballTable 
                teamLeague={ currentClub.teamLeague }
                teamCountry={ currentClub.teamCountry }
              />
              <div className="d-flex">
                <Match />
              </div>
            </div>
          </div>
          <div className="row d-flex">
            
          </div>
        </section>
      </div>
    )
  }
}
 
export default WithClubConsumer(ClubPage);