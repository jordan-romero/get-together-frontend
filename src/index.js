console.log("hello from index")
const BASE_URL = 'http://localhost:3000'
const EVENT_URL = `${BASE_URL}/events` 
const body = document.querySelector('body')
const app = document.createElement('div')
createAppDiv();
fetchEvents();

function createAppDiv() {
    app.setAttribute('id', 'app-div')
    body.appendChild(app) 
    console.log(app)
}

function fetchEvents() {
    ApiService.getAllEvents().then(events => {
        events.forEach(event => new Event(event));
    });
}

