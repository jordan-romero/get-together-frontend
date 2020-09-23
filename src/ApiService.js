class ApiService { 

    static getAllEvents(){
        return fetch(EVENT_URL)
        .then(response => response.json())
      }
}