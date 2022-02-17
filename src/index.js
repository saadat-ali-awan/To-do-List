import './stylesheet/main.css';
import events from './js/events.js';
import todolist from './js/todolist.js';
import domElements from './js/dom_elements.js';

window.addEventListener('load', () => {
  todolist.init();
  events.init(domElements);
});