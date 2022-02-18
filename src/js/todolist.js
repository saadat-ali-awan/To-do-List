import Task from './task.js';
import threeDots from '../images/three-dots.png';
import domElements from './dom_elements.js';

class TodoList {
  constructor(listElem) {
    this.list = [];
    this.listElem = listElem;
  }

  init() {
    if (JSON.parse(localStorage.getItem('list')) !== null) {
      this.list = JSON.parse(localStorage.getItem('list'));
      this.list.forEach((element) => {
        this.insertToDocument(new Task(element.index, element.completed, element.description));
      });
    }
  }

  addTask(completed, description) {
    const { length } = this.list;
    const task = new Task(length, completed, description);
    this.list.push(task);
    this.insertToDocument(task);
    this.saveToLocalStorage();
  }

  insertToDocument(task) {
    const elem = document.createElement('li');
    elem.id = `item${task.index}`;
    elem.classList.add('task');
    elem.innerHTML += `<input type="checkbox" name='completed' value='${task.completed ? 'completed' : 'not-completed'}' ${task.completed ? 'checked' : ''}>
    <span>${task.description}</span>
    <img src=${threeDots} alt="Three Dots Button">`;
    this.listElem.append(elem);
    this.addEventListenerToListItem(elem, task.index);
  }

  deleteTask(index) {
    this.sortTasks();
    let newIndex = 0;
    const newList = [];
    this.list.forEach((task) => {
      if (index !== task.index) {
        newList.push(new Task(newIndex, task.completed, task.description));
        newIndex += 1;
      }
    });
    this.list = newList;
    this.saveToLocalStorage();
    TodoList.updateDOM(index);
  }

  static updateDOM(index) {
    const allTaskItems = document.querySelectorAll('.task');
    let newIndex = 0;
    allTaskItems.forEach((listItem) => {
      if (listItem.getAttribute('id') === `item${index}`) {
        listItem.remove();
      } else {
        listItem.setAttribute('id', `item${newIndex}`);
        newIndex += 1;
      }
    });
  }

  editTaskDescription(index, description) {
    this.list[index].description = description;
    this.saveToLocalStorage();
  }

  sortTasks() {
    this.list.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      }
      if (a.index < b.index) {
        return -1;
      }
      return 0;
    });
  }

  saveToLocalStorage() {
    localStorage.setItem('list', JSON.stringify(this.list));
  }

  removeCompletedTasks() {
    let newIndex = 0;
    this.list = this.list.filter((task) => {
      if (task.completed) {
        return false;
      }
      task.index = newIndex;
      newIndex += 1;
      return true;
    });
    this.saveToLocalStorage();
    domElements.getListElement().innerHTML = '';
    this.init();
  }

  addEventListenerToListItem(item, index) {
    let delay;

    item.childNodes[0].addEventListener('click', () => {
      this.list[index].completed = item.childNodes[0].checked;
      this.saveToLocalStorage();
    });

    item.childNodes[4].addEventListener('mousedown', () => {
      if (item.classList.contains('is-selected')) {
        this.deleteTask(index);
      } else {
        console.log('Drag Operation');
      }
    });

    item.addEventListener('mousedown', () => {
      delay = window.setTimeout(() => {
        const previousSelected = document.querySelector('.is-selected');
        if (previousSelected) {
          const inputElem = document.querySelector('span > input');
          previousSelected.classList.remove('is-selected');
          previousSelected.querySelector('span').textContent = inputElem.value;
          inputElem.remove();
        }
        item.classList.add('is-selected');
        const newInputElem = document.createElement('input');
        newInputElem.value = item.querySelector('span').textContent;

        newInputElem.addEventListener('keyup', (event) => {
          if (event.keyCode === 13 || event.key === 13) {
            this.editTaskDescription(index, newInputElem.value);
            item.classList.remove('is-selected');
            item.querySelector('span').textContent = newInputElem.value;
            newInputElem.remove();
          }
        });
        item.querySelector('span').textContent = '';
        item.querySelector('span').append(newInputElem);
      }, 300);
    });

    item.addEventListener('mouseup', () => {
      clearTimeout(delay);
    });

    item.addEventListener('mouseout', () => {
      clearTimeout(delay);
    });
  }
}

export default new TodoList(domElements.getListElement());