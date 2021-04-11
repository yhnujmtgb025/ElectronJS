
const { ipcRenderer } = require('electron')

// Add todo to store and show them
const form = document.getElementById("form")
const input = document.getElementById("input")
const todosUL = document.getElementById("todos")

const todos = JSON.parse(localStorage.getItem('todos'));


if(todos){
    todos.forEach(todo=>{
      addTodo(todo)
    })
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
})

function createTodoItemView(content) {
  const liNode = document.createElement('li');
  // close button
  const span = document.createElement("span");
  span.className = 'close';
  
  const txt = document.createTextNode("\u00D7");
  span.appendChild(txt);

  liNode.textContent = content;
  liNode.appendChild(span);
  return liNode;
}
function addTodo(todo) {
  let todoText = input.value

  if(todo){
    todoText = todo.text
  }
  if (todoText) {
    const todoE1 = document.createElement("li");

    if(todo && todo.completed){
        todoE1.classList.add("completed")
    }

    todoE1.innerText = todoText;

    todoE1.addEventListener('click', () => {
      todoE1.classList.toggle("completed");
      updateLS();
    })

    todoE1.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todoE1.remove();
      updateLS();
    })
   
    

    todosUL.appendChild(todoE1);
    input.value = ''
    updateLS()
  }
  
}

function updateLS() {
  const todosE1 = document.querySelectorAll("li");

  const todos = [];

  todosE1.forEach((todoE1) => {
    todos.push({
      text: todoE1.innerHTML,
      completed: todoE1.classList.contains("completed"),
    })
  })
  localStorage.setItem("todos", JSON.stringify(todos));
}

function editLS(){
  const todosE1 = document.querySelectorAll("li");

}

function deleteAll(){
  window.localStorage.clear();
}
// clear todo from stock
ipcRenderer.on('delete', () => {
  // get the todoList ul
  deleteAll();
  const todoList = document.getElementById('todos')
  todoList.innerHTML = ''
})