console.log("hello from index")
const BASE_URL = 'http://localhost:3000'
const EVENT_URL = `${BASE_URL}/events` 
const CATEGORY_URL = `${BASE_URL}/categories`
const OCCASION_URL = `${BASE_URL}/occasions`
const body = document.querySelector('body')
const app = document.createElement('div')
const eventBtn = document.createElement('button')
const occasionBtn = document.createElement('button')
const modal = document.querySelector('#myModal')
const modalContent = document.querySelector('.modal-content')


createAppDiv();
createHeaderDiv();
displayEvents(); 
displayOccasions(); 

function createAppDiv() {
    app.setAttribute('id', 'app-div')
    body.appendChild(app) 
    console.log(app)
}

function createHeaderDiv() {
  const header = document.createElement('div');
  header.className = 'display-1 text-center';
  header.id = 'header';
  header.innerText = 'get-together';
  app.appendChild(header);
  const subheader = createSubheaderDiv(header)
  createBtnDiv(subheader)
}


function createSubheaderDiv(header) {
  const subheader = document.createElement('div')
  subheader.className = 'h4 text-center'
  subheader.id = 'subheader'
  subheader.innerText = 'Planning made Easy'
  header.appendChild(subheader)
  return subheader
}

function createBtnDiv(subheader) {
  const eventBtnDiv = document.createElement('div')
  subheader.appendChild(eventBtnDiv)
  eventBtn.className = 'btn btn-xl'
  eventBtn.id = 'event-btn'
  eventBtn.innerText = 'Events'
  eventBtnDiv.append(eventBtn)
  const occasionBtnDiv = document.createElement('div')
  subheader.append(occasionBtnDiv)
  occasionBtn.className = 'btn'
  occasionBtn.id = 'occasion-btn'
  occasionBtn.innerText = 'get-togethers'
  occasionBtnDiv.appendChild(occasionBtn)
}

function displayEvents(){
    
    eventBtn.addEventListener("click", () => {
        app.innerHTML = ""
        // body.style.backgroundColor = '#fae29f'
        // body.style.backgroundImage = 'none'
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
    initOccasions(); 
  })
}

function initOccasions() {
  ApiService.getAllOccasions().then(occasions => {
    occasions.forEach(console.log)
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
