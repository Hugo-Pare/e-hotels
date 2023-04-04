/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import hotelImg from './hotelDefault.jpg'
import './info_chaine.css';

function Info_chaine() {
  const id_chaine = sessionStorage.getItem("id_chaine");
  const nom_chaine = sessionStorage.getItem("nom_chaine");
  const navigate = useNavigate();
  const [data, setData] = useState(JSON.parse(sessionStorage.getItem("hotels")));
  const [listCapacity, setListCapacity] = useState([]);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
        getAllCapacity();
  }, [])

  function handleClick(e, hotel) {
    sessionStorage.setItem("hotel_id", hotel.id_hotel)
    navigate('/clientIn/hotelRooms', {state: {hotelInfo: hotel}});
  }

  async function getAllCapacity() {
    setLoaded(false)
    fetch(`http://127.0.0.1:5000/capacite/hotel?id_chaine=${id_chaine}`)
      .then(response => response.json())
      .then(function(json) {
          setListCapacity(json)
          setLoaded(true)
      })
  }

  function getCapacityMaximal(hotel) {
    for (var i = 0 ; i < listCapacity.length ; i++){
      if(listCapacity[i].id_hotel == hotel) {
        return listCapacity[i].capacite;
      }
    }
    return "NA"
  }

  return(
    <div>
      <div className='center'><h1>Hotels {nom_chaine}</h1></div>
  
    <div>

      <div className="grid-container">
      {loaded ?  data.map((hotel) => (
                  <div className="card" key={hotel.id_hotel} onClick={(e) => handleClick(e, hotel)}>
                  <img src={hotelImg} alt="hotel" style={{width:'100%'}}/>
                  <p>{hotel.street_num}, {hotel.street_name}, {hotel.city}</p>
                  <p>{hotel.province_state}, {hotel.country}</p>
                  <p>{hotel.email}</p>
                  <p>{hotel.telephone}</p>
                  <p>Capacité maximal: {getCapacityMaximal(hotel.id_hotel)}</p>
                  <div>
                    {hotel.rating} <span>&#11088;</span>
                  </div>
              </div>
              )) : 
              
              
              <div>Loading Hotels ...</div>} 
             
       
      </div>
    
      
    </div>
    </div>
  );
}

export default Info_chaine; 