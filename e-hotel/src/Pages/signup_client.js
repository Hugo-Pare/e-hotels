import React, { useState } from 'react';

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

  const handleSignUpClick = () => {
    if (!firstName || !lastName || !email || !phoneNumber || !socialInsuranceNumber || !streetNumber || !streetName || !city || !province || !postalCode || !country) {
      alert("S'il vous plait remplir tout les champs");
      setIsClicked(true);
      return;
    }
    else {
        alert('Enregistrement terminer')
    }
    
};
  return (
    <div>
      <h1>S'enregistrer</h1>

      <label style={{color: isClicked && !firstName ? 'red' : 'black'}} htmlFor="firstName">
        Prénom:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <br />
      <label style={{color: isClicked && !lastName ? 'red' : 'black'}} htmlFor="lastName">
        Nom:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <br />
      <label style={{color: isClicked && !email ? 'red' : 'black'}} htmlFor="email">
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label style={{color: isClicked && !phoneNumber ? 'red' : 'black'}} htmlFor="phoneNumber">
        Numéro de téléphone:
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br />
      <label style={{color: isClicked && !socialInsuranceNumber ? 'red' : 'black'}} htmlFor="socialInsuranceNumber">
        Numéro d'assurance sociale:
        <input type="number" value={socialInsuranceNumber} onChange={(e) => setSocialInsuranceNumber(e.target.value)} />
      </label>
      <br />
      <h3>Adresse:</h3>
      <label style={{color: isClicked && !streetNumber ? 'red' : 'black'}} htmlFor="streetNumber">
        Numéro de rue:
        <input type="text" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} />
      </label>
      <br />
      <label style={{color: isClicked && !streetName ? 'red' : 'black'}} htmlFor="streetName">
        Nom de rue:
        <input type="text" value={streetName} onChange={(e) => setStreetName(e.target.value)} />
      </label>
      <br />
      <label style={{color: isClicked && !city ? 'red' : 'black'}} htmlFor="city">
        Ville:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <br/>
        <label style={{color: isClicked && !province ? 'red' : 'black'}} htmlFor="Province/State">
          Province/State:
          <input type="text" value={province} onChange={(e) => setProvince(e.target.value)}/>
        </label>
        <br/>
        <label style={{color: isClicked && !postalCode ? 'red' : 'black'}} htmlFor="Code_Postal/Zip">
          Code Postal/Zip:
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
        </label>
        <br/>
        <label style={{color: isClicked && !country ? 'red' : 'black'}} htmlFor="Pays">
          Pays:
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}/>
        </label>
        <br/>
          <button onClick={handleSignUpClick}>Sign up</button>
        </div>
    )
}
export default Signup_client;