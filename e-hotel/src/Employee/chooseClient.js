/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom";

function ChooseClient() {
    const navigate = useNavigate()
    
    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([])
    const [email, setEmail] = useState("")

    const room_num = useLocation().state.room_num
    const prix = useLocation().state.prix
    const id_employe = useLocation().state.id_employe
    const id_hotel = useLocation().state.hotel_id
    const date_checkin = useLocation().state.date_checkin
    const date_checkout = useLocation().state.date_checkout

    useEffect(() => {
        getClients()
    }, [])

    async function getClients(){
        fetch("http://127.0.0.1:5000/clients")
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data);
            setLoaded(true);
            setData(data)
        })
    }

    function getClientByEmail(){
        console.log("fetch request")
        setData([])
        setLoaded(false)

        fetch(`http://127.0.0.1:5000/clients?email=${email}`)
        .then(response => response.json())
        .then(function(json){
            setLoaded(true)
            setData(json)
        })
    }

    function handleEmailChange(event){
        setEmail(event.target.value)
    }

    function handleSearch(){
        console.log("clicked search")
        console.log("email: "+ email)

        getClientByEmail()
    }

    function handleClear(){
        console.log("clicked clear")
        setEmail("")
        setData([])
        setLoaded(false)

        getClients()
    }

    function chooseClient(event){
        console.log(event.target.value)
        console.log(id_employe)

        // navigate to location page with data
        navigate('/employeeIn/employeeCreateLocation', {
            state: {
                id_employe: id_employe,
                prix: prix,
                room_num: room_num,
                id_hotel: id_hotel,
                date_checkin: date_checkin,
                date_checkout: date_checkout,
                email_client: event.target.value
            }
        })
    }

    return(
        <>
            <div>
                <div>
                    <h1>Choisir un compte-client</h1>
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
                                <th>Email</th>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Téléphone</th>
                                <th>Pays</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((client) => (
                                <tr key={client.email}>
                                    <td>{client.email}</td>
                                    <td>{client.firstname}</td>
                                    <td>{client.lastname}</td>
                                    <td>{client.telephone}</td>
                                    <td>{client.country}</td>
                                    <td>
                                        <button value={client.email} onClick={chooseClient}>Sélectionner</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {data.length === 0 ? <div className='no-result-found'>Aucun Client Trouvé</div> : <div></div>}
                    
                </div>
            : <div><p>Loading Clients ...</p></div>}
        </>
    )
}

export default ChooseClient;