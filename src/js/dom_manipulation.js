// import threeDots from '../images/three-dots.png';
import { changeComplete } from './status.js';
import TodoList from './todo_list';

export default class DOMManipulation {
  static listElem;

  static init() {
    this.listElem = document.querySelector('#list');
  }

  static addTask(task) {
    const elem = document.createElement('li');
    elem.id = `item${task.index}`;
    elem.classList.add('task');
    if (task.completed) {
      elem.classList.add('completed');
    }
    elem.innerHTML += `<input type="checkbox" name='completed' value='${task.completed ? 'completed' : 'not-completed'}' ${task.completed ? 'checked' : ''}>
    <span>${task.description}</span>
    <img src='#' alt="Three Dots Button">`;
    this.addClickListener(elem);
    this.listElem.append(elem);
  }

  static addClickListener(elem) {
    this.checkboxClickListener(elem);
    this.editTextListener(elem);
    this.imageClickListener(elem);
  }

  static checkboxClickListener(elem) {
    elem.querySelector('input[type="checkbox"]').addEventListener('click', () => {
      const complete = elem.querySelector('input[type="checkbox"]').checked;
      changeComplete(complete, elem.id);
    });
  }

  static editTextListener(elem) {
    elem.querySelector('span').addEventListener('click', () => {
      if (!elem.querySelector('span').querySelector('input')) {
        this.listElem.querySelectorAll('.is-selected').forEach((element) => {
          element.classList.remove('is-selected');
        });
        elem.classList.add('is-selected');
        this.listElem.querySelectorAll('input[type="text"]').forEach((inputElem) => {
          inputElem.parentElement.innerHTML = inputElem.value;
        });
        const newInput = `<input type='text' value='${elem.querySelector('span').textContent}' class="focus-visible" data-focus-visible-added/>`;
        elem.querySelector('span').innerHTML = newInput;
        elem.querySelector('span > input').focus();
        this.updateDescriptionListener(elem.querySelector('span > input'), elem);
      }
    });
  }

  static updateDescriptionListener(inputElem, elem) {
    const id = parseInt(elem.id.substring(4), 10);
    inputElem.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        this.updateDesc(inputElem, elem, id);
      }
    });
  }

  static updateDesc(inputElem, elem, id) {
    if (inputElem.value !== '') {
      inputElem.parentElement.innerHTML = inputElem.value;
      TodoList.list[id].description = inputElem.value;
      TodoList.addToStorage();
    } else {
      inputElem.parentElement.innerHTML = TodoList.list[id].description;
    }
    elem.classList.remove('is-selected');
  }

  static imageClickListener(elem) {
    elem.querySelector('img').addEventListener('click', () => {
      if (elem.classList.contains('is-selected')) {
        TodoList.deleteTask(parseInt(elem.id.substring(4), 10), this.listElem);
      }
    });
  }
}