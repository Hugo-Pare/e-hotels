/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation} from "react-router-dom";

import './info_chaine.css';



function Info_chaine() {
  
  const id_chaine = sessionStorage.getItem("id_chaine");
  const nom_chaine = sessionStorage.getItem("nom_chaine");
  console.log("hotels")
  console.log(JSON.parse(sessionStorage.getItem("hotels")));
  // const [data, setData] = useState();
  // const [loaded, setLoaded] = useState(true);
  // // this.setState = { data:[]}
  // const ref1 = useRef(0);
  // // const ref2 = useRef(0);
  // const refD1 = useRef(0);
  // const refD2 = useRef(0);
  // useEffect(() => {
  //   if (ref1.current == 0){
  //     console.log("ref1")
  //     ref1.current = 1;
  //     return;
  //   }
  //   setLoaded(false);
  //   getHotels();
  // }, [])
  
  // useEffect(() => {
  //   // if (refD1.current == 1){
  //     console.log("in data")
  //     console.log(data)
  //   //   refD1.current = 0;
  //   //   return;
  //   // }
    
  // }, [data])

  // await this.setState(prevState => ({
  //   time : prevState.time + 1
  //  }));

    // function getHotels(){
    //   fetch(`http://127.0.0.1:5000/hotels?id_chaine=${id_chaine}`)
    //   .then(function(response){
    //       return response.json()
    //   })
    //   .then(function(json){
    //     console.log("in hotel")
    //     refD1.current = 1;
    //     // this.setState({data: json});
    //     setData(json)
    //     setLoaded(true)
    //   })
    // }


    function handleClick() {
      console.log("clicked");
    }

  return(
    <div>
    <h1>Hotels {nom_chaine}</h1>
    <div>
{/* 

    {loaded ?
      <div className="grid-container">
        {console.log(data)}
              {data.map((hotel) => (
                  <div className="card" key={hotel.id_hotel} onClick={() => handleClick()}>
                  <p>{hotel.street_num}, {hotel.street_name}, {hotel.city}</p>
                  <p>{hotel.province_state}, {hotel.country}</p>
                  <p>{hotel.email}</p>
                  <p>{hotel.telephone}</p>
              </div> 
                
              ))}
       
      </div>
      : <div>Loading Hotels ...</div>} */}
      
    </div>
    </div>
  );
}

export default Info_chaine; 