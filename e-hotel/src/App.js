import './App.css';
import './Employee.css';
import Signup_client from './LoggedOut/signup_client.js'
import First_page_c from './Client/first_page_c'
import First_page_e from './Employee/first_page_e'
import Navbar from './LoggedOut/Navbar';
import Navbar_c from './Client/Navbar_c';
import Navbar_e from './Employee/Navbar_e';
import LoginEmployee from './LoggedOut/Login_e';
import LoginClient from './LoggedOut/Login_c';

import { BrowserRouter as Router, Routes, Route, React} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
            <Route path="/" element={<><Navbar/></>} />
            {/* <Route path="/" element={<><Navbar/> <Welcome/></>} /> */}
            <Route path="/client" element={<><Navbar/> <LoginClient /></>} />
            <Route path="/employee" element={<><Navbar/><LoginEmployee /></>} />    
            <Route path="/signupClient" element={<><Navbar/> <Signup_client /> </>} />
        </Route>
        <Route path="/clientIn">
          <Route path="/clientIn" element={<First_page_c />} /> 
        </Route>
        <Route path="/employeeIn">
            <Route path="/employeeIn" element={<><Navbar_e /><First_page_e /></>} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
