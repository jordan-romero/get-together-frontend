class Home {
    constructor(){
        this.renderHome() 
    }

    static renderHome() {
        logo.addEventListener('click', () => {
          app.innerHTML = ''
          body.style.backgroundImage = "url(https://images.unsplash.com/photo-1599751449318-f55b9187cdb4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80)"
          Home.createHeaderDiv()
          Home.createBtnDiv(subheader)
        })
      }
      
    static createHeaderDiv() {
        const header = document.createElement('div');
        header.className = 'display-1 text-center';
        header.id = 'header';
        header.innerText = 'get-together';
        app.appendChild(header);
        const subheaderDiv = Home.createSubheaderDiv(header);
        Home.createBtnDiv(subheaderDiv);
      }
      
    static createSubheaderDiv(header){
        const subheader = document.createElement('div');
        subheader.className = 'h4 text-center';
        subheader.id = 'subheader';
        subheader.innerText = 'Planning made Easy';
        header.appendChild(subheader);
        return subheader;
      }
      
   static createBtnDiv(subheader) {
        const eventBtnDiv = document.createElement('div');
        eventBtnDiv.className = 'row'
        subheader.appendChild(eventBtnDiv);
        eventBtn.className = 'btn btn-xl';
        eventBtn.id = 'event-btn';
        eventBtn.innerText = 'Events';
        eventBtnDiv.append(eventBtn);

        const occasionBtnDiv = document.createElement('div');
        occasionBtnDiv.className = 'row'
        subheader.append(occasionBtnDiv);
        occasionBtn.className = 'btn';
        occasionBtn.id = 'occasion-btn';
        occasionBtn.innerText = 'get-togethers';
        occasionBtnDiv.appendChild(occasionBtn);

        const categoriesBtnDiv = document.createElement('div')
        categoriesBtnDiv.className = 'row'
        subheader.append(categoriesBtnDiv);
        categoriesBtn.className = 'btn';
        categoriesBtn.id = 'categories-btn'
        categoriesBtn.innerText = 'Categories'
        categoriesBtnDiv.appendChild(categoriesBtn)

      }
}