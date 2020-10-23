
const URL = "https://bloom-dat.dk/CA2_3SEM/api/person/";

function getPersons() {
    const options = makeOptions("GET");
    return fetch(URL+"all", options)
    .then(handleHttpErrors)
}

function getPerson(id) {
  const options = makeOptions("GET");
  return fetch(url+id, options)
  .then(handleHttpErrors)
}

function editPerson(id, newUser) {
  const options = makeOptions("PUT", newUser);
  return fetch(URL+id, options)
  .then(handleHttpErrors)
}

function addPerson(newUser) {
    const options = makeOptions("POST", newUser);
    return fetch(URL, options)
    .then(handleHttpErrors)
}

function getPersonsByHobby(hobby) {
  const options = makeOptions("GET");
  return fetch(URL+"hobby/"+hobby, options)
  .then(handleHttpErrors)
}

function getPersonsInCity(city) {
  const options = makeOptions("GET");
  return fetch(URL+"city/"+city, options)
  .then(handleHttpErrors)
}

function getCities() {
  const options = makeOptions("GET");
  return fetch(URL+"all/zipcodes", options)
  .then(handleHttpErrors)
}

const personFacade = {
    getPersons,
    getPerson,
    editPerson,
    addPerson,
    getPersonsByHobby,
    getPersonsInCity,
    getCities
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