// recuperer depuis localstorage
function getContacts() {
  return JSON.parse(localStorage.getItem('contacts'))
}

// um tableau de contatactes
let initialContacts = getContacts() || []

const countElement = document.querySelector('.count')
const table = document.querySelector('.table')
const tblBody = document.createElement('tbody')

// function counter
function setCount(count) {
  countElement.innerHTML = count
}

// ajouter dans localstorage
function setContacts(contacts) {
  localStorage.setItem('contacts', JSON.stringify(contacts))
}

setContacts(initialContacts)
let contacts = getContacts()

// remplir la table
function createTable() {
  for (let index = 0; index < contacts.length; index++) {
    let row = document.createElement('tr')
    // creer le button de supression
    let buttonCell = document.createElement('td')
    let deleteButton = document.createElement('button')
    let buttonText = document.createTextNode('Supprimer')
    deleteButton.setAttribute('class', 'delete-btn')
    deleteButton.appendChild(buttonText)

    for (
      let element = 0;
      element < Object.keys(contacts[0]).length;
      element++
    ) {
      // ajouter les td
      const cell = document.createElement('td')
      const cellText = document.createTextNode(
        Object.values(contacts[index])[element]
      )
      deleteButton.setAttribute('contactPhone', contacts[index].telephone)
      buttonCell.appendChild(deleteButton)
      cell.appendChild(cellText)
      row.appendChild(cell)
      row.appendChild(buttonCell)
      row.setAttribute('id', contacts[index].telephone)
    }
    tblBody.appendChild(row)
  }
  table.appendChild(tblBody)

  document.body.appendChild(table)
}

createTable()

let deleteButton = document.querySelectorAll('.delete-btn')

deleteButton.forEach(function (button) {
  button.addEventListener('click', function () {
    const telephone = this.getAttribute('contactPhone')

    let row = document.getElementById(telephone)
    row.parentNode.removeChild(row)

    // enlever l'element supprimer
    let filteredContacts = contacts.filter(
      (contact) => contact.telephone !== telephone
    )
    contacts = filteredContacts
    setCount(contacts.length)
    setContacts(contacts)
  })
})

// modal
let modal = document.getElementById('contactModal')
let modalButton = document.getElementById('addContactModalButton')
let close = document.querySelector('.close')

modalButton.onclick = function () {
  modal.style.display = 'block'
}

close.onclick = function () {
  modal.style.display = 'none'
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}

// ajouter un contact
let addContactButton = document.querySelector('.addContactButton')
addContactButton.onclick = function (event) {
  event.preventDefault()
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const telephone = document.getElementById('telephone').value
  if (!name || !email || !telephone) {
    alert('merci de tout remplir')
    return
  }
  const newContact = { name, email, telephone }
  contacts.push(newContact)
  setCount(contacts.length)
  setContacts(contacts)

  // ajouter un tr
  let row = document.createElement('tr')

  let cell0 = row.insertCell(0)
  const cell0Text = document.createTextNode(name)
  cell0.appendChild(cell0Text)
  row.appendChild(cell0)

  let cell1 = row.insertCell(1)
  const cell1Text = document.createTextNode(email)
  cell1.appendChild(cell1Text)
  row.appendChild(cell1)

  let cell2 = row.insertCell(2)
  const cell2Text = document.createTextNode(telephone)
  cell2.appendChild(cell2Text)
  row.appendChild(cell2)

  // creer le button de supression
  let buttonCell = document.createElement('td')
  let deleteButton = document.createElement('button')
  let buttonText = document.createTextNode('Supprimer')
  deleteButton.setAttribute('class', 'delete-btn')
  deleteButton.setAttribute('contactPhone', telephone)
  deleteButton.appendChild(buttonText)

  // ajouter un evenment
  deleteButton.addEventListener('click', function () {
    const telephone = this.getAttribute('contactPhone')

    let row = document.getElementById(telephone)
    row.parentNode.removeChild(row)

    // enlever l'element supprimer
    let filteredContacts = contacts.filter(
      (contact) => contact.telephone !== telephone
    )
    contacts = filteredContacts
    setCount(contacts.length)
    setContacts(contacts)
  })

  buttonCell.appendChild(deleteButton)

  row.appendChild(buttonCell)

  row.setAttribute('id', telephone)
  tblBody.appendChild(row)
  table.appendChild(tblBody)

  document.body.appendChild(table)

  // vider les inputs
  document.getElementById('name').value = ''
  document.getElementById('email').value = ''
  document.getElementById('telephone').value = ''
  modal.style.display = 'none'
}

setCount(contacts.length)
