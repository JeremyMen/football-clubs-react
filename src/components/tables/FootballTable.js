import React, { Component } from 'react'
import FootballClubsService from '../../services/FootballClubsService';
import FootballTableRow from './FootballTableRow';
import { WithClubConsumer } from '../../contexts/ClubContext';

class FootballTable extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      leagueTable: []
    }
    this._isMounted = false
  }

  _setLeagueTable = (teamLeague, teamCountry) => {
    FootballClubsService.getLeagueTable(teamLeague, teamCountry)
      .then(res => {
        if (this._isMounted) {
          this.setState({
            leagueTable: res.data.api.standings[0]
          })
        }
      })
  }

  componentDidMount = () => {
    this._isMounted = true
    const { teamLeague, teamCountry } = this.props.currentClub
    this._setLeagueTable(teamLeague, teamCountry) 
  }

  componentDidUpdate = () => {
    this._isMounted = true
    if(!this.state.leagueTable.length) {
      const { teamLeague, teamCountry } = this.props.currentClub
      this._setLeagueTable(teamLeague, teamCountry)  
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextState.leagueTable !== this.state.leagueTable
  }
  
  componentWillUnmount = () => {
    this._isMounted = false
  }

  render() { 
    const { leagueTable } = this.state
    const rows = leagueTable.map((team, index) => {
      return (
        <FootballTableRow 
          logo={team.logo}
          key={ index }
          position={team.rank}
          team={team.teamName}
          played={team.all.matchsPlayed}
          won={team.all.win}
          draw={team.all.draw}
          lost={team.all.lose}
          point={team.points}
        />
      )
    })
    return (  
      <div>
        <a className="dropdown-toggle" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          See the league table
        </a>
        <table className="collapse FootballTable table mt-3" id="collapseExample">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Position</th>
              <th scope="col">Team</th>
              <th scope="col">Played</th>
              <th scope="col">Won</th>
              <th scope="col">Drawn</th>
              <th scope="col">Lost</th>
              <th scope="col">Point</th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>

      
    );
  }
}
 
export default WithClubConsumer(FootballTable);