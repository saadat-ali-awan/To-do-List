import TodoList from './todo_list.js';

export function changeComplete(isComplete, id) {
  if (isComplete) {
    document.querySelector(`#${id}`).classList.add('completed');
  } else {
    document.querySelector(`#${id}`).classList.remove('completed');
  }

  TodoList.list[parseInt(id.substring(4), 10)].completed = isComplete;
  TodoList.addToStorage();
}

export function removeAllCompleted() {
  document.querySelectorAll('.completed').forEach((listItem) => listItem.remove());
}