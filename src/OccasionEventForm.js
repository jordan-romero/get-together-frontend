class OccasionEventForm {

    static createOccasionEventForm() {
        modal.style.display = "block"
        const occEventForm = document.createElement('form')
        occEventForm.id = 'event-form'
        modalContent.append(occEventForm)
        const categorySelector = OccasionEventForm.occEventFormContent(occEventForm)
        OccasionEventForm.categoryDropdown(categorySelector)
        occEventForm.addEventListener('submit', OccasionEventForm.handleFormSubmit)
    }

    static occEventFormContent(occEventForm){
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

        const submitBtn = document.createElement('button')
        submitBtn.className = 'btn'
        submitBtn.id = 'event-submit'
        submitBtn.innerText = "Submit"
        occEventForm.append(eventNameDiv, eventDescDiv, eventLocationDiv, 
            eventDurationDiv, eventCostDiv,
            eventCatDiv, submitBtn)
        return categorySelector
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

    static postOccasionEvent(occEventForm, e, card) {
        
        ApiService.postOccEvent(occEventForm)
            .then(response => {
                console.log(response)
                // this.occasion.events.push(response)
                
                // card.innerHTML = ''
                // this.cardContent(card)
                }
            )
            .catch(error => alert(error))
        
        e.target.reset()
        modal.querySelector("form").remove()
    }

    static handleFormSubmit(e) {
        e.preventDefault()
        modal.style.display = "none"
        const occEventForm = {
          name: e.target["name"].value,
          description: e.target["description"].value,
          location: e.target["location"].value,
          duration: e.target["duration"].value,
          cost: e.target["cost"].value,
          category_name: e.target.category.value
        }
        OccasionEventForm.postOccasionEvent(occEventForm, e)
      }
}
