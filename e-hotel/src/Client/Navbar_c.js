const Navbar_c = () => {

  return (
    <div className="topnav">
    <a href="/">E-hotels</a>
    <div className="right">
    <div className="dropdown">
      <button className="dropbtn">Réservations</button>
      <div className="dropdown-content">
        <a href="/clientIn/hotelRooms">Créer Réservation</a>
        <a href="">Mes Réservations</a>
      </div>
    </div>
    <a href="">Locations</a>
    <a href="/clientIn/info">Account Info</a>
    </div>
  </div>
)
}

export default Navbar_c