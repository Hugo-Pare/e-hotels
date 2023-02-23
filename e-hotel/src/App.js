import './App.css';
import Signup_client from './Pages/signup_client.js'
import Login from './Pages/Login'
import First_page_c from './Pages/first_page_c'
import First_page_e from './Pages/first_page_e'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signedOut">
          <Navbar />
            <Route path="/login" element={<Login />} />
            <Route path="/signupClient" element={<Signup_client />} />
        </Route>
        <Route path="/clientIn/:email">
          <Navbar_c />
          <Route path="/" element={<First_page_c />} /> 
        </Route>
        <Route path="/employeeIn">
          <Navbar_e />
            <Route path="/" element={<First_page_e />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
