/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './first_page_e.css'

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from 'date-fns'

function Reservation_Canceles(){
    const navigate = useNavigate();

    const [idHotel, setIdHotel] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([])
    const [email, setEmail] = useState("")

    useEffect(() => {
        getAllCanceledReservations()
    }, []) // ne pas changer, ca marche - touche pas :)



    async function getAllCanceledReservations(){
        fetch(`http://127.0.0.1:5000/reservations/canceled`)
        .then(response => response.json())
        .then(function(json){
            setLoaded(true)
            setData([json])
        })
    }

    async function getCanceledReservation(email){
        if(email !== ""){
            // fetch reservations by email
            setData([])
            setLoaded(false)

            fetch(`http://127.0.0.1:5000/reservations/pending/${idHotel}?email_client=${email}`)
            .then(response => response.json())
            .then(function(json){
                setLoaded(true)
                setData([json])
            })
        }
        else{
            // refresh reservations
            setData([])
            setLoaded(false)
            getAllCanceledReservations()
        }
    }

    function handleEmailChange(event){
        setEmail(event.target.value)
    }


    function handleSearch(){
        console.log("clicked search")
        console.log("email: "+ email)
        getCanceledReservation(email)
    }

    function handleClear(){
        console.log("clicked clear")
        setEmail("")
        setData([])
        setLoaded(false)
        getAllCanceledReservations()
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
                            {data[0].map((reservation) => (
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
                    {data[0].length === 0 ? <div className='no-result-found'>Aucune Réservation Trouvée</div> : <div></div>}
                    
                </div>
            : <div><p>Loading Reservations Cancelées ...</p></div>}
        </>
        
    )
} 
export default Reservation_Canceles; 