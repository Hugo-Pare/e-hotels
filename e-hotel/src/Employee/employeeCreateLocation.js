/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom";

function EmployeeCreateLocation(){
    const navigate = useNavigate();
    const locationInfo = useLocation().state

    const [id_employe, setID_employe] = useState()
    const [room_num, setRoom_num] = useState()
    const [prix_total, setPrix_total] = useState()
    const [id_hotel, setID_hotel] = useState()
    const [email_client, setEmail_client] = useState()
    const [date_checkin, setDate_checkin] = useState()
    const [date_checkout, setDate_checkout] = useState()

    const [frais_restant, setFrais_restant] = useState();

    useEffect(() => {
        setInfoLocation();
    }, [])

    function setInfoLocation(){
        console.log(locationInfo)
        setID_employe(locationInfo.id_employe)
        setRoom_num(locationInfo.room_num)
        setPrix_total(locationInfo.prix)
        setID_hotel(locationInfo.id_hotel)
        setEmail_client(locationInfo.email_client)
        setDate_checkin(locationInfo.date_checkin)
        setDate_checkout(locationInfo.date_checkout)

        setFrais_restant(locationInfo.prix)
    }

    function handlePayment(){
        console.log("handlePayment")

        if(frais_restant === '0.00'){
            alert('La chambre a déjà été payée !')
        }
        else{
            var amount = parseFloat(prompt('Veuillez entrer le montant à payer :')).toFixed(2)
            while(Number(amount) > Number(parseFloat(frais_restant).toFixed(2))){
                amount = parseFloat(prompt('Le montant ne peut pas dépassé la valeur restante, entrez à nouveau :')).toFixed(2)
            }

            if(!isNaN(amount)){
                const newAmount = parseFloat(parseFloat(frais_restant).toFixed(2) - amount).toFixed(2)
                console.log(newAmount)
                setFrais_restant(newAmount)
            }
        }
    }

    function handleLocation(){
        console.log("handleLocation")

        const json = {
            "frais_restant": frais_restant,
            "frais_total": prix_total,
            "date_checkin": date_checkin,
            "date_checkout": date_checkout,
            "id_employe": id_employe,
            "email_id": email_client,
            "num_chambre": room_num,
            "id_reservation": null,
            "id_hotel": id_hotel
        }
        
        console.log(json)

        // create location
        fetch("http://127.0.0.1:5000/locations", {
            method: "POST",
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

        // alert
        alert("Location Enregistrée")
        navigate('/employeeIn', {state: {id: id_employe}})
    }

    return(
        <>
            <div>
                <div>
                    <h1>Créer Location</h1>
                    <div>
                        <label>Email du client : </label>
                        <label>{email_client}</label>
                        <br/>
                        <label>Numéro de chambre : </label>
                        <label>{room_num}</label>
                        <br/>
                        <label>Date de Check-In : </label>
                        <label>{date_checkin}</label>
                        <br/>
                        <label>Date de Check-Out : </label>
                        <label >{date_checkout}</label>
                        <br/>
                        <label>Frais Total : </label>
                        <label >{prix_total}</label>
                        <br/>
                        <label>Frais Restant : </label>
                        <label>{frais_restant} </label>
                        <br/>
                        <button onClick={handlePayment}>Faire un Paiement</button>
                        <br/>
                        <button onClick={handleLocation}>Procéder à la Location</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeCreateLocation