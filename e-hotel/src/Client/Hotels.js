import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// import 'react-datepicker/dist/react-datepicker.css';
// import './hotel_rooms.css'

function Hotels() {
  const [showHotels, setHotels] = useState([])
  const [chaineChecked, setChainesChecked] = useState();
//   const [rating, setRating] = useState([]);
  const [chaines, setChaines] = useState();
//   const [maxPrice, setMaxPrice] = useState();
//   const [minPrice, setMinPrice] = useState();
//   const [checkInDate, setCheckInDate] = useState();
//   const [checkOutDate, setCheckOutDate] = useState();
//   const [capacite, setCapacite] = useState();
//   const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const [chainesLoaded, setChainesLoaded] = useState(false)
//   const navigate = useNavigate();
  const firstUpdate = useRef(true);
  const secondUpdate = useRef(true);
  const thirdUpdate = useRef(true);
//   const fourthUpdate = useRef(true);
  useEffect(() => {
    if(firstUpdate.current == true){
        getAllHotels();
        getChaines();
        firstUpdate.current = false;
    }
  }, [])

  useLayoutEffect(() => {
    if (secondUpdate.current) {
        secondUpdate.current = false;
        return;
    }
    if (thirdUpdate.current) {
        thirdUpdate.current = false;
        return;
    }
    listChecked(chaines)
}, [chaines])

  async function getAllHotels() {
    fetch(`http://127.0.0.1:5000/hotels`)
      .then(response => response.json())
      .then(function(json) {
        setHotels(json)
        setLoaded(true)
  });
}

// async function getRoomsForDates() {
//   if(checkInDate != null && checkOutDate != null){ 
//   fetch(`http://127.0.0.1:5000/rooms/available/${checkInDate}/${checkOutDate}`)
//       .then(response => response.json())
//       .then(function(json) {
//         setRoomsAvailableDate([json][0])
//   });
// } else setRoomsAvailableDate([])
// }

async function getChaines(){
  fetch(`http://127.0.0.1:5000/chaines`)
    .then(response => response.json())
    .then(function(json) {
      var chainesList = []
      for(var i = 0; i < Object.keys(json).length; i++){
        chainesList.push({nom_chaine : json[i]["nom_chaine"], checked : false, id :json[i]["id_chaine"]})
      }
      setChaines(chainesList)
      setChainesLoaded(true)
  });
}



//   function handleRating(event) {
//     setRating(event.target.value)
//   };

//   function handleMaxPriceChange(event) {
//     setMaxPrice(event.target.value)
//   };

//   const handleMinPriceChange = (event) => {
//     setMinPrice(event.target.value);
//   };

//   const handleCheckIn = (date) => {
//     setCheckInDate(date.target.value);
//   };
//   const handleCheckOut = (date) => {
//     setCheckOutDate(date.target.value);
//   };

//   const handleCapacite = (event) => {
//     if(event.target.value === "null"){
//       setCapacite(null)
//     }
//     else{
//       setCapacite(event.target.value)
//     }
//   }

// function valide (chambre){
//   if (chaineChecked.length> 0  && !chaineChecked.includes(chambre.id_chaine)){
//     return false
//   }
//   if(maxPrice != null && maxPrice != "" && chambre.prix > parseFloat(maxPrice).toFixed(2)) {
//     return false
//   }
//   if(minPrice != null && minPrice != "" && chambre.prix < parseFloat(minPrice).toFixed(2)) {
//     return false
//   }
//   if(capacite != null && capacite > chambre.capacity){
//     return false
//   }
//   if(rating != null && rating > chambre.rating){
//     return false
//   }
//   return true
// }

// useLayoutEffect(() => {
//   if (firstUpdate.current) {
//     firstUpdate.current = false;
//     return;
//   }
//   if (secondUpdate.current) {
//     secondUpdate.current = false;
//     return;
//   }
// updateRooms()
// }, [chaineChecked])

// useLayoutEffect(() => {
//   if (thirdUpdate.current) {
//     thirdUpdate.current = false;
//     return;
//   }
//   if (fourthUpdate.current) {
//     fourthUpdate.current = false;
//     return;
//   }
//   listChecked()
// }, [roomsAvailableDate])

// const updateRooms = () => {
//   console.log(roomsAvailableDate)
//   let indexes = []
//   let tempList = []
//   for(let i = 0 ; i <data[0].length; i++){
//     if (true == valide(data[0][i])){
//       if(roomsAvailableDate.length > 0) {
//           for(let n = 0; n<roomsAvailableDate.length;n++){
//             if(roomsAvailableDate[n].room_num == data[0][i].room_num && roomsAvailableDate[n].id_hotel == data[0][i].id_hotel){
//               indexes.push(i)
//             }
//           }
//       } else {
//         indexes.push(i)
//       }
//     }
//   }
//   for(let i = 0 ; i<indexes.length; i++){
//     tempList.push(data[0][indexes[i]])
//   }
//   setShowRooms(tempList);
// }
//   const search = () => {
//     getRoomsForDates()
//   };

  function listChecked (liste) {
    let temp = []
    for (let i = 0; i<liste.length ; i++){
      if (liste[i].checked == true)
      temp.push(liste[i].id)
    }
    console.log("temp")
    console.log(temp)
    setChainesChecked(temp)
  }
  

//   const handleReservation = () => {
//     navigate('/clientIn/hotelRooms/reservation')
//   }

const clear = () => {
    window.location.reload(false);
  };


//   const clearChaines = () => {
//     for (var i = 0; i <chaines.length; i++){
//       chaines[i].checked = false
//     }
//     setChainesChecked([])
//   }

  const handleSelectedChaines = (e) => {
    var temp = chaines
    temp.map((chaine) => {
      if(chaine.id == e.target.id) {
        chaine.checked = !chaine.checked
      }
    })
    setChaines(temp)
    listChecked(temp)
  }

  return (
    <div>
    <div className="filter-panel"> <h3 style={{marginBottom:'0'}}>Filter Hotels</h3>
      {chainesLoaded ?
      <div className="chaines-filters">
                   {chaines.map(chaine => (
                    <div key={chaine.id}>
                      <input key={chaine.id} id={chaine.id} type="checkbox" onClick={handleSelectedChaines}></input>
                      <label>{chaine.nom_chaine}</label>
                    </div>
                  ))}
                </div>
      :<div>Loading filters ...</div>}
      <div className="button-container">
              {/* <button onClick={search}>Search</button> */}
              <button onClick={clear}>Clear</button>
        </div>
    </div>
    {loaded ?
        <div>
        
                {showHotels.map((hotel) => (
                   <div>{hotel.id_hotel}</div>
                ))}
       
         
        </div>
        : <div>Loading Rooms ...</div>}
      
      </div>
  );      
}
export default Hotels;