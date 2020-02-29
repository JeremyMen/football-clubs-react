import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/Navbar.css'
import { WithAuthConsumer } from '../../contexts/AuthContext';
import { WithClubConsumer } from '../../contexts/ClubContext';

const Navbar = (props) => {
  const { club } = props.currentUser

  const logo = 
    <div className="maxw-100 col-sm d-flex align-items-center" >
      <Link to="/home" title="">
        <img src="../../../footballclubsLogo_Black.png" alt="logo" className="mw-100" />
      </Link>
    </div>
  
  const searchForm = 
    <div className="search-form col-sm d-flex align-items-center justify-content-center">
      <form className="d-flex">
        <input type="text" name="search" placeholder="Search a Football Club" />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
    
  const homeIcon =
    <div>
      <Link to="/home" className="color-black mr-4 text-decoration-none">
        <i className="fa fa-home mr-1 fs-25"></i>Home
      </Link>
    </div>
  
  const myClubIcon =
    <div>
      <a href={`/clubs/${ props.currentUser.club }`} className="color-black mr-4 text-decoration-none">
        <i className="fa fa-users mr-1 fs-25"></i>MyClub
      </a>
    </div>
  
  const newClubIcon = 
    <div>
      <Link to="/clubs/new" className="color-black mr-4 text-decoration-none">
        <i className="fa fa-user-plus mr-1 fs-25"></i>NewClub
      </Link>
    </div>

  const dropdownMenu = 
    <ul className="nav ">
      <li className="nav-item dropdown">
          <div className="nav-link dropdown-toggle maxw-100" data-toggle="dropdown">
            <img src={props.currentUser.profilePicture} alt=""  className="mw-100 rounded-circle"/>
          </div>
          <div className="dropdown-menu dropdown-menu-right">
            <h6 className="text-center">{props.currentUser.username}</h6>
            <div className="dropdown-divider"></div>

            <div className="dropdown-item">
              <Link to="#" className="color-black text-decoration-none">
                <i className="fa fa-user mr-2"></i>MyProfile
              </Link>
            </div>
            
            <div className="dropdown-item">
              <Link to="#" className="color-black text-decoration-none">
                <i className="fa fa-cog mr-2"></i>Settings
              </Link>
            </div>
            <div className="dropdown-divider"></div>

            <div className="dropdown-item">
              <Link to="#" onClick={props.logout} className="color-black text-decoration-none">
                <i className="fa fa-sign-out mr-2"></i>Logout
              </Link>
            </div>
          </div>
      </li>
    </ul>
  if (club) {
    return (
      <nav className="Navbar mt-3">
        <div className="row">  
          { logo }
          { searchForm }
          <div className="col-sm-4 d-flex align-items-center justify-content-around">
            <div className="d-flex">
              <div>
                { homeIcon }
              </div>
              <div>
                { myClubIcon }
              </div>
            </div>
            { dropdownMenu }
          </div>
        </div>
        <hr />
      </nav>
    )
  } else {
    return (
      <nav className="Navbar mt-3">
        <div className="row">  
          { logo }
          { searchForm }
          <div className="col-sm-4 d-flex align-items-center justify-content-around">
            <div className="d-flex">
              <div>
                { homeIcon }
              </div>
              <div>
                { newClubIcon }
              </div>
            </div>
            { dropdownMenu }
          </div>
        </div>
        <hr />
      </nav>
    )
  }
}
 
export default WithClubConsumer(WithAuthConsumer(Navbar))