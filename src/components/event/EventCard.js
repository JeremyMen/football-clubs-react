import React, { Component } from 'react';
import '../../stylesheets/EventCard.css'
import FootballClubsService from '../../services/FootballClubsService';
import { WithAuthConsumer } from '../../contexts/AuthContext';
import { WithClubConsumer } from '../../contexts/ClubContext';

class EventCard extends Component {
  state = {  
    button: '',
    participateToggle: '',
    participants: this.props.participants,
    numberOfParticipant: this.props.numberOfParticipant
  }

  hadleButton = () => {
    if (!this.state.participants.includes(this.props.currentUser.id)) {
      this.setState({
        button:
          <button onClick={this.handleClick} className="btn btn-success">Join</button>,
        participateToggle: false
      })
    } else {
      this.setState({
        button:       
          <button onClick={this.handleClick} className="btn btn-danger">Leave</button>,
        participateToggle: true
      })
    }
  }

  handleClick = () => {
    const { eventId, currentUser } = this.props
    FootballClubsService.participateEvent(eventId, currentUser.username)
      .then((res) => {
        console.log(res, )
        if (res.data.includes(this.props.currentUser.id)) {
          this.setState({
            participants: [...this.state.participants, res.data[res.data.length - 1]],
            participateToggle: !this.state.participateToggle,
            button:       
              <button onClick={this.handleClick} className="btn btn-danger">Leave</button>,
            numberOfParticipant: this.state.numberOfParticipant + 1
          })
        } else {
          this.setState({
            participants: this.state.participants.filter(member => {
              return member !== currentUser.id && member !== undefined
            }),
            participateToggle: !this.state.participateToggle,
            button:
              <button onClick={this.handleClick} className="btn btn-success">Join</button>,
            numberOfParticipant: this.state.numberOfParticipant - 1
          })
        }
      })
  }

  componentDidMount = () => {
    this.hadleButton()
  }

  componentDidUpdate = () => {
    this.hadleButton()
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.participateToggle !== nextState.participateToggle) {
      return true
    } else {
      return false
    }
  }

  render() { 
    console.log(this.state, 'state')
    return (  
      <div className="card min-width-92">
        <div className="card-body d-flex align-items-center">
          <div>
            <img className="max-width-165 pr-4" src={this.props.image} alt="Card" />
          </div>
          <div class="min-width-65">
            <h4 className="card-title"><b>{this.props.title}</b></h4>
            <p className="card-text">{ this.props.description}</p>
            <p>{ this.props.date.slice(0, 10) } at: {this.props.time }</p>
            <p>Number of participants: { this.state.numberOfParticipant }</p>
            <div className="d-flex justify-content-end">
              { this.state.button }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default WithClubConsumer(WithAuthConsumer(EventCard));