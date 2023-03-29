/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from 'date-fns'
import { set } from 'date-fns/esm';

function Reservation_Canceles(){
    const id_hotel = sessionStorage.getItem("id_hotel")
    const [idHotel, setIdHotel] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([])
    const [showReservation, setShowReservation] = useState([])
    const [email, setEmail] = useState("")

    useEffect(() => {
        getAllCanceledReservations()
    }, []) 

    useLayoutEffect(() => {
        setLoaded(true)
    }, [showReservation])

    async function getAllCanceledReservations(){
        setLoaded(false)
        fetch(`http://127.0.0.1:5000/reservations/canceled`)
        .then(response => response.json())
        .then(function(json){
            setData(json)
            setShowReservation(json)
        })
    }

    function handleEmailChange(event){
        setEmail(event.target.value)
    }


    function handleSearch() {
        setLoaded(false);
        const temp = data.filter((reservation) => reservation.id_email === email);
        setShowReservation(temp);
        setLoaded(true);
        console.log("clicked search");
        console.log("email: " + email);
      }

    function handleClear(){
        window.location.reload(false);
    }

    return(
        <>
            <div>
                <div>
                    <h1>Réservations Cancelées</h1>
                    <br/>
                    <div className="filter">
                        <label>Email : </label>
                        <input type="email" name="email" onChange={handleEmailChange} value={email}/>
                        <button onClick={handleSearch}>Search</button>
                        <button onClick={handleClear}>Clear</button> 
                    </div>
                </div>    
            </div>
            {loaded ? 
                <div className="table">
                    <table>
                        <thead>
                            <tr key="titles">
                                <th>Numéro de Réservation</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Email Client</th>
                                <th>Numéro Chambre</th>
                                <th>Frais Total</th>
                                <th>Frais Restant</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showReservation.map((reservation) => (
                                <tr key={reservation.id_reservation}>
                                    <td>{reservation.id_reservation}</td>
                                    <td>{format(Date.parse(reservation.date_checkin), 'yyyy-MM-dd')}</td>
                                    <td>{format(Date.parse(reservation.date_checkout), 'yyyy-MM-dd')}</td>
                                    <td>{reservation.id_email}</td>
                                    <td>{reservation.num_chambre}</td>
                                    <td>${reservation.frais_total}</td>
                                    <td>${reservation.frais_restant}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* si data is empty, "aucune réservation trouvée" */}
                    {showReservation.length === 0 ? <div className='no-result-found'>Aucune Réservation Trouvée</div> : <div></div>}
                    
                </div>
            : <div><p>Loading Reservations Cancelées ...</p></div>}
        </>
        
    )
} 
export default Reservation_Canceles; 