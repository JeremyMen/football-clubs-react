import React from 'react'
import '../../stylesheets/ClubMiniTable.css'
import { Link } from 'react-router-dom'

const ClubMiniTable = ({
  logoClub,
  team, 
  city, 
  address, 
  admin, 
  createdAt,
  logoTeam,
  founded,
  stadiumName,
  stadiumAddress,
  stadiumCapacity
}) => {
  return (  
    <div className="ClubMiniTable mb-5">
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
            <li><b>Stadium name:</b> { stadiumName }</li>
            <li><b>Stadium address:</b> { stadiumAddress }</li>
            <li><b>Stadium capacity:</b> { stadiumCapacity }</li>
          </ul>
        </div>
        <div className="tab-pane fade" id="tab2">
          <ul className="list-group list-style-none text-left">
            <li className="pb-2"><img className="w-80 rounded-circle" src={ logoClub } alt="logo" /></li>
            <li><b>Supporters of:</b> { team }</li>
            <li><b>City:</b> { city }</li>
            <li><b>Address:</b> { address }</li>
            <li><b>Admin:</b> <Link to={`/users/${admin}`} >{ admin }</Link></li>
            <li><b>Joined:</b> { createdAt }</li>
          </ul>
        </div>
      </div>{/*<!--/.card-body --> */}
    </div>{/*<!--/.card--> */}
  </div>
  );
}
 
export default ClubMiniTable;