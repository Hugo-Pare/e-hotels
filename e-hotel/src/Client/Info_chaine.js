/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation} from "react-router-dom";



function Info_chaine() {
  
  const id_chaine = sessionStorage.getItem("id_chaine");
  const nom_chaine = sessionStorage.getItem("nom_chaine");
  const [data, setData] = useState([])
  useEffect(() => {
    console.log("in");
      getHotels();
  }, [])
  
  useEffect(() => {
    console.log(data)
  }, [data])

    async function getHotels(){
      fetch(`http://127.0.0.1:5000/hotels?id_chaine=${id_chaine}`)
      .then(function(response){
          return response.json()
      })
      .then(function(json){
          setData(json)
      })
    }

  return(
    <div>
    <h1>Hotels {nom_chaine}</h1>
    <div>

    </div>
    </div>
  );
}

export default Info_chaine; 