class Occasion {

    constructor(occasion){
        this.occasion = occasion 
        this.card = this.createCard()
        this.constructor.all.push(this)
    }

    static all = []

    static findById(id) {
        return this.all.find(element => element.occasion.id == id)
    }

    createCard = () => {
        const card = document.createElement('div')
        card.className = "card text-center"
        card.id = 'occ-card'
        card.dataset.id = this.occasion.id
        this.cardContent(card)
        app.appendChild(card)
        return card
    }

   cardContent = (card) => {
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
    
        Occasion.createOccasionEvent(occEventsUl, card)
        
        const editOccForm = document.createElement('form')
        OccasionForm.editOccasionFormHandler(editBtn, editOccForm, name, date_format, time_format)
        this.handleEditSubmit(editOccForm, card)
        card.append(occNameDiv, occDateDiv, occTimeDiv, occEventsUl, cardFooterP)
    }

    renderEvents() {
        const occEventsUl = document.createElement('ul')
        occEventsUl.className = 'ul list-unstyled'
        occEventsUl.id = 'occ-event-list'
        occEventsUl.dataset.id = this.occasion.id 
        occEventsUl.innerText = 'Scheduled Events:'
        let costArr = []
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        this.occasion.events.forEach(event => {
            let eventLi = document.createElement('li')
            eventLi.id = 'occ-event-li'
            
            costArr.push(event.cost)
            eventLi.innerHTML = `<a tabindex="0" data-toggle="popover"  data-animation="true" 
            data-html="true" data-trigger="focus" title="Event Details" 
            data-content= "<p><b>Event Description:</b></p> <p>${event.description}</p> 
            <p><b>Event Cost:</b></p> <p>$${event.cost}</p>                       
            <p><b>Event Location:</b></p> <p>${event.location}</p>
            <p><b>Event Duration:</b></p> <p>${event.duration} hours</p>">${event.name}</a>`
            $(function () {
                $('[data-toggle="popover"]').popover()
            })
            
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

    static renderOccasionHero(){
        const hero = document.createElement('div')
        hero.className = 'jumbotron jumbotron-fluid'
        hero.id = 'hero'
        app.appendChild(hero)
        const heroDiv = document.createElement('div')
        heroDiv.className = 'container'
        const heroH1 = document.createElement('h1')
        heroH1.className = 'display-3'
        heroH1.innerText = 'Get-Togethers'
        heroH1.id = 'hero-h1'
        const heroLead = document.createElement('p')
        heroLead.className = 'lead'
        heroLead.innerText = 'Welcome to the Get-Together page! Create Get-Togethers and add Events to them by clicking on the "Add Event" button.!'
        heroLead.id = 'hero-lead'
        const heroLead2 = document.createElement('p')
        heroLead2.className = 'lead'
        heroLead2.innerText = 'You can view more information about your Events by clicking on them.'
        heroLead2.id = 'hero-lead'
        const hr = document.createElement('hr')
        hr.className = 'my-4'
        const heroLead3 = document.createElement('p')
        heroLead3.className = 'lead'
        heroLead3.innerText = 'Try it out by clicking "Create Get-Together" 👍🏼'
        heroLead3.id = 'hero-lead'
        const addBtn = Occasion.addOccasionBtn()
        heroDiv.append(heroH1, heroLead, heroLead2, hr, heroLead3, addBtn)
        hero.appendChild(heroDiv)
    }

    static createOccasionEvent = (occEventsUl, card) => {
        const addEventBtn = document.createElement('button')
        addEventBtn.className = 'btn btn-sm'
        addEventBtn.id = 'add-occ-event-btn'
        addEventBtn.innerText = 'Add Event'
        occEventsUl.append(addEventBtn)
        addEventBtn.addEventListener('click', (e) => {
            const occId = parseInt(e.target.parentNode.dataset.id)
            OccasionEventForm.createOccasionEventForm(occId, card)
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
        addBtn.className = 'btn btn-lg'
        addBtn.id = 'add-occ-btn'
        addBtn.innerText = "Create a Get-Together"
        app.appendChild(addBtn) 

        OccasionForm.addOccasionHandler(addBtn)
        return addBtn
    }

    deleteOccasion(deleteBtn, card) {
        deleteBtn.addEventListener('click', () => {
            ApiService.removeOccasion(this.occasion.id).then(card.remove())
        })
    }

    static postOccasionEvent = (e, occEventForm, occId, card) => {

        ApiService.postOccEvent(occEventForm, occId, card)
            .then(response => {
                const occInstance = Occasion.findById(occId)
                card.innerHTML = ''
                occInstance.occasion.events.push(response) 
                occInstance.cardContent(occInstance.card)
                // this.renderEvents(occEventForm)
                }
            )
            .catch(error => alert(error))
        
        e.target.reset()
        modal.querySelector("form").remove()
    }

    static handleFormSubmit = (e, occId, card) => {
        e.preventDefault()
        // console.log(card)
        modal.style.display = "none"
        const occEventForm = {
          name: e.target["name"].value,
          description: e.target["description"].value,
          location: e.target["location"].value,
          duration: e.target["duration"].value,
          cost: e.target["cost"].value,
          category_name: e.target.category.value
        }
        Occasion.postOccasionEvent(e, occEventForm, occId, card)
      }
}