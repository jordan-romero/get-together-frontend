const BASE_URL = 'https://warm-gorge-22897.herokuapp.com'
const EVENT_URL = `${BASE_URL}/events` 
const CATEGORY_URL = `${BASE_URL}/categories`
const OCCASION_URL = `${BASE_URL}/occasions`
const OCCASION_EVENT_URL = `${OCCASION_URL}`
const body = document.querySelector('body')
const logo = document.querySelector('#logo')
const app = document.createElement('div')
const eventContainer = document.createElement('div')
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
    app.id = 'app-div'
    body.appendChild(app)
}

function displayEvents(){
    
    eventBtn.addEventListener("click", () => {
        app.innerHTML = ''
        eventContainer.innerHTML = ''
        body.style.backgroundImage = "url(https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=655&q=80)"
        initEvents(); 
        Event.renderEventHero();
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
    body.style.backgroundImage = "url(https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=655&q=80)"
    initOccasions(); 
    Occasion.renderOccasionHero()
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
    body.style.backgroundImage = "url(https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=655&q=80)"
    initCategories(); 
    Category.renderCatHero();
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




