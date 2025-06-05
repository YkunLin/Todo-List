function addTodo() {
    //Get the user's input from the text field
    const userInput = document.querySelector(".todo-input").value;
    const value = userInput.trim();

    //If input is empty, show an alert and stop
    if (value == ""){
        alert("Please enter a todo item.");
        return;
    }
    console.log(value);

    //Create a new div element to represent the todo item
    const item = document.createElement("div");
    item.className = "item";

    //Set the inner HTML of the item (checkbox + text + edit/delete buttons)
    item.innerHTML = `
            <div>
                <input type="checkbox">
                <span class="content">${value}</span>
            </div>
            <div>
                <span class="edit">Edit</span>
                <span class="delete">Delete</span>
            </div>`;

    //Append the new todo item to the todo-app container
    document.querySelector(".todo-list").appendChild(item);
    saveTodos(); //save after adding

    // Attach an event listener to trigger a function when the specified event occurs
    item.querySelector(".delete").addEventListener("click", deleteTodo);
    item.querySelector("input[type='checkbox']").addEventListener("change", toggleCompleted);
    item.querySelector(".edit").addEventListener("click", editTodo);
}

function toggleCompleted(event){
    //get the checkbox that was clicked
    const checkbox = event.target;
    //find the parent .item
    const todoItem = checkbox.closest(".item");

    // Toggle the "completed" class:
    // - If the element already has the class, remove it
    // - If it doesn't, add it
    todoItem.classList.toggle("completed");

    saveTodos();

}

function editTodo(event){
    //get the edit button that was clicked
    const editButton = event.target;
    const todoItem = editButton.closest(".item");
    const content = todoItem.querySelector(".content"); //Get the span that displays the todo text

    //toggle editing mode
    if(!content.isContentEditable) {
        content.contentEditable = "true";
        content.focus();
        editButton.textContent = "Save";
    } 
    else{
        content.contentEditable = "false";
        editButton.textContent = "Edit";

        saveTodos();
    }
}

function deleteTodo(event) {
    //Get the delete button that was clicked
    const deleteButton = event.target;
    console.log(deleteButton);

    //Find its closest parent with class "item"
    const todoItem = deleteButton.closest(".item");

    //Remove that parent from the DOM
    todoItem.remove();

    saveTodos();
}

function saveTodos(){
    //Select all todo item elements on the page
    const items = document.querySelectorAll(".item");
    // Create an array to store todo data
    const todos = [];

    // Loop through each todo item and extract its data
    items.forEach(item => {
        const text = item.querySelector(".content").textContent; //get the todo text
        const completed = item.classList.contains("completed"); //check if it's marked as completed
        todos.push({text, completed});               //Add this todo as an object to the array
    });

    //Convert the array to a JSON string and save it in localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
}

//Load saved todos from localStorage and display them
function loadTodos(){
    // Get saved data from localStorage
    const stored = localStorage.getItem("todos");
    if (!stored){ //if nothing to load
        return;
    }

    //convert JSON string back to array
    const todos = JSON.parse(stored);

    // For each todo object, create a new item on the page
    todos.forEach(todo => {
        createTodoFromStorage(todo.text, todo.completed);
    });
}

//Create a todo item from saved data (used during page reload)
function createTodoFromStorage(text, completed){
    const item = document.createElement("div");
    item.className = "item";
    
    if(completed){// Add 'completed' class if needed
        item.classList.add("completed");
    }

    item.innerHTML = `
        <div>
            <input type = "checkbox" ${completed ? "checked" : ""}>
            <span class = "content">${text}</span>
        </div>
        <div>
            <span class = "edit">Edit</span>
            <span class = "delete">Delete</span>
        </div>
    `;

    //Append the new todo item to the todo-app container
    document.querySelector(".todo-list").appendChild(item);

    //Bind events
    item.querySelector(".delete").addEventListener("click", deleteTodo);
    item.querySelector("input[type='checkbox']").addEventListener("change", toggleCompleted);
    item.querySelector(".edit").addEventListener("click", editTodo);
}


// Bind click event (addTodo function) to the Add Todo button
document.querySelector(".todo-button").addEventListener("click", addTodo);

// When the DOM is fully loaded, load saved todos from localStorage
window.addEventListener("DOMContentLoaded", loadTodos);