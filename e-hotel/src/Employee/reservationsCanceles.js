/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useState } from "react";
import { format } from 'date-fns'

function Reservation_Canceles(){
    const id_hotel = sessionStorage.getItem("hotel_id")
    const [idHotel, setIdHotel] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([])
    const [showReservation, setShowReservation] = useState([])
    const [email, setEmail] = useState("")
    const [id_reservation, setIdReservation] = useState("")

    useEffect(() => {
        getAllCanceledReservations()
    }, []) 

    useLayoutEffect(() => {
        setLoaded(true)
    }, [showReservation])

    function fixDates(json){
        for(let i=0; i<json.length; i++){
            let checkin = new Date(json[i].date_checkin)
            let checkout = new Date(json[i].date_checkout)
            const checkinOffset = checkin.getTimezoneOffset() * 60000
            const checkoutOffset = checkout.getTimezoneOffset() * 60000
            json[i].date_checkin = format(Date.parse(new Date(checkin.getTime() + checkinOffset)), 'yyyy-MM-dd')
            json[i].date_checkout = format(Date.parse(new Date(checkout.getTime() + checkoutOffset)), 'yyyy-MM-dd')
        }
        return json
    }

    async function getAllCanceledReservations(){
        setLoaded(false)
        fetch(`http://127.0.0.1:5000/reservations/canceled/${id_hotel}`)
        .then(response => response.json())
        .then(function(json){
            fixDates(json)
            setData(json)
            setShowReservation(json)
        })
    }

    function handleEmailChange(event){
        setEmail(event.target.value)
    }

    function handleIdChange(event){
        setIdReservation(event.target.value)
    }

    function handleSearch() {
        setLoaded(false);
        let temp = []
        if (email == "" && id_reservation == "") {
            alert ("Entre un ID de reservation ou email de client, SVP!")
            setLoaded(true)
            return
        } else if(email != "" && id_reservation != "") {
            temp = data.filter((reservation) => (reservation.id_email === email && reservation.id_reservation == id_reservation));
            setShowReservation(temp);
        } else if (id_reservation != "") {
            temp = data.filter((reservation) => reservation.id_reservation == id_reservation);
            setShowReservation(temp);
        } else if (email != "") {
            temp = data.filter((reservation) => (reservation.id_email === email));
            setShowReservation(temp);
        }
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
                        <label>Id Reservation: </label>
                        <input type="id" name="id_reservation" onChange={handleIdChange} value={id_reservation}/>
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
                                    <td>{reservation.date_checkin}</td>
                                    <td>{reservation.date_checkout}</td>
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