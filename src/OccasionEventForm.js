class OccasionEventForm {

    static createOccasionEventForm() {
        alert('am wired up? ')
    }

    static postOccasionEvent(eventForm, e, card) {
        
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

    static handleFormSubmit(e) {
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
        OccasionEventForm.postOccasionEvent(eventForm, e)
      }
}
