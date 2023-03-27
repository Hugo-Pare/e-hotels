/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { navigate, useLocation, useNavigate } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import './hotel_rooms_e.css'


function Hotel_rooms_e() {
  const [showRooms, setShowRooms] = useState([])
  const navigate = useNavigate();
  const hotel_good_id = sessionStorage.getItem("hotel_id")
  const [numChambre, setNumChambre] = useState([]);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    getAllRooms()
  }, [])

function handleNumChambreChange(event){
  setNumChambre(event.target.value)
}

function handleEdit(event){
  const num_chambre = event.target.value
  navigate('/employeeIn/edit_hotel_room', {
    state: {
      numChambre: num_chambre,
    }
  })
}

  async function getAllRooms() {
    console.log({hotel_good_id})
    fetch(`http://127.0.0.1:5000/rooms/${hotel_good_id}`)
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
  <div className="hotel-edit-rooms-container">
    <div className="search">
      <h2>Hotel Rooms</h2>
      <br />
      <label>Numéro de chambre :</label>

      <input
        type="num_chambre"
        name="num_chmabre"
        onChange={handleNumChambreChange}
        value={numChambre}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>
    </div>

    <div className="table-edit-rooms-panel">
      {loaded ? (
        <table className="room-edit-rooms-table">
          <thead>
            <tr key="titles">
              <th>Numéro de chambre</th>
            </tr>
          </thead>
          <tbody>
            {showRooms.map((chambre) => (
              <tr key={chambre.room_num}>
                <td>{chambre.room_num}</td>
                <td>
                  <button onClick={handleEdit} value={chambre.room_num}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Loading Rooms ...</div>
      )}
    </div>
  </div>
);     
}
export default Hotel_rooms_e;