import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './info_chaine.css';
import hotelImg from './hotelDefault.jpg'

function Hotels() {
  const [data, setData] = useState()
  const [showHotels, setHotels] = useState([])
  const [chaineChecked, setChainesChecked] = useState();
  const [disabledProvince, setDisabledProvince] = useState(true);
  const [disabledVille, setDisabledVille] = useState(true);
  const [pays, setPays] = useState("null");
  const [province, setProvince] = useState("null");
  const [ville, setVille] = useState("null");
  const [rating, setRating] = useState([]);
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
        setData(json)
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

function valide (hotel){
  if (chaineChecked.length> 0  && !chaineChecked.includes(hotel.id_chaine)){
    console.log("checked")
    return false
  }
  if(rating != null && rating > hotel.rating){
    console.log("rating")
    return false
  }
  if(pays != 'null' && pays != hotel.country){
    console.log(pays)
    return false
  }
  if(province != 'null' && province != hotel.province){
    return false
  }
  if(ville != 'null' && ville != hotel.ville){
    return false
  }
  return true
}

function updateHotels(){
  let indexes = [];
  let tempList = [];
  console.log(data)
  for(let i = 0 ; i <data.length; i++){
    if (true == valide(data[i])){
      indexes.push(i)
    }
  }
  for(let i = 0 ; i<indexes.length; i++){
    tempList.push(data[indexes[i]])
  }
  setHotels(tempList);
  setLoaded(true)
}

  function listChecked(liste) {
    let temp = []
    for (let i = 0; i<liste.length ; i++){
      if (liste[i].checked == true)
      temp.push(liste[i].id)
    }
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
  
  function handleRating(event) {
    setRating(event.target.value)
  }

  function handleProvince(event) {
    if(event.target.value == "null") {
      setDisabledVille(true)
    } else {
      setDisabledVille(false)
    }
    setProvince(event.target.value);
  }

  function handleVille(event){
    setVille(event.target.value);
  }

  function handlePays(event) {
    if(event.target.value == "null") {
      setDisabledProvince(true)
      setDisabledVille(true)
    } else {
      setDisabledProvince(false)
      setDisabledVille(true)
    }
    setPays(event.target.value)
  }

  function search() {
    setLoaded(false)
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
              <select disabled={disabledProvince} onChange={handleProvince}>
              <option value="null">Faites selection</option>
              <option value="test">Test</option>
              </select>

              <h4 style={{marginBottom: "0"}}>
              Ville:
              </h4>
              <select disabled={disabledVille} onChange={handleVille}>
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
          {console.log(showHotels)}
                {showHotels.map((hotel) => (
                    <div className="card" key={hotel.id_hotel} onClick={() => handleClick(hotel.id_hotel)}>
                        <img src={hotelImg} alt="hotel" style={{width:'100%'}}/>
                        <p>{hotel.street_num}, {hotel.street_name}, {hotel.city}</p>
                        <p>{hotel.province_state}, {hotel.country}</p>
                        <p>{hotel.email}</p>
                        <p>{hotel.telephone}</p>
                    </div>
                ))}
        </div>
        : <div>Loading Rooms ...</div>}
      
      </div>
  );      
}
export default Hotels;