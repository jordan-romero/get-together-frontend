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

    cardContent = () => {
        const { name, date, time } = this.occasion
        const occDiv = document.createElement('div')
        occDiv.className = "h2"
        occDiv.id = 'occ-div'
        occDiv.innerText = name
    }
}