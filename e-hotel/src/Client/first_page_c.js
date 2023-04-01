import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './first_page_c.css';
import hotel from './hotel.jpg';

function First_page_c() {
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
    })
  }


  const handleReservationClick = () => {
      navigate('/clientIn/hotels')
  };

  function handleChaineClick(e,id_chaine, nom_chaine){
    e.preventDefault()
    sessionStorage.setItem("id_chaine", id_chaine);
    sessionStorage.setItem("nom_chaine", nom_chaine);
    getHotels(id_chaine);
   
  };

  function getHotels(id_chaine){
    fetch(`http://127.0.0.1:5000/hotels?id_chaine=${id_chaine}`)
    .then(function(response){
        return response.json()
    })
    .then(function(json){
      sessionStorage.setItem("hotels", JSON.stringify(json));
      navigate('/clientIn/infoChaine');
    })
  }


return(
    <div>
      <div className="grid-container-client">
        <div className="grid-item-client-res" style={{backgroundImage: `url(${hotel})`, backgroundRepeat: 'no-repeat', padding: '10px'}}>
          <div className="bookRoom" style={{backgroundColor:'white', width:"fit-content", margin:"0"}}>
            <h3 style={{margin: '0'}}>Réservez une chambre maintenant tant qu'elle est encore disponible!</h3>
            <button style={{marginTop: '10px'}} onClick={handleReservationClick}>Nouvelle Réservation</button>
          </div>
        </div>
        <div>
          <div style={{textAlign:'center'}}> <h2>Chaînes</h2></div>
       
        <div className="grid-item-client">
        {loaded ? 
        <>
          <div className="container-box-chaines">
            {chaines.map((reservation) => (
            <div className="card" key={reservation.id_chaine} onClick={(e) => handleChaineClick(e,reservation.id_chaine, reservation.nom_chaine)}>
                <h4><b>{reservation.nom_chaine}</b></h4>
                <p>{reservation.street_num}, {reservation.street_name}, {reservation.city}</p>
                <p>{reservation.province_state}, {reservation.country}</p>
                <p>{reservation.email}</p>
                <p>{reservation.telephone}</p>
            </div>
              
            ))}
          </div>
          
        </>
        : <p>Recherche des chaînes ...</p>}</div>
      </div>
      </div>
    </div>
  );

}
export default First_page_c;