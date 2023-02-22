import React, { useState } from 'react';

function Login() {
  const [showClientLogin, setShowClientLogin] = useState(false);
  const [showEmployeeLogin, setShowEmployeeLogin] = useState(false);

  const handleClientLogin = () => {
    setShowClientLogin(true);
  };

  const handleEmployeeLogin = () => {
    setShowEmployeeLogin(true)

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
        <div className="login-buttons" style={{marginRight: "10px"}}>
          <button onClick={handleEmployeeLogin}>Employee Login</button>
          <button onClick={handleClientLogin}>Client Login</button>
          <a href="/signup"><button>Sign Up</button></a>
        </div>
      </nav>
      {showClientLogin && (
        <div className="popup">
          <div className="popup-content">
            <h2>Client Login</h2>
            <form onSubmit={handleClientLoginSubmit}>
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <label>
                Name:
                <input type="text" name="name" required />
              </label>
              <button type="submit">Login</button>
            </form>
            <button className="close-button" onClick={() => setShowClientLogin(false)}>Close</button>
          </div>
        </div>
      )}
      {showEmployeeLogin && (
          <div className="popup-content">
          <h2>Employee Login</h2>
          <form onSubmit={handleEmployeeLoginSubmit}>
            <label>
              Email:
              <input type="text" name="employee_num" required />
            </label>
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <button type="submit">Login</button>
          </form>
          <button className="close-button" onClick={() => setShowEmployeeLogin(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Login;

