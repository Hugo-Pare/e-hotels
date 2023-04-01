import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginEmployee() {
  const [employeeData, setEmployeeData] = useState([]); //necessaire?
  const navigate = useNavigate();

  async function checkEmployeeNumber(employee_num) {
    fetch(`http://127.0.0.1:5000/employes?id_employe=${employee_num}`)
      .then(response => response.json())
      .then(json => {
        setEmployeeData(json);
        if (json.length === 0) {
          alert("Votre comptes n'est pas activer");
        } else {
          sessionStorage.setItem("id", employee_num)
          navigate('/employeeIn');
        }
      });
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
          <h2>Login Employé</h2>
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

  );
}

export default LoginEmployee;

