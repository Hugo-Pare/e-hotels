/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns'

function Nbchambre_location(){
    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        getAllInfo()
    }, []) // ne pas changer, ca marche - touche pas :)

    async function getAllInfo(){
        fetch(`http://127.0.0.1:5000/nbchambre/location`)
        .then(response => response.json())
        .then(function(json){
            setData(json)
            setLoaded(true)
        })
    }

    return (
        <div>
          <h1>Nombres de chambre par région</h1>
          <br />
          {loaded ? (
            <div className="table">
              <table>
                <thead>
                  <tr key="titles">
                    <th>Pays</th>
                    <th>Province-State</th>
                    <th>City</th>
                    <th>Nombre de chambre</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((info) => (
                    <tr key={info.id}>
                      <td>{info.country}</td>
                      <td>{info.province_state}</td>
                      <td>{info.city}</td>
                      <td>{info.nb_chambre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* si data is empty, "aucune réservation trouvée" */}
              {data.length === 0 ? (
                <div className="no-result-found">Aucune Information Trouvée</div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div>
              <p>Loading Info ...</p>
            </div>
          )}
        </div>
      );
          }

export default Nbchambre_location; 