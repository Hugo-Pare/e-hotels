
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from 'date-fns'

function First_page_e(){
    const id_employe = useLocation().state.id
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

    return(
        <>
            <div className="grid-page">
                <div>
                    <h1>Réservations Actives</h1>
                    <br/>
                    <div className="grid-search">
                        <div>
                            <label>Email : </label>
                            <input type="email" name="email" onChange={handleEmailChange} value={email}/>
                        </div>
                        <div>
                            <label>ID Réservation : </label>
                            <input type="id" name="id" onChange={handleIdChange} value={id}/>
                        </div>
                        <div>
                            <button className="hug-bottom" onClick={handleSearch}>Search</button>
                        </div>
                        <div>
                            <button className="hug-bottom" onClick={handleClear}>Clear</button> 
                        </div>
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
                        {console.log(data)}
                        <tbody>
                            {/* si data is empty, "aucune réservation trouvée" */}
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
                    
                </div>
            : <div><p>Loading Reservations ...</p></div>}
        </>
        
    )
} 
export default First_page_e; 