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

    static eventModalHandler(addBtn) {
        addBtn.addEventListener('click', () => {
            Event.createEventForm()
        })
    }

    static createEventForm() {
        modal.style.display = "block"
        const eventForm = document.createElement('form')
        modalContent.append(eventForm)
        Event.createFormContent(eventForm)
        eventForm.addEventListener('submit', Event.handleFormSubmit)
    }

    static createFormContent(eventForm) {
        const eventNameLabel = document.createElement('label')
        eventNameLabel.innerText = "Event Name:"
        const eventNameInput = document.createElement('input')
        eventNameInput.name = 'name'
        const eventDescLabel = document.createElement('label')
        eventDescLabel.innerText = "Event Description:"
        const eventDescInput = document.createElement('textarea')
        eventDescInput.name = 'description'
        const eventLocationLabel = document.createElement('label')
        eventLocationLabel.innerText = "Event Location:"
        const eventLocationInput = document.createElement('textarea')
        eventLocationInput.name = 'location'
        const eventDurationLabel = document.createElement('label')
        eventDurationLabel.innerText = "Event Duration:"
        const eventDurationInput = document.createElement('input')
        eventDurationInput.name = 'duration'
        const eventCostLabel = document.createElement('label')
        eventCostLabel.innerText = "Event Cost:"
        const eventCostInput = document.createElement('input')
        eventCostInput.name = 'cost'
        const categorySelector = document.createElement()
    
        const submitBtn = document.createElement('button')
        submitBtn.innerText = "Submit"
        eventForm.append(eventNameLabel, eventNameInput, eventDescLabel,
            eventDescInput, eventLocationLabel, eventLocationInput, eventLocationLabel,
            eventDurationLabel, eventDurationInput, eventCostLabel, eventCostInput, submitBtn)
    }

    static handleFormSubmit(event) {
        event.preventDefault()
        const newEvent = {
          name: event.target["name"].value,
          description: event.target["description"].value,
          location: event.target["location"].value,
          duration: event.target["duration"].value,
          cost: event.target["cost"].value
        }
        ApiService.postEvent(newEvent)
          .then(event => {
            new Event (event)
          })
          .catch(error => alert(error))
        event.target.reset()
      }
}
