import React from 'react';
import '../../stylesheets/Club.css'

const Club = (props) => {

  return(
    <div className="Club col-sm-6">

      <div className="card">
        <div className="additional">
          <div className="user-card d-flex flex-column justify-content-between">
            <div className="official center mt-3 ml-2 mr-2">
              { props.isOfficialClub }
            </div>
            <img src={ props.emblem } className="mw-100" alt="emblem" />
            <div className="members center mb-3 ml-2 mr-2">
              { props.members } Members
            </div>
            
          </div>
          <div className="more-info">
            <h4 className="mb-3 mt-2">
              { props.name }
            </h4>
            <div className="coords">
              <span>
                Team: { props.team }
              </span>
              <span>
                Joined: { props.createdAt }
              </span>
            </div>
            <div className="coords">
              <span>
                League: { props.teamLeague }
              </span>
              <span>
                City: { props.city }
              </span>
            </div>
            <div className="stats">
              <div>
                <div className="title">Awards</div>
                <i className="fa fa-trophy"></i>
                <div className="value">2</div>
              </div>
              <div>
                <div className="title">Matches</div>
                <i className="fa fa-gamepad"></i>
                <div className="value">27</div>
              </div>
              <div>
                <div className="title">Pals</div>
                <i className="fa fa-group"></i>
                <div className="value">123</div>
              </div>
            </div>
          </div>
        </div>
        <div className="general">
          <h4 className="mb-4 mt-2">
            { props.name }
          </h4>
          <p>
            { props.description }
          </p>
          <span className="more">Mouse over the card for more info</span>
        </div>
      </div>
    </div>
  )
}
 
export default Club;

