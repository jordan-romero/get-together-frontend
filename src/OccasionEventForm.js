class OccasionEventForm {


    static createOccasionEventForm = (occId, card) => {
        modal.style.display = "block"
        const occEventForm = document.createElement('form')
        occEventForm.id = 'event-form'
        modalContent.append(occEventForm)
        const categorySelector = OccasionEventForm.occEventFormContent(occEventForm)
        OccasionEventForm.categoryDropdown(categorySelector)
        occEventForm.addEventListener('submit', (e) => {
            Occasion.handleFormSubmit(e, occId, card)
        })
    }

    static occEventFormContent = (occEventForm) => {
        const eventNameDiv = document.createElement('div')
        eventNameDiv.className = 'form-group'
        const eventNameLabel = document.createElement('label')
        eventNameLabel.innerText = "Event Name:"
        const eventNameInput = document.createElement('input')
        eventNameInput.name = 'name'
        eventNameInput.required = true
        eventNameInput.className = 'form-control'
        eventNameDiv.append(eventNameLabel, eventNameInput)

        const eventDescDiv = document.createElement('div')
        eventDescDiv.className = 'form-group'
        const eventDescLabel = document.createElement('label')
        eventDescLabel.innerText = "Event Description:"
        const eventDescInput = document.createElement('textarea')
        eventDescInput.name = 'description'
        eventDescInput.required = true
        eventDescInput.className = 'form-control'
        eventDescDiv.append(eventDescLabel, eventDescInput)

        const eventLocationDiv = document.createElement('div')
        eventLocationDiv.className = 'form-group'
        const eventLocationLabel = document.createElement('label')
        eventLocationLabel.innerText = "Event Location:"
        const eventLocationInput = document.createElement('textarea')
        eventLocationInput.name = 'location'
        eventLocationInput.required = true
        eventLocationInput.className = 'form-control'
        eventLocationDiv.append(eventLocationLabel, eventLocationInput)

        const eventDurationDiv = document.createElement('div')
        eventDurationDiv.className = 'form-group'
        const eventDurationLabel = document.createElement('label')
        eventDurationLabel.innerText = "Event Duration:"
        const eventDurationInput = document.createElement('input')
        eventDurationInput.name = 'duration'
        eventDurationInput.required = true
        eventDurationInput.type = 'number'
        eventDurationInput.className = 'form-control'
        eventDurationDiv.append(eventDurationLabel, eventDurationInput)

        const eventCostDiv = document.createElement('div')
        eventCostDiv.className = 'form-group'
        const eventCostLabel = document.createElement('label')
        eventCostLabel.innerText = "Event Cost:"
        const eventCostInput = document.createElement('input')
        eventCostInput.name = 'cost'
        eventCostInput.required = true
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
 }
