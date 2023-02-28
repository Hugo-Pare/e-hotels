/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";



function Info_chaine() {
  
  const id_chaine = useLocation().state.id_chaine
    

  return(
    <h1>Info Chaine {id_chaine}</h1>
  );
}

export default Info_chaine; 