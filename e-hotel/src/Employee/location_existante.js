/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from 'date-fns'

function Location_existante(){
    const id_employe = sessionStorage.getItem("id")
    const id_hotel = sessionStorage.getItem("hotel_id")
    const navigate = useNavigate();
    const [idHotel, setIdHotel] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([])
    const [email, setEmail] = useState("")

    useEffect(() => {
        getAllLocations()
    }, []) // ne pas changer, ca marche - touche pas :)


    async function getAllLocations(){
        fetch(`http://127.0.0.1:5000/locations?id_hotel=24${id_hotel}`)
        .then(response => response.json())
        .then(function(json){
            setLoaded(true)
            setData([json])
        })
    }

    async function getLocation(email){
        if(email !== ""){
            // fetch reservations by email
            setData([])
            setLoaded(false)

            fetch(`http://127.0.0.1:5000/locations?email_client=${email}`)
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
            getAllLocations()
        }
    }

    function handleEmailChange(event){
        setEmail(event.target.value)
    }

    function handleSearch(){
        console.log("clicked search")
        console.log("email: "+ email)
        getLocation(email)
    }

    function handleClear(){
        console.log("clicked clear")
        setEmail("")
        setData([])
        setLoaded(false)
        getAllLocations()
    }

    function handlePayment(event){
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

    return(
        <>
            <div>
                <div>
                    <h1>Location existantes</h1>
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
                                <th>Numéro de Location</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Email Client</th>
                                <th>Numéro Chambre</th>
                                <th>Frais Total</th>
                                <th>Frais Restant</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data[0].map((location) => (
                                <tr key={location.id_location}>
                                    <td>{location.id_reservation}</td>
                                    <td>{format(Date.parse(location.date_checkin), 'yyyy-MM-dd')}</td>
                                    <td>{format(Date.parse(location.date_checkout), 'yyyy-MM-dd')}</td>
                                    <td>{location.email_id}</td>
                                    <td>{location.num_chambre}</td>
                                    <td>${location.frais_total}</td>
                                    <td>${location.frais_restant}</td>
                                    <td>
                                        <button value={location.id_reservation} onClick={handlePayment}>Payer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* si data is empty, "aucune réservation trouvée" */}
                    {data[0].length === 0 ? <div className='no-result-found'>Aucune Location Trouvée</div> : <div></div>}
                    
                </div>
            : <div><p>Loading Locations ...</p></div>}
        </>
        
    )
} 
export default Location_existante; 