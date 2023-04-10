/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { format } from 'date-fns'

function Location_existante(){
    const id_employe = sessionStorage.getItem("id")
    const id_hotel = sessionStorage.getItem("hotel_id")
    const [data, setData] =  useState();
    const [idHotel, setIdHotel] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [email, setEmail] = useState("")
    const [id_location, setId_location] = useState("")

    useEffect(() => {
        getAllLocations()
    }, []) 

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

    async function getAllLocations(){
        fetch(`http://127.0.0.1:5000/locations?id_hotel=${id_hotel}`)
        .then(response => response.json())
        .then(function(json){
            fixDates(json)
            setData(json)
            setLoaded(true)
        })
    }

    function handleIdChange(event){
        setId_location(event.target.value)
    }


    async function getLocation(email, id_location) {
        setLoaded(false);
        if (email && id_location) {
          
          // fetch reservations by email and id
          fetch(`http://127.0.0.1:5000/locations?email_client=${email}&id_location=${id_location}&id_hotel=${id_hotel}`)
            .then((response) => response.json())
            .then(function (json) {
              fixDates(json)
              setData(json)
              setLoaded(true)
            });
        } else if (email) {
          // fetch reservations by email
          console.log("email");
          fetch(`http://127.0.0.1:5000/locations?email_client=${email}&id_hotel=${id_hotel}`)
            .then((response) => response.json())
            .then(function (json) {
              fixDates(json)
              setData(json)
              setLoaded(true)
            });
        } else if (id_location !== "") {
          console.log("id");
          // fetch reservations by id
          fetch(`http://127.0.0.1:5000/locations?id_location=${id_location}&id_hotel=${id_hotel}`)
            .then((response) => response.json())
            .then(function (json) {
              fixDates(json)
              setData(json)
              setLoaded(true)
            });
        } else {
          // refresh reservations
          getAllLocations();
        }
      }
      

    function handleEmailChange(event){
        setEmail(event.target.value)
    }

    function handleSearch(){
        console.log("clicked search")
        console.log("email: "+ email)
        console.log("id: "+ id_location )
        getLocation(email, id_location)
    }

    function handleClear(){
        console.log("clicked clear")
        setEmail("")
        setId_location("")
        setData([])
        setLoaded(false)
        getAllLocations()
    }

    async function handlePayment(location) {
        if (location.frais_restant === '0.00') {
          alert('La chambre a déjà été payée !')
        } else {
          var amount = parseFloat(prompt('Veuillez entrer le montant à payer pour la location # '+location.id_location+' :')).toFixed(2)
          while (Number(amount) > Number(parseFloat(location.frais_restant).toFixed(2))) {
            amount = parseFloat(prompt('Le montant ne peut pas dépassé la valeur restante, entrez à nouveau :')).toFixed(2)
          }
      
          if (!isNaN(amount)) {
            const newAmount = parseFloat(parseFloat(location.frais_restant).toFixed(2) - amount).toFixed(2)
            console.log(newAmount)
      
            setLoaded(false)
            setData()
      
            // update reservation.frais_restant = newAmount
            fetch(`http://127.0.0.1:5000/locations/${location.id_location}?frais_restant=${newAmount}`, {
              method: "PATCH"
            })
            .then(response => response.json())
            .then(function(json) {
              console.log(json)
              getAllLocations()
            })
          }
        }
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
                        <label>Id Location: </label>
                        <input type="id" name="id_location" onChange={handleIdChange} value={id_location}/>
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
                            {data.map((location) => (
                                <tr key={location.id_location}>
                                    <td>{location.id_location}</td>
                                    <td>{location.date_checkin}</td>
                                    <td>{location.date_checkout}</td>
                                    <td>{location.email_id}</td>
                                    <td>{location.num_chambre}</td>
                                    <td>${location.frais_total}</td>
                                    <td>${location.frais_restant}</td>
                                    <td>
                                    <button onClick={() => handlePayment(location)}>Payer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* si data is empty, "aucune réservation trouvée" */}
                    {data.length === 0 ? <div className='no-result-found'>Aucune Location Trouvée</div> : <div></div>}
                    
                </div>
            : <div><p>Loading Locations ...</p></div>}
        </>
        
    )
} 
export default Location_existante; 