class EventForm {

    static eventListenerHandler(addBtn) {
        addBtn.addEventListener('click', () => {
            EventForm.createEventForm()

        })
    }

    static createEventForm() {
        modal.style.display = "block"
        const eventForm = document.createElement('form')
        eventForm.id = 'event-form'
        modalContent.append(eventForm)
        const { categorySelector, occasionSelector } = EventForm.eventFormContent(eventForm)
        EventForm.categoryDropdown(categorySelector)
        EventForm.occasionDropdown(occasionSelector) 
        eventForm.addEventListener('submit', EventForm.handleFormSubmit)
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

    static occasionDropdown(occasionSelector, selectedOccasion) {
        ApiService.getAllOccasions(selectedOccasion)
            .then(occasions => {
                occasions.forEach(occasion => {
                    let occasionOption = document.createElement("option")
                    occasionOption.textContent = occasion.name
                    occasionOption.value = occasion.name
                    if(selectedOccasion && selectedOccasion === occasion.name){
                        option.selected = true
                      }
                    occasionSelector.appendChild(occasionOption)
                })
            })
    }

    static categoryDropdown(categorySelector, selectedCategory) {
        ApiService.getAllCategories(selectedCategory)
            .then(categories => {
                categories.forEach(category => {
                    let option = document.createElement("option")
                    option.textContent = category.name
                    option.value = category.name
                    if(selectedCategory && selectedCategory === category.name){
                        option.selected = true
                      }
                    categorySelector.appendChild(option)
                })
            })
    }

    static postEvent(newEvent, event) {
        ApiService.postOccEvent(newEvent)
            .then(response => {
                if (response.errors) {
                    alert(response.errors)
                } else {
                new Event(response)
                }
            })
            .catch(error => alert(error))
        event.target.reset()
        modal.querySelector("form").remove()
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
        EventForm.postEvent(newEvent, event)
      }

     
    static editEventFormHandler(editBtn, editEventForm, name, description, location, duration, cost, category, occasion) {
        editBtn.addEventListener('click', () => {
            modal.style.display = "block"
            modalContent.append(editEventForm)
            EventForm.renderEditFormContent(editEventForm, name, description, location, duration, cost, category, occasion)
        })
    }

    static renderEditFormContent(editEventForm, name, description, location, duration, cost, category, occasion) {
        editEventForm.innerHTML = ''
        const eventNameDiv = document.createElement('div')
        eventNameDiv.className = 'form-group'
        const eventNameLabel = document.createElement('label')
        eventNameLabel.innerText = "Event Name:"
        const eventNameInput = document.createElement('input')
        eventNameInput.name = 'name'
        eventNameInput.value = name 
        eventNameInput.className = 'form-control'
        eventNameDiv.append(eventNameLabel, eventNameInput)

        const eventDescDiv = document.createElement('div')
        eventDescDiv.className = 'form-group'
        const eventDescLabel = document.createElement('label')
        eventDescLabel.innerText = "Event Description:"
        const eventDescInput = document.createElement('textarea')
        eventDescInput.name = 'description'
        eventDescInput.value = description
        eventDescInput.className = 'form-control'
        eventDescDiv.append(eventDescLabel, eventDescInput)

        const eventLocationDiv = document.createElement('div')
        eventLocationDiv.className = 'form-group'
        const eventLocationLabel = document.createElement('label')
        eventLocationLabel.innerText = "Event Location:"
        const eventLocationInput = document.createElement('textarea')
        eventLocationInput.name = 'location'
        eventLocationInput.value = location
        eventLocationInput.className = 'form-control'
        eventLocationDiv.append(eventLocationLabel, eventLocationInput)

        const eventDurationDiv = document.createElement('div')
        eventDurationDiv.className = 'form-group'
        const eventDurationLabel = document.createElement('label')
        eventDurationLabel.innerText = "Event Duration:"
        const eventDurationInput = document.createElement('input')
        eventDurationInput.name = 'duration'
        eventDurationInput.value = duration
        eventDurationInput.className = 'form-control'
        eventDurationDiv.append(eventDurationLabel, eventDurationInput)

        const eventCostDiv = document.createElement('div')
        eventCostDiv.className = 'form-group'
        const eventCostLabel = document.createElement('label')
        eventCostLabel.innerText = "Event Cost:"
        const eventCostInput = document.createElement('input')
        eventCostInput.name = 'cost'
        eventCostInput.value = cost
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
        EventForm.categoryDropdown(categorySelector, category)

        const eventOccasionDiv = document.createElement('div')
        eventOccasionDiv.className = 'form-group'
        const occasionSelectorLabel = document.createElement('label')
        occasionSelectorLabel.innerText = 'Occasion:'
        const occasionSelector = document.createElement('select')
        occasionSelector.id = 'select-occasion'
        occasionSelector.name = 'occasion'
        occasionSelector.className = 'form-control'
        eventOccasionDiv.append(occasionSelectorLabel, occasionSelector)
        EventForm.occasionDropdown(occasionSelector, occasion)

        const submitBtn = document.createElement('button')
        submitBtn.className = 'btn'
        submitBtn.id = 'event-submit'
        submitBtn.innerText = "Submit"
        editEventForm.append(eventNameDiv, eventDescDiv, eventLocationDiv, 
            eventDurationDiv, eventCostDiv,
            eventCatDiv, eventOccasionDiv, submitBtn)
        return { categorySelector, occasionSelector }
    }


}