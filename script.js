const todoListEl = document.getElementById("todo-list");
const newTodoInput = document.getElementById('new-todo');
const addTodoBtn = document.getElementById('add-todo-btn');
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

function updateTodoListInLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function populateTodoList(todoList) {
  todoListEl.innerHTML = ""; // Clear existing list items
  todoList.forEach((todoItem) => {
    const newListItem = document.createElement("li");
    newListItem.innerText = todoItem.text;

    const actionDiv = document.createElement("div");

    // Add a checkbox to mark the item as complete (optional)
    const completeCheckbox = document.createElement("input");
    completeCheckbox.type = "checkbox";
    completeCheckbox.checked = todoItem.completed;
    // Event listener for checkbox click to update status
    completeCheckbox.addEventListener("change", () => {
      todoItem.completed = completeCheckbox.checked;
      updateTodoListInLocalStorage(); // Update data in local storage
    });
    
    actionDiv.appendChild(completeCheckbox);

    // Add a button to remove the item (optional)
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "X";
    removeBtn.addEventListener("click", () => {
      removeTodo(todoList.indexOf(todoItem));
    });
    actionDiv.appendChild(removeBtn);

    newListItem.appendChild(actionDiv);
    todoListEl.appendChild(newListItem);
  });
}

// Event listener for adding a todo on button click
addTodoBtn.addEventListener('click', () => {
  const newTodoValue = newTodoInput.value.trim();
  if (newTodoValue) {
    addTodo(newTodoValue);
    newTodoInput.value = "";
  }
});


// Load TODO list on page load
loadTodoList();
