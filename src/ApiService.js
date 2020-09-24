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
}