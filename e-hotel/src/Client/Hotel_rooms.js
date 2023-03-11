/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './hotel_rooms.css'
import { id } from 'date-fns/locale';
import { set } from 'date-fns';

function Hotel_rooms() {
  const [chaineChecked, setChainesChecked] = useState([]);
  const [chaines, setChaines] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();
  // const [checkInDate, setCheckInDate] = useState(null);
  // const [checkOutDate, setCheckOutDate] = useState(null);
  // const [capacite, setCapacite] = useState(null);
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [capacite, setCapacite] = useState();
  const [data, setData] = useState([]);
  // const [included, setIncluded] = useState()
  const [loaded, setLoaded] = useState(false)
  const [chainesLoaded, setChainesLoaded] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    getChaines()
    getAllRooms()
  }, [])

  async function getAllRooms() {
    setLoaded(false)
    fetch(`http://127.0.0.1:5000/rooms/info`)
      .then(response => response.json())
      .then(function(json) {
        setLoaded(true)
        setData([json])
  });
}

async function getChaines(){
  setChainesLoaded(false)
  fetch(`http://127.0.0.1:5000/chaines`)
    .then(response => response.json())
    .then(function(json) {
      var chainesList = []
      for(var i = 0; i < Object.keys(json).length; i++){
        // chaineChecked.push(json[i]["id_chaine"])
        chainesList.push({nom_chaine : json[i]["nom_chaine"], checked : false, id :json[i]["id_chaine"]})
      }
      setChaines(chainesList)
      setChainesLoaded(true)
  });
}

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };
  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
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
  if(chaineChecked.length > 0  && !chaineChecked.includes(chambre.id_chaine)){
    return false
  }

  return true
}

  const search = () => {
    setChainesChecked([])
    let temp = []
    for (let i = 0; i<chaines.length ; i++){
      if (chaines[i].checked == true)
      temp.push(chaines[i].id)
    }
    setChainesChecked(temp)
    // TODO: Implement search functionality
  };

  const handleReservation = () => {
    navigate('/clientIn/hotelRooms/reservation')
  }

  const clear = () => {
    setMaxPrice();
    setMinPrice();
    setCheckInDate();
    setCheckOutDate();
    setCapacite();
    // setCheckInDate(null);
    // setCheckOutDate(null);
    // setCapacite(null);
    clearChaines();
    getChaines();
    getAllRooms();
  };

  const clearChaines = () => {
    for (var i = 0; i <chaines.length; i++){
      chaines[i].checked = false
    }
    setChainesChecked([])
  }

  const handleSelectedChaines = (e) => {
    chaines.map((chaine) => {
      if(chaine.id == e.target.id) {
        chaine.checked = !chaine.checked
      }
    })
    
  }

  return (
    <div className="hotel-rooms-container">
      {chainesLoaded ?
        <div className="filter-panel"> <h3>Filter rooms</h3>
          <div className="chaines-filters">
            {chaines.map(chaine => (
              <div key={chaine.id}>
                <input key={chaine.id} id={chaine.id} type="checkbox" onClick={handleSelectedChaines}></input>
                <label>{chaine.nom_chaine}</label>
              </div>
            ))}
          </div>
          <br/>
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
              <input type="date"></input>
              </div>
              </label>
              <label style={{fontSize: "20px"}}>
              Check-out date:
              <div className="date-picker">
              <input type="date"></input>
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

            <div className="button-container">
              <button onClick={search}>Search</button>
              <button onClick={clear}>Clear</button>
            </div>
        </div>
          :<div>Loading filters ...</div>}

{loaded ?
      <div className="table-panel">
      <table className="room-table">
          <thead>
              <tr key="titles">
                  <th>Prix</th>
                  <th>Numéro de chambre</th>
                  <th>Adresse</th>
                  <th>Chaine</th>
                  <th>Rating</th>
              </tr>
          </thead>
          <tbody>
              {data[0].map((chambre) => (
                valide(chambre) ?
                  <tr key={(chambre.room_num)}>
                      <td>{chambre.prix}</td>
                      <td>{chambre.room_num}</td>
                      <td>{chambre.street_num + " "+chambre.street_name + ", " + chambre.city+", "+chambre.province_state+" " +chambre.zip_code+ ", "+chambre.country}</td>
                      <td>{chambre.chaine_name}</td>
                      <td>{chambre.rating}</td>
                      <td><button value={chambre.num} onClick={handleReservation}>Réserver</button></td>
                      
                  </tr>
                  : null
              ))}
          </tbody>
        </table>
      </div>
      : <div>Loading Rooms ...</div>}
      </div>
      

  );      
}
export default Hotel_rooms;