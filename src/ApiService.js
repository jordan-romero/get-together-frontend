class ApiService { 

    static getAllEvents(){
        return fetch(EVENT_URL)
        .then(response => response.json())
    }

    static postEvent(newEvent){
    
      return fetch(EVENT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        },
        body: JSON.stringify(newEvent)
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw Error("Bad request")
          }
        })
    }

    static getAllCategories(){
      return fetch(CATEGORY_URL)
      .then(res => res.json())
    }

    static getAllOccasions(){
      return fetch(OCCASION_URL)
      .then(res => res.json())
    }

    static removeEvent(eventId){
      return fetch(`${EVENT_URL}/${eventId}`, {
        method: "DELETE"
      })
        .then(res=> res.json())
    }

    static updateEvent = (eventId, event) => {
      return fetch(`${EVENT_URL}/${eventId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })
      .then(res => res.json())
    }
  
}