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
        const occEventsUl = this.renderOccEvents()
        const editBtn = document.createElement('button')
        editBtn.className = 'btn btn-sm'
        editBtn.id = 'edit-btn'
        editBtn.innerText = 'Edit'
        occEventsUl.append(editBtn)
        const editOccForm = document.createElement('form')
        OccasionForm.editOccasionFormHandler(editBtn, editOccForm, name, date_format, time_format)
        this.handleEditSubmit(editOccForm, card)
        card.append(occNameDiv, occDateDiv, occTimeDiv, occEventsUl)
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

    renderOccEvents() {
        const occEventsUl = document.createElement('ul')
        occEventsUl.className = 'ul list-unstyled'
        occEventsUl.id = 'occ-event-list'
        occEventsUl.innerText = 'Scheduled Events:'
        let costArr = []
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        this.occasion.events.forEach(event => {
            let eventLi = document.createElement('li')
            costArr.push(event.cost)
            eventLi.innerText = `${event.name} will cost ${event.cost} dollars.`
            occEventsUl.appendChild(eventLi)
        })
        const totalCostDiv = document.createElement('div')
        if (costArr.length > 0) {
            const totalCost = costArr.reduce(reducer)
            totalCostDiv.className = 'card-footer'
            totalCostDiv.innerText = `Total Cost: $${totalCost}`
        }
        occEventsUl.appendChild(totalCostDiv)
        return occEventsUl
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
    
}