import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './hotel_rooms.css'

function Hotel_rooms() {

  const [hotels, setHotels] = useState({
    hilton: false,
    exchange: false,
    level: false,
    sheraton: false,
    marriot: false,
  });

  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [capacite, setCapacite] = useState(null);
  const [data, setData] = useState([]);
  const [included, setIncluded] = useState()
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    getAllRooms()
  }, [])

  async function getAllRooms() {
    fetch(`http://127.0.0.1:5000/rooms`)
      .then(response => response.json())
      .then(function(json) {
        setLoaded(true)
        setData([json])
  });
}

  const handleHotelChange = (event) => {
    const { name, checked } = event.target;
    setHotels({ ...hotels, [name]: checked });
  };

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

  const handleCapaciteIncrement = () => {
    if (capacite === null || capacite < 7) {
      setCapacite((capacite || 0) + 1);
    }
  };

  const handleCapaciteDecrement = () => {
    if (capacite !== null && capacite > 1) {
      setCapacite(capacite - 1);
    }
  };

  const handleSearchClick = () => {
    // TODO: Implement search functionality
  };

  const handleReservation = () => {
    navigate('/clientIn/hotelRooms/reservation')

  }


  const handleClearClick = () => {
    setHotels({
      hilton: false,
      exchange: false,
      level: false,
      sheraton: false,
      marriot: false,
    });
    setMaxPrice('');
    setMinPrice('');
    setCheckInDate(null);
    setCheckOutDate(null);
    setCapacite(null);

  };

  return (
    <div className="hotel-rooms-container">
      <div className="filter-panel">
      <h3>Filter hotels</h3>
        <div className="hotel-filters">
          <label style={{fontSize: "20px"}}>
            <input
              type="checkbox"
              name="hilton"
              checked={hotels.hilton}
              onChange={handleHotelChange}
            />
            Hilton
          </label>
          <br/>
          <label style={{fontSize: "20px"}}>
            <input
              type="checkbox"
              name="exchange"
              checked={hotels.exchange}
              onChange={handleHotelChange}
            />
            EXChange
          </label>
          <br/>
          <label style={{fontSize: "20px"}}>
            <input
              type="checkbox"
              name="level"
              checked={hotels.level}
              onChange={handleHotelChange}
            />
            Level
          </label>
          <br/>
          <label style={{fontSize: "20px"}}>
            <input
              type="checkbox"
              name="sheraton"
              checked={hotels.sheraton}
              onChange={handleHotelChange}
            />
            Sheraton
          </label>
          <br/>
          <label style={{fontSize: "20px"}}>
            <input
              type="checkbox"
              name="marriot"
              checked={hotels.marriot}
              onChange={handleHotelChange}
            />
            Marriot
          </label>
          <br/>
        </div>
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
        {/* <div className="date-filter">
          <label style={{fontSize: "20px"}}>
            Check-in date:
            <div className="date-picker">
            <DatePicker style={{width: "50px"}} selected={checkInDate} onChange={handleCheckInDateChange} />
            </div>
          </label>
          <br/>
          <label style={{fontSize: "20px"}}>
            Check-out date:
            <div className="date-picker">
            <DatePicker selected={checkOutDate} onChange={handleCheckOutDateChange} />
            </div>
          </label>
        </div> */}
        <div className="capacite-filter">
          <label style={{fontSize: "20px"}}>
            Capacité:
            <br/>
            <button onClick={handleCapaciteDecrement}>-</button>
            {capacite}
            <button onClick={handleCapaciteIncrement}>+</button>
          </label>
  </div>
        <div className="button-container">
          <button onClick={handleSearchClick}>Search</button>
          <button onClick={handleClearClick}>Clear</button>
        </div> 
        
      </div>
      {loaded ?
      <div className="table-panel">
      <table className="room-table">
          <thead>
              <tr key="titles">
                  <th>Capacité</th>
                  <th>Prix</th>
                  <th>Numéro de chambre</th>
                  <th>Air Climatisé</th>
                  <th>Café</th>
                  <th>Microonde</th>
                  <th>Four</th>
                  <th>Réfrigirateur</th>
                  <th>Télévision</th>
                  
              </tr>
          </thead>
          <tbody>
              {data[0].map((chambre) => (
                  <tr key={(chambre.room_num)}>
                      <td>{chambre.capacity}</td>
                      <td>{chambre.prix}</td>
                      <td>{chambre.room_num}</td>
                      <td>{JSON.stringify(chambre.ac)}</td>
                      <td>{JSON.stringify(chambre.coffee)}</td>
                      <td>{JSON.stringify(chambre.microwave)}</td>
                      <td>{JSON.stringify(chambre.oven)}</td>
                      <td>{JSON.stringify(chambre.refrigerator)}</td>
                      <td>{JSON.stringify(chambre.tv)}</td>
                      <td><button value={chambre.num} onClick={handleReservation}>Réserver</button></td>
                      
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
      : <div><p>Loading Rooms ...</p></div>}
    </div>
    
  );
  
              
}

  
  export default Hotel_rooms


  
