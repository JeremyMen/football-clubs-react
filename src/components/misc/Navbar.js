import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/Navbar.css'
import { WithAuthConsumer } from '../../contexts/AuthContext';

const Navbar = (props) => {
  return ( 
    <nav className="Navbar mt-3">
      <div className="row">

        <div className="mw-130 col-sm d-flex align-items-center" >
          <Link to="/home" title="">
            <img src="../../../footballClubsLogo.png" alt="logo" className="mw-100" />
          </Link>
        </div>
        {/* <!--menu_logo end--> */}

        <div className="search-form col-sm d-flex align-items-center justify-content-center">
          <form className="d-flex">
            <input type="text" name="search" placeholder="Search a Football Club" />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>

        <div className="col-sm-4 d-flex align-items-center justify-content-around">
          <div className="d-flex">
            <div>
              <i className="fa fa-home mr-1 fs-25"></i>
              <Link to="/home" className="color-black mr-4 text-decoration-none">Home</Link>
            </div>
            <div>
              <i className="fa fa-users mr-1 fs-25"></i>
              <Link to="/home" className="color-black mr-4 text-decoration-none">MyClub</Link>
            </div>

          </div>
          <ul className="nav ">
            <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle mw-130" data-toggle="dropdown">
                  <img src={props.currentUser.profilePicture} alt=""  className="mw-100 rounded-circle"/>
                </div>
                <div className="dropdown-menu dropdown-menu-right">
                  <h6 className="text-center">{props.currentUser.username}</h6>
                  <div className="dropdown-divider"></div>

                  <div className="dropdown-item">
                    <i className="fa fa-user mr-2"></i>
                    <Link to="#" className="color-black text-decoration-none">MyProfile</Link>
                  </div>
                  
                  <div className="dropdown-item">
                    <i className="fa fa-cog mr-2"></i>
                    <Link to="#" className="color-black text-decoration-none">Settings</Link>
                  </div>
                  <div className="dropdown-divider"></div>

                  <div className="dropdown-item">
                    <i className="fa fa-sign-out mr-2"></i>
                    <Link to="#" onClick={props.logout} className="color-black text-decoration-none">Logout</Link>
                  </div>
                </div>
            </li>
          </ul>
        </div>
      </div>
      <hr />
    </nav>
  )
}
 
export default WithAuthConsumer(Navbar);