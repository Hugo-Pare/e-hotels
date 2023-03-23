const Navbar_c = () => {

  return (
    <div className="topnav">
    <a href="/clientIn">E-hotels</a>
    <div className="right">
    <div className="dropdown">
      <button className="dropbtn">Réservations</button>
      <div className="dropdown-content">
        <a href="/clientIn/hotelRooms">Créer Réservation</a>
        <a href="">Mes Réservations</a>
      </div>
    </div>
    <a href="">Locations</a>
    <div className="dropdown">
        <button className="dropbtn">Account</button>
        <div className="dropdown-content">
          <a href="/clientIn/info">Info</a>
          <a href="/">Log Out</a>
        </div>
      </div>
    </div>
  </div>
)
}

export default Navbar_c