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

    static postEvent(newEvent, event) {
        ApiService.postEvent(newEvent)
            .then(response => {
                console.log(response)
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

     
    static editEventFormHandler(editBtn, editEventForm, name, description, location, duration, cost) {
        editBtn.addEventListener('click', () => {
            modal.style.display = "block"
            modalContent.append(editEventForm)
            EventForm.renderEditFormContent(editEventForm, name, description, location, duration, cost)
        })
    }

    static renderEditFormContent(editEventForm, name, description, location, duration, cost) {
        editEventForm.innerHTML = ''
        editEventForm.innerHTML += `
            <div class="form-group">
                <label>Event Name:</label>
                <input name="name" value="${name}" class="form-control">
            </div>
            <div class="form-group">
                <label>Event Description:</label>
                <textarea name="description" class="form-control">${description}</textarea>
            </div>
            <div class="form-group">
                <label>Event Location:</label>
                <textarea name="location" class="form-control">${location}</textarea>
            </div>
            <div class="form-group">   
                <label>Event Duration:</label>
                <input name="duration" value="${duration}" class="form-control">
            </div>
            <div class="form-group">
                <label>Event Cost:</label>
                <input name="cost" value="${cost}" type="number" class="form-control">
            </div>
            <div class="form-group">
                <label>Category:</label>
                    <select id="select-category" name="category" class="form-control">
                        <option value="Art &amp; Culture">Art &amp; Culture</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Outdoor Activities">Outdoor Activities</option>
                        <option value="Film &amp; TV">Film &amp; TV</option>
                        <option value="Food &amp; Drink">Food &amp; Drink</option>
                        <option value="Live Music">Live Music</option>
                        <option value="LGBTQ+">LGBTQ+</option>
                        <option value="Other">Other</option>
                    </select>
            </div>
            <div class="form-group">
                <label>Occasion:</label>
                    <select id="select-occasion" name="occasion" class="form-control">
                        <option value="Hot Date">Hot Date</option>
                        <option value="Shannon's Birthday">Shannon's Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                    </select>
            </div>
            <button class="btn" id="event-submit">Submit</button>`
    }


}