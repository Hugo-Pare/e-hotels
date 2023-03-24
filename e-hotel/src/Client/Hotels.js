import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './info_chaine.css';
import hotelImg from './hotelDefault.jpg'
// import 'react-datepicker/dist/react-datepicker.css';
// import './hotel_rooms.css'

function Hotels() {
  const [data, setData] = useState()
  const [showHotels, setHotels] = useState([])
  const [chaineChecked, setChainesChecked] = useState();
  const [disabledProvince, setDisabledProvince] = useState(true);
  const [disabledVille, setDisabledVille] = useState(true);
  const [pays, setPays] = useState();
//   const [rating, setRating] = useState([]);
  const [chaines, setChaines] = useState();
  const [loaded, setLoaded] = useState(false)
  const [chainesLoaded, setChainesLoaded] = useState(false)
  const navigate = useNavigate();
  const firstUpdate = useRef(true);
  const secondUpdate = useRef(true);
  const thirdUpdate = useRef(true);

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

// function valide (chambre){
//   if (chaineChecked.length> 0  && !chaineChecked.includes(chambre.id_chaine)){
//     return false
//   }
//   if(rating != null && rating > chambre.rating){
//     return false
//   }
//   return true
// }

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

  function updateHotels() {


  }

  function listChecked(liste) {
    let temp = []
    for (let i = 0; i<liste.length ; i++){
      if (liste[i].checked == true)
      temp.push(liste[i].id)
    }
    console.log("temp")
    console.log(temp)
    setChainesChecked(temp)
  }

  function handleClick(hotel_id) {
    sessionStorage.setItem("hotel_id", hotel_id)
    navigate('/clientIn/hotelRooms');
  }

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
  
  function handleRating() {
    console.log("in Rating")
  }

  function handlePays(event) {
    if(event.target.value == null) {
      setDisabledProvince(true)
      setDisabledVille(true)
    } else {
      setDisabledProvince(false)
      setDisabledVille(true)
    }
    setPays(event.target.value)
  }

  function search() {
    updateHotels()
  }

  function clear () {
    window.location.reload(false);
  };

  return (
    <div className="grid-container-client">
    <div className="filter-panel fit"> <h3 style={{marginBottom:'0'}}>Filter Hotels</h3>
    <h4 style={{marginBottom:'0'}}>Chaines:</h4>
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
       <div className="rating-filter">
              <h4 style={{marginBottom: "0"}}>
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

        <div className='zone-filter'>

          <h4 style={{marginBottom: "0"}}>
              Pays:
              </h4>
              <select onChange={handlePays}>
              <option value="null">Faites selection</option>
              <option value="Canada">Canada</option>
              <option value="Etats-Unis">Etats-Unis</option>
              </select>

              <h4 style={{marginBottom: "0"}}>
              Province:
              </h4>
              <select disabled={disabledProvince} onChange={handleRating}>
              <option value="null">Faites selection</option>
              </select>

              <h4 style={{marginBottom: "0"}}>
              Ville:
              </h4>
              <select disabled={disabledVille} onChange={handleRating}>
              <option value="null">Faites selection</option>
              </select>
        </div>
      <div className="button-container">
              <button onClick={search}>Search</button>
              <button onClick={clear}>Clear</button>
        </div>
    </div>
    {loaded ?
        <div className="grid-container-hotels">
        
                {showHotels.map((hotel) => (

                    <div className="card" key={hotel.id_hotel} onClick={() => handleClick(hotel.id_hotel)}>
                        <img src={hotelImg} alt="hotel" style={{width:'100%'}}/>
                        <p>{hotel.street_num}, {hotel.street_name}, {hotel.city}</p>
                        <p>{hotel.province_state}, {hotel.country}</p>
                        <p>{hotel.email}</p>
                        <p>{hotel.telephone}</p>
                    </div> 
                //    <div>{hotel.id_hotel}</div>
                ))}
       
         
        </div>
        : <div>Loading Rooms ...</div>}
      
      </div>
  );      
}
export default Hotels;