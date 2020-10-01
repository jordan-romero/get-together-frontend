class Occasion {

    constructor(occasion){
        this.occasion = occasion 
        this.card = this.createCard()
    }

    createCard = () => {
        const card = document.createElement('div')
        card.className = "card text-center"
        card.dataset.id = this.occasion.id
        this.cardContent(card)
        app.appendChild(card)
    }

    cardContent(card) {
        const { name, date_format, time_format } = this.occasion
        const occNameDiv = document.createElement('div')
        occNameDiv.className = "h2 card-header"
        occNameDiv.id = 'occ-div'
        occNameDiv.innerText = name
        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'btn'
        deleteBtn.innerText = 'X'
        deleteBtn.id = 'event-delete-btn'
        occNameDiv.appendChild(deleteBtn)
        this.deleteOccasion(deleteBtn, card)
        const occDateDiv = document.createElement('div')
        occDateDiv.className = 'h3'
        occDateDiv.id = 'occ-date-div'
        occDateDiv.innerText = date_format
        const occTimeDiv = document.createElement('div')
        occTimeDiv.className = 'h3'
        occTimeDiv.id = 'occ-time-div'
        occTimeDiv.innerText = time_format
        
        const cardFooterP = document.createElement('p')
        cardFooterP.className = 'card-footer'
        const editBtn = document.createElement('button')
        editBtn.className = 'btn btn-sm'
        editBtn.id = 'edit-btn'
        editBtn.innerText = 'Edit'
    
        const { totalCostP, occEventsUl } = this.renderEvents()
        cardFooterP.append(editBtn, totalCostP)
    
        Occasion.createOccasionEvent(occEventsUl, editBtn)
        
        const editOccForm = document.createElement('form')
        OccasionForm.editOccasionFormHandler(editBtn, editOccForm, name, date_format, time_format)
        this.handleEditSubmit(editOccForm, card)
        card.append(occNameDiv, occDateDiv, occTimeDiv, occEventsUl, cardFooterP)
    }

    renderEvents() {
        const occEventsUl = document.createElement('ul')
        occEventsUl.className = 'ul list-unstyled'
        occEventsUl.id = 'occ-event-list'
        occEventsUl.innerText = 'Scheduled Events:'
        let costArr = []
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        this.occasion.events.forEach(event => {
            let eventLi = document.createElement('li')
            eventLi.id = 'occ-event-li'
            costArr.push(event.cost)
            eventLi.innerText = `${event.name} will cost ${event.cost} dollars.`
            occEventsUl.appendChild(eventLi)
        })
        const totalCostP = document.createElement('p')
        totalCostP.id = 'total-cost-p'
        if (costArr.length > 0) {
            const totalCost = costArr.reduce(reducer)
            totalCostP.innerText = `Total Cost: $${totalCost}`
        }
        return { totalCostP, occEventsUl }
    }

    static createOccasionEvent(occEventsUl, editBtn) {
        const addEventBtn = document.createElement('button')
        addEventBtn.className = 'btn btn-sm'
        addEventBtn.id = 'add-event-btn'
        addEventBtn.innerText = 'Add Event'
        occEventsUl.append(addEventBtn)
        addEventBtn.addEventListener('click', () => {
            OccasionEventForm.createOccasionEventForm()
        })
    }

    handleEditSubmit(editOccForm, card) {
        editOccForm.addEventListener("submit", (e) => {
            e.preventDefault()
            const data = {
                name: e.target.name.value,
                date: e.target.date.value,
                time: e.target.time.value,
            }
            this.updateOccHandler(data, card)

        })
    }

    updateOccHandler(data, card) {
        ApiService.updateOccasion(this.occasion.id, data)
            .then(updatedOccasion => {
                if (updatedOccasion.errors){
                    alert(updatedOccasion.errors)
                } else {
                    this.occasion = updatedOccasion
                    card.innerHTML = ''
                    this.cardContent(card)
                    modal.style.display = "none"
                    modal.querySelector("form").remove()
                }
            })
            .catch(error => alert(error))
    }


    static addOccasionBtn = () => {
        const addBtn = document.createElement('button')
        addBtn.className = 'btn btn-lg mx-auto d-block'
        addBtn.id = 'add-occ-btn'
        addBtn.innerText = "Create a Get-Together"
        app.appendChild(addBtn) 

        OccasionForm.addOccasionHandler(addBtn)
    }

    deleteOccasion(deleteBtn, card) {
        deleteBtn.addEventListener('click', () => {
            ApiService.removeOccasion(this.occasion.id).then(card.remove())
        })
    }

   static postOccasionEvent(eventForm, occId, e, card) {
        const occasionId = card.dataset.id
        console.log(occasionId)
        ApiService.postOccEvent(eventForm, occId)
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

    static handleFormSubmit(e, occId) {
        e.preventDefault()
        modal.style.display = "none"
        const eventForm = {
          name: e.target["name"].value,
          description: e.target["description"].value,
          location: e.target["location"].value,
          duration: e.target["duration"].value,
          cost: e.target["cost"].value,
          category_name: e.target.category.value
        }
        Occasion.postOccasionEvent(eventForm, occId, e)
      }
    
}