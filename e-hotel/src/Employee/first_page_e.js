/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './first_page_e.css'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns'

function First_page_e(){
    const id_employe = sessionStorage.getItem("id")
    const navigate = useNavigate();
    let id_hotel = null
    const today = new Date();
    const [showToday, setShowToday] = useState(true);
    const [idHotel, setIdHotel] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([])
    const [email, setEmail] = useState("")
    const [id, setId] = useState("")

    useEffect(() => {
        getHotelId()
    }, []) // ne pas changer, ca marche - touche pas :)


    async function getHotelId(){
        fetch(`http://127.0.0.1:5000/employes?id_employe=${id_employe}`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            id_hotel = data[0].id_hotel
            sessionStorage.setItem("hotel_id", id_hotel);
            setIdHotel(data[0].id_hotel)
            getAllReservations()
        })
    }

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

    function filterReservations(json){
        const temp = json.filter((reservation) => (reservation.date_checkin === format(Date.parse(today), 'yyyy-MM-dd')));
        return temp
    }

    async function getAllReservations(){
        fetch(`http://127.0.0.1:5000/reservations/pending/${id_hotel}`)
        .then(response => response.json())
        .then(function(json){
            fixDates(json)
            if(showToday){
                setData(filterReservations(json))
            } else {
                setData(json)
            }
            setLoaded(true)
        })
    }

    async function getReservation(email,id){
        if(email !== "" && id !== ""){
            // fetch reservations by email and id
            setLoaded(false)

            fetch(`http://127.0.0.1:5000/reservations/pending/${idHotel}?email_client=${email}&id_reservation=${id}`)
            .then(response => response.json())
            .then(function(json){
                fixDates(json)
            if(showToday){
                setData(filterReservations(json))
            } else {
                setData(json)
            }
            setLoaded(true)
            })
        }
        else if(email !== ""){
            // fetch reservations by email
            setLoaded(false)

            fetch(`http://127.0.0.1:5000/reservations/pending/${idHotel}?email_client=${email}`)
            .then(response => response.json())
            .then(function(json){
                fixDates(json)
                if(showToday){
                    setData(filterReservations(json))
                } else {
                    setData(json)
                }
                setLoaded(true)
                
            })
        }
        else if(id !== ""){
            // fetch reservations by id
            setLoaded(false)

            fetch(`http://127.0.0.1:5000/reservations/pending/${idHotel}?id_reservation=${id}`)
            .then(response => response.json())
            .then(function(json){
                fixDates(json)
                if(showToday){
                    setData(filterReservations(json))
                } else {
                    setData(json)
                }
                setLoaded(true)
            })
        }
        else{
            // refresh reservations
            setLoaded(false)
            getHotelId()
        }
    }

    function handleEmailChange(event){
        setEmail(event.target.value)
    }

    function handleIdChange(event){
        setId(event.target.value)
    }

    function handleToday(event){
        const value = event.target.checked ? true : false;
        setShowToday(value)
    }

    function handleSearch(){
        console.log("clicked search")
        console.log("email: "+ email)
        console.log("id: " + id)

        getReservation(email,id)
    }

    function handleClear(){
        window.location.reload(false); //avoids possible issue present with previous implementation
    }

    function handleLocation(event){
        const id_reservation = event.target.value
        console.log("clicked location, id_reservation = " + id_reservation)
        // navigate to location page
        navigate('/employeeIn/location', {
            state: {
                reservationId: id_reservation,
                id_employe: id_employe
            }
        });
    }

    function handleAnnulation(event){
        const id_reservation = event.target.value
        // alert pour s'assurer d'annuler la réservation
        if(window.confirm('Voulez-vous vraiment annuler cette réservation?')){
            console.log("annuler la réservation " + id_reservation)
            
            // patch request
            fetch(`http://127.0.0.1:5000/reservations/${id_reservation}?canceled=true`, {
                method: "PATCH"
            })
            .then(response => response.json())
            .then(function(json){
                console.log(json)
            })

            // reload data
            setData([])
            setLoaded(false)
            getHotelId()
        }
        else{
            // do nothing
        }
    }

    return(
        <>
            <div>
                <div>
                    <h1>Réservations en Attente</h1>
                    <br/>
                    <div className="filter">
                        <label>Email : </label>
                        <input type="email" name="email" onChange={handleEmailChange} value={email}/>
                    
                        <label style={{marginLeft:"40px"}}>ID Réservation : </label>
                        <input type="id" name="id" onChange={handleIdChange} value={id}/>

                        <label style={{marginLeft:"40px", marginRight:"40px"}}>
                            Check-in aujourd'hui:
                        <input type="checkbox" checked={showToday} value={showToday} onChange={handleToday}/>
                        </label>
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
                            {data.map((reservation) => (
                                <tr key={reservation.id_reservation}>
                                    <td>{reservation.id_reservation}</td>
                                    <td>{reservation.date_checkin}</td>
                                    <td>{reservation.date_checkout}</td>
                                    <td>{reservation.id_email}</td>
                                    <td>{reservation.num_chambre}</td>
                                    <td>${reservation.frais_total}</td>
                                    <td>${reservation.frais_restant}</td>
                                    <td>
                                        <button value={reservation.id_reservation} onClick={handleLocation}>Location</button>
                                        <button value={reservation.id_reservation} onClick={handleAnnulation}>Annulation</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* si data is empty, "aucune réservation trouvée" */}
                    {data.length === 0 ? <div className='no-result-found'>Aucune Réservation Trouvée</div> : <div></div>}
                    
                </div>
            : <div><p>Loading Reservations ...</p></div>}
        </>
        
    )
} 
export default First_page_e; 