/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { set } from "date-fns";
import { event } from "jquery";

import React, {useState, useEffect} from "react";
function Edit_hotel_room(){
    let id_hotel = sessionStorage.getItem("id")
    let data;
    const [prix, setPrix] = useState();
    const [problemes, setProblemes] = useState();
    const [capacite, setCapacite] = useState();
    const [hotelVue, setHotelVue] = useState();
    const [tv, setTv] = useState();
    const [ac, setAc] = useState();
    const [refrigerateur, setRefrigerateur] = useState();
    const [microonede, setMicroonde] = useState();
    const [cafe, setCafe] = useState();
    const[four, setFour] = useState();
    const [disabled, setDisabled] = useState(true);
    const regex_prix = /^[a-zA-Z]{2,}$/;
    const regex_probleme = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
    const regex_capacite = /^\d{10,12}$/;
    const regex_hotelVue = /^\d{1,8}$/;

    useEffect(() => {
      fetchHotelRoomInfo()
    }, [])

    async function getHotelId(){
        fetch(`http://127.0.0.1:5000/employes?id_employe=${id_employe}`)
        .then(function(response){
            return response.json()
        })
        .then(response => response.json())
        .then(function(data){
            idHotel = data[0].id_hotel
            setIdHotel(data[0].id_hotel)
            
            
        })
    }

    async function updateToDataBase() {

      const json = {
        "price": prix,
        "problems": problemes,
        "capacity": capacite,
        "view": hotelVue,
        "television": tv,
        "airConditioning": ac,
        "fridge": refrigerateur,
        "microwave": microonede,
        "cofee": cafe,
        "oven": four
    }
      
      fetch(`http://127.0.0.1:5000/employes/info/${id_employe}`, {
            method: "PATCH",
            mode:"cors",
            body: JSON.stringify(json),
            headers: {
              "Access-Control-Allow-Origin": "*",
            }
        })
        .then(response => response.json())
        .then(function(json){
            console.log(json)
        })
    }
   
    async function fetchEmployeeInfo() {
        fetch(`http://127.0.0.1:5000/employes?id_employe=${id_employe}`)
          .then(response => response.json())
          .then(
            json => {
            console.log(json)
            data = json[0]
            setPrenom(data.firstname)
            setNom(data.lastname)
            setPays(data.country)
            setProvinceState(data.province_state)
            setVille(data.city)
            setPostal(data.zip_code)
            setRue(data.street_name)
            setNumRue(data.street_num)
            setEmail(data.email)
            setPoste(data.poste)
            setSalaire(data.salaire)
            setTelephone(data.telephone)
          }
          );
      }

      function reset() {
        fetchEmployeeInfo()
      }

      function cancel() {
        fetchEmployeeInfo();
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

      function handlehotelVue(event) {
        setHotelVue(event.target.value)
      }

      function handleAc(event) {
        setAc(event.target.value)
      }

      function handleTv(event) {
        setTv(event.target.value)
      }

      function handleCafe(event) {
        setCafe(event.target.value)
      }

      function handleRefrigerateur(event) {
        setRefrigerateur(event.target.value)
      }

      function handleMicroonde(event) {
        setMicroonde(event.target.value)
      }

      function handleFour(event) {
        setFour(event.target.value)
      }

      function handleEdit() {
        setDisabled(!disabled)
      }

      function save() {
        if (!prenom|| !nom || !pays || !provinceState || !ville || !postal || !rue || !numRue || !poste || !salaire || !email || !telephone) {
          alert("S'il vous plait remplir tout les champs");
          return;
        }
        if (!regex_prix.test(prix)) {
          alert("Le prénom doit avoir au moins 2 lettres et ne doit contenir que des lettres alphabétiques.");
          return;
        }
        if (!regex_probleme.test(problemes)) {
          alert("Le prénom doit avoir au moins 2 lettres et ne doit contenir que des lettres alphabétiques.");
          return;
        }
   
        if(!regex_hotelVue.test(hotelVue)) {
          alert("La ville n'est pas valide");
          return;
        }

        if(!regex_capacite.test(capacite)){
          alert("Le nom de rue n'est pas valide");
          return;
        } 
        setDisabled(!disabled)
        updateToDataBase()
      }

    return(

        <div>
            <h3>Information de la chambre {}</h3>
            <label>
                Numéro de chambre:
                <br/>
                <input type="name" name="name" value={num_chambre} disabled={disabled}/>
            </label>
            <br/>
            <label>
                Prix:
                <br/>
                <input type="name" name="lastname" value={nom} disabled={disabled} onChange={handleNom}/>
            </label>
            <br/>
            <label>
                Problemes:
                <br/>
                <select value={pays} disabled={disabled} onChange={handlePays}>
                  <option value="Canada">Canada</option>
                  <option value="Etats-Unis">États-Unis</option>
                </select>
            </label>
            <br/>
            <label>
                Capacité:
                <br/>
                <input value={provinceState} disabled={disabled} onChange={handleProvince}/>
            </label>
            <br/>
           
            <label>
                Vue:
                <br/>
                <input value={ville}  disabled={disabled} onChange={handleVille}/>
            </label>
            <br/>
            <label>
                Télévision:
                <br/>
                <input value={postal}  disabled={disabled} onChange={handlePostal}/>
            </label>
            <br/>
            <label>
                Air Climatisé:
                <br/>
                <input value={rue}  disabled={disabled} onChange={handleRue}/>
            </label>
            <br/>
            <label>
                Refrigerateur:
                <br/>
                <input value={numRue}  disabled={disabled} onChange={handleNumRue}/>
            </label>
            <br/>
            <label>
                Microonde:
                <br/>
                <select  value={poste} disabled={disabled} onChange={handlePoste}>
                  <option value="Valet">Valet</option>
                  <option value="Concierge">Concierge</option>
                  <option value="Receptionniste">Receptionniste</option>
                  <option value="Gestionnaire">Gestionnaire</option>
                </select>
            </label>
            <br/>
            <label>
                Cafe:
                <br/>
                <input disabled={disabled} value={salaire} onChange={handleSalaire}/>
            </label>
            <br/>
            <label>
                Four:
                <br/>
                <input disabled={disabled} value={email} onChange={handleEmail}/>
            </label>
            <br/>
            <br/>
           {disabled ?
            <button onClick={handleEdit}>Edit</button>:
            <div><button onClick={save}>Save</button>
            <button onClick={reset}>Reset</button>
            <button onClick={cancel}>Cancel</button></div>
           }
        </div>

    );

} export default Edit_hotel_room;