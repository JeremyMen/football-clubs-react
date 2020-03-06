import React, { Component } from 'react'
import FootballClubsService from '../../services/FootballClubsService'
import EventCard from './EventCard'
import { WithClubConsumer } from '../../contexts/ClubContext'

class EventList extends Component {
  state = {  
    data: {
      events: []
    },
    error: undefined
  }

  _setEvents = () => {
    FootballClubsService.getClubEvents(this.props.params.clubUsernameOrId)
      .then(events => {
        this.setState({
          data: {
            events: events.data
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
    this._setEvents()
  }

  render() {
    const { events } = this.state.data
    if (!events) {
      return (
        <img src="../../../Spinner-1s-200px.gif" alt="spinner"/>
      )
    }

    const allEvents = events.map((event, index) => {
      return(
        <div key={ index }>
          <EventCard 
            title = { event.title }
            description = { event.description }
            image = { event.image }
            time = { event.time }
            date = { event.date }
            createdAt = { event.createdAt.slice(0, 7) }
            numberOfParticipant = { event.numberOfParticipant }
            participants = { event.participants }
            // clubUsername = { this.props.currentClub.username }
            eventId = { event.id}
          />
        </div>
      )
    })

    return (  
      <div className="EventList">
        { allEvents }
      </div>
    );
  }
}
 
export default WithClubConsumer(EventList);