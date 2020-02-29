import React, { Component } from 'react'
import FootballClubsService from '../../services/FootballClubsService'
import ClubCard from './ClubCard'
import { Link } from 'react-router-dom'
import '../../stylesheets/ClubsList.css'

class ClubsList extends Component {

  state = { 
    data: {
      clubs: [],
    },
    error: undefined
  }

  _getNumberOfMembers = (clubUsername) => {
    FootballClubsService.getMembers(clubUsername)
      .then(members => members.length)
      .catch(error => {
        this.setState({
          error
        })
      })
  }

  _setClubs = () => {
    FootballClubsService.getClubs()
    .then(clubs => {
      this.setState({
        data: {
          clubs
        }
      })
    })
    .catch(error => {
      this.setState({
        error
      })
    })
  }

  componentDidMount() {
    this._setClubs()
  }

  render() { 
    const { error } = this.state
    const { clubs } = this.state.data

    if (error) {
      return(
        <h1>ERROR</h1>
      )
    }
    else if (!clubs) {
      return ( 
        <h1>LOADING...</h1>
      )
    } 
    const allClubs = clubs.map((club, index) => {
      return(
        <div key={ index }>
          <Link to={`clubs/${club.username}`} className="color-black">
            <ClubCard
              username = { club.username }
              isOfficialClub = { club.isOfficialClub  ? 'Official ✓' : 'Unofficial'}
              members = { this._getNumberOfMembers }
              name = { club.name }
              emblem = { club.emblem }
              team = { club.team }
              createdAt = { club.createdAt.slice(0, 7) }
              teamLeague = { club.teamLeague }
              city = { club.city }
              description = { club.description }
            />
          </Link>
        </div>
      )
    })
    return (
      <div className="ClubsList row">
        { allClubs }
      </div>
    )
  }
}
 
export default ClubsList;