console.log("Hello from Event.js")



class Event {
    constructor(event){
        this.event = event
        this.card = this.createCard()
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
        card.appendChild(eventName)
    }
}