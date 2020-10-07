class OccasionForm {

    static addOccasionHandler(addBtn) {
        addBtn.addEventListener('click', () => {
            OccasionForm.createOccasionForm()
        })
    }

    static createOccasionForm() {
        modal.style.display = "block"
        const occForm = document.createElement('form')
        occForm.id = 'event-form'
        modalContent.append(occForm)
        OccasionForm.occFormContent(occForm)
        occForm.addEventListener('submit', OccasionForm.handleFormSubmit)
    }

    static occFormContent(occForm) {
        const occNameDiv = document.createElement('div')
        occNameDiv.className = 'form-group'
        const occNameLabel = document.createElement('label')
        occNameLabel.innerText = "Get-Together Name:"
        const occNameInput = document.createElement('input')
        occNameInput.name = 'name'
        occNameInput.required = true
        occNameInput.className = 'form-control'
        occNameDiv.append(occNameLabel, occNameInput)

        const occDateDiv = document.createElement('div')
        occDateDiv.className = 'form-group'
        const occDateLabel = document.createElement('label')
        occDateLabel.innerText = "Get-Together Date:"
        const occDateInput = document.createElement('input')
        occDateInput.type = 'date'
        occDateInput.name = 'date'
        occDateInput.required = true
        occDateInput.className = 'form-control'
        occDateDiv.append(occDateLabel, occDateInput)

        const occTimeDiv = document.createElement('div')
        occTimeDiv.className = 'form-group'
        const occTimeLabel = document.createElement('label')
        occTimeLabel.innerText = "Get-Together Date:"
        const occTimeInput = document.createElement('input')
        occTimeInput.type = 'time'
        occTimeInput.name = 'time'
        occTimeInput.required = true
        occTimeInput.className = 'form-control'
        occTimeDiv.append(occTimeLabel, occTimeInput)

        const submitBtn = document.createElement('button')
        submitBtn.className = 'btn'
        submitBtn.id = 'occ-submit'
        submitBtn.innerText = "Submit"
        occForm.append(occNameDiv, occDateDiv, occTimeDiv, submitBtn)
    }

    static postOccasion(newOccasion, event) {
        ApiService.postOccasion(newOccasion)
            .then(occasion => {
                if (occasion.errors) {
                    alert(occasion.errors)
                } else {
                new Occasion(occasion)
                }
            })
            .catch(error => alert(error))
        event.target.reset()
        modal.querySelector("form").remove()
    }

    static handleFormSubmit(event) {
        event.preventDefault()
        modal.style.display = "none"
        const newOccasion = {
          name: event.target["name"].value,
          date: event.target["date"].value,
          time: event.target["time"].value,
        }
        OccasionForm.postOccasion(newOccasion, event)
      }

      static editOccasionFormHandler(editBtn, editOccForm, name, date, time) {
        editBtn.addEventListener('click', () => {
            modal.style.display = "block"
            modalContent.append(editOccForm)
            OccasionForm.renderEditFormContent(editOccForm, name, date, time)
        })
    }

    static renderEditFormContent(editOccForm, name, date, time) {
        editOccForm.innerHTML = ''
        editOccForm.innerHTML += `
            <div class="form-group">
                <label>Get-Together Name:</label>
                <input name="name" required=true value="${name}" class="form-control">
            </div>
            <div class="form-group">
                <label>Get-Together Date:</label>
                <textarea name="date" type=date required=true class="form-control">${date}</textarea>
            </div>
            <div class="form-group">
                <label>Get-Together Time:</label>
                <textarea name="time" required=true class="form-control">${time}</textarea>
            </div>
            <button class="btn" id="event-submit">Submit</button>`
    }
}