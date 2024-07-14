const todoListEl = document.getElementById("todo-list");
let todoList;

// Function to load TODO list from local storage (on page load or refresh)
function loadTodoList() {
  const storedTodoListJson = localStorage.getItem("todoList");
  if (storedTodoListJson) {
    todoList = JSON.parse(storedTodoListJson);
  } else {
    todoList = [];
  }
  populateTodoList(todoList);
}

// Function to add a new TODO item
const addTodo = (todoText) => {
  const newTodo = { text: todoText, completed: false };
  todoList.push(newTodo);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  populateTodoList(todoList);
};

// Function to remove a TODO item
const removeTodo = (todoIndex) => {
  todoList.splice(todoIndex, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  populateTodoList(todoList);
};

function populateTodoList(todoList) {
  todoListEl.innerHTML = ""; // Clear existing list items
  todoList.forEach((todoItem) => {
    const newListItem = document.createElement("li");
    newListItem.innerText = todoItem.text;

    // Add a checkbox to mark the item as complete (optional)
    const completeCheckbox = document.createElement("input");
    completeCheckbox.type = "checkbox";
    completeCheckbox.checked = todoItem.completed;
    newListItem.appendChild(completeCheckbox);

    // Add a button to remove the item (optional)
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", () => {
      removeTodo(todoList.indexOf(todoItem));
    });
    newListItem.appendChild(removeBtn);

    todoListEl.appendChild(newListItem);
  });
}

// Load TODO list on page load
loadTodoList();
