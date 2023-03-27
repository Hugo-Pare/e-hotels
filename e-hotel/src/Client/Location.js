import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { format } from 'date-fns'
const Location = () => {
  const email_client = sessionStorage.getItem("email_id");
  const [loaded, setLoaded] = useState();
  const [locations, setLocations] = useState(false);

  useEffect(() => {
    getLocations();
  }, [])

  useLayoutEffect(() => {
    setLoaded(true)
  }, [locations])

  function getLocations() {
    setLoaded(false)
    fetch(`http://127.0.0.1:5000/locations?email_client=${email_client}`)
    .then(response => response.json())
    .then(function(json) {
      console.log(json)
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
                <td>{format(Date.parse(location.date_checkin), 'yyyy-MM-dd')}</td>
                <td>{format(Date.parse(location.date_checkout), 'yyyy-MM-dd')}</td>
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