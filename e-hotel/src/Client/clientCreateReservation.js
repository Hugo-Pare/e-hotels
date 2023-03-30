/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom";

function ClientCreateReservation(){
    const reservationInfo = useLocation().state
    const [frais_restant, setFrais_restant] = useState(reservationInfo.frais_total)

    function handlePayment(){
        console.log("payment")
    }

    function handleReservation(){
        console.log("reservation")
    }

    return(
        <>
            <div>
                <h1>Créer une réservation</h1>
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