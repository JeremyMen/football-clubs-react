import React from 'react';
import BannerSection from './BannerSection';
import { Link } from 'react-router-dom';

const Validation = () => {
  return ( 
    <div className="Validation">
      <BannerSection 
        title="Validation"
        description="You are almost there!"
      />

      <div className="hd-lg mt-4 mb-4">
        <img src="../../../footballClubsLogo.png" alt="logo" className="mw-170"/>
        <span>One last step: We've sent you an email that contains a confirm link.</span>
      </div>

      <p>
        <Link to="/login">login</Link>
      </p>
    </div>
   );
}
 
export default Validation;