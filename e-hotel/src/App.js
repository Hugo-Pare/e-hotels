import './App.css';
import Signup_client from './Pages/signup_client.js'
import Login from './Pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup_client />} />
      </Routes>
    </Router>
  );
}

export default App;
