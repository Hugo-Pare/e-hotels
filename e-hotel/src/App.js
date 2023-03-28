/* eslint-disable react/jsx-pascal-case */
import './App.css';
import './Employee.css';
import Signup_client from './LoggedOut/signup_client.js';
import First_page_c from './Client/first_page_c';
import First_page_e from './Employee/first_page_e';
import Navbar from './LoggedOut/Navbar';
import Navbar_c from './Client/Navbar_c';
import Navbar_e from './Employee/Navbar_e';
import LoginEmployee from './LoggedOut/Login_e';
import LoginClient from './LoggedOut/Login_c';
import Info_e from './Employee/info_e';
import Location from './Employee/location';
import Hotel_rooms from './Client/Hotel_rooms';
import Info_chaine from './Client/Info_chaine';
import Reservation from './Client/Reservation';
import Info_c from './Client/Info_c';
import Welcome from './LoggedOut/Welcome';
import Hotel_rooms_e from './Employee/hotel_rooms_e';
import Hotels from './Client/Hotels';
import CreateLocation from './Employee/Create_location';
import Edit_hotel_room from './Employee/edit_hotel_room';
import Edit_hotel from './Employee/edit_hotel'
import LocationClient from './Client/Location';
import Location_existante from './Employee/location_existante'
import Choose_Client from './Employee/chooseClient';
import Employee_Create_Location from './Employee/employeeCreateLocation';

import { BrowserRouter as Router, Routes, Route, React} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
            <Route path="/" element={<><Navbar/> <Welcome/></>} />
            <Route exact path="/client" element={<><Navbar/> <LoginClient /></>} />
            <Route exact path="/employee" element={<><Navbar/><LoginEmployee /></>} />    
            <Route exact path="/signupClient" element={<><Navbar/> <Signup_client /> </>} />
        </Route>
        <Route exact path="/clientIn">
          <Route exact path="/clientIn" element={<><Navbar_c/><First_page_c /></>} />
          <Route exact path='/clientIn/info' element={<><Navbar_c />< Info_c/></>}/>
          <Route exact path='/clientIn/hotels' element={<><Navbar_c />< Hotels/></>}/>
          <Route exact path="/clientIn/hotelRooms" element={<><Navbar_c/><Hotel_rooms /></>} />
          <Route exact path="/clientIn/infoChaine" element={<><Navbar_c/><Info_chaine /></>} />
          <Route exact path="/clientIn/reservation" element={<><Navbar_c/><Reservation /></>} />
          <Route exact path="/clientIn/location" element={<><Navbar_c/><LocationClient /></>} />
        </Route>
        <Route exact path="/employeeIn">
            <Route exact path="/employeeIn" element={<><Navbar_e /><First_page_e /></>} />
            <Route exact path="/employeeIn/info" element={<><Navbar_e />< Info_e/></>} />
            <Route exact path='/employeeIn/location' element={<><Navbar_e />< Location/></>}/>
            <Route exact path='/employeeIn/hotel_rooms_e' element={<><Navbar_e />< Hotel_rooms_e/></>}/>
            <Route exact path='/employeeIn/edit_hotel_room' element={<><Navbar_e />< Edit_hotel_room/></>}/>
            <Route exact path='/employeeIn/edit_hotel' element={<><Navbar_e />< Edit_hotel/></>}/>
            <Route exact path="/employeeIn/createLocation" element={<><Navbar_e />< CreateLocation/></>}></Route>
            <Route exact path="/employeeIn/locationExistante" element={<><Navbar_e />< Location_existante/></>}></Route>
            <Route exact path="/employeeIn/chooseClient" element={<><Navbar_e />< Choose_Client/></>}></Route>
            <Route exact path="/employeeIn/employeeCreateLocation" element={<><Navbar_e /><Employee_Create_Location/></>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
