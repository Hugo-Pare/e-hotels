import { useLocation } from "react-router-dom";

function First_page_e(){
    
    const id_employe = useLocation().state.id
    console.log(id_employe)

    return(
        <div className="grid-page">
            <div>
                <h1>Résérvations actifs</h1>
                <br/>
                <div className="grid-search">
                    <div> <label>
                        Email
                        <br/>
                        <input type="email" name="email"/>
                    </label></div>
                    <div><label>
                        Nom
                        <br/>
                        <input type="nom" name="nom" />
                    </label></div>
                    <div><label>
                        Prénom
                        <br/>
                        <input type="prenom" name="prenom" />
                    </label></div>
                    <div>
                    <button className="hug-bottom" type="submit">Search</button>
             
                    </div>
                    <div>
                    <button className="hug-bottom">Clear</button> 
                    </div>
   
                </div>
                </div>
                <div>
                    <h2>Recherche de réservation avec ID</h2>
                    <br/>
                    <label>
                        ID
                        <br/>
                        <input type="prenom" name="prenom" required />
                    </label> <br/>
                    <button>Search</button>
                </div>

        </div>
        
    )
} 
export default First_page_e; 