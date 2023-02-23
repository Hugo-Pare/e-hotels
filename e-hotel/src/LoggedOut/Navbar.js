


const Navbar = () => {

    return (
        <nav>
          <div className="brand">
            <a href="/">E-hotels</a>
          </div>
          <div className="login-buttons">
            <button ><a href="/employee">Login Employe</a></button>
            <button ><a href="/client">Login Client</a></button>
            <button><a href="/signupClient">Enregistrer</a></button>
          </div>
        </nav>
    )
}

export default Navbar