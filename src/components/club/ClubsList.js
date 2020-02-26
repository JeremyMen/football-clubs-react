import React, { Component } from 'react'
import FootballClubsService from '../../services/FootballClubsService'
import Club from './Club'
import { Link } from 'react-router-dom'
import '../../stylesheets/ClubsList.css'

class ClubsList extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      data: {
        clubs: [],
      },
      error: undefined
    }

  this.getNumberOfMembers = (clubUsername) => {
    FootballClubsService.getMembers(clubUsername)
      .then(members => members.length)
      .catch(error => {
        this.setState({
          error
        })
      })
  }
  }

  componentDidMount() {
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

  getNumberOfMembers = (clubUsername) => {
    FootballClubsService.getMembers(clubUsername)
      .then(members => members.length)
      .catch(error => {
        this.setState({
          error
        })
      })
  }

  render() { 
    const { error } = this.state
    const { clubs } = this.state.data
    // console.log(this.getNumberOfMembers('interclubmadridlele'))


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
          <Link to="#" className="color-black">
            <Club 
              username = { club.username }
              isOfficialClub = { club.isOfficialClub  ? 'Official ✓' : 'Unofficial'}
              // members = { this.getNumberOfMembers }
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