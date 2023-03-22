/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation} from "react-router-dom";



function Info_chaine() {
  
  const id_chaine = sessionStorage.getItem("id_chaine");
  useEffect(() => {
      getHotels();
 
    
  }, [])
  
    async function getHotels(){
      fetch(`http://127.0.0.1:5000/employes?id_chaine=${id_chaine}`)
      .then(function(response){
          return response.json()
      })
      .then(function(json){
          console.log(json)
      })
    }

  return(
    <h1>Info Chaine {id_chaine}</h1>
  );
}

export default Info_chaine; 