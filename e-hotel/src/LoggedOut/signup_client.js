import { post } from 'jquery';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup_client() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [socialInsuranceNumber, setSocialInsuranceNumber] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();



  async function checkEmailExistence(email) {
    const response = await fetch(`http://127.0.0.1:5000/clients/exists?email=${email}`);
    const data = await response.json();
    if (data[0].exists === 'true') {
      alert("S'il vous plaît utiliser un email qui n'est pas déjà associer à un compte");
    } else {
      addToDataBase();
    }
  }

  function addToDataBase() {

    const json = {
      "city": city,
      "country": country,
      "email": email,
      "firstname": firstName,
      "lastname": lastName,
      "nas": parseInt(socialInsuranceNumber),
      "province_state": province,
      "street_name": streetName,
      "street_num": parseInt(streetNumber),
      "telephone": parseInt(phoneNumber),
      "zip_code": postalCode
  }
    console.log(json)
    fetch('http://127.0.0.1:5000/signup/client', {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(json),
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      })
      .then(response => response.json())
      .then(function(json){
          console.log(json)
      })
  }

  const handleSignUpClick = () => {
    const regex_name = /^[a-zA-Z]{2,}$/;
    const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
    const regex_phonenumber = /^\d{10,12}$/;
    const regex_streetnum = /^\d{1,8}$/;
    const regex_nas = /^\d{9}$/;
    const regex_postalcode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    const regex_zip = /^\d{5}$/;
    const regex_string = /[a-zA-Z]+/; 
    if (!firstName || !lastName || !email || !phoneNumber || !socialInsuranceNumber || !streetNumber || !streetName || !city || !province || !postalCode || !country) {
      alert("S'il vous plait remplir tout les champs");
      setIsClicked(true);
      return;
    }
    if (!regex_name.test(firstName)) {
      alert("Le prénom doit avoir au moins 2 lettres et ne doit contenir que des lettres alphabétiques.");
      setIsClicked(true);
      return;
    }
    if (!regex_name.test(lastName)) {
      alert("Le nom doit avoir au moins 2 lettres et ne doit contenir que des lettres alphabétiques.");
      setIsClicked(true);
      return;
    }
    if (!regex_email.test(email)) {
      alert("Le courriel n'est pas valide");
      setIsClicked(true);
      return;
    }
    if (!regex_phonenumber.test(phoneNumber)) {
      alert("Le numero de telephone n'est pas valide");
      setIsClicked(true);
      return;
    } 
    if (!regex_nas.test(socialInsuranceNumber)) {
      alert("Le numero d'assurance sociale n'est pas valide");
      setIsClicked(true);
      return;
    }
    if (!regex_streetnum.test(streetNumber)) {
      alert("Le numero d'assurance sociale n'est pas valide");
      setIsClicked(true);
      return;
    }
    if (!regex_streetnum.test(streetNumber)) {
      alert("Le numero d'assurance sociale n'est pas valide");
      setIsClicked(true);
      return;
    }
    if (!regex_string.test(country)) {
      alert("Le pays n'est pas valide");
      setIsClicked(true);
      return;
    }
    if(!regex_string.test(province)) {
      alert("La province n'est pas valide");
      setIsClicked(true);
      return;
    }
    if (!regex_string.test(city)) {
      alert("La ville n'est pas valide");
      setIsClicked(true);
      return;
    }
    if (country == "Canada" && (!regex_postalcode.test(postalCode))) {
      alert("Le code postale n'est pas valide");
      setIsClicked(true);
      return; 
    }
    if (country == "Etats-Unis" && (!regex_zip.test(postalCode))) {
      console.log (country)
      alert("Le zip n'est pas valide");
      setIsClicked(true);
      return;
    }
    else {
      checkEmailExistence(email);
      //navigate('/');
        
    }
    }
  
    
  return (
    
    <div>
      <h1>S'enregistrer</h1>

      <label style={{color: isClicked && !firstName ? 'red' : 'black'}} htmlFor="firstName">
        Prénom:
        <br/>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
      </label>
      <br />
      <label style={{color: isClicked && !lastName ? 'red' : 'black'}} htmlFor="lastName">
        Nom:
        <br/>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <br />
      <label style={{color: isClicked && !email ? 'red' : 'black'}} htmlFor="email">
        Email:
        <br/>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label style={{color: isClicked && !phoneNumber ? 'red' : 'black'}} htmlFor="phoneNumber">
        Numéro de téléphone:
        <br/>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br />
      <label style={{color: isClicked && !socialInsuranceNumber ? 'red' : 'black'}} htmlFor="socialInsuranceNumber">
        Numéro d'assurance sociale:
        <br/>
        <input type="number" value={socialInsuranceNumber} onChange={(e) => setSocialInsuranceNumber(e.target.value)} />
      </label>
      <br />
      <h3>Adresse:</h3>
      <label style={{color: isClicked && !streetNumber ? 'red' : 'black'}} htmlFor="streetNumber">
        Numéro de rue:
        <br/>
        <input type="text" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} />
      </label>
      <br />
      <label style={{color: isClicked && !streetName ? 'red' : 'black'}} htmlFor="streetName">
        Nom de rue:
        <br/>
        <input type="text" value={streetName} onChange={(e) => setStreetName(e.target.value)} />
      </label>
      <br />
      <label style={{color: isClicked && !city ? 'red' : 'black'}} htmlFor="city">
        Ville:
        <br/>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <br/>
        <label style={{color: isClicked && !province ? 'red' : 'black'}} htmlFor="Province/State">
          Province/State:
          <br/>
          <input type="text" value={province} onChange={(e) => setProvince(e.target.value)}/>
        </label>
        <br/>
        <label style={{color: isClicked && !postalCode ? 'red' : 'black'}} htmlFor="Code_Postal/Zip">
          Code Postal/Zip:
          <br/>
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
        </label>
        <br/>
        <label style={{color: isClicked && !country ? 'red' : 'black'}} htmlFor="Pays">
          Pays :
          <br/>
          <select id="Pays" name="Pays" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">--Choisir un pays--</option>
            <option value="Canada">Canada</option>
            <option value="Etats-Unis">États-Unis</option>
          </select>
        </label>
        <br/>
          <button onClick={handleSignUpClick}>Sign up</button>
        </div>
    )
}
export default Signup_client;