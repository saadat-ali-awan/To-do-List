import DOMManipulation from './dom_manipulation.js';
import TodoList from './todo_list.js';

class Events {
  static addItemInput;

  static clearCompletedButton;

  static init() {
    this.addItemInput = document.querySelector('.main > input');
    this.addItemInput.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        if (this.addItemInput.value !== '') {
          DOMManipulation.addTask(TodoList.addTask(false, this.addItemInput.value));
          this.addItemInput.value = '';
        }
      }
    });
    this.clearCompletedButton = document.querySelector('a[href="#complete"]');
    this.clearCompletedButton.addEventListener('click', () => {
      TodoList.clearCompletedTask(DOMManipulation.listElem);
    });
  }
}

export default Events;