import React, { Component } from 'react'
import '../../stylesheets/ClubPage.css'
import Navbar from '../misc/Navbar'
import FootballTable from '../tables/FootballTable';
import { WithClubConsumer } from '../../contexts/ClubContext';
import FootballClubsService from '../../services/FootballClubsService';
import ClubMiniTable from '../tables/ClubMiniTable';
import Match from './Match';
import { Link } from 'react-router-dom';
import NewEvent from '../event/NewEvent';
import { WithAuthConsumer } from '../../contexts/AuthContext';
import EventList from '../event/EventList';

class ClubPage extends Component {
  constructor(props) {
    super(props) 
    this.state = { 
      currentClub: {},
      currentTeamInfo: {},
      numberOfMembers: 0,
      admin: undefined,
      mainButton: '',
      subscribeToggle: false,
      newEvent: ''
    }
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
          this._setCurrentTeamInfo(club.data.team)
          this._setNumberOfMembers(club.data.username)
          this._setAdmin(club.data.admin[0])
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

  _subscribe = () => {
    const { currentUser, currentClub, setUser } = this.props
    FootballClubsService.subscribe(currentClub.username, currentUser.username)
      .then(user => {
        this.setState({
          subscribeToggle: !this.state.subscribeToggle
        })
        setUser(user.data)
        window.location.reload()
      })
  
  }

  _unsubscribe = () => {
    const { currentUser, currentClub, setUser } = this.props
    FootballClubsService.unsubscribe(currentClub.username, currentUser.username)
      .then(user => {
        this.setState({
          subscribeToggle: !this.state.subscribeToggle
        })
        setUser(user.data)
        window.location.reload()
      })
  }

  _renderButton = () => {
    const { currentClub, currentUser } = this.props

    if (currentClub) {
      if (currentClub.admin.includes(currentUser.id) ) {
        this.setState({
          mainButton: 
            <Link to={`/clubs/${currentClub.username}/edit`}>
              <button className="button settings-button">Settings</button>
            </Link>,
          newEvent: <NewEvent />
        })
      } else if (currentUser.club && currentClub.id === currentUser.club) {
        this.setState({
          mainButton: 
              <button type="submit" onClick={this._unsubscribe} className="button unsubscribe-button">Unsubscribe</button>
        })
        
      } else if (!currentUser.club) {
        this.setState({
          mainButton: 
              <button type="submit" onClick={this._subscribe} className="button subscribe-button">Subscribe</button>
        })
      }
    }
  }

  componentDidMount = () => {
    this._isMounted = true
    this._setCurrentClub()
    this._renderButton()
  }

  componentDidUpdate = () => {
    this._isMounted = true
    this._setCurrentClub()
    this._renderButton()
  }

  shouldComponentUpdate(nextProps, nextState) {  
    const { currentClub, currentTeamInfo, subscribeToggle } = this.state   
    if (JSON.stringify(nextState.currentClub) !== JSON.stringify(currentClub)) {      
      return true
    } else if (JSON.stringify(nextState.currentTeamInfo) !== JSON.stringify(currentTeamInfo)) {
      return true 
    } else if (JSON.stringify(nextProps.currentClub) !== JSON.stringify(this.props.currentClub)) {
      return true 
    } else if (JSON.stringify(nextProps.myClub) !== JSON.stringify(this.props.myClub)) {
      return true 
    } else if (JSON.stringify(nextState.subscribeToggle) !== JSON.stringify(subscribeToggle)) {
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
      mainButton
    } = this.state
    return (  
      <div className="ClubPage">
        <Navbar />

        <div className="container pt-5">

          <div className="pt-2 d-flex justify-content-between row mw-100">
            <div className="mw-80 d-flex">
              <img src={ currentClub.emblem } alt=""  className="mw-100 rounded-circle"/>
              <div className="align-self-center p-2">
                <h5 className="w-300 d-flex"><b>{ currentClub.name } { currentClub.isOfficialClub ? '✓' : null }</b></h5>
                <small className="text-muted d-flex">{ numberOfMembers } members</small>
              </div>
            </div>
            <div className="align-self-center d-flex">
              { mainButton }
            </div>
          </div>

          <section className="mt-5 row mw-100">
            <div className="row">
              <div className="col-sm-5">
                <ClubMiniTable 
                  logoClub={ currentClub.emblem }
                  team={ currentClub.team }
                  city={ currentClub.city }
                  address={ currentClub.address }
                  admin={ admin ? admin.username : null }
                  createdAt={ currentClub.createdAt }
                  logoTeam={ currentTeamInfo.logo }
                  founded={ currentTeamInfo.founded }
                  stadiumName={ currentTeamInfo.venue_name }
                  stadiumAddress={ currentTeamInfo.venue_address }
                  stadiumCapacity={ currentTeamInfo.venue_capacity }
                />
                <div>
                 { this.state.newEvent }
                </div>
              </div>
              <div className="text-left description col-sm-7 mt-4">
                <h5><b>Description</b></h5>
                <p>
                  {currentClub.description}
                </p>
                <hr />
                <FootballTable 
                  params= { this.props.match.params }
                />
                <div className="d-flex">
                  <Match 
                    params= { this.props.match.params }
                  />
                </div>
                <div>
                  <EventList 
                    params= { this.props.match.params }
                  />
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

    )
  }
}
 
export default WithAuthConsumer(WithClubConsumer(ClubPage));