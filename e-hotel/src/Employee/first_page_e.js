import { useLocation } from "react-router-dom";
function First_page_e() {
    const location = useLocation();
   
    console.log(location.state)


    return(
        <h1>FIRST PAGE EMPLOYER</h1>
    )
        
    }
    export default First_page_e; 