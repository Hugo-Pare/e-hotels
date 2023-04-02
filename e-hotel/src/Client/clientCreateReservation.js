/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom";

function ClientCreateReservation(){
    const reservationInfo = useLocation().state
    const navigate = useNavigate();
    const [frais_restant, setFrais_restant] = useState(reservationInfo.frais_total)

    function handlePayment(){
        console.log("payment")
        console.log("frais restant :" + frais_restant)
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
                setFrais_restant(newAmount)
                console.log(newAmount)
            }
        }
    }

    function handleReservation(){
        console.log("reservation")
        const json = {
            "frais_restant": frais_restant,
            "frais_total": reservationInfo.frais_total,
            "date_checkin": reservationInfo.date_checkin,
            "date_checkout": reservationInfo.date_checkout,
            "id_employe": null,
            "email_id": reservationInfo.id_email,
            "num_chambre": reservationInfo.room_num,
            "id_hotel": reservationInfo.id_hotel
        }
        
        console.log(json)

        // create location
        fetch("http://127.0.0.1:5000/reservations", {
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
        alert("Réservation Enregistrée")
        navigate('/clientIn', {state: {email_client: reservationInfo.id_email}})
    }

    return(
        <>
            <div>
                <h1>Créer une réservation</h1>
                {console.log(reservationInfo)}
                <h4>{reservationInfo.hotelInfo.street_num} {reservationInfo.hotelInfo.street_name}, {reservationInfo.hotelInfo.zip_code}</h4>
                <h4>{reservationInfo.hotelInfo.city}, {reservationInfo.hotelInfo.province_state}, {reservationInfo.hotelInfo.country}</h4>
                <h4>{reservationInfo.hotelInfo.telephone}</h4>
                <div>
                        <label>Email du client : </label>
                        <label>{reservationInfo.id_email}</label>
                        <br/>
                        <label>Numéro de chambre : </label>
                        <label>{reservationInfo.room_num}</label>
                        <br/>
                        <label>Date de Check-In : </label>
                        <label>{reservationInfo.date_checkin}</label>
                        <br/>
                        <label>Date de Check-Out : </label>
                        <label >{reservationInfo.date_checkout}</label>
                        <br/>
                        <label>Frais Total : </label>
                        <label >{reservationInfo.frais_total}</label>
                        <br/>
                        <label>Frais Restant : </label>
                        <label>{frais_restant} </label>
                        <br/>
                        <button onClick={handlePayment}>Faire un Paiement</button>
                        <br/>
                        <button onClick={handleReservation}>Procéder à la Réservation</button>
                    </div>
            </div>
        </>
    )

}

export default ClientCreateReservation;