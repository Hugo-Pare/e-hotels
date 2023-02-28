/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from 'date-fns'

function Location(){

    const id_reservation = useLocation().state.reservationId
    const id_employe = useLocation().state.id_employe
    const navigate = useNavigate();

    const [data, setData] =  useState();
    const [loaded, setLoaded] =  useState(false);
    const [idLocation, setIdLocation] = useState();

    useEffect(() => {
        getReservationById()
        getIdLocation()
    }, [])

    async function getReservationById(){
        // console.log("id_hotel : " + id_hotel)
        fetch(`http://127.0.0.1:5000/reservations/${id_reservation}`)
        .then(response => response.json())
        .then(function(json){
            setLoaded(true)
            setData(json[0])
            // console.log(json)
        })
    }

    function handleLocation(){

        const json = {
            "id_location": idLocation,
            "frais_restant": data.frais_restant,
            "frais_total": data.frais_total,
            "date_checkin": data.date_checkin,
            "date_checkout": data.date_checkout,
            "id_employe": id_employe,
            "email_id": data.id_email,
            "num_chambre": data.num_chambre,
            "id_reservation": data.id_reservation,
            "id_hotel": data.id_hotel
        }
        
        console.log(json)
        
        // update reservation.location = true
        fetch(`http://127.0.0.1:5000/reservations/${id_reservation}?checked_in=true`, {
            method: "PATCH"
        })
        .then(response => response.json())
        .then(function(json){
            console.log(json)
        })

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

    async function getIdLocation(){
        fetch(`http://127.0.0.1:5000/locations/count`)
        .then(response => response.json())
        .then(function(json){
            setIdLocation(parseInt(json[0]) + 1)
            // console.log(location_count)
        })
    }

    async function handlePayment(){
        console.log("frais restant :" + data.frais_restant)
        if(data.frais_restant === '0.00'){
            alert('La chambre a déjà été payée !')
        }
        else{
            var amount = parseFloat(prompt('Veuillez entrer le montant à payer :')).toFixed(2)
            while(Number(amount) > Number(parseFloat(data.frais_restant).toFixed(2))){
                amount = parseFloat(prompt('Le montant ne peut pas dépassé la valeur restante, entrez à nouveau :')).toFixed(2)
            }

            if(!isNaN(amount)){
                const newAmount = parseFloat(parseFloat(data.frais_restant).toFixed(2) - amount).toFixed(2)
                console.log(newAmount)

                setLoaded(false)
                setData()

                // update reservation.frais_restant = newAmount
                fetch(`http://127.0.0.1:5000/reservations/${id_reservation}?frais_restant=${newAmount}`, {
                    method: "PATCH"
                })
                .then(response => response.json())
                .then(function(json){
                    console.log(json)
                    getReservationById()
                })
            }
        }
    }

    return(
        <>
            <h1>Location</h1>
            {loaded ? 
            <div>
                {console.log(data)}
                <div><b>Numéro de Réservation : {id_reservation}</b></div>
                <label>Email du client : </label>
                <input value={data.id_email} readOnly></input>
                <br/>
                <label>Numéro de chambre : </label>
                <input value={data.num_chambre} readOnly></input>
                <br/>
                <label>Date de Check-In : </label>
                <input value={format(Date.parse(data.date_checkin), 'yyyy-MM-dd')} readOnly></input>
                <br/>
                <label>Date de Check-Out : </label>
                <input value={format(Date.parse(data.date_checkout), 'yyyy-MM-dd')} readOnly></input>
                <br/>
                <label>Frais Total : </label>
                <input value={data.frais_total} readOnly></input>
                <br/>
                <label>Frais Restant : </label>
                <input value={data.frais_restant} readOnly></input>
                <br/>
                <button onClick={handlePayment}>Faire un Paiement</button>
                <br/>
                <button onClick={handleLocation}>Procéder à la Location</button>
            </div>
            : <div><p>Recherche de Location ...</p></div>}
           
        </>
    )
}

export default Location;