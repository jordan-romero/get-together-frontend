const BASE_URL = 'http://localhost:3000'
const EVENT_URL = `${BASE_URL}/events` 
const CATEGORY_URL = `${BASE_URL}/categories`
const OCCASION_URL = `${BASE_URL}/occasions`
const OCCASION_EVENT_URL = `${OCCASION_URL}`
const body = document.querySelector('body')
const logo = document.querySelector('#logo')
const app = document.createElement('div')
const eventBtn = document.createElement('button')
const occasionBtn = document.createElement('button')
const categoriesBtn = document.createElement('button')
const modal = document.querySelector('#myModal')
const modalContent = document.querySelector('.modal-content')


createAppDiv();
displayEvents(); 
displayOccasions(); 
displayCategories();
Home.renderHome(); 
Home.createHeaderDiv();

function createAppDiv() {
    app.setAttribute('id', 'app-div')
    body.appendChild(app)
}

function displayEvents(){
    
    eventBtn.addEventListener("click", () => {
        app.innerHTML = ""
        body.style.backgroundImage = "url(https://images.unsplash.com/photo-1601191905893-d270babd8c87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80)"
        initEvents(); 
        Event.addEventBtn(); 
    })
}

function initEvents() {
    ApiService.getAllEvents().then(events => {
        events.forEach(event => new Event(event));
    });
}

function displayOccasions(){
  occasionBtn.addEventListener('click', () => {
    app.innerHTML = ''
    body.style.backgroundImage = "url(https://images.unsplash.com/photo-1601191905893-d270babd8c87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80)"
    initOccasions(); 
    Occasion.addOccasionBtn(); 
  })
}

function initOccasions() {
  ApiService.getAllOccasions().then(occasions => {
    occasions.forEach(occasion => new Occasion(occasion))
  })
}

function displayCategories(){
  categoriesBtn.addEventListener('click', () => {
    app.innerHTML = ''
    body.style.backgroundImage = "url(https://images.unsplash.com/photo-1601191905893-d270babd8c87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80)"
    initCategories(); 
  })
}

function initCategories() {
  ApiService.getAllCategories().then(categories => {
    categories.forEach(category => new Category(category))
  })
}

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  modal.querySelector("form").remove()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.querySelector("form").remove()
  }
}




$(function () {
  $('[data-toggle="popover"]').popover()
  })
// // find all elements with data-content attribute
// let popoverTargets = document.querySelectorAll('#occ-event-id'); // also a certain class would go fine
// console.log(popoverTargets)
// // initialize Popover for each element
// Array.from(popoverTargets).map(
//   popTarget => new BSN.Popover( popTarget, {
//     placement: 'top', //string
//     animation: 'slideNfade', // CSS class
//     delay: 100, // integer
//     dismissible: true, // boolean
//   })
// );