class Event {
    constructor(event){
        this.event = event
        this.card = this.createCard()
        console.log(event)
    }

    createCard = () => {
        const card = document.createElement('div')
        card.className = "card text-center"
        card.dataset.id = this.event.id
        this.cardContent(card)
        app.appendChild(card)
    }

    cardContent(card) {
        const { name, description, duration, cost, location } = this.event
        const eventName = document.createElement('div')
        eventName.id = 'card-head'
        eventName.className = 'card-header h2 pl-5'
        eventName.innerText = name
        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'btn'
        deleteBtn.innerText = 'X'
        deleteBtn.id = 'event-delete-btn'
        this.deleteEvent(deleteBtn, card)
        eventName.appendChild(deleteBtn)
        const eventDesc = document.createElement('p')
        eventDesc.className = 'card-body'
        eventDesc.id = 'desc-p'
        eventDesc.innerText = description
        const eventLocation = document.createElement('p')
        eventLocation.id = 'location-p'
        eventLocation.className = 'card-body'
        eventLocation.innerText = location 
        const eventDurationCost = document.createElement('p')
        eventDurationCost.id = 'dur-cost-p'
        eventDurationCost.className = 'card-footer'
        eventDurationCost.innerText = `${name} will cost ${cost} dollars and will be ${duration} long.`
        this.renderCardBackground(card)
        card.append(eventName, eventDesc, eventLocation, eventDurationCost)
    }

    static addEventBtn = () => {
        const addBtn = document.createElement('button')
        addBtn.className = 'btn'
        addBtn.id = 'add-event-btn'
        addBtn.innerText = "Create Event"
        app.appendChild(addBtn) 

        Event.eventListenerHandler(addBtn)
    }

    renderCardBackground(card) {
        if (this.event.category.name === "Art & Culture") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80)"; 
        } else if (this.event.category.name === "Comedy") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80)"
            card.style.backgroundSize = "47rem 20rem"
        } else if (this.event.category.name === "Outdoor Activities") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
            card.style.backgroundSize = "50rem 23rem"
        } else if (this.event.category.name === "Film & TV") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1568876694728-451bbf694b83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80)"
            card.style.backgroundSize = "50rem 23rem"
        } else if (this.event.category.name === "Food & Drink") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=931&q=80)"
            card.style.backgroundSize = "50rem"
        } else if (this.event.category.name === "Live Music") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)"
            card.style.backgroundSize = "50rem 25rem"
        } else if (this.event.category.name === "LGBTQ+") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1516119555254-e3b36f4b6769?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1062&q=80)"
            card.style.backgroundSize = "50rem 25rem"
        } else if (this.event.category.name === "Other") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1543718290-a207a786243a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
            card.style.backgroundSize = "50rem 25rem"
        }
    }

    deleteEvent(deleteBtn, card) {
        deleteBtn.addEventListener('click', () => {
            ApiService.removeEvent(this.event.id).then(card.remove())
        })
    }

    static eventListenerHandler(addBtn, card) {
        addBtn.addEventListener('click', () => {
            Event.createEventForm()

        })
    }

    static createEventForm() {
        modal.style.display = "block"
        const eventForm = document.createElement('form')
        eventForm.id = 'event-form'
        modalContent.append(eventForm)
        const { categorySelector, occasionSelector } = Event.eventFormContent(eventForm)
        Event.categoryDropdown(categorySelector)
        Event.occasionDropdown(occasionSelector) 
        eventForm.addEventListener('submit', Event.handleFormSubmit)
    }

    

    static eventFormContent(eventForm) {
        const eventNameDiv = document.createElement('div')
        eventNameDiv.className = 'form-group'
        const eventNameLabel = document.createElement('label')
        eventNameLabel.innerText = "Event Name:"
        const eventNameInput = document.createElement('input')
        eventNameInput.name = 'name'
        eventNameInput.className = 'form-control'
        eventNameDiv.append(eventNameLabel, eventNameInput)

        const eventDescDiv = document.createElement('div')
        eventDescDiv.className = 'form-group'
        const eventDescLabel = document.createElement('label')
        eventDescLabel.innerText = "Event Description:"
        const eventDescInput = document.createElement('textarea')
        eventDescInput.name = 'description'
        eventDescInput.className = 'form-control'
        eventDescDiv.append(eventDescLabel, eventDescInput)

        const eventLocationDiv = document.createElement('div')
        eventLocationDiv.className = 'form-group'
        const eventLocationLabel = document.createElement('label')
        eventLocationLabel.innerText = "Event Location:"
        const eventLocationInput = document.createElement('textarea')
        eventLocationInput.name = 'location'
        eventLocationInput.className = 'form-control'
        eventLocationDiv.append(eventLocationLabel, eventLocationInput)

        const eventDurationDiv = document.createElement('div')
        eventDurationDiv.className = 'form-group'
        const eventDurationLabel = document.createElement('label')
        eventDurationLabel.innerText = "Event Duration:"
        const eventDurationInput = document.createElement('input')
        eventDurationInput.name = 'duration'
        eventDurationInput.className = 'form-control'
        eventDurationDiv.append(eventDurationLabel, eventDurationInput)

        const eventCostDiv = document.createElement('div')
        eventCostDiv.className = 'form-group'
        const eventCostLabel = document.createElement('label')
        eventCostLabel.innerText = "Event Cost:"
        const eventCostInput = document.createElement('input')
        eventCostInput.name = 'cost'
        eventCostInput.type = 'number'
        eventCostInput.className = 'form-control'
        eventCostDiv.append(eventCostLabel, eventCostInput)

        const eventCatDiv = document.createElement('div')
        eventCatDiv.className = 'form-group'
        const categorySelectorLabel = document.createElement('label')
        categorySelectorLabel.innerText = 'Category:'
        const categorySelector = document.createElement('select')
        categorySelector.id = 'select-category'
        categorySelector.name = 'category'
        categorySelector.className = 'form-control'
        eventCatDiv.append(categorySelectorLabel, categorySelector)
        
        const eventOccasionDiv = document.createElement('div')
        eventOccasionDiv.className = 'form-group'
        const occasionSelectorLabel = document.createElement('label')
        occasionSelectorLabel.innerText = 'Occasion:'
        const occasionSelector = document.createElement('select')
        occasionSelector.id = 'select-occasion'
        occasionSelector.name = 'occasion'
        occasionSelector.className = 'form-control'
        eventOccasionDiv.append(occasionSelectorLabel, occasionSelector)

        const submitBtn = document.createElement('button')
        submitBtn.className = 'btn'
        submitBtn.id = 'event-submit'
        submitBtn.innerText = "Submit"
        eventForm.append(eventNameDiv, eventDescDiv, eventLocationDiv, 
            eventDurationDiv, eventCostDiv,
            eventCatDiv, eventOccasionDiv, submitBtn)
        return { categorySelector, occasionSelector }
    }

    static occasionDropdown(occasionSelector) {
        ApiService.getAllOccasions()
            .then(occasions => {
                occasions.forEach(occasion => {
                    let occasionOption = document.createElement("option")
                    occasionOption.textContent = occasion.name
                    occasionOption.value = occasion.name
                    occasionSelector.appendChild(occasionOption)
                })
            })
    }

    static categoryDropdown(categorySelector) {
        ApiService.getAllCategories()
            .then(categories => {
                categories.forEach(category => {
                    let option = document.createElement("option")
                    option.textContent = category.name
                    option.value = category.name
                    categorySelector.appendChild(option)
                })
            })
    }

    static handleFormSubmit(event) {
        event.preventDefault()
        modal.style.display = "none"
        const newEvent = {
          name: event.target["name"].value,
          description: event.target["description"].value,
          location: event.target["location"].value,
          duration: event.target["duration"].value,
          cost: event.target["cost"].value,
          category_name: event.target.category.value,
          occasion_name: event.target.occasion.value
        }
        Event.postEvent(newEvent, event)
      }

    static postEvent(newEvent, event) {
        ApiService.postEvent(newEvent)
            .then(event => {
                new Event(event)
            })
            .catch(error => alert(error))
        event.target.reset()
        modal.querySelector("form").remove()
    }

    
}
