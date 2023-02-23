import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showClientLogin, setShowClientLogin] = useState(false);
  const [showEmployeeLogin, setShowEmployeeLogin] = useState(false);
  const [clientData, setClientData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  const handleClientLogin = () => {
    setShowEmployeeLogin(false);
    setShowClientLogin(true);
  };

  const handleEmployeeLogin = () => {
    setShowClientLogin(false);
    setShowEmployeeLogin(true);
  };

  async function checkClientEmail(email) {
    fetch(`http://127.0.0.1:5000/clients?email=${email}`)
      .then(response => response.json())
      .then(json => {
        setClientData(json);
        if (json.length === 0) {
          alert("S'il vous plait vous enregistrer avant.");
        } else {
          navigate('/firstpage/c');
        }
      });
  }

  async function checkEmployeeNumber(employee_num) {
    fetch(`http://127.0.0.1:5000/employes?id_employe=${employee_num}`)
      .then(response => response.json())
      .then(json => {
        setEmployeeData(json);
        if (json.length === 0) {
          alert("Votre comptes n'est pas activer");
        } else {
          navigate('/firstpage/e');
        }
      });
  }

  const handleClientLoginSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex_email.test(email)) {
      alert("Le email n'est pas valide");
      return;
    }
    else{
      checkClientEmail(email);
    }
    
    }

  const handleEmployeeLoginSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const employee_num = formData.get('employee_num');
    const regex_employeenum = /^\d{0,8}$/;
    if (!regex_employeenum.test(employee_num)) {
      alert("Le numero d'employer n'est pas valide ");
      return;
    }
    checkEmployeeNumber(employee_num)
  }
  

  return (
    <div>
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
              <br/>
              <button type="submit">Login</button>
            </form>
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
            <br/>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;

