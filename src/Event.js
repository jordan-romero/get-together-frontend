class Event {
    constructor(event){
        this.event = event
        this.card = this.createCard()
    }

    static addEventBtn = () => {
        const addBtn = document.createElement('button')
        addBtn.className = 'btn btn-dark'
        addBtn.id = 'add-event-btn'
        addBtn.innerText = "Create Event"
        app.appendChild(addBtn) 

        Event.eventModalHandler(addBtn)
    }
    


    createCard = () => {
        const card = document.createElement('div')
        card.className = "card"
        card.dataset.id = this.event.id
        this.cardContent(card)
        app.appendChild(card)
    }


    static eventModalHandler(addBtn) {
        addBtn.addEventListener('click', () => {
            Event.createEventForm()
        })
    }

    static createEventForm() {
        modal.style.display = "block"
        const eventForm = document.createElement('form')
        modalContent.append(eventForm)
        const eventNameInput = document.createElement('input')
        eventNameInput.name = 'name'
        const eventDescInput = document.createElement('textarea')
        eventDescInput.name = 'description'
        const eventLocationInput = document.createElement('textarea')
        eventLocationInput.name = 'location'
        const eventDurationInput = document.createElement('input')
        eventDurationInput.name = 'duration'
        const eventCostInput = document.createElement('input')
        eventCostInput.name = 'cost'
        eventForm.append(eventNameInput, eventDescInput, eventLocationInput, eventDurationInput, eventCostInput)
    }

    cardContent(card) {
        const { name, description, duration, cost, location } = this.event
        const eventName = document.createElement('h2')
        eventName.className = 'h2'
        eventName.innerText = name
        const eventDesc =document.createElement('p')
        eventDesc.setAttribute('id', 'desc-p')
        eventDesc.innerText = description
        const eventLocation = document.createElement('p')
        eventLocation.setAttribute('id', 'location-p')
        eventLocation.innerText = location 
        const eventDurationCost = document.createElement('p')
        eventDurationCost.setAttribute('id', 'dur-cost-p')
        eventDurationCost.innerText = `${name} will cost ${cost} dollars and will be ${duration} long.`
        card.append(eventName, eventDesc, eventLocation, eventDurationCost)
    }

    createEventForm(){
        const eventForm = document.createElement('form')
        modalContent.append(eventForm)
        const eventNameInput = document.createElement('input')
        eventNameInput.name = 'name'
        const eventDescInput = document.createElement('textarea')
        eventDescInput.name = 'description'
        const eventLocationInput = document.createElement('textarea')
        eventLocationInput.name = 'location'
        const eventDurationInput = document.createElement('input')
        eventDurationInput.name = 'duration'
        const eventCostInput = document.createElement('input')
        eventCostInput.name = 'cost'
        eventForm.append(eventNameInput, eventDescInput, eventLocationInput, eventDurationInput, eventCostInput)

        // eventForm.addEventListener('submit', this.handleFormSubmit)
    }

//     handleFormSubmit(event){
//         event.preventDefault()
//         const newEvent = {
//           name: event.target["name"].value,
//           description: event.target["description"].value,
//           location: event.target["location"].value,
//           duration: event.target["duration"].value,
//           cost: event.target["cost"].value
//         }
//         ApiService.postEvent(newEvent)
//           .then(event => {
//             new Event (event)
//           })
//           .catch(error => alert(error))
//         event.target.reset()
//       }
}
