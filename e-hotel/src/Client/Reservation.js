import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { format } from 'date-fns'
const Reservation = () => {
  const email_client = sessionStorage.getItem("email_id");
  const [loaded, setLoaded] = useState();
  const [reservations, setReservations] = useState(false);

  useEffect(() => {
    getReservations();
  }, [])

  useLayoutEffect(() => {
    setLoaded(true)
  }, [reservations])

  function getReservations() {
    setLoaded(false)
    fetch(`http://127.0.0.1:5000/reservations/pending?email_client=${email_client}`)
    .then(response => response.json())
    .then(function(json) {
      console.log(json)
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
          console.log(json)
      })
      window.location.reload(false);
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
            {reservations.map((reservation) => (
              
              <tr key={reservation.id_reservation}>
                <td>{reservation.id_reservation}</td>
                <td>{reservation.nom_chaine}</td>{console.log(reservation.postal_code+".")}
                <td>{reservation.street_num + ", " + reservation.street_name + ", " + reservation.city + ", " + reservation.postal_code.trim() + ", " + reservation.province_state+ ", " + reservation.country}</td>
                <td>{reservation.num_chambre}</td>
                <td>{format(Date.parse(reservation.date_checkin), 'yyyy-MM-dd')}</td>
                <td>{format(Date.parse(reservation.date_checkout), 'yyyy-MM-dd')}</td>
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