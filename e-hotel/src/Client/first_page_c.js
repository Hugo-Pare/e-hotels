import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React from 'react';



function First_page_c() {
    const location = useLocation();
   sessionStorage.setItem("email_id", location.state.clientEmail)
   console.log(sessionStorage.getItem("email_id"))

    const navigate = useNavigate();


    const handleReservationClick = () => {
        navigate('/clientIn/hotelRooms')
    };

    const handleChaineClick = () => {
        navigate('/clientIn/infoChaine')
    };

return(
    <div className="container">
      <div className="left-panel">
        <button onClick={handleReservationClick}>Effectuer une réservation</button>
      </div>
      <div className="right-panel">
          <h2>Nos chaîne d'hotel</h2>
        <div className="square">
          <button onClick={handleChaineClick}>Hilton</button>
          <button onClick={handleChaineClick}>EXChange</button>
          <button onClick={handleChaineClick}>Level</button>
          <button onClick={handleChaineClick}>Sheraton</button>
        </div>
        <button onClick={handleChaineClick}>Marriot</button>
      </div>
    </div>
  );

}
export default First_page_c;