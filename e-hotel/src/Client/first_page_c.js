import { useLocation } from "react-router-dom";
function First_page_c() {
    const location = useLocation();
   sessionStorage.setItem("email_id", location.state.clientEmail)
   console.log(sessionStorage.getItem("email_id"))


return(
    <h1>FIRST PAGE CLIENT</h1>
)
    
}
export default First_page_c; 