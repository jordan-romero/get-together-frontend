class Category {

    constructor(category){
        this.category = category 
        this.card = this.createCard()
    }

    createCard = () => {
        const card = document.createElement('div')
        card.className = "card text-center"
        card.dataset.id = this.category.id
        this.cardContent(card)
        app.appendChild(card)
    }

    cardContent(card) {
        const { name } = this.category
        const catNameDiv = document.createElement('div')
        catNameDiv.className = "h2 card-header"
        catNameDiv.id = 'cat-div'
        catNameDiv.innerText = name
        card.append(catNameDiv)
    }
}