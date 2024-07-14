const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');
const addTodoBtn = document.getElementById('add-todo-btn');

// Function to add a new todo item
const addTodo = (todoText) => {
  const newTodoItem = document.createElement('li');
  newTodoItem.innerText = todoText;

  // Add a button to remove the todo item (optional)
  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'Remove';
  removeBtn.addEventListener('click', () => {
    todoList.removeChild(newTodoItem);
  });

  newTodoItem.appendChild(removeBtn);
  todoList.appendChild(newTodoItem);
  newTodoInput.value = ''; // Clear input field after adding
};

// Event listener for adding a todo on button click
addTodoBtn.addEventListener('click', () => {
  const newTodoValue = newTodoInput.value.trim();
  if (newTodoValue) {
    addTodo(newTodoValue);
  }
});
