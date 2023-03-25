/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';


function Hotel_rooms_e() {
  const [showRooms, setShowRooms] = useState([])
  const idHotel = sessionStorage.getItem("hotel_id")
  const [numChambre, setNumChambre] = useState([]);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false)
  // const navigate = useNavigate();
  useEffect(() => {
    getHotelId()
    getAllRooms
  }, [])

function handleNumChambreChange(event){
  setNumChambre(event.target.value)
}

function handleEdit(){
  Navigate('/employeeIn/edit_hotel_room')
}

  async function getAllRooms() {
    console.log(idHotel)
    fetch(`http://127.0.0.1:5000/rooms?id_hotel${idHotel}`)
      .then(response => response.json())
      .then(function(json) {
        setData([json])
        setShowRooms([json][0])
        setLoaded(true)
  });
}

function handleClear(){
  setNumChambre("")
  getAllRooms()
}

function handleSearch() {
  console.log("clicked search");
  console.log("Numéro de chambre: " + numChambre);
  console.log(showRooms)
  if (numChambre) {
    const room = showRooms.find(chambre => chambre.room_num == numChambre);
    if (room) {
      setShowRooms([room]);
    } else {
      setShowRooms([]);
    }
  } else {
    getAllRooms();
  }
}


  return (
    <div className="hotel-rooms-container">
      <div className="search">
      <h2>Hotel Rooms</h2>
      <br/>
      <label>Numéro de chambre : </label>
      
      <input type="num_chambre" name="num_chmabre" onChange={handleNumChambreChange} value={numChambre}/>
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button> 
    </div>
{loaded ?
      <div className="table-panel">
      <table className="room-table">
          <thead>
              <tr key="titles">
                  <th>Numéro de chambre</th>
              </tr>
          </thead>
          <tbody>
              {showRooms.map((chambre) => (
                  <tr key={(chambre.room_num)}>
                      <td>{chambre.room_num}</td>
                      <td><button onClick={handleEdit} value={chambre.num}>Edit</button></td>
                      
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
      : <div>Loading Rooms ...</div>}
      </div>
      

  );      
}
export default Hotel_rooms_e;