import { useLocation } from "react-router-dom";
function First_page_c() {
    const location = useLocation();
   
    console.log(location.state)


return(
    <h1>FIRST PAGE CLIENT</h1>
)
    
}
export default First_page_c; 