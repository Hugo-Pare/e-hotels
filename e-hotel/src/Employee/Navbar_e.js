

const Navbar_e = () => {

    return (
        <nav>
          <div className="brand">
            <a href="/">E-hotels</a>
          </div>
          <div className="nav-buttons">
            <button><a href="/employeeIn/info">Account Info</a></button>
            <button><a href="/employeeIn/hotel_rooms_e">Hotel Rooms</a></button>
          </div>
        </nav>
    )
}

export default Navbar_e