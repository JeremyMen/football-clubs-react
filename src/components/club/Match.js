import React, { Component } from 'react';
import FootballClubsService from '../../services/FootballClubsService';
import { WithClubConsumer } from '../../contexts/ClubContext';
import '../../stylesheets/Match.css'

class Match extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextMatches: undefined,
      previousMatches: undefined
    }

    this._isMounted = false
  }

  _setNextMatch = (teamName, numberOfMatches) => {
    FootballClubsService.getNextMatch(teamName, numberOfMatches)
      .then(nextMatches => {
        if (this._isMounted) {
          this.setState({
            nextMatches: nextMatches.data.api.fixtures[0]
          })
        }
      })
      .catch(error => {
        this.setState({
          error
        })
      })
  }

  _setPrevioustMatch = (teamName, numberOfMatches) => {
    FootballClubsService.getPrevioustMatch(teamName, numberOfMatches)
      .then(previousMatches => {
        if (this._isMounted) {
          this.setState({
            previousMatches: previousMatches.data.api.fixtures[0]
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
    // const { team } = this.props.currentClub
    FootballClubsService.getClub(this.props.params.clubUsernameOrId)
      .then(club => {
        this._setNextMatch(club.data.team, 1)
        this._setPrevioustMatch(club.data.team, 1)
      })
    // this._setNextMatch(team, 1)
    // this._setPrevioustMatch(team, 1)
  }

  componentDidUpdate = () => {
    this._isMounted = true
    const { team } = this.props.currentClub
    // const { nextMatches, previousMatches } = this.state
    
      this._setNextMatch(team, 1)
    
      this._setPrevioustMatch(team, 1)
    
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (JSON.stringify(nextState.nextMatches) !== JSON.stringify(this.state.nextMatches)) {
      return true
    } else if (JSON.stringify(nextState.previousMatches) !== JSON.stringify(this.state.previousMatches)) {
      return true
    } else {
      return false
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  render() {
    const { nextMatches, previousMatches } = this.state

    const showNextMatches = 
      nextMatches ? 
        <div className="d-flex justify-content-around mt-4">
          <div>
            <img className="max-width-60" src={ nextMatches ? nextMatches.homeTeam.logo : null } alt="emblem1"/>
          </div>
          <span className="fs-32"> - </span>
          <div>
            <img className="max-width-60" src={ nextMatches ? nextMatches.awayTeam.logo : null } alt="emblem2"/>
          </div>
        </div> :
        <div className="d-flex justify-content-center mt-4">
          <img className="width-100" src="../../../Spinner-1s-200px.gif" alt="loading"></img>
        </div>

      const showPreviousMatches =
        previousMatches ?
        <div className="d-flex justify-content-around mt-4">
          <div>
            <img className="max-width-60" src={ previousMatches ? previousMatches.homeTeam.logo : null } alt="emblem1"/>
            <span className="fs-32 pl-2">{ previousMatches ? previousMatches.goalsHomeTeam : null }</span>
          </div>
          <span className="fs-32"> - </span>
          <div>
            <span className="fs-32 pr-2">{ previousMatches ? previousMatches.goalsAwayTeam : null }</span>
            <img className="max-width-60" src={ previousMatches ? previousMatches.awayTeam.logo : null } alt="emblem2"/>
          </div>
        </div> :
        <div className="d-flex justify-content-center mt-4">
          <img className="width-100" src="../../../Spinner-1s-200px.gif" alt="loading"></img>
        </div>
      
    return ( 
      <div className="Match d-flex mw-100 mb-3">
        <div className="card w-300 h-200">
          <div className="card-body">
            <div className="text-center">
              <h5 className="card-title fs-16">Next match ({ nextMatches ? nextMatches.league.name: null })</h5>
            </div>
            {showNextMatches}
          </div>
        </div>
        
        <div className="card w-300 h-200">
          <div className="card-body">
            <div className="text-center">
              <h5 className="card-title fs-16">Previous match ({ previousMatches ? previousMatches.league.name : null })</h5>
            </div>
            { showPreviousMatches }
          </div>
        </div>
      </div>
    )
  }
}
 
export default WithClubConsumer(Match);