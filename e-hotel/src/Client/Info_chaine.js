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

    function handleClick(e, hotel_id) {
      sessionStorage.setItem("hotel_id", hotel_id)
      navigate('/clientIn/hotelRooms');
    }

  return(
    <div>
      <div className='center'><h1>Hotels {nom_chaine}</h1></div>
  
    <div>

      <div className="grid-container">
              {data.map((hotel) => (
                  <div className="card" key={hotel.id_hotel} onClick={(e) => handleClick(e, hotel.id_hotel)}>
                  <img src={hotelImg} alt="hotel" style={{width:'100%'}}/>
                  <p>{hotel.street_num}, {hotel.street_name}, {hotel.city}</p>
                  <p>{hotel.province_state}, {hotel.country}</p>
                  <p>{hotel.email}</p>
                  <p>{hotel.telephone}</p>
              </div> 
                
              ))}
       
      </div>
    
      
    </div>
    </div>
  );
}

export default Info_chaine; 