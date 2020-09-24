console.log("hello from index")
const BASE_URL = 'http://localhost:3000'
const EVENT_URL = `${BASE_URL}/events` 
const CATEGORY_URL = `${BASE_URL}/categories`
const OCCASION_URL = `${BASE_URL}/occasions`
const body = document.querySelector('body')
const app = document.createElement('div')
const eventBtn = document.querySelector('#event-btn')
const modal = document.querySelector('#myModal')
const modalContent = document.querySelector('.modal-content')


createAppDiv();
displayEvents(); 

function createAppDiv() {
    app.setAttribute('id', 'app-div')
    body.appendChild(app) 
    console.log(app)
}

function displayEvents(){
    eventBtn.addEventListener("click", () => {
        app.innerHTML = ""
        initEvents(); 
        Event.addEventBtn(); 
    })
}

function initEvents() {
    ApiService.getAllEvents().then(events => {
        events.forEach(event => new Event(event));
    });
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
