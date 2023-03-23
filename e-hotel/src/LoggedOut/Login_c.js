/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginClient() {
  const [showClientLogin, setShowClientLogin] = useState(false); //necessaire?
  const [clientData, setClientData] = useState([]); //necessaire?
  const navigate = useNavigate();

  async function checkClientEmail(email) {
    fetch(`http://127.0.0.1:5000/clients?email=${email}`)
      .then(response => response.json())
      .then(json => {
        setClientData(json);
        if (json.length === 0) {
          alert("S'il vous plait vous enregistrer avant.");
        } else {
          sessionStorage.setItem("email_id", email)
          navigate('/clientIn');
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

  return (
    <div>
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
        
   
  );
}

export default LoginClient;

