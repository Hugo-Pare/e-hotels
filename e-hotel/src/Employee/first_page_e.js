import { useLocation } from "react-router-dom";

function First_page_e(){
    
    const id_employe = useLocation().state.id
    console.log(id_employe)

    return(
        <div>
            <h1>Résérvations actifs</h1>
            <br/>
            <div>
                <label>
                    Email
                    <br/>
                    <input type="email" name="email"/>
                </label>
                <br/>
                <label>
                    Nom
                    <br/>
                    <input type="nom" name="nom" required />
                </label>
                <br/>
                <label>
                    Prénom
                    <br/>
                    <input type="prenom" name="prenom" required />
                </label>
                <br/>

                <button type="submit">Search</button>
                <button>Clear</button>
            </div>

            <div>
                <h2>Recherche de réservation avec ID</h2>
                <br/>
                <label>
                    ID
                    <br/>
                    <input type="prenom" name="prenom" required />
                </label> <br/>
                <button>Find</button>
            </div>

    </div>
        
    )
} 
export default First_page_e; 