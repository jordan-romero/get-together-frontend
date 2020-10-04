class Event {
    constructor(event){
        this.event = event
        this.card = this.createCard()
    }

    static sortAndFilter() {
        const searchForm = document.createElement('form')
        searchForm.className = 'form-inline'
        searchForm.id = 'search-form'
        searchForm.innerHTML = `
        <div class="form-group">
            <label class="ml-2 mr-1"for="sort">Sort By:</label>
            <select class='form-control' name="sort" id="sort">
                <option value="alphabetical">Alphabetical</option>
                <option value="category">Category</option>
                <option value="cost">Cost</option>
            </select>
            <label class="ml-2 mr-1"for="filter">Filter By:</label>
            <select class='form-control' name="filter" id="filter">
                <option value="all">All</option>
                <option value="1">Art & Culture</option>
                <option value="2">Comedy</option>
                <option value="3">Outdoor Activities</option>
                <option value="4">Film & TV</option>
                <option value="5">Food & Drink</option>
                <option value="6">Live Music</option>
                <option value="7">LGBTQ+</option>
                <option value="8">Other</option>
            </select>
            <label class="ml-2 mr-1"for="filter">Search by Name:</label>
            <input class="form-control" name="query">
        </div>
        <button class="btn ml-3">Submit</button>
     `
    }

    createCard = () => {
        const card = document.createElement('div')
        card.className = "card text-center shadow-lg"
        card.dataset.id = this.event.id
        this.cardContent(card)
        app.appendChild(card)
        return card
    }

    cardContent(card) {
        const { name, description, duration, cost, location } = this.event
        const eventName = document.createElement('div')
        eventName.id = 'card-head'
        eventName.className = 'card-header h2 pl-5'
        eventName.innerText = name
        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'btn'
        deleteBtn.innerText = 'X'
        deleteBtn.id = 'event-delete-btn'
        this.deleteEvent(deleteBtn, card)
        eventName.appendChild(deleteBtn)
        const eventDesc = document.createElement('p')
        eventDesc.className = 'card-body'
        eventDesc.id = 'desc-p'
        eventDesc.innerText = description
        const occP = document.createElement('p')
        occP.id = 'occ-p'
        occP.innerHTML = `<a tabindex="0" data-toggle="popover"  data-animation="true" 
        data-html="true" data-trigger="focus" title="Get-Together Details" 
        data-content="<p><b>Get-Together Date:</b></p> <p>${this.event.occasion.date_format}</p> 
        <p><b>Get-Together Time:</b></p> <p>${this.event.occasion.time_format}</p>">${this.event.occasion.name}</a>`
        $(function () {
            $('[data-toggle="popover"]').popover()
        })
        // `Get-Together: ${this.event.occasion.name}`
        const eventLocation = document.createElement('p')
        eventLocation.id = 'location-p'
        eventLocation.className = 'card-body'
        eventLocation.innerText = location 
        const eventDurationCost = document.createElement('p')
        eventDurationCost.id = 'dur-cost-p'
        eventDurationCost.className = 'card-footer'
        eventDurationCost.innerText = `Total Cost: $${cost} Duration: ${duration} hours.`
        const editBtn = document.createElement('button')
        editBtn.className = 'btn btn-sm'
        editBtn.id = 'edit-btn'
        editBtn.innerText = 'Edit'
        eventDurationCost.append(editBtn)
        const editEventForm = document.createElement('form')
        EventForm.editEventFormHandler(editBtn, editEventForm, name, description, location, duration, cost)
        this.handleEditSubmit(editEventForm, card)
        this.renderCardBackground(card)
        card.append(eventName, eventDesc, occP, eventLocation, eventDurationCost)

}

    static renderEventHero(){
        const hero = document.createElement('div')
        hero.className = 'jumbotron jumbotron-fluid'
        hero.id = 'hero'
        app.appendChild(hero)
        const heroDiv = document.createElement('div')
        heroDiv.className = 'container'
        const heroH1 = document.createElement('h1')
        heroH1.className = 'display-3'
        heroH1.innerText = 'Events'
        heroH1.id = 'hero-h1'
        const heroLead = document.createElement('p')
        heroLead.className = 'lead'
        heroLead.innerText = 'Welcome to the Events page! Create Events and add them to your Get-Togethers!'
        heroLead.id = 'hero-lead'
        const heroLead2 = document.createElement('p')
        heroLead2.className = 'lead'
        heroLead2.innerText = 'You can view more information about your Get-Together by clicking on it.'
        heroLead2.id = 'hero-lead'
        const hr = document.createElement('hr')
        hr.className = 'my-4'
        const heroLead3 = document.createElement('p')
        heroLead3.className = 'lead'
        heroLead3.innerText = 'Try it out by clicking "Create Event" 👍🏼'
        heroLead3.id = 'hero-lead'
        const addBtn = Event.addEventBtn()
        const searchForm = document.createElement('form')
        searchForm.className = 'form-inline'
        searchForm.id = 'search-form'
        searchForm.innerHTML = `
        <div class="form-group">
            <label class="ml-2 mr-1"for="sort">Sort By:</label>
            <select class='form-control' name="sort" id="sort">
                <option value="alphabetical">Alphabetical</option>
                <option value="category">Category</option>
                <option value="cost">Cost</option>
            </select>
            <label class="ml-2 mr-1"for="filter">Filter By:</label>
            <select class='form-control' name="filter" id="filter">
                <option value="all">All</option>
                <option value="1">Art & Culture</option>
                <option value="2">Comedy</option>
                <option value="3">Outdoor Activities</option>
                <option value="4">Film & TV</option>
                <option value="5">Food & Drink</option>
                <option value="6">Live Music</option>
                <option value="7">LGBTQ+</option>
                <option value="8">Other</option>
            </select>
            <label class="ml-2 mr-1"for="filter">Search by Name:</label>
            <input class="form-control" name="query">
        </div>
        <button class="btn ml-3">Submit</button>
     `
        heroDiv.append(heroH1, heroLead, heroLead2, hr, heroLead3, addBtn, searchForm)
        hero.appendChild(heroDiv)
    }

    static addEventBtn() {
        const addBtn = document.createElement('button')
        addBtn.className = 'btn btn-lg'
        addBtn.id = 'add-event-btn'
        addBtn.innerText = "Create Event"
        app.appendChild(addBtn)

        EventForm.eventListenerHandler(addBtn)
        return addBtn
    }



    handleEditSubmit(editEventForm, card) {
        editEventForm.addEventListener("submit", (e) => {
            e.preventDefault()
            const data = {
                name: e.target.name.value,
                description: e.target.description.value,
                location: e.target.location.value,
                duration: e.target.duration.value,
                cost: e.target.cost.value,
                category_name: e.target.category.value,
                occasion_name: e.target.occasion.value
            }
            this.updateEventHandler(data, card)

        })
    }

    updateEventHandler(data, card) {
        ApiService.updateEvent(this.event.id, data)
            .then(updatedEvent => {
                if (updatedEvent.errors){
                    alert(updatedEvent.errors)
                } else {
                    this.event = updatedEvent
                    card.innerHTML = ''
                    this.cardContent(card)
                    modal.style.display = "none"
                    modal.querySelector("form").remove()
                }
            })
            .catch(error => alert(error))
    }


    renderCardBackground(card) {
        if (this.event.category.name === "Art & Culture") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80)"; 
        } else if (this.event.category.name === "Comedy") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80)"
            card.style.backgroundSize = "47rem 20rem"
        } else if (this.event.category.name === "Outdoor Activities") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
            card.style.backgroundSize = "50rem 23rem"
        } else if (this.event.category.name === "Film & TV") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1568876694728-451bbf694b83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80)"
            card.style.backgroundSize = "50rem 23rem"
        } else if (this.event.category.name === "Food & Drink") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=931&q=80)"
            card.style.backgroundSize = "50rem"
        } else if (this.event.category.name === "Live Music") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)"
            card.style.backgroundSize = "50rem 25rem"
        } else if (this.event.category.name === "LGBTQ+") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1516119555254-e3b36f4b6769?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1062&q=80)"
            card.style.backgroundSize = "50rem 25rem"
        } else if (this.event.category.name === "Other") {
            card.style.backgroundImage = "url(https://images.unsplash.com/photo-1543718290-a207a786243a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
            card.style.backgroundSize = "50rem 25rem"
        }
    }

    deleteEvent(deleteBtn, card) {
        deleteBtn.addEventListener('click', () => {
            ApiService.removeEvent(this.event.id).then(card.remove())
        })
    }

}
