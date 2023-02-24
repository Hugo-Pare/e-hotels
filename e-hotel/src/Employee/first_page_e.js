
import { useState } from "react";
import { useLocation } from "react-router-dom";

function First_page_e(){
    
    
    const id_employe = useLocation().state.id
    let id_hotel = null
    sessionStorage.setItem("id", id_employe)
    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([])

    getHotelId()
   

    async function getHotelId(){
        fetch(`http://127.0.0.1:5000/employes?id_employe=${id_employe}`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            id_hotel = data[0].id_hotel
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

    return(
        <>
            <div className="grid-page">
                <div>
                    <h1>Résérvations actifs</h1>
                    <br/>
                    <div className="grid-search">
                        <div> <label>
                            Email
                            <br/>
                            <input type="email" name="email"/>
                        </label></div>
                        <div><label>
                            Nom
                            <br/>
                            <input type="nom" name="nom" />
                        </label></div>
                        <div><label>
                            Prénom
                            <br/>
                            <input type="prenom" name="prenom" />
                        </label></div>
                        <div>
                        <button className="hug-bottom">Search</button>
                
                        </div>
                        <div>
                        <button className="hug-bottom">Clear</button> 
                        </div>
    
                    </div>
                    </div>
                    <div>
                        <h2>Recherche de réservation avec ID</h2>
                        <br/>
                        <label>
                            ID
                            <br/>
                            <input type="prenom" name="prenom" required />
                        </label> <br/>
                        <button>Search</button>
                    </div>
            </div>
            {loaded ? 
                <div className="table">
                    <p>loaded</p>
                    <table>
                        <thead>
                            <tr key="titles">
                                <th>Reservation ID</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Email Client</th>
                                <th>Hotel ID</th>
                                <th>Numéro Chambre</th>
                            </tr>
                        </thead>
                        {console.log(data)}
                        <tbody>
                            {data[0].map((reservation) => (
                                <tr key={reservation.id_reservation}>
                                    <td>{reservation.id_reservation}</td>
                                    <td>{reservation.date_checkin}</td>
                                    <td>{reservation.date_checkout}</td>
                                    <td>{reservation.id_email}</td>
                                    <td>{reservation.id_hotel}</td>
                                    <td>{reservation.num_chambre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            : <div><p>not loaded</p></div>}
        </>
        
    )
} 
export default First_page_e; 