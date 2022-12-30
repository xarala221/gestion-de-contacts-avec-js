// nous avons un tableau de 3 elements

let initialContacts = [
  {
    nom: 'Ousseynou DIOP',
    email: 'oussynou@gmail.com',
    telephone: '779979952',
  },
  { nom: 'Awa Gaye', email: 'awagaye@gmail.com', telephone: '779921952' },
  { nom: 'Abdou Coulibaly', email: 'abdou@gmail.com', telephone: '779925952' },
]

const countElement = document.querySelector('.count')

const table = document.querySelector('.table')

const tblBody = document.createElement('tbody')

function getContacts() {
  const contacts = JSON.parse(localStorage.getItem('contacts'))
  return contacts
}

function setContacts(contacts) {
  localStorage.setItem('contacts', JSON.stringify(contacts))
}

// nous allons initialiser la liste de contacte
setContacts(initialContacts)

// ici on recupere les contactes depuis localStorage
let contacts = getContacts()

// cette fonction permet d'actualiser le nombre de contacte
function setCount(count) {
  countElement.innerHTML = count
}

//  nous creeons une fonction qui nous permet de creer une table

function createTable() {
  for (let j = 0; j < 3; j++) {
    var row = document.createElement('tr')
    var buttonCell = document.createElement('td')
    let deleteButton = document.createElement('button')
    let deleteButtonText = document.createTextNode('Supprimer')
    deleteButton.setAttribute('class', 'delete-btn')
    deleteButton.appendChild(deleteButtonText)

    for (var i = 0; i < contacts.length; i++) {
      const cell = document.createElement('td')
      const cellText = document.createTextNode(Object.values(contacts[j])[i])
      cell.appendChild(cellText)
      deleteButton.setAttribute('contactPhone', contacts[j].telephone)
      buttonCell.appendChild(deleteButton)
      row.appendChild(cell)
      row.appendChild(buttonCell)
      row.setAttribute('id', contacts[j].telephone)
    }
    tblBody.appendChild(row)
  }
  table.appendChild(tblBody)

  document.body.appendChild(table)
}

createTable()

var deleteButton = document.querySelectorAll('.delete-btn')

// Cette fonction renvoie un nouveau tableau avec lesmfilteres

function removeObjectWithPhone(arr, phone) {
  return arr.filter((obj) => obj.telephone !== phone)
}

// nous allons ajouter un event lister a nos buttons de suppressions
deleteButton.forEach(function (selector) {
  selector.addEventListener('click', function () {
    const phone = this.getAttribute('contactPhone')
    // on veut supprimer une ligne en se basant sur son ID, qui est le numero de telephone ici
    var row = document.getElementById(phone)
    row.parentNode.removeChild(row)
    // le resultat apres la suppression
    var filteredArray = removeObjectWithPhone(contacts, phone)
    contacts = filteredArray
    setContacts(filteredArray)
    setCount(filteredArray.length)
  })
})

// Get the modal
var modal = document.getElementById('contactModal')

// Get the button that opens the modal
var modalButton = document.getElementById('addContactModalButton')

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0]

// When the user clicks the button, open the modal
modalButton.onclick = function () {
  modal.style.display = 'block'
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}

// Add new contact
const addContactButton = document.querySelector('.addContactButton')
addContactButton.onclick = function (event) {
  event.preventDefault()
  // recuperer les informations
  const nom = document.getElementById('name').value
  const email = document.getElementById('email').value
  const telephone = document.getElementById('telephone').value
  // controler si les champs ne sont pas vides
  if (!nom || !email || !telephone) {
    alert('Merci de remplir tous les champs!')
    return
  }
  // creer un nouveau contacte
  const newContact = { nom, email, telephone }
  contacts.push(newContact)
  // ajouter le contacte sur le local storage
  setContacts(contacts)
  setCount(contacts.length)
  // ajouter un nouveau row
  var row = document.createElement('tr')
  // creer un button
  var buttonCell = document.createElement('td')
  let deleteButton = document.createElement('button')
  let deleteButtonText = document.createTextNode('Supprimer')
  deleteButton.setAttribute('class', 'delete-btn')
  deleteButton.appendChild(deleteButtonText)

  const cell0 = row.insertCell(0)
  const cell0Text = document.createTextNode(nom)
  cell0.appendChild(cell0Text)

  const cell1 = row.insertCell(1)
  const cell1Text = document.createTextNode(email)
  cell1.appendChild(cell1Text)

  const cell2 = row.insertCell(2)
  const cell2Text = document.createTextNode(telephone)
  cell2.appendChild(cell2Text)

  deleteButton.setAttribute('contactPhone', telephone)

  deleteButton.addEventListener('click', function () {
    const phone = this.getAttribute('contactPhone')
    // on veut supprimer une ligne en se basant sur son ID, qui est le numero de telephone ici
    var row = document.getElementById(phone)
    row.parentNode.removeChild(row)
    // le resultat apres la suppression
    var filteredArray = removeObjectWithPhone(contacts, phone)
    contacts = filteredArray
    setCount()
  })
  buttonCell.appendChild(deleteButton)
  row.appendChild(cell0)
  row.appendChild(cell1)
  row.appendChild(cell2)
  row.appendChild(buttonCell)
  row.setAttribute('id', telephone)

  tblBody.appendChild(row)
  table.appendChild(tblBody)

  // vider les inputs
  document.getElementById('name').value = ''
  document.getElementById('email').value = ''
  document.getElementById('telephone').value = ''
  // fermer le modal apres l'ajout
  modal.style.display = 'none'
}

setCount(contacts.length)
