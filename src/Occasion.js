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
        const occDateDiv = document.createElement('div')
        occDateDiv.className = 'h3'
        occDateDiv.id = 'occ-date-div'
        occDateDiv.innerText = date_format
        const occTimeDiv = document.createElement('div')
        occTimeDiv.className = 'h3'
        occTimeDiv.id = 'occ-time-div'
        occTimeDiv.innerText = time_format
        const occEventsUl = this.renderOccEvents()
        card.append(occNameDiv, occDateDiv, occTimeDiv, occEventsUl)
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
        const totalCost = costArr.reduce(reducer)
        totalCostDiv.className = 'card-footer'
        totalCostDiv.innerText = `Total Cost: $${totalCost}`
        occEventsUl.appendChild(totalCostDiv)
        return occEventsUl
    }

    static addOccasionBtn = () => {
        const addBtn = document.createElement('button')
        addBtn.className = 'btn btn-lg mx-auto d-block'
        addBtn.id = 'add-occ-btn'
        addBtn.innerText = "Create a Get-Together"
        app.appendChild(addBtn) 

        // Occasion.eventListenerHandler(addBtn)
    }
    
}