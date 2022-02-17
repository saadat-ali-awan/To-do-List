import todolist from './todolist.js';

class Events {
  init(domElements) {
    this.domElements = domElements;
    this.domElements.getInputElement().addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        if (this.domElements.getInputElement().value !== '') {
          todolist.addTask(false, this.domElements.getInputElement().value);
          this.domElements.getInputElement().value = '';
        }
      }
    });
  }
}
export default new Events();