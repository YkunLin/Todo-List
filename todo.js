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
                <span class="name">${value}</span>
            </div>
            <div>
                <span class="edit">Edit</span>
                <span class="delete">Delete</span>
            </div>`;

    //Append the new todo item to the todo-app container
    document.querySelector(".todo-list").appendChild(item);
}

function toggleCompleted(){

}

function editTodo(){

}

function deleteTodo() {

}


// Attach an event listener to trigger a function when the specified event occurs
document.querySelector(".todo-button").addEventListener("click", addTodo);