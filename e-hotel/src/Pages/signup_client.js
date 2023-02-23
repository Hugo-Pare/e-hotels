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

  const handleSignUpClick = () => {
    const regex_firstname = /^[a-zA-Z]{2,}$/;
    const regex_lastname = /^[a-zA-Z]{2,}$/;
    const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
    const regex_phonenumber = /^(\d{3}-|\(\d{3}\) )\d{3}-\d{4}$/;
    const regex_streetnum = /^\d{0,8}$/;
    const regex_nas = /^\d{9}$/;
    const regex_postalcode = /\b[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d\b/;
    const regex_string = /[a-zA-Z]+/; 
    if (!firstName || !lastName || !email || !phoneNumber || !socialInsuranceNumber || !streetNumber || !streetName || !city || !province || !postalCode || !country) {
      alert("S'il vous plait remplir tout les champs");
      setIsClicked(true);
      return;
    }
    if (!regex_firstname.test(firstName)) {
      alert("Le prénom doit avoir au moins 2 lettres et ne doit contenir que des lettres alphabétiques.");
      setIsClicked(true);
      return;
    }
    if (!regex_lastname.test(lastName)) {
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
    if (!regex_postalcode.test(postalCode)) {
      alert("Le code postale n'est pas valide");
      setIsClicked(true);
      return;
    }
    if (!regex_string.test(country)) {
      alert("Le pays n'est pas valide");
      setIsClicked(true);
      return;
    }
    if (!regex_string.test(province)) {
      alert("La province n'est pas valide");
      setIsClicked(true);
      return;
    }
    if (!regex_string.test(city)) {
      alert("La ville n'est pas valide");
      setIsClicked(true);
      return;
    }

    else {
      navigate('/');
        
    }
    
    
};
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
          Pays:
          <br/>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}/>
        </label>
        <br/>
          <button onClick={handleSignUpClick}>Sign up</button>
        </div>
    )
}
export default Signup_client;