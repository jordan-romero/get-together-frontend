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
        const { categorySelector, occasionSelector } = Event.eventFormContent(eventForm)
        Event.categoryDropdown(categorySelector)
        Event.occasionDropdown(occasionSelector) 
        eventForm.addEventListener('submit', Event.handleFormSubmit)
    }

    

    static eventFormContent(eventForm) {
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
        const categorySelector = document.createElement('select')
        categorySelector.id = 'select-category'
        categorySelector.name = 'category'
        const occasionSelector = document.createElement('select')
        occasionSelector.id = 'select-occasion'
        occasionSelector.name = 'occasion'
        const submitBtn = document.createElement('button')
        submitBtn.innerText = "Submit"
        eventForm.append(eventNameLabel, eventNameInput, eventDescLabel,
            eventDescInput, eventLocationLabel, eventLocationInput, eventLocationLabel,
            eventDurationLabel, eventDurationInput, eventCostLabel, eventCostInput,
            categorySelector, occasionSelector, submitBtn)
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
        ApiService.postEvent(newEvent)
          .then(event => {
            new Event (event)
          })
          .catch(error => alert(error))
        event.target.reset()
      }
}
