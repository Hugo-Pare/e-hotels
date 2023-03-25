import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './hotel_rooms.css'

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
  };

  return (
    <div className="hotel-rooms-container">
        <div className="filter-panel"> <h3>Filter rooms</h3>
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