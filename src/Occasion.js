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
        const { name, date, time } = this.occasion
        const occNameDiv = document.createElement('div')
        occNameDiv.className = "h2"
        occNameDiv.id = 'occ-div'
        occNameDiv.innerText = name
        const occDateDiv = document.createElement('div')
        occDateDiv.className = 'h3'
        occDateDiv.id = 'occ-date-div'
        occDateDiv.innerText = date
        const occTimeDiv = document.createElement('div')
        occTimeDiv.className = 'h3'
        occTimeDiv.id = 'occ-time-div'
        occTimeDiv.innerText = time
        const occEventsUl = this.renderOccEvents()
        card.append(occNameDiv, occDateDiv, occTimeDiv, occEventsUl)
    }

    renderOccEvents() {
        const occEventsUl = document.createElement('ul')
        occEventsUl.className = 'ul list-unstyled'
        occEventsUl.id = 'occ-event-list'
        occEventsUl.innerText = 'Scheduled Events:'
        this.occasion.events.forEach(event => {
            let eventLi = document.createElement('li')
            eventLi.innerText = `${event.name} will cost ${event.cost} dollars.`
            occEventsUl.appendChild(eventLi)
        })
        return occEventsUl
    }

    
}