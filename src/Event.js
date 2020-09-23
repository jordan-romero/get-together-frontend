console.log("Hello from Event.js")

fetch(EVENT_URL)
  .then(res => res.json())
  .then( event => console.log(event))