/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { set } from "date-fns";
import { event } from "jquery";
import { useNavigate, useLocation } from "react-router-dom";
import React, {useState, useEffect} from "react";

function Edit_hotel(){
    let id_hotel = sessionStorage.getItem("hotel_id")
    let data;
    const [pays, setPays] = useState();
    const [provinceState, setProvinceState] = useState();
    const [ville, setVille] = useState();
    const [rue, setRue] = useState();
    const [postal, setPostal] = useState();
    const [numRue, setNumRue] = useState();
    const[email, setEmail] = useState();
    const[nb_chambre, setNb_chambre] = useState();
    const[telephone, setTelephone] = useState();
    const [disabled, setDisabled] = useState(true);
    const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
    const regex_phonenumber = /^\d{10,12}$/;
    const regex_streetnum = /^\d{1,8}$/;
    const regex_postalcode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    const regex_zip = /^\d{5}$/;
    const regex_string = /[a-zA-Z]+/; 

    useEffect(() => {
      fetchHotelInfo()
    }, [])

    async function updateToDataBase() {

      const json = {
        "city": ville,
        "country": pays,
        "email": email,
        "province_state": provinceState,
        "nb_chambre": nb_chambre,
        "street_name": rue,
        "street_num": numRue.toString(),
        "telephone": telephone.toString(),
        "zip_code": postal
    }
      
      fetch(`http://127.0.0.1:5000/hotels/info/${id_hotel}`, {
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
   
    async function fetchHotelInfo() {
        fetch(`http://127.0.0.1:5000/hotels?id_hotel=${id_hotel}`)
          .then(response => response.json())
          .then(
            json => {
            console.log(json)
            data = json[0]
            console.log(data)
            setPays(data.country)
            setProvinceState(data.province_state)
            setVille(data.city)
            setPostal(data.zip_code)
            setRue(data.street_name)
            setNumRue(data.street_num)
            setEmail(data.email)
            setNb_chambre(data.nb_chambre)
            setTelephone(data.telephone)
          }
          );
      }

      function reset() {
        fetchHotelInfo()
      }

      function cancel() {
        fetchHotelInfo();
        setDisabled(true)
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

      function handleNb_chambre(event) {
        setNb_chambre(event.target.value)
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
        if (!pays || !provinceState || !ville || !postal || !rue || !numRue || !nb_chambre || !email || !telephone) {
          alert("S'il vous plait remplir tout les champs");
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
            <h3>Information de l'hotel</h3>
            <h3>Adresse:</h3>
            <label>
                Pays:
                <br/>
                <select value={pays} disabled={disabled} onChange={handlePays}>
                  <option value="Canada">Canada</option>
                  <option value="Etats-Unis">États-Unis</option>
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
                Nombre de chambre:
                <br/>
                <input disabled={disabled} value={nb_chambre} onChange={handleNb_chambre}/>
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
} export default Edit_hotel;