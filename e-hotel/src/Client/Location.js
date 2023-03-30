import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { format } from 'date-fns'
const Location = () => {
  const email_client = sessionStorage.getItem("email_id");
  const [loaded, setLoaded] = useState();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations();
  }, [])

  useLayoutEffect(() => {
    setLoaded(true)
  }, [locations])

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

  function getLocations() {
    setLoaded(false)
    fetch(`http://127.0.0.1:5000/locations?email_client=${email_client}`)
    .then(response => response.json())
    .then(function(json) {
      fixDates(json)
      setLocations(json)
  });
  }

    return (
      <div>
      <h2>Voici vos locations</h2>
        {loaded ? (
        <table className="room-table">
          <thead>
            <tr key="titles">
              <th>Id location</th>
              <th>Chaine</th>
              <th>Adresse</th>
              <th># chambre</th>
              <th>CheckIn</th>
              <th>Checkout</th>
              <th>frais total</th>
              <th>frais restant</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              
              <tr key={location.id_location}>
                <td>{location.id_location}</td>
                <td>{location.nom_chaine}</td>
                <td>{location.street_num + ", " + location.street_name + ", " + location.city + ", " + location.postal_code.trim() + ", " + location.province_state+ ", " + location.country}</td>
                <td>{location.num_chambre}</td>
                <td>{location.date_checkin}</td>
                <td>{location.date_checkout}</td>
                <td>${location.frais_total}</td>
                <td>${location.frais_restant}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ):<></>}
      </div>

  )
  }
  
  export default Location