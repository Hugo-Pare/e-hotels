/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
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
  const [listProvince, setListProvince] = useState([]);
  const [listState, setListState] = useState([]);
  const [villeUs, setVilleUs] = useState([]);
  const [villeCan, setVilleCan] = useState([]);
  const [rating, setRating] = useState([]);
  const [chaines, setChaines] = useState();
  const [nbChambre, setNbChambre] = useState();
  const [listCapacity, setListCapacity] = useState([]);
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
        getProvince();
        getStates();
        getUsCities();
        getCanCities();
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
        getAllCapacity();
        
  });
}

async function getAllCapacity() {
  fetch(`http://127.0.0.1:5000/capacite/hotel`)
    .then(response => response.json())
    .then(function(json) {
        setListCapacity(json)
        setLoaded(true)
    })
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

function getProvince() {
  fetch('http://127.0.0.1:5000/canada/provinces')
  .then(response => response.json())
  .then(function(json) {
    setListProvince(json);
});
}
function getStates() {
  fetch('http://127.0.0.1:5000/us/states')
  .then(response => response.json())
  .then(function(json) {
    setListState(json);
});
}
function getUsCities() {
  fetch('http://127.0.0.1:5000/us/cities')
  .then(response => response.json())
  .then(function(json) {
    setVilleUs(json)
});
}
function getCanCities() {
  fetch('http://127.0.0.1:5000/canada/cities')
  .then(response => response.json())
  .then(function(json) {
    setVilleCan(json)
});
}

function getCapacityMaximal(hotel) {
  for (var i = 0 ; i < listCapacity.length ; i++){
    if(listCapacity[i].id_hotel == hotel) {
      return listCapacity[i].capacite;
    }
  }
  return "NA"
}

function valide (hotel){
  if (chaineChecked.length> 0  && !chaineChecked.includes(hotel.id_chaine)){
    return false
  }
  if(nbChambre !=null && nbChambre>hotel.nb_chambre){
    return false
  }
  if(rating != null && rating > hotel.rating){
    return false
  }
  if(pays != 'null' && pays != hotel.country){
    return false
  }
  if(province != 'null' && province != hotel.province_state){
    return false
  }
  if(ville != 'null' && ville != hotel.city){
    return false
  }
  return true
}

function updateHotels(){
  let indexes = [];
  let tempList = [];
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

  function handleClick(hotel) {
    console.log(hotel)
    sessionStorage.setItem("hotel_id", hotel.id_hotel)
    navigate('/clientIn/hotelRooms', {state: {hotelInfo: hotel}});
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
  function handleNbChambre(event){
    setNbChambre(event.target.value);
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

            <h4>
                Nombre de Chambre:
                <br/>
                <input type="number" onChange={handleNbChambre} value={nbChambre}/>
            </h4>

        <div className='zone-filter'>

          <h4 style={{marginBottom: "0"}}>
              Pays:
              </h4>
              <select onChange={handlePays}>
              <option value="null">Faites selection</option>
              <option value="Canada">Canada</option>
              <option value="Etats-Unis">Etats-Unis</option>
              </select>

            {pays == "Canada" ? <div> <h4 style={{marginBottom: "0"}}>
              Province/state:
              </h4>
              <select disabled={disabledProvince} onChange={handleProvince}>
              <option value="null">Faites selection</option>
              {listProvince.map((province) => (<option value={province}>{province}</option>))}
              </select>
              <h4 style={{marginBottom: "0"}}>
                        Ville:
                        </h4>
                        <select disabled={disabledVille} onChange={handleVille}>
                        <option value="null">Faites selection</option>
                        {villeCan.map((prov) => (prov.province == province ? prov.ville.map((villeNom) => (<option value={villeNom}>{villeNom}</option>)):<></>) )}
                        </select>
                        </div>:<></>}

              {pays == "Etats-Unis" ? <div> <h4 style={{marginBottom: "0"}}>
              State:
              </h4>
              <select disabled={disabledProvince} onChange={handleProvince}>
              <option value="null">Faites selection</option>
              {listState.map((state) => (<option value={state}>{state}</option>))}
              </select>
              <h4 style={{marginBottom: "0"}}>
                        Ville:
                        </h4>
                        <select disabled={disabledVille} onChange={handleVille}>
                        <option value="null">Faites selection</option>
                        {villeUs.map((state) => (state.state == province ? state.ville.map((villeNom) => (<option value={villeNom}>{villeNom}</option>)):<></>) )}
                        </select>
                        </div>:<></>}

              {pays == "null" ? <div> <h4 style={{marginBottom: "0"}}>
              Province/State:
              </h4>
              <select disabled={disabledProvince} onChange={handleProvince}>
              <option value="null">Faites selection</option>
              </select>
                        <h4 style={{marginBottom: "0"}}>
                        Ville:
                        </h4>
                        <select disabled={disabledVille} onChange={handleVille}>
                        <option value="null">Faites selection</option>
                        </select>
                        </div>:<></>}

        </div>
      <div className="button-container">
              <button onClick={search}>Search</button>
              <button onClick={clear}>Clear</button>
        </div>
    </div>
    {loaded ?
    
        <div className="grid-container-hotels">
                {showHotels.map((hotel) => (
                    <div className="card" key={hotel.id_hotel} onClick={() => handleClick(hotel)}>
                        <img src={hotelImg} alt="hotel" style={{width:'100%'}}/>
                        <p>{hotel.street_num}, {hotel.street_name}, {hotel.city}</p>
                        <p>{hotel.province_state}, {hotel.country}</p>
                        <p>{hotel.email}</p>
                        <p>{hotel.telephone}</p>
                        <p>Capacité maximal: {getCapacityMaximal(hotel.id_hotel)}</p>
                        <div>
                          {hotel.rating} <span>&#11088;</span>
                        </div>
                    </div>
                ))}
        </div>
        : <div>Loading Rooms ...</div>}
      
      </div>
  );      
}
export default Hotels;