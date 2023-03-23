/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './hotel_rooms.css'
import { id } from 'date-fns/locale';
import { set } from 'date-fns';

function Hotel_rooms() {
  
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
  const navigate = useNavigate();
  const firstUpdate = useRef(true);
  const secondUpdate = useRef(true);
  useEffect(() => {
    getAllRooms()
  }, [])

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
    fetch(`http://127.0.0.1:5000/rooms?id_hotel=${sessionStorage.getItem("id_hotel")}`)
      .then(response => response.json())
      .then(function(json) {
        setData([json])
        setShowRooms([json][0])
        setLoaded(true)
  });
}

async function getRoomsForDates() {
  if(checkInDate != null && checkOutDate != null){ 
  fetch(`http://127.0.0.1:5000/rooms/available/${checkInDate}/${checkOutDate}`)
      .then(response => response.json())
      .then(function(json) {
        setRoomsAvailableDate([json][0])
        // updateRooms()
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
    setCheckInDate(date.target.value);
  };
  const handleCheckOut = (date) => {
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
  for(let i = 0 ; i <data[0].length; i++){
    if (true == valide(data[0][i])){
      if(roomsAvailableDate.length > 0) {
          for(let n = 0; n<roomsAvailableDate.length;n++){
            if(roomsAvailableDate[n].room_num == data[0][i].room_num && roomsAvailableDate[n].id_hotel == data[0][i].id_hotel){
              indexes.push(i)
            }
          }
      } else {
        indexes.push(i)
      }
    }
  }
  for(let i = 0 ; i<indexes.length; i++){
    tempList.push(data[0][indexes[i]])
  }
  setShowRooms(tempList);
}
  const search = () => {
    if(checkInDate == null || checkOutDate == null){
      alert("Selectionne une date Check-In et Check-Out SVP!")
      return
    }
    getRoomsForDates()
  };

  const handleReservation = () => {
    navigate('/clientIn/hotelRooms/reservation')
  }

  const clear = () => {
    window.location.reload(false);
    // setLoaded(false)
    // setRating();
    
    // setMaxPrice();
    // ref.current.value = '';
    // this.ref.current.reset();
    // setMinPrice();
    // setCheckInDate();
    // setCheckOutDate();
    // setCapacite();
    // getAllRooms();
  };

  return (
    <div className="hotel-rooms-container">
        <div className="filter-panel"> <h2 style={{marginBottom:'0'}}>Filter rooms</h2>
          <div className="price-filter">
              <label style={{fontSize: "20px"}}>
              Prix Maximum:
              <br/>
              <input  type="number" value={maxPrice} onChange={handleMaxPriceChange} />
              </label>
              <br/>
              <label style={{fontSize: "20px"}}>
              Prix Minimum:
              <br/>
              <input  type="number" value={minPrice} onChange={handleMinPriceChange} />
              </label>
            </div>
            <div className="date-filter">
              <label style={{fontSize: "20px"}}>
              Check-in date:
              <div className="date-picker">
              <input type="date" value={checkInDate} onChange={handleCheckIn}></input>
              </div>
              </label>
              <label style={{fontSize: "20px"}}>
              Check-out date:
              <div className="date-picker">
              <input type="date" value={checkOutDate} onChange={handleCheckOut}></input>
              </div>
              </label>
            </div>
            <div className="capacite-filter">
              <label style={{fontSize: "20px"}}>
              Capacité:
              </label>
              <br/>
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
                      <td><button value={chambre.num} onClick={handleReservation}>Réserver</button></td>
                      
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