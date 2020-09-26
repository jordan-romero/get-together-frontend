 class Home {
 
  constructor(home){
    this.home = home 
    this.app = this.createHeaderDiv()
  }
 
 static createHeaderDiv() {
  const header = document.createElement('div');
  header.className = 'display-1 text-center';
  header.id = 'header';
  header.innerText = 'get-together';
  app.appendChild(header);
  const subheader = document.createElement('div');
  subheader.className = 'h4 text-center';
  subheader.id = 'subheader';
  subheader.innerText = 'Planning made Easy';
  header.appendChild(subheader);
}
createEventBtn() {
}


}