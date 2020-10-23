
const URL = "https://bloom-dat.dk/CA2_3SEM/api/person/";

function getPersons() {
    const options = makeOptions("GET");
    return fetch(URL+"all", options)
    .then(handleHttpErrors)
}

function addPerson(newUser) {
    const options = makeOptions("POST", newUser);
    return fetch(URL, options)
    .then(handleHttpErrors)
}




const personFacade = {
    getPersons,
    addPerson
}



function makeOptions(method, body) {
    var opts =  {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if(body){
      opts.body = JSON.stringify(body);
    }
    return opts;
}

function handleHttpErrors(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
}

export default personFacade;