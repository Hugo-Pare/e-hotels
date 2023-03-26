import { useEffect } from "react";

const Reservation = () => {
  const email_client = sessionStorage.getItem("email_id")
  useEffect(() => {
    getReservations();
  }, [])
  function getReservations() {
    fetch(`http://127.0.0.1:5000/reservations/pending?email_client=${email_client}`)
    .then(response => response.json())
    .then(function(json) {
      console.log(json)
  });
  }

    return (
      <h2>Voici vos réservations qui s'approches</h2>
  )
  }
  
  export default Reservation