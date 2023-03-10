/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { set } from "date-fns";
import { event } from "jquery";

import React, {useState, useEffect} from "react";
function Info_e(){
    let id_employe = sessionStorage.getItem("id")
    let data;
    const [prenom, setPrenom] = useState();
    const [nom, setNom] = useState();
    const [pays, setPays] = useState();
    const [provinceState, setProvinceState] = useState();
    const [ville, setVille] = useState();
    const [rue, setRue] = useState();
    const [postal, setPostal] = useState();
    const [numRue, setNumRue] = useState();
    const [poste, setPoste] = useState();
    const[email, setEmail] = useState();
    const[salaire, setSalaire] = useState();
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
      fetchEmployeeInfo()
    }, [])

    async function updateToDataBase() {

      const json = {
        "city": ville,
        "country": pays,
        "email": email,
        "firstname": prenom,
        "lastname": nom,
        "poste": poste,
        "province_state": provinceState,
        "salary": salaire,
        "street_name": rue,
        "street_num": numRue.toString(),
        "telephone": telephone,
        "zip_code": postal
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

      function handlePoste(event) {
        setPoste(event.target.value)
      }

      function handleSalaire(event) {
        setSalaire(event.target.value)
      }

      function handleEmail(event){
        setEmail(event.target.value)
      }

      function handleTelephone(event){
        setTelephone(event.target.value)
      }

      function handleEdit() {
        setDisabled(!disabled)
      }

      function save() {
        if (!prenom|| !nom || !pays || !provinceState || !ville || !postal || !rue || !numRue || !poste || !salaire || !email || !telephone) {
          alert("S'il vous plait remplir tout les champs");
          return;
        }
        if (!regex_name.test(prenom)) {
          alert("Le pr??nom doit avoir au moins 2 lettres et ne doit contenir que des lettres alphab??tiques.");
          return;
        }
        if (!regex_name.test(nom)) {
          alert("Le pr??nom doit avoir au moins 2 lettres et ne doit contenir que des lettres alphab??tiques.");
          return;
        }

        if (pays == "Canada"){
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

        //salaire??

        if (!regex_email.test(email)) {
          alert("Le courriel n'est pas valide");
          return;
        }
        if (!regex_phonenumber.test(telephone)) {
          alert("Le numero de telephone n'est pas valide");
          return;
        } 
        setDisabled(!disabled)
        updateToDataBase()
      }

    return(

        <div>
            <h3>Information de l'employ??</h3>
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
                <select value={pays} disabled={disabled} onChange={handlePays}>
                  <option value="Canada">Canada</option>
                  <option value="Etats-Unis">??tats-Unis</option>
                </select>
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
                Poste:
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
                Salaire:
                <br/>
                <input disabled={disabled} value={salaire} onChange={handleSalaire}/>
            </label>
            <br/>
            <label>
                Email:
                <br/>
                <input disabled={disabled} value={email} onChange={handleEmail}/>
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

} export default Info_e;