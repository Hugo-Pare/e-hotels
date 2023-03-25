import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Create_location() {
  
    // const [showRooms, setShowRooms] = useState([])
    const [checkInDate, setCheckIn] = useState();
    const [checkOutDate, setCheckOut] = useState();
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [capacite, setCapacite] = useState();
    const [rating, setRating] = useState();
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState();
    const [showRooms, setShowRooms] = useState();
    const [roomsForDate, setRoomsForDate] = useState();
    const ref = useRef(false);
    const ref2 = useRef(false);

    const hotel_id = sessionStorage.getItem("hotel_id")

    useEffect(() => {
        getAllRooms()
      }, [])

    useLayoutEffect(() => {
        if(ref.current == false){
            ref.current = true
            return
        }
        if(ref2.current == false){
            ref2.current = true
            return
        }
        updateRooms();
    }, [roomsForDate])

    function getAllRooms() {
        fetch(`http://127.0.0.1:5000/rooms/${hotel_id}`)
          .then(response => response.json())
          .then(function(json) {
            setData(json);
            setShowRooms(json);
            setLoaded(true)
      });
    }

    async function getRoomsForDates() {
        fetch(`http://127.0.0.1:5000/rooms/available/${checkInDate}/${checkOutDate}?id_hotel=${hotel_id}`)
            .then(response => response.json())
            .then(function(json) {
                setRoomsForDate(json)
        });
      }

      function updateRooms() {
        let indexes = []
        let tempList = []
        for (let i=0; i<data.length; i++){
            if(validate(data[i])){
                indexes.push(i)
            }
        }

        for(let i = 0 ; i<indexes.length; i++){
            tempList.push(data[indexes[i]])
          }
          setShowRooms(tempList);
      }

      function validate() {

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
        if (checkInDate == null || checkOutDate == null) {
            alert("SVP selectione une date checkin et checkout!")
            return null;
        }
        setLoaded(false)
        getRoomsForDates();
      }
      function clear() {
        window.location.reload(false);
      }
      function handleLocation() {
        console.log("location");
      }

  return (
    <div className="hotel-rooms-container">
        <div className="filter-panel"> <h3>Filter rooms</h3>
          <div className="price-filter">
              <h4 style={{marginTop: "0"}}>
              Prix Maximum:
              <br/>
              <input  type="number" value={maxPrice} onChange={handleMaxPriceChange} />
              </h4>
              <h4 style={{marginTop: "0"}}>
              Prix Minimum:
              <br/>
              <input  type="number" value={minPrice} onChange={handleMinPriceChange} />
              </h4>
            </div>
            <div className="date-filter">
            <h4 style={{marginTop: "0"}}>
              Check-in date:
              <div className="date-picker">
              <input type="date" value={checkInDate} onChange={handleCheckIn}></input>
              </div>
              </h4>
              <h4 style={{marginTop: "0"}}>
              Check-out date:
              <div className="date-picker">
              <input type="date" value={checkOutDate} onChange={handleCheckOut}></input>
              </div>
              </h4>
            </div>
            <div className="capacite-filter">
              <h4 style={{marginTop: "0", marginBottom:'0'}}>
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
            <div className="rating-filter">
              <h4 style={{ marginBottom:"0"}}>
              Rating:
              </h4>
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
                      <td><button value={chambre.num} onClick={handleLocation}>Location</button></td>
                      
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
      : <div>Loading Rooms ...</div>}
    </div>
  );      
    }
export default Create_location;