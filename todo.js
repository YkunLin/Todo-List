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
}


// Bind click event (addTodo function) to the Add Todo button
document.querySelector(".todo-button").addEventListener("click", addTodo);