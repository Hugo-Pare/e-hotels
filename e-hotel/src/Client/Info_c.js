/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { set } from "date-fns";
import { event } from "jquery";

import React, {useState, useEffect} from "react";
function Info_c(){
    let email = sessionStorage.getItem("email_id")
    let data;
    const [prenom, setPrenom] = useState();
    const [nom, setNom] = useState();
    const [pays, setPays] = useState();
    const [provinceState, setProvinceState] = useState();
    const [ville, setVille] = useState();
    const [rue, setRue] = useState();
    const [postal, setPostal] = useState();
    const [numRue, setNumRue] = useState();
    const[telephone, setTelephone] = useState();
    const [disabled, setDisabled] = useState(true);
    const regex_name = /^[a-zA-Z]{2,}$/;
    const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
    const regex_phonenumber = /^\d{10,12}$/;
    const regex_streetnum = /^\d{1,8}$/;
    const regex_postalcode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    const regex_zip = /^\d{5}$/;
    const regex_string = /[a-zA-Z]+/;

    useEffect(() => {
        fetchClientInfo()
      }, [])

    async function fetchClientInfo() {
        fetch(`http://127.0.0.1:5000/clients?email=${email}`)
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
            setTelephone(data.telephone)
          }
          );
      }

      async function updateToDataBase() {

        const json = {
            "city": ville,
            "country": pays,
            "firstname": prenom,
            "lastname": nom,
            "province_state": provinceState,
            "street_name": rue,
            "street_num": numRue.toString(),
            "telephone": telephone,
            "zip_code": postal
        }

        fetch(`http://127.0.0.1:5000/clients/info/${email}`, {
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
      
      function save(){
        if (!prenom|| !nom || !pays || !provinceState || !ville || !postal || !rue || !numRue || !telephone) {
            alert("S'il vous plait remplir tout les champs");
            return;
        }
        if (!regex_name.test(prenom)) {
            alert("Le prénom doit avoir au moins 2 lettres et ne doit contenir que des lettres alphabétiques.");
            return;
          }
          if (!regex_name.test(nom)) {
            alert("Le prénom doit avoir au moins 2 lettres et ne doit contenir que des lettres alphabétiques.");
            return;
          }
          if (pays == "Canada"){ //a demander au prof si les clients ne peuvent venir que du canada et usa?
            if(!regex_postalcode.test(postal)){
              alert("Le code postal n'est pas valide");
              return;
            }
          } else {
            if(!regex_zip.test(postal)){
              alert("Le zip code n'est pas valide");
              return;
            }
          }
          if(!regex_string.test(ville)) {
            alert("La ville n'est pas valide");
            return;
          }
  
          if(!regex_string.test(rue)){
            alert("Le nom de rue n'est pas valide");
            return;
          }
  
          if(!regex_streetnum.test(numRue)){
            alert("Le numero de rue n'est pas valide");
            return;
          }
          if (!regex_phonenumber.test(telephone)) {
            alert("Le numero de telephone n'est pas valide");
            return;
          } 
        setDisabled(!disabled);
        updateToDataBase();
      }

      function cancel() {
        fetchClientInfo()
        setDisabled(true)
      }

      function reset() {
        fetchClientInfo()
      }

      function handleEdit() {
        setDisabled(!disabled)
      }

      function handlePrenom(event) {
        setPrenom(event.target.value)
      }

      function handleNom(event) {
        setNom(event.target.value)
      }

      function handlePays(event) {
        setPays(event.target.value)
      }
      function handleProvince(event) {
        setProvinceState(event.target.value)
      }

      function handleVille(event) {
        setVille(event.target.value)
      }
      function handlePostal(event) {
        setPostal(event.target.value)
      }
      function handleRue(event) {
        setRue(event.target.value)
      }

      function handleNumRue(event) {
        setNumRue(event.target.value)
      }
      function handleTelephone(event){
        setTelephone(event.target.value)
      }
    return(

        <div>
        <h3>Information personel</h3>
        <label>
                Prenom:
                <br/>
                <input type="name" name="name" value={prenom} disabled={disabled} onChange={handlePrenom}/>
        </label>
        <br/>
        <label>
                Nom:
                <br/>
                <input type="name" name="lastname" value={nom} disabled={disabled} onChange={handleNom}/>
        </label>
        <br/>
        <label>
            Pays:
            <br/>
            <input value={pays} disabled={disabled} onChange={handlePays}/>
        </label>
        <br/>
        <label>
                Province/State:
                <br/>
                <input value={provinceState} disabled={disabled} onChange={handleProvince}/>
            </label>
            <br/>
            <label>
                Ville:
                <br/>
                <input value={ville}  disabled={disabled} onChange={handleVille}/>
            </label>
            <br/>
            <label>
                Postal/Zip:
                <br/>
                <input value={postal}  disabled={disabled} onChange={handlePostal}/>
            </label>
            <br/>
            <label>
                Rue:
                <br/>
                <input value={rue}  disabled={disabled} onChange={handleRue}/>
            </label>
            <br/>
            <label>
                Numero Adresse:
                <br/>
                <input value={numRue}  disabled={disabled} onChange={handleNumRue}/>
            </label>
            <br/>
            <label>
                Email:
                <br/>
                <input disabled="disabled" value={email}/>
            </label>
            <br/>
            <label>
                Telephone:
                <br/>
                <input disabled={disabled} value={telephone} onChange={handleTelephone}/>
            </label>
            <br/>
            {disabled ?
            <button onClick={handleEdit}>Edit</button>:
            <div><button onClick={save}>Save</button>
            <button onClick={reset}>Reset</button>
            <button onClick={cancel}>Cancel</button></div>
           }
        </div>

    );

} export default Info_c;