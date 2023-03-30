/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { format } from 'date-fns'
const Reservation = () => {
  const email_client = sessionStorage.getItem("email_id");
  const [loaded, setLoaded] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getReservations();
  }, [])

  useLayoutEffect(() => {
    setLoaded(true)
  }, [reservations])

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

  function getReservations() {
    setLoaded(false)
    fetch(`http://127.0.0.1:5000/reservations/pending?email_client=${email_client}`)
    .then(response => response.json())
    .then(function(json) {
      fixDates(json)
      setReservations(json)
  });
  }

  function handleCancel(event) {
    const id_reservation = event.target.value;
    if(window.confirm('Voulez-vous vraiment annuler cette réservation?')){
      console.log("annuler la réservation " + id_reservation)
      
      // patch request
      fetch(`http://127.0.0.1:5000/reservations/${id_reservation}?canceled=true`, {
          method: "PATCH"
      })
      .then(response => response.json())
      .then(function(json){
        window.location.reload(false);
      })
      
  }
  else{
      // do nothing
  }
  }

    return (
      <div>
      <h2>Voici vos réservations qui s'approches</h2>
        {loaded ? (
        <table className="room-table">
          <thead>
            <tr key="titles">
              <th>Id reservation</th>
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
            {console.log(reservations)}
            {reservations.map((reservation) => (
              
              <tr key={reservation.id_reservation}>
                <td>{reservation.id_reservation}</td>
                <td>{reservation.nom_chaine}</td>
                <td>{reservation.street_num + ", " + reservation.street_name + ", " + reservation.city + ", " + reservation.postal_code.trim() + ", " + reservation.province_state+ ", " + reservation.country}</td>
                <td>{reservation.num_chambre}</td>
                <td>{reservation.date_checkin}</td>
                <td>{reservation.date_checkout}</td>
                <td>${reservation.frais_total}</td>
                <td>${reservation.frais_restant}</td>
                <td>
                    <button value={reservation.id_reservation} onClick={handleCancel}>Annuler</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ):<></>}
      </div>

  )
  }
  
  export default Reservation