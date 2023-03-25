

const Navbar_e = () => {

    return (
      <div className="topnav">
      <a href="/employeeIn">E-hotels</a>
      <div className="right">
      <div className="dropdown">
        <button className="dropbtn">Réservations</button>
        <div className="dropdown-content">
          <a href="/employeeIn">Actifs</a>
          <a href="">Cancelé</a>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Locations</button>
        <div className="dropdown-content">
          <a href="">Existantes</a>
          <a href="/employeeIn/createLocation">Creer</a>
        </div>
      </div>
      <a href="/employeeIn/hotel_rooms_e">Rooms</a>
      <a href="">Hotel</a>
      <div className="dropdown">
        <button className="dropbtn">Account</button>
        <div className="dropdown-content">
          <a href="/employeeIn/info">Info</a>
          <a href="/">Log Out</a>
        </div>
      </div>
      
      </div>
     
    </div>
    )
}

export default Navbar_e