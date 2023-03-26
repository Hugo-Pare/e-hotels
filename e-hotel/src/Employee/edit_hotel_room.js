/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { set } from "date-fns";
import { event } from "jquery";
import { useNavigate, useLocation } from "react-router-dom";
import React, {useState, useEffect} from "react";

function Edit_hotel_room(){
    let id_hotel = sessionStorage.getItem("hotel_id")
    const numChambre = useLocation().state.numChambre
    let data;
    const [prix, setPrix] = useState();
    const [problemes, setProblemes] = useState();
    const [capacite, setCapacite] = useState();
    const [hotelVue, setHotelVue] = useState(null);
    const [tv, setTv] = useState();
    const [ac, setAc] = useState();
    const [refrigerateur, setRefrigerateur] = useState();
    const [microonede, setMicroonde] = useState();
    const [cafe, setCafe] = useState();
    const[four, setFour] = useState();
    const [disabled, setDisabled] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const regex_prix = /\d+(\.\d{2})?/;

    useEffect(() => {
      fetchChambreInfo()
    }, [])


    async function updateToDataBase() {
        let json;
        if (hotelVue == "null"){
            json = {
                "prix": prix,
                "problems": problemes.toString(),
                "capacity": capacite,
                "vue": null,
                "tv": tv,
                "ac": ac,
                "refrigerator": refrigerateur,
                "microwave": microonede,
                "coffee": cafe,
                "oven": four
            };
        }
        else{
            json = {
                "prix": prix,
                "problems": problemes.toString(),
                "capacity": capacite,
                "vue": hotelVue,
                "tv": tv,
                "ac": ac,
                "refrigerator": refrigerateur,
                "microwave": microonede,
                "coffee": cafe,
                "oven": four
            };
        }
        console.log(JSON.stringify(json))
        fetch(`http://127.0.0.1:5000/rooms/info/${id_hotel}/${numChambre}`, {
            method: "PATCH",
            mode: "cors",
            body: JSON.stringify(json),
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(function(json){
            console.log(json)
        })
    }
    async function fetchChambreInfo() {
        fetch(`http://127.0.0.1:5000/rooms/info/${id_hotel}/${numChambre}`)
          .then(response => response.json())
          .then(
            json => {
            console.log(json)
            data = json[0]
            console.log(json)
            setPrix(data.prix)
            if (data.problems === null){
                setProblemes("")
            } else{
                setProblemes(data.problems)
            }
            setCapacite(data.capacity)
            if (data.vue === null){
                setHotelVue(null)
            } else{
                setHotelVue(data.vue)
            }
            setTv(data.tv)
            setAc(data.ac)
            setRefrigerateur(data.refrigerator)
            setMicroonde(data.microwave)
            setCafe(data.coffee)
            setFour(data.oven)
            setLoaded(true)
          }
          );
      }

      function reset() {
        fetchChambreInfo()
      }

      function cancel() {
        fetchChambreInfo();
        setDisabled(true)
      }

      function handlePrix(event) {
        setPrix(event.target.value)
      }

      function handleProblemes(event) {
        setProblemes(event.target.value)
      }

      function handleCapacite(event) {
        setCapacite(event.target.value)
      }

      function handleHotelVue(event) {
        setHotelVue(event.target.value)
      }

      function handleAc(event) {
        const value = event.target.checked ? true : false;
        setAc(value)
      }

      function handleTv(event) {
        const value = event.target.checked ? true : false;
        setTv(value)
      }

      function handleCafe(event) {
        const value = event.target.checked ? true : false;
        setCafe(value);
      }

      function handleRefrigerateur(event) {
        const value = event.target.checked ? true : false;
        setRefrigerateur(value)
      }

      function handleMicroonde(event) {
        const value = event.target.checked ? true : false;
        setMicroonde(value)
      }

      function handleFour(event) {
        const value = event.target.checked ? true : false;
        setFour(value)
      }

      function handleEdit() {
        setDisabled(!disabled)
      }

      function save() {
        if (!regex_prix.test(prix)) {
          alert("Entrz un prix valide");
          return;
        }
        
        setDisabled(!disabled)
        updateToDataBase()
      }

    return(

        <div>
            <h2>Information de la chambre {numChambre}</h2>
{ loaded ? 
<>
            <label>
                Prix:
                <br/>
                <input type="price" name="prix" value={prix} disabled={disabled} onChange={handlePrix}/>
            </label>
            <br/>
            <label>
                Problemes:
                <br/>
                <textarea rows={5} cols={50} name="problemes" value={problemes} disabled={disabled} onChange={handleProblemes} />
            </label>
            <br/>
            <label>
                Capacité:
                <br/>
                <select value={capacite} disabled={disabled} onChange={handleCapacite}>
                    <option value="1"> 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                    <option value="6"> 6 </option>
                    <option value="7"> 7 </option>
                    <option value="8"> 8 </option>
                </select>
            </label>
            <br/>
            <label>
                Vue:
                <br/>
                <select value={hotelVue} disabled={disabled} onChange={handleHotelVue}>
                    <option value="null"></option>
                    <option value="Mer">Mer</option>
                    <option value="Montagne">Montagne</option>
                    <option value="Foret">Foret</option>
                </select>
            </label>
            <br/>
            <label>
                Télévision:
                <br/>
                <input type="checkbox" checked={tv} value={tv}  disabled={disabled} onChange={handleTv}/>
            </label>
            <br/>
            <label>
                Air Climatisé:
                <br/>
                <input type="checkbox" checked={ac} value={ac}  disabled={disabled} onChange={handleAc}/>
            </label>
            <br/>
            <label>
                Refrigerateur:
                <br/>
                <input type="checkbox" checked={refrigerateur} value={refrigerateur}  disabled={disabled} onChange={handleRefrigerateur}/>
            </label>
            <br/>
            <label>
                Microonde:
                <br/>
                <input type="checkbox" checked={microonede} value={microonede}  disabled={disabled} onChange={handleMicroonde}/>
            </label>
            <br/>
            <label>
                Cafe:
                <br/>
                <input type="checkbox" checked={cafe} disabled={disabled} value={cafe} onChange={handleCafe}/>
            </label>
            <br/>
            <label>
                Four:
                <br/>
                <input type="checkbox" checked={four} disabled={disabled} value={four} onChange={handleFour}/>
            </label>
            <br/>
            <br/>
</>
: <div>Loading Information ...</div>}
           {disabled ?
            <button onClick={handleEdit}>Edit</button>:
            <div><button onClick={save}>Save</button>
            <button onClick={reset}>Reset</button>
            <button onClick={cancel}>Cancel</button></div>
           }
        </div>

    );

} export default Edit_hotel_room;