/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns'

function Create_location() {
  
    const checkInDate = format(Date.parse(new Date()), 'yyyy-MM-dd')
    const [checkOutDate, setCheckOut] = useState();
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [capacite, setCapacite] = useState();
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState();
    const [showRooms, setShowRooms] = useState();
    const [roomsForDate, setRoomsForDate] = useState();
    const [dateChange, setDateChange] = useState(false)
    const [allowLocation, setAllowLocation] = useState(false)
    const ref = useRef(false);
    const ref2 = useRef(false);
    const ref3 = useRef(false);
    const ref4 = useRef(false);

    const navigate = useNavigate();

    const hotel_id = sessionStorage.getItem("hotel_id")
    const id_employe = sessionStorage.getItem("id")

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

    useLayoutEffect(() => {
        if(ref3.current == false){
            ref3.current = true
            return
        }
        if(ref4.current == false){
            ref4.current = true
            return
        }
        setLoaded(true)
    }, [showRooms])

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
              for(let n = 0; n<roomsForDate.length;n++){
                if(roomsForDate[n].room_num == data[i].room_num){
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

      function validate(chambre) {
        if(maxPrice != null && maxPrice != "" && chambre.prix > parseFloat(maxPrice).toFixed(2)) {
            return false
          }
          if(minPrice != null && minPrice != "" && chambre.prix < parseFloat(minPrice).toFixed(2)) {
            return false
          }
          if(capacite != null && capacite > chambre.capacity){
            return false
          }
          return true
      }

      function handleMaxPriceChange(event) {
        setMaxPrice(event.target.value)
      }
      function handleMinPriceChange(event) {
        setMinPrice(event.target.value)
      }

      function handleCheckOut(event) {
        if(event.target.value != checkOutDate){
          setDateChange(true)
        }
        setCheckOut(event.target.value)
      }

      function handleCapacite(event) {
        setCapacite(event.target.value)
      }
     
      function search() {
        if (checkOutDate == null) {
            alert("SVP selectione une date checkout!")
            return null;
        } else if (checkInDate >= checkOutDate){
          alert("La date de checkout doit venir une journée au minimum apres la date d'aujourd'hui")
          return null;
        } else {
          setAllowLocation(true)
        }
        setDateChange(false)
        setLoaded(false)
        getRoomsForDates();
      }
      function clear() {
        window.location.reload(false);
      }
      function handleLocation(event) {
        if(checkOutDate === undefined || checkOutDate == ""){
          alert("SVP selectione une date checkout!")
        } else if(!allowLocation){
          alert("Veuillez appuyer le search pour appliquer la date check-out et autre filters avant de selectionner une chambre")
        } else if(dateChange) {
          alert("Vous avez changé la date de check-out svp, appuyer sur le search pour appliquer la nouvelle date avant de faire selection de la chambre.")
        }
        else{
          const array = event.target.value.split(",")
          const num = array[0]
          const prix = array[1]
          
          console.log("handleLocation " + num);
          console.log("prix: " + prix)
          // navigate to location page
          navigate('/employeeIn/chooseClient', {
            state: {
                room_num: num,
                prix: prix,
                id_employe: id_employe,
                hotel_id: hotel_id,
                date_checkin: checkInDate,
                date_checkout: checkOutDate
            }
          });
        }
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
            {/* <h4 style={{marginTop: "0"}}>
              Check-in date:
              <div className="date-picker">
              <input type="date" value={checkInDate} onChange={handleCheckIn}></input>
              </div>
              </h4> */}
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
                     
                      <td><button value={[chambre.room_num,chambre.prix]} onClick={handleLocation}>Location</button></td>
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