import React, { useState } from 'react';

function Login() {
  const [showClientLogin, setShowClientLogin] = useState(false);
  const [showEmployeeLogin, setShowEmployeeLogin] = useState(false);

  const handleClientLogin = () => {
    setShowClientLogin(true);
  };

  const handleEmployeeLogin = () => {
    setShowEmployeeLogin(true);
    var loginBtn = document.getElementById("login-buttons");
    loginBtn.style.backgroundColor = "grey";
  };
  


  const handleClientLoginSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const name = formData.get('name');
    alert('Login terminer')
  };

  const handleEmployeeLoginSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const employee_num = formData.get('employee_num');
      const name = formData.get('name');
      alert('Login terminer')
  }
  

  return (
    <div>
      <nav>
        <div className="brand">
          <a href="#">E-hotels</a>
        </div>
        <div className="login-buttons">
          <button onClick={handleEmployeeLogin}>Login Employer</button>
          <button onClick={handleClientLogin}>Login Client</button>
          <a href="/signup/client"><button>Enregistrer</button></a>
        </div>
      </nav>
      {showClientLogin && (
        <div className="popup">
          <div className="popup-content">
            <h2>Login Client</h2>
            <form onSubmit={handleClientLoginSubmit}>
              <label>
                Email:
                <br/>
                <input type="email" name="email" required />
              </label>
              <button type="submit">Login</button>
            </form>
            <button className="close-button" onClick={() => setShowClientLogin(false)}>Fermer</button>
          </div>
        </div>
      )}
      {showEmployeeLogin && (
          <div className="popup-content">
          <h2>Login Employer</h2>
          <form onSubmit={handleEmployeeLoginSubmit}>
            <label>
              Numéro d'identification:
              <br/>
              <input type="text" name="employee_num" required />
            </label>
            <button type="submit">Login</button>
          </form>
          <button className="close-button" onClick={() => setShowEmployeeLogin(false)}>Fermer</button>
        </div>
      )}
    </div>
  );
}

export default Login;

