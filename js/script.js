let addButton = document.querySelector("#add-btn");
let resetButton = document.querySelector("#reset-btn");
let addInput = document.querySelector("#add-container input");

let toDoList = document.querySelector("#to-do-list ul");
let doneList = document.querySelector("#done-list ul");

let errorMessage = document.querySelector("#error-message");

//add function to addButton on click
addButton.addEventListener("click", function() {
    //create a li with input in #to-do-list ul - use addInput as value
    let newToDoListItem = document.createElement("li");
    let newToDoInput = document.createElement("input");
    let input = document.querySelector("#add-container input");

    //if user tries to add empty string - show error message
    if (input.value == "") {
        errorMessage.innerText = "Kan inte lägga till uppgift utan innehåll";
    } //if user inputs string add string to new input field and close field, clear input box for new tasks
        else {
        errorMessage.innerText = "";
        newToDoInput.value = input.value;
        newToDoInput.setAttribute("disabled", "");
        addInput.value = "";
    
    //generate change button for newToDo-li
    let changeBtnToDo = document.createElement("button");
    changeBtnToDo.innerText = "Ändra";
    
    //add change button function on click
    changeBtnToDo.addEventListener("click", function(e){
        //if user tries to add empty string - show error message
        if (newToDoInput.value == "") {
            errorMessage.innerText = "Kan inte lägga till uppgift utan innehåll";
        //unlock input field to let user change input, show save button
        } else if (newToDoInput.hasAttribute("disabled")) {
            newToDoInput.removeAttribute("disabled", "");
            e.target.innerText = "Spara";
            errorMessage.innerText = "";
        //reset button to change, lock input field
        } else {
            e.target.innerText = "Ändra";
            newToDoInput.setAttribute("disabled", "");
            errorMessage.innerText = "";
        }
    })

    //generate delete button for newToDo-li
    let deleteBtnToDo = document.createElement("button");
    deleteBtnToDo.innerText = "Radera"; 

    //add function to delete button on click
    deleteBtnToDo.addEventListener ("click", function(){
        //remove items and related buttons
        newToDoListItem.remove();
        changeBtnToDo.remove();
        doneBtn.remove();
        deleteBtnToDo.remove();
    })

    //generate done button for newToDo-li
    let doneBtn = document.createElement("button");
    doneBtn.innerText = "Färdig";

    doneBtn.addEventListener("click", function(){
        newToDoListItem.remove();
        changeBtnToDo.remove();
        doneBtn.remove();
        deleteBtnToDo.remove();

        let doneItem = document.createElement("li");
        let doneInput = document.createElement("input");
        doneInput.setAttribute("disabled", "");

        //generate change button for doneList li
        let changeBtnDone = document.createElement("button");
        changeBtnDone.innerText = "Ändra";

        changeBtnDone.addEventListener("click", function(e){
            if (doneInput.value == "") {
                errorMessage.innerText = "Kan inte lägga till uppgift utan innehåll";
            } else if (doneInput.hasAttribute("disabled")) {
                doneInput.removeAttribute("disabled", "");
                e.target.innerText = "Spara";
                errorMessage.innerText = "";
            } else {
                e.target.innerText = "Ändra";
                doneInput.setAttribute("disabled", "");
                errorMessage.innerText = "";
            }
        })

        //generate delete button for doneList li
        let deleteBtnDone = document.createElement("button");
        deleteBtnDone.innerText = "Radera";

        deleteBtnDone.addEventListener ("click", function(){
            doneItem.remove();
            changeBtnDone.remove();
            deleteBtnDone.remove();
        })
        
        //add toDoList input to doneList input
        doneInput.value = newToDoInput.value;
        
        //add elements to doneList ul and one to li
        doneList.append(doneItem, changeBtnDone, deleteBtnDone);
        doneItem.appendChild(doneInput);
    })

    //add elements to toDoList ul and one to li
    toDoList.append(newToDoListItem, changeBtnToDo, doneBtn, deleteBtnToDo);
    newToDoListItem.appendChild(newToDoInput);
    }

});

//generate reset button to erase all list items in both lists
resetButton.addEventListener ("click", function(){
    toDoList.innerText = "";
    doneList.innerText = "";
    
});

