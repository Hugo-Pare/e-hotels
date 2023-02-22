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
        <Route path="/" element={<Login />} />
        <Route path="/signup/client" element={<Signup_client />} />
        <Route path="/firstpage/c" element={<First_page_c />} />
        <Route path="/firstpage/e" element={<First_page_e />} />
      </Routes>
    </Router>
  );
}

export default App;
