import React, { Component } from 'react';
import '../../stylesheets/NewClub.css'
import '../../stylesheets/Form.css'
import { withRouter } from 'react-router-dom';
import FootballClubsService from '../../services/FootballClubsService';
import Navbar from '../misc/Navbar';
import { WithAuthConsumer } from '../../contexts/AuthContext';
import { WithClubConsumer } from '../../contexts/ClubContext';

class NewClub extends Component {
  state = { 
    data: {
      name: "",
      teamCountry: "",
      teamLeague: "",
      team: "",
      isOfficialClub: "",
      city: "",
      address: "",
      description: "",
      emblem: null
    },
    previousData: {
      lastTeamCountry: undefined,
      lastTeamLeague: undefined
    },
    error: false,
    allCountries: [],
    countryLeagues: [],
    teams: []
  }

  _setAllCountriesState() {
    FootballClubsService.getCountries()
      .then(countries => {
        this.setState({
          allCountries: countries.data
        })
      }) 
  }

  _setCountryLeaguesState = () => {
    const { teamCountry } = this.state.data

    FootballClubsService.getLeagueFromCountry(teamCountry)
      .then(leagues => {
        this.setState({
          countryLeagues: leagues.data
        })
      })
  }

  _findLeagueId = (searchedLeague) => {
    return this.state.countryLeagues.reduce((leagueId, league) => {
      if (searchedLeague === league.name) {
        leagueId = league.league_id
      }
      return leagueId
    }, '')
  }

  _setTeamState = (leagueId) => {
    FootballClubsService.getTeamsByLeagueId(leagueId)
      .then(teams => {
        this.setState({
          teams: teams.data
        })
      })
  }

  componentDidMount = () => {
    this._setAllCountriesState()
  }

  componentDidUpdate = () => {
    const { teamCountry, teamLeague } = this.state.data
    const { lastTeamCountry, lastTeamLeague } = this.state.previousData

    if (teamCountry && teamCountry !== lastTeamCountry){
      this.setState({
        previousData: {
          lastTeamCountry: teamCountry,
          lastTeamLeague: undefined
        }
      })
      this._setCountryLeaguesState()
    } else if (teamLeague && teamLeague !== lastTeamLeague) {
      this.setState({
        previousData: {
          lastTeamCountry: teamCountry,
          lastTeamLeague: teamLeague
        }
      })
      const leagueId = this._findLeagueId(teamLeague)
      this._setTeamState(leagueId)
    }
  }

  handleChange = (event) => {
    const { name, value, files } = event.target
    this.setState({
      data: {
        ...this.state.data,
        [name]: files ? files[0] : value
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { data } = this.state
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('teamCountry', data.teamCountry)
    formData.append('teamLeague', data.teamLeague)
    formData.append('team', data.team)
    formData.append('isOfficialClub', data.isOfficialClub)
    formData.append('city', data.city)
    formData.append('address', data.address)
    formData.append('description', data.description)
    formData.append('emblem', data.emblem)
    
    this.setState({error: false}, () => {
      FootballClubsService.createClub(formData)
        .then(newClub => {
          this.props.setMyClub(newClub.data)
          this.props.setUser({...this.props.currentUser, club: newClub.data.id  })
          this.props.history.push(`/clubs/${newClub.data.username}`)
        })
        .catch((error) => {
          this.setState({
            error: true
          })
        })
    })

    
    // FootballClubsService.createClub(formData)
    //   .then(newClub => {
    //     this.setState({
    //       error: false
    //     })
    //     this.props.setMyClub(newClub.data)
    //     this.props.setUser({...this.props.currentUser, club: newClub.data.id  })
    //     this.props.history.push(`/clubs/${newClub.data.username}`)
    //   })
    //   .catch((error) => {
    //     this.setState({
    //       error: true
    //     })
    //   })
  }
  
  render() { 
    const {
      error,
      allCountries,
      countryLeagues,
      teams
    } = this.state

    const errorClassName = error ? 'is-invalid' : ''
    return (  
      <div className="NewClub container">
        <Navbar />
        <div className="Form">
          <div className="hd-lg">
            <span>Register your Football Clubs</span>
          </div>

          <div className="user-account-pr">
            <form onSubmit={this.handleSubmit}>

              <div className="input-sec">
                <input 
                  value={this.state.data.name}
                  onChange={this.handleChange}
                  className={`form-control ${errorClassName}`}
                  type="text" 
                  name="name" 
                  placeholder="Club name" 
                />
              </div>

              <div className="input-sec">
                <input 
                  value={this.state.data.city}
                  onChange={this.handleChange}
                  className={`form-control ${errorClassName}`}
                  type="text" 
                  name="city" 
                  placeholder="City" 
                />
              </div>

              <div className="input-sec">
                <input 
                  value={this.state.data.address}
                  onChange={this.handleChange}
                  className={`form-control ${errorClassName}`}
                  type="text" 
                  name="address" 
                  placeholder="Club address" 
                />
              </div>

              <div className="input-sec">
                <textarea id="w3mission" rows="4" cols="50" 
                  value={this.state.data.description}
                  onChange={this.handleChange}
                  className={`form-control ${errorClassName}`}
                  type="text" 
                  name="description" 
                  placeholder="Club description" 
                />
              </div>

              <div className="input-sec d-flex justify-content-between">
                <label className="mr-2">Is it an official club?</label>
                <select id="isOfficialClub" name="isOfficialClub" className="mw-165"  onChange={this.handleChange}>
                  <option> -- select an option -- </option>
                  <option
                    type="text"
                    value={true}
                    className={`form-control ${errorClassName}`}>
                      Yes
                  </option>        
                  <option 
                    type="boolean"
                    value={false}
                    className={`form-control ${errorClassName}`}>
                      No
                  </option>
                </select>
              </div>

              <div className="input-sec d-flex justify-content-between">
                <label className="mr-2">select the team country</label>
                <select id="teamCountry" name="teamCountry" className="mw-165" onChange={ this.handleChange }>
                  <option key="0" name="teamCountry"> -- select an option -- </option>
                { 
                  allCountries.map((country, index) => {
                    return (
                      <option
                        key={index + 1}
                        name="teamCountry"
                        value={ country.country }
                      >
                        { country.country }
                      </option>
                    )
                  }) 
                }
                </select>
              </div>

              <div className="input-sec d-flex justify-content-between">
                <label className="mr-2">select the team league</label>
                <select id="teamLeague" name="teamLeague" className="mw-165" onChange={ this.handleChange }>
                  <option key="0" name="teamLeague"> -- select an option -- </option>
                  { 
                    countryLeagues.map((leagues, index) => {
                      return(
                        <option
                          key={index + 1}
                          name="teamLeague"
                          value={ leagues.name }
                        >
                          { leagues.name }
                        </option>
                      )
                    })
                  }
                </select>
              </div>

              <div className="input-sec d-flex justify-content-between">
                <label className="mr-2">select the team</label>
                <select id="team" name="team" className="mw-165" onChange={ this.handleChange }>
                  <option key="0" name="team"> -- select an option -- </option>

                  { 
                    teams.map((team, index) => {
                      return(
                        <option
                          key={index + 1}
                          name="team"
                          value={ team.name }
                        >
                          { team.name }
                        </option>
                      )
                    })
                  }
                </select>
              </div>

              <div className="input-sec d-flex justify-content-between">
                <label htmlFor="emblem">Emblem</label>
                <input
                  onChange={this.handleChange}
                  name="emblem"
                  type="file"
                  className={`form-control ${errorClassName} mw-165`}
                  id="emblem"
                />
              </div>
            
              <div className="input-sec mb-0">
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
 
export default WithClubConsumer(WithAuthConsumer(withRouter(NewClub)))