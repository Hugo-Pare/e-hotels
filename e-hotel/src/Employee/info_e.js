function info_e(){

    let id_employe = sessionStorage.getItem("id")
    
    
    checkEmployeeNumber()
    async function checkEmployeeNumber() {
        fetch(`http://127.0.0.1:5000/employes?id_employe=${id_employe}`)
          .then(response => response.json())
          .then(json => {
            console.log(json)
          });
      }

    return(

        <div>
            <h3>Prenom</h3>
            <h3 id="prenom">bla</h3>
        </div>

    )

} export default info_e;