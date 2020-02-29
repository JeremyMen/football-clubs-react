import React from 'react'
import '../../stylesheets/ClubMiniTable.css'

const ClubMiniTable = ({
  logoClub,
  team, 
  city, 
  address, 
  admin, 
  createdAt,
  logoTeam,
  founded,
  venueName,
  venueAddress,
  venueCapacity
}) => {
  return (  
    <div className="ClubMiniTable">
      <div className="container">
        <div className="row">
          <div>
            <div className="card my-4 mt-0 mw-300 h-350">
            {/* <!-- navigation in .card-header --> */}
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#tab1">Team Info</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#tab2">Club info</a>
                </li>
              </ul>
            </div>
            {/* <!-- .card-body.tab-content  --> */}
            <div className="card-body tab-content">
              <div className="tab-pane fade show active" id="tab1">
                <ul className="list-group list-style-none text-left">
                  <li className="pb-2"><img className="w-80" src={ logoTeam } alt="logo" /></li>
                  <li><b>Founded:</b> { founded }</li>
                  <li><b>Venue name:</b> { venueName }</li>
                  <li><b>Venue address:</b> { venueAddress }</li>
                  <li><b>Venue capacity:</b> { venueCapacity }</li>
                </ul>
              </div>
              <div className="tab-pane fade" id="tab2">
                <ul className="list-group list-style-none text-left">
                  <li className="pb-2"><img className="w-80" src={ logoClub } alt="logo" /></li>
                  <li><b>Supporters of:</b> { team }</li>
                  <li><b>City:</b> { city }</li>
                  <li><b>Address:</b> { address }</li>
                  <li><b>Admin:</b> { admin }</li>
                  <li><b>Joined:</b> { createdAt }</li>
                </ul>
              </div>
            </div>{/*<!--/.card-body --> */}
          </div>{/*<!--/.card--> */}
          </div>{/*<!--/.col-sm-6 -->        */}
        </div>
      </div>
      {/* <!--/.container --> */}
    </div>
  );
}
 
export default ClubMiniTable;