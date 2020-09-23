console.log("hello from index")
const BASE_URL = 'http://localhost:3000'
const EVENT_URL = `${BASE_URL}/events` 
const body = document.querySelector('body')
createAppDiv();

function createAppDiv() {
    const app = document.createElement('div')
    app.setAttribute('id', 'app-div')
    body.appendChild(app) 
    console.log(app)
}

