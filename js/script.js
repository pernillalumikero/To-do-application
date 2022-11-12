let addButton = document.querySelector("#add-btn");
let resetButton = document.querySelector("#reset-btn");
let addInput = document.querySelector("#add-container input");

let toDoList = document.querySelector("#to-do-list ul");
let doneList = document.querySelector("#done-list ul");

let errorMessage = document.querySelector("#error-message");


class listItem {
    constructor(listItem, input, newInput, changebtn, doneBtn, deletebtn) {
        this.listItem   = listItem;
        this.input      = input;
        this.newInput   = newInput;
        this.changebtn  = changebtn;
        this.doneBtn    = doneBtn;
        this.deletebtn  = deletebtn;
    }

    changeButtonFunction(){
        //if user tries to add empty string - show error message
        if (this.input.value == "") {
            errorMessage.innerText = "Kan inte lägga till uppgift utan innehåll";
        //unlock input field to let user change input, show save button
        } else if (this.input.hasAttribute("disabled")) {
            this.input.removeAttribute("disabled", "");
            this.changebtn.innerText = "Spara";
            errorMessage.innerText = "";
        //reset button to change, lock input field
        } else {
            this.changebtn.innerText = "Ändra";
            this.input.setAttribute("disabled", "");
            errorMessage.innerText = "";
            }
       
    }

    deleteButtonFunction() {
        //remove items and related buttons
        this.listItem.remove();
        this.changebtn.remove();
        this.deletebtn.remove();
        if (this.doneBtn != undefined) {
            this.doneBtn.remove();
        }
    }

    doneButtonFunction() {
        this.input.setAttribute("disabled", "");
        this.input.value = this.newInput.value;
    }

    errorFunction() {
        //if user tries to add empty string - show error message
        if (newInput.value == "") {
            errorMessage.innerText = "Kan inte lägga till uppgift utan innehåll";
        } //if user inputs string add string to new input field and close field, clear input box for new tasks
            else {
            errorMessage.innerText = "";
            input.value = newInput.value;
            input.setAttribute("disabled", "");
            newInput.value = "";
        }
    }
}


//add function to addButton on click
addButton.addEventListener("click", function() {
    //create a li with input in #to-do-list ul - use addInput as value
    let newToDoListItem = document.createElement("li");
    let newToDoInput = document.createElement("input");

    //if user tries to add empty string - show error message
    if (addInput.value == "") {
        errorMessage.innerText = "Kan inte lägga till uppgift utan innehåll";
    } //if user inputs string add string to new input field and close field, clear input box for new tasks
        else {
        errorMessage.innerText = "";
        newToDoInput.value = addInput.value;
        newToDoInput.setAttribute("disabled", "");
        addInput.value = "";
        

        //generate change button
        let changeBtnToDo = document.createElement("button");
        changeBtnToDo.innerText = "Ändra";

        //generate done button for newToDo-li
        let doneBtnToDo = document.createElement("button");
        doneBtnToDo.innerText = "Färdig";

        //generate delete button for newToDo-li
        let deleteBtnToDo = document.createElement("button");
        deleteBtnToDo.innerText = "Radera"; 

        //initialize object: newToDo
        let newToDo = new listItem(newToDoListItem, newToDoInput, addInput, changeBtnToDo, doneBtnToDo, deleteBtnToDo);

         //add function to change button on click
        changeBtnToDo.addEventListener("click", function(){
            newToDo.changeButtonFunction();
        });

        //add function to delete button on click
        deleteBtnToDo.addEventListener ("click", function(){
            newToDo.deleteButtonFunction();
        })

        //add function to done button on click
        doneBtnToDo.addEventListener("click", function(){
            //create a li with input in #done-list ul - use addInput as value
            let doneItem = document.createElement("li");
            let doneInput = document.createElement("input");
            
            //generate change button for doneList li
            let changeBtnDone = document.createElement("button");
            changeBtnDone.innerText = "Ändra";

            //generate delete button for doneList li
            let deleteBtnDone = document.createElement("button");
            deleteBtnDone.innerText = "Radera";

            //initialize object: done
            let done = new listItem(doneItem, doneInput, newToDoInput, changeBtnDone, undefined, deleteBtnDone);

            done.deleteButtonFunction();
            done.doneButtonFunction();
            //doneInput.value = newToDoInput.value;
            
            changeBtnDone.addEventListener("click", function(){
            done.changeButtonFunction();
            })

            deleteBtnDone.addEventListener ("click", function(){
                done.deleteButtonFunction();
            })
            
            //add elements to doneList ul and input to li
            doneList.append(doneItem, changeBtnDone, deleteBtnDone);
            doneItem.appendChild(doneInput);
        })

        //add elements to toDoList ul and input to li
        toDoList.append(newToDoListItem, changeBtnToDo, doneBtnToDo, deleteBtnToDo);
        newToDoListItem.appendChild(newToDoInput);
        }

});

//generate reset button to erase all list items in both lists
resetButton.addEventListener ("click", function(){
    toDoList.innerText = "";
    doneList.innerText = "";
    
});

