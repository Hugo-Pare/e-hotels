const Navbar = () => {

    return (
        <nav>
          <div className="brand">
            <a href="/">E-hotels</a>
          </div>
          <div className="login-buttons">
            <button onClick={handleEmployeeLogin}>Login Employer</button>
            <button onClick={handleClientLogin}>Login Client</button>
            <a href="/signup/client"><button>Enregistrer</button></a>
          </div>
        </nav>
    )
}