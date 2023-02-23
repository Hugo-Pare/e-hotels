const Navbar_c = () => {

    return (
        <nav>
          <div className="brand">
            <a href="/">E-hotels</a>
          </div>
          <div className="login-buttons">
            <button >Login Employer</button>
            <button >Login Client</button>
            <a href="/signup/client"><button>Enregistrer</button></a>
          </div>
        </nav>
    )
}

export default Navbar_c