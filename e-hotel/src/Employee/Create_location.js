import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Create_location() {
  
    // const [showRooms, setShowRooms] = useState([])
    const [checkInDate, setCheckIn] = useState()
    const [checkOutDate, setCheckOut] = useState()
    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [capacite, setCapacite] = useState()
    const [rating, setRating] = useState()

    const hotel_id = sessionStorage.getItem("hotel_id")
    useEffect(() => {
        getAllRooms()
      }, [])

    function getAllRooms() {
        fetch(`http://127.0.0.1:5000/rooms/${hotel_id}`)
          .then(response => response.json())
          .then(function(json) {
            console.log(json)
      });
    }

    async function getRoomsForDates() {
        fetch(`http://127.0.0.1:5000/rooms/available/${checkInDate}/${checkOutDate}/?id_hotel=${hotel_id}`)
        
        // fetch(`http://127.0.0.1:5000/rooms/available/?id_hotel=${hotel_id}`)
            .then(response => response.json())
            .then(function(json) {
           console.log(json)
        });
      }
      
      function handleMaxPriceChange(event) {
        setMaxPrice(event.target.value)
      }
      function handleMinPriceChange(event) {
        setMinPrice(event.target.value)
      }

      function handleCheckIn(event) {
        setCheckIn(event.target.value)
      }

      function handleCheckOut(event) {
        setCheckOut(event.target.value)
      }

      function handleCapacite(event) {
        setCapacite(event.target.value)
      }
      function handleRating(event) {
        setRating(event.target.value)
      }
      function search() {
        if (checkInDate == null && checkOutDate == null) {
            alert("SVP selectione une date checkin et checkout!")
            return null;
        }
      }
      function clear() {
        window.location.reload(false);
      }

  return (
    <div>
  
        <div className="filter-panel"> <h3>Filter rooms</h3>
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
            <div className="rating-filter">
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
            </div>

            <div className="button-container">
              <button onClick={search}>Search</button>
              <button onClick={clear}>Clear</button>
            </div>
        </div>
          </div>
  );      
    }
export default Create_location;