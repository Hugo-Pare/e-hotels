import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './first_page_c.css'

function First_page_c() {
  const location = useLocation();
  sessionStorage.setItem("email_id", location.state.clientEmail)

  const navigate = useNavigate();

  const [chaines, setChaines] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getAllChaines()
  }, [])

  async function getAllChaines(){
    fetch(`http://127.0.0.1:5000/chaines`)
    .then(response => response.json())
    .then(function(json){
        setLoaded(true)
        setChaines(json)
        console.log(json)
    })
  }


  const handleReservationClick = () => {
      console.log("clicked reservation")
      navigate('/clientIn/hotelRooms')
  };

  function handleChaineClick(e,id_chaine){
    e.preventDefault()
    console.log("clicked chaine : " + id_chaine)
    navigate('/clientIn/infoChaine', {
      state: {
        id_chaine: id_chaine
      }
    });
  };



return(
    <div>
      <div>
        <button onClick={handleReservationClick}>Effectuer une réservation</button>
      </div>
      <div>
        <h2>Nos chaînes d'hotels</h2>
        {loaded ? 
        <>
          <div className="container-box-chaines">
            {chaines.map((reservation) => (
              <div className="box-chaine" key={reservation.id_chaine} onClick={(e) => handleChaineClick(e,reservation.id_chaine)}>
                <b>{reservation.nom_chaine}</b>
                <div><p>{reservation.country}, {reservation.province_state}, {reservation.city}</p></div>
                <div><p>{reservation.street_num}, {reservation.street_name}, {reservation.zip_code}</p></div>
                <div><p>{reservation.email}</p></div>
                <div><p>{reservation.telephone}</p></div>
              </div>
            ))}
          </div>
        </>
        : <p>Recherche des chaînes ...</p>}
      </div>
    </div>
  );

}
export default First_page_c;