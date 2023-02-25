import { set } from "date-fns";
import React, {useState} from "react";
function Info_e(){

    let id_employe = sessionStorage.getItem("id")
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


    
    checkEmployeeNumber()
    async function checkEmployeeNumber() {
        fetch(`http://127.0.0.1:5000/employes?id_employe=${id_employe}`)
          .then(response => response.json())
          .then(
            json => {
            console.log(json[0])
            let data = json[0]
            setPrenom(data.firstname)
            setNom(data.lastname)
            setPays(data.country)
            setProvinceState(data.province_state)
            setVille(data.city)
            setPostal(data.street_num)
            setRue(data.street_name)
            setNumRue(data.street_num)
            setEmail(data.email)
            setPoste(data.poste)
            setSalaire(data.salaire)
            setTelephone(data.telephone)
          }
          );
      }

    return(

        <div>
            <h3>Information de l'employé</h3>
            <label>
                Prenom:
                <br/>
                <input type="name" name="name" defaultValue={prenom}/>
            </label>
            <br/>
            <label>
                Nom:
                <br/>
                <input type="name" name="lastname" defaultValue={nom}/>
            </label>
            <br/>
            <label>
                Pays:
                <br/>
                <input type="country" name="country" defaultValue={pays}/>
            </label>
            <br/>
            <label>
                Province/State:
                <br/>
                <input type="province" name="province" defaultValue={provinceState}/>
            </label>
            <br/>
           
            <label>
                Ville:
                <br/>
                <input type="province" name="province" defaultValue={ville}/>
            </label>
            <br/>
            <label>
                Postal/Zip:
                <br/>
                <input type="postal" name="postal" defaultValue={postal}/>
            </label>
            <br/>
            <label>
                Rue:
                <br/>
                <input type="province" name="province" defaultValue={rue}/>
            </label>
            <br/>
            <label>
                Numero Adresse:
                <br/>
                <input type="streetNumber" name="streetNumber" defaultValue={numRue}/>
            </label>
            <br/>
            <label>
                Poste:
                <br/>
                <input defaultValue={poste}/>
            </label>
            <br/>
            <label>
                Salaire:
                <br/>
                <input defaultValue={salaire}/>
            </label>
            <br/>
            <label>
                Email:
                <br/>
                <input defaultValue={email}/>
            </label>
            <br/>
            <label>
                Telephone:
                <br/>
                <input defaultValue={telephone}/>
            </label>
        </div>

    );

} export default Info_e;