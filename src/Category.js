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
        return card
    }

    cardContent(card) {
        const { name } = this.category
        const catNameDiv = document.createElement('div')
        catNameDiv.className = "h2 card-header"
        catNameDiv.id = 'cat-div'
        catNameDiv.innerText = name
        const catEventsUl = document.createElement('ul')
        catEventsUl.className = 'ul list-unstyled'
        catEventsUl.id = 'occ-event-list'
        catEventsUl.innerText = 'Events:'
        
        this.category.events.forEach(event => {
            const eventDiv = document.createElement('div')
            eventDiv.className = 'tooltip'
            let eventLi = document.createElement('li')
            eventLi.className = 'tooltiptext'
            eventLi.innerText = event.name
            catEventsUl.append(eventDiv, eventLi)
        })
        this.renderCardBackground(card)
        card.append(catNameDiv, catEventsUl)
    }
    

    renderCardBackground(card){
        if (this.category.name === "Art & Culture") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80)"; 
        } else if (this.category.name === "Comedy") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80)"
            card.style.backgroundSize = "47rem 20rem"
        } else if (this.category.name === "Outdoor Activities") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
            card.style.backgroundSize = "50rem 23rem"
        } else if (this.category.name === "Film & TV") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1568876694728-451bbf694b83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80)"
            card.style.backgroundSize = "50rem 23rem"
        } else if (this.category.name === "Food & Drink") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=931&q=80)"
            card.style.backgroundSize = "50rem"
        } else if (this.category.name === "Live Music") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)"
            card.style.backgroundSize = "50rem 25rem"
        } else if (this.category.name === "LGBTQ+") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1516119555254-e3b36f4b6769?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1062&q=80)"
            card.style.backgroundSize = "50rem 25rem"
        } else if (this.category.name === "Other") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1543718290-a207a786243a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
            card.style.backgroundSize = "50rem 25rem"
        }
    }
}