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
            return response.json()
        })
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

    static getAllCategories(){
      return fetch(CATEGORY_URL)
      .then(res => res.json())
    }

    static getAllOccasions(){
      return fetch(OCCASION_URL)
      .then(res => res.json())
    }
  
    static postOccasion(newOccasion){
    
      return fetch(OCCASION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        },
        body: JSON.stringify(newOccasion)
      })
        .then(response => {
            return response.json()
        })
    }

    static updateOccasion = (occId, occasion) => {
      return fetch(`${OCCASION_URL}/${occId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(occasion),
      })
      .then(res => res.json())
    }

    static removeOccasion(occId){
      return fetch(`${OCCASION_URL}/${occId}`, {
        method: "DELETE"
      })
        .then(res=> res.json())
    }

    static postOccEvent = (eventForm, occId) => {
      return fetch(`${OCCASION_EVENT_URL}/${occId}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        },
        body: JSON.stringify(eventForm)
      })
        .then(response => {
            return response.json()
        })
    }
}