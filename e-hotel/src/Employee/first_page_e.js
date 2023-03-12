/* eslint-disable react-hooks/exhaustive-deps */
import './first_page_e.css'

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from 'date-fns'

function First_page_e(){
    const id_employe = useLocation().state.id
    const navigate = useNavigate();
    sessionStorage.setItem("id", id_employe)
    let id_hotel = null

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
            setIdHotel(data[0].id_hotel)
            getAllReservations()
            console.log(data)
        })
    }

    async function getAllReservations(){
        // console.log("id_hotel : " + id_hotel)
        fetch(`http://127.0.0.1:5000/reservations/pending/${id_hotel}`)
        .then(response => response.json())
        .then(function(json){
            setLoaded(true)
            setData([json])
            // console.log(json)
        })
    }

    async function getReservation(email,id){
        if(email !== "" && id !== ""){
            // fetch reservations by email and id
            setData([])
            setLoaded(false)

            fetch(`http://127.0.0.1:5000/reservations/pending/${idHotel}?email_client=${email}&id_reservation=${id}`)
            .then(response => response.json())
            .then(function(json){
                setLoaded(true)
                setData([json])
                // console.log(json)
            })
        }
        else if(email !== ""){
            // fetch reservations by email
            setData([])
            setLoaded(false)

            fetch(`http://127.0.0.1:5000/reservations/pending/${idHotel}?email_client=${email}`)
            .then(response => response.json())
            .then(function(json){
                setLoaded(true)
                setData([json])
                // console.log(json)
            })
        }
        else if(id !== ""){
            // fetch reservations by id
            setData([])
            setLoaded(false)

            fetch(`http://127.0.0.1:5000/reservations/pending/${idHotel}?id_reservation=${id}`)
            .then(response => response.json())
            .then(function(json){
                setLoaded(true)
                setData([json])
                // console.log(json)
            })
        }
        else{
            // refresh reservations
            setData([])
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

    function handleSearch(){
        console.log("clicked search")
        console.log("email: "+ email)
        console.log("id: " + id)

        getReservation(email,id)
    }

    function handleClear(){
        console.log("clicked clear")
        setEmail("")
        setId("")
        setData([])
        setLoaded(false)

        getHotelId()
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

    function handleHotelRoom(){
        navigate('/employeeIn/hotel_rooms_e', {state: {id:id_employe}});
    }

    function handleAnnulation(event){
        const id_reservation = event.target.value
        // console.log("clicked annulation, id_reservation = " + id_reservation)
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
                    <button onClick={handleHotelRoom}>Hotel Rooms</button>
                    <br/>
                    <div className="filter">
                        <label>Email : </label>
                        <input type="email" name="email" onChange={handleEmailChange} value={email}/>
                    
                        <label>ID Réservation : </label>
                        <input type="id" name="id" onChange={handleIdChange} value={id}/>
                    
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
                        {/* {console.log(data)} */}
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
                                    <td>
                                        <button value={reservation.id_reservation} onClick={handleLocation}>Location</button>
                                        <button value={reservation.id_reservation} onClick={handleAnnulation}>Annulation</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* si data is empty, "aucune réservation trouvée" */}
                    {data[0].length === 0 ? <div className='no-result-found'>Aucune Réservation Trouvée</div> : <div></div>}
                    
                </div>
            : <div><p>Loading Reservations ...</p></div>}
        </>
        
    )
} 
export default First_page_e; 