/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './hotel_rooms.css'
import { format } from 'date-fns'

function Hotel_rooms() {
  const hotelInfo = useLocation().state.hotelInfo
  
  const [roomsAvailableDate, setRoomsAvailableDate] = useState([]);
  const [showRooms, setShowRooms] = useState([])
  // const [rating, setRating] = useState([]);
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [capacite, setCapacite] = useState();
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false)

  const [dateChange, setDateChange] = useState(false)
  const [allowLocation, setAllowLocation] = useState(false)

  const [chaineName, setChaineName] = useState();

  const navigate = useNavigate();
  const firstUpdate = useRef(true);
  const secondUpdate = useRef(true);

  useEffect(() => {
    getAllRooms()
    getChaineName();
  }, [])

  async function getChaineName(){
    fetch(`http://127.0.0.1:5000/chaines`)
    .then(response => response.json())
    .then(function(json) {
      console.log(json)
      for(let i = 0; i < Object.keys(json).length; i++){
        if(json[i].id_chaine == hotelInfo.id_chaine){
          setChaineName(json[i].nom_chaine)
        }
      }
    });
  }

  useLayoutEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      if (secondUpdate.current) {
        secondUpdate.current = false;
        return;
      }
    updateRooms()
    }, [roomsAvailableDate])

  async function getAllRooms() {
    fetch(`http://127.0.0.1:5000/rooms/${sessionStorage.getItem("hotel_id")}`)
      .then(response => response.json())
      .then(function(json) {
        setData(json)
        setShowRooms(json)
        setLoaded(true)
  });
}

async function getRoomsForDates() {
  if(checkInDate != null && checkOutDate != null){ 
  fetch(`http://127.0.0.1:5000/rooms/available/${checkInDate}/${checkOutDate}?id_hotel=${sessionStorage.getItem("hotel_id")}`)
      .then(response => response.json())
      .then(function(json) {
        setRoomsAvailableDate(json)
  });
} else setRoomsAvailableDate([])
}

  // function handleRating(event) {
  //   setRating(event.target.value)
  // };

  function handleMaxPriceChange(event) {
    setMaxPrice(event.target.value)
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleCheckIn = (date) => {
    if(date.target.value != checkInDate){
      setDateChange(true)
    }
    setCheckInDate(date.target.value);
  };
  const handleCheckOut = (date) => {
    if(date.target.value != checkOutDate){
      setDateChange(true)
    }
    setCheckOutDate(date.target.value);
  };

  const handleCapacite = (event) => {
    if(event.target.value === "null"){
      setCapacite(null)
    }
    else{
      setCapacite(event.target.value)
    }
  }

function valide (chambre){
  if(maxPrice != null && maxPrice != "" && chambre.prix > parseFloat(maxPrice).toFixed(2)) {
    return false
  }
  if(minPrice != null && minPrice != "" && chambre.prix < parseFloat(minPrice).toFixed(2)) {
    return false
  }
  if(capacite != null && capacite > chambre.capacity){
    return false
  }
  // if(rating != null && rating > chambre.rating){
  //   return false
  // }
  return true
}

const updateRooms = () => {
  let indexes = []
  let tempList = []
  for(let i = 0 ; i <data.length; i++){
    if (true == valide(data[i])){
          for(let n = 0; n<roomsAvailableDate.length;n++){
            if(roomsAvailableDate[n].room_num == data[i].room_num){
              indexes.push(i)
            }
          }
        }
      }
  for(let i = 0 ; i<indexes.length; i++){
    tempList.push(data[indexes[i]])
  }
  setShowRooms(tempList);
}

  const search = () => {
    if(checkInDate == null || checkOutDate == null || checkInDate == "" || checkOutDate == ""){
      alert("Selectionne une date Check-In et Check-Out SVP!")
      return
    }
  if(checkInDate < new Date(format(Date.parse(new Date()), 'yyyy-MM-dd')).toISOString().split('T')[0]){
    alert("La date de checkin doit soit etre aujourdhui ou une journée qui suit!")
    return null;
  }
  if (checkInDate >= checkOutDate){
    alert("La date de checkout doit venir apres la date de checkin")
    return null;
  }
    setAllowLocation(true)
    setDateChange(false)
    getRoomsForDates()
  };

  const handleReservation = (event) => {
    if(checkOutDate === undefined || checkOutDate == "" || checkInDate === undefined || checkInDate == ""){
      alert("SVP selectione une date check-in et check-out!")
    } else if(!allowLocation){
      alert("Veuillez appuyer le search pour appliquer la date check-out, check-in et autre filters avant de selectionner une chambre")
    } else if(dateChange) {
      alert("Vous avez changé la date de check-out et ou la date de check-in. SVP appuyer sur le search pour appliquer les nouvelles date avant de faire selection de la chambre.")
    } else {
    const array = event.target.value.split(",")
    const num = array[0]
    const prix = array[1]

    navigate('/clientIn/hotelRooms/reservation', {
      state: {
        id_hotel: sessionStorage.getItem("hotel_id"),
        room_num: num,
        id_email: sessionStorage.getItem("email_id"),
        date_checkin: checkInDate,
        date_checkout: checkOutDate,
        frais_total: prix,
        hotelInfo: hotelInfo
      }
    })

  }
  }

  const clear = () => {
    window.location.reload(false);
  };

  return (
    <div className="hotel-rooms-container">
        <div className="filter-panel"> 
          <h3>{chaineName}</h3>
          <h5>{hotelInfo.street_num} {hotelInfo.street_name}, {hotelInfo.zip_code}</h5>
          <h5>{hotelInfo.city}, {hotelInfo.province_state}, {hotelInfo.country}</h5>
          <h5>{hotelInfo.telephone}</h5>
          <h5>{hotelInfo.email}</h5>
          <h3>Filter rooms</h3>
          <div className="price-filter">
              <h4 style={{marginTop:'0'}}>
              Prix Maximum:
              <br/>
              <input  type="number" value={maxPrice} onChange={handleMaxPriceChange} />
              </h4>
              
              <h4 style={{marginTop:'0'}}>
              Prix Minimum:
              <br/>
              <input  type="number" value={minPrice} onChange={handleMinPriceChange} />
              </h4>
            </div>
            <div className="date-filter">
            <h4 style={{marginTop:'0'}}>
              Check-in date:
              <div className="date-picker">
              <input type="date" value={checkInDate} onChange={handleCheckIn}></input>
              </div>
              </h4>
              <h4 style={{marginTop:'0'}}>
              Check-out date:
              <div className="date-picker">
              <input type="date" value={checkOutDate} onChange={handleCheckOut}></input>
              </div>
              </h4>
            </div>
            <div className="capacite-filter">
            <h4 style={{marginTop:'0', marginBottom:'0'}}>
              Capacité:
              </h4>
            
              <select onChange={handleCapacite}>
              <option value="null">Faites selection</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              </select>
            </div>
            {/* <div className="rating-filter">
              <label style={{fontSize: "20px"}}>
              Rating:
              </label>
              <br/>
              <select onChange={handleRating}>
              <option value="null">Faites selection</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
             
              </select>
            </div> */}

            <div className="button-container">
              <button onClick={search}>Search</button>
              <button onClick={clear}>Clear</button>
            </div>
        </div>

{loaded ?
      <div className="table-panel">
      <table className="room-table">
          <thead>
              <tr key="titles">
              <th># Chambre</th>
                <th>Prix</th>
                <th>Capacité</th>
                <th>TV</th>
                <th>AC</th>
                <th>Cafée</th>
                <th>Fridge</th>
                <th>Micro-Onde</th>
                <th>Four</th>
                <th>Vue</th>
                  
                  {/* <th>Rating</th> */}
              </tr>
          </thead>
          <tbody>
              {showRooms.map((chambre) => (
                  <tr key={(chambre.room_num)}>
                    <td>{chambre.room_num}</td>
                      <td>{chambre.prix}$</td>
                      <td>{chambre.capacity}</td>
                      <td>{chambre.tv.toString()}</td>
                      <td>{chambre.ac.toString()}</td>
                      <td>{chambre.coffee.toString()}</td>
                      <td>{chambre.refrigerator.toString()}</td>
                      <td>{chambre.microwave.toString()}</td>
                      <td>{chambre.oven.toString()}</td>
                      <td>{chambre.vue}</td>
                      {/* <td>{chambre.rating}</td> */}
                      <td><button value={[chambre.room_num,chambre.prix]} onClick={handleReservation}>Réserver</button></td>
                      
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
      : <div>Loading Rooms ...</div>}
      </div>
      

  );      
}
export default Hotel_rooms;