import "./style.css"
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css"
import personFacade from "./personFacade";

var tbody = document.getElementById("tbody");
var reload = document.getElementById("reload");
reload.addEventListener('click', (event) => {
  event.preventDefault;
  personFacade.getPersons()
  .then(data => {
    const personer = data.all;
    const tableRows = personer.map(getTableRows);
    const tableRowsStr = tableRows.join('');
    tbody.innerHTML = tableRowsStr;
  })
})

function getTableRows(person) {
  return `
  <tr>
    <td>${person.id}</td>
    <td>${person.fName}</td>
    <td>${person.lName}</td>
    <td>${person.phoneNumbers.all.map(getNumbers)}</td>
    <td>${person.email}</td>
    <td>${person.street}</td>
    <td>${person.zipCode}</td>
    <td>${person.city}</td>
    <td>${person.hobbies.all.map(getHobbies)}</td>
  </tr>
  `
}

function getNumbers(number) {
  var retVal = " ";
  retVal += number.pDescription + " - ";
  retVal += number.pNumbers;
  return retVal;
}

function getHobbies(hobby) {
  var retVal = " ";
  retVal += hobby.hNames + " - ";
  retVal += hobby.hDescription;
  return retVal;
}

var savebtn = document.getElementById("savebtn");
savebtn.addEventListener('click', (event) => {
  event.preventDefault;
  let fName = document.getElementById("fname").value;
  let lName = document.getElementById("lname").value;
  let pNumbers = document.getElementById("phoneNumbers").value;
  let pDescription = document.getElementById("phoneDesc").value;
  let email = document.getElementById("email").value;
  let street = document.getElementById("street").value;
  let zipCode = document.getElementById("zipCode").value;
  let city = document.getElementById("city").value;
  let additionalInfo = document.getElementById("additional").value;
  let hNames = document.getElementById("hobby").value;
  let hDescription = document.getElementById("hobbyDesc").value;
  const newUser = {
    fName,
    lName,
    pNumbers,
    pDescription,
    email,
    street,
    zipCode,
    city,
    additionalInfo,
    hNames,
    hDescription
  }
  personFacade.addPerson(newUser);
})

var searchHobby = document.getElementById("searchHobby");
searchHobby.addEventListener('click', (event) => {
  event.preventDefault;
  var hobbyName = document.getElementById("hobbyInput").value;
  personFacade.getPersonsByHobby(hobbyName)
  .then(data => {
    const personer = data.all;
    const tableRows = personer.map(getTableRows);
    const tableRowsStr = tableRows.join('');
    tbody.innerHTML = tableRowsStr;
    hobbyAmount.innerHTML += personer.length;
  })
})

var searchCity = document.getElementById("searchCity");
searchCity.addEventListener('click', (event) => {
  event.preventDefault;
  var cityName = document.getElementById("cityInput").value;
  personFacade.getPersonsInCity(cityName)
  .then(data => {
    const personer = data.all;
    const tableRows = personer.map(getTableRows);
    const tableRowsStr = tableRows.join('');
    tbody.innerHTML = tableRowsStr;
  })
})

var zipTableBody = document.getElementById("zipTableBody");

var getZips = document.getElementById("getZips");
getZips.addEventListener('click', (event) => {
  event.preventDefault;
  personFacade.getCities()
  .then(data => {
    const cities = data.all;
    const tableRows = cities.map(city => `
    <tr>
      <td>${city.city}</td>
      <td>${city.zipCode}</td>
    </tr>
    `)
    const tableRowsStr = tableRows.join('');
    zipTableBody.innerHTML = tableRowsStr;
  })
})

var savebtnEdit = document.getElementById("savebtnEdit");
savebtnEdit.addEventListener('click', (event) => {
  event.preventDefault;
  var id = document.getElementById("editID").value;
  let fName = document.getElementById("fnameEdit").value;
  let lName = document.getElementById("lnameEdit").value;
  let pNumbers = document.getElementById("phoneNumbersEdit").value;
  let pDescription = document.getElementById("phoneDescEdit").value;
  let email = document.getElementById("emailEdit").value;
  let street = document.getElementById("streetEdit").value;
  let zipCode = document.getElementById("zipCodeEdit").value;
  let city = document.getElementById("cityEdit").value;
  let additionalInfo = document.getElementById("additionalEdit").value;
  let hNames = document.getElementById("hobbyEdit").value;
  let hDescription = document.getElementById("hobbyDescEdit").value;
  const newUser = {
    fName,
    lName,
    pNumbers,
    pDescription,
    email,
    street,
    zipCode,
    city,
    additionalInfo,
    hNames,
    hDescription
  }
  personFacade.editPerson(id, newUser);
})