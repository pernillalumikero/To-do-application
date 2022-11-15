let addButton    = document.querySelector("#add-btn");
let resetButton  = document.querySelector("#reset-btn");
let addInput     = document.querySelector("#add-container input");

let toDoList     = document.querySelector("#to-do-list ul");
let doneList     = document.querySelector("#done-list ul");

let errorMessage = document.querySelector("#error-message");

//CLASS AND METHODS

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
        this.changebtn.addEventListener("click", function(){
        //if user tries to add empty string - show error message
        if (this.newInput.value == "") {
            errorMessage.innerText = "Kan inte spara uppgift utan innehåll";
        //unlock input field to let user change input, show save button
        } else if (this.newInput.hasAttribute("disabled")) {
            errorMessage.innerText = "";
            this.newInput.removeAttribute("disabled", "");
            this.changebtn.innerText = "Spara";
        //reset button to change, lock input field
        } else {
            errorMessage.innerText = "";
            this.changebtn.innerText = "Ändra";
            this.newInput.setAttribute("disabled", "");
            }
        })
    }

    deleteButtonFunction() { 
        this.deletebtn.addEventListener ("click", function(){
        //remove items and related buttons
        errorMessage.innerText = "";
        this.listItem.remove();
        this.changebtn.remove();
        this.deletebtn.remove();
        //check for done button and remove if found
        if (this.doneBtn != undefined) {
            this.doneBtn.remove();
        }
        })
    }

    addFunction() { 
        this.listItem = document.createElement("li");
        this.newInput = document.createElement("input");
        this.changebtn = document.createElement("button");
        this.changebtn.innerText = "Ändra";
        this.doneBtn = document.createElement("button");
        this.doneBtn.innerText = "Färdig";
        this.deletebtn = document.createElement("button");
        this.deletebtn.innerText = "Radera"; 

        this.doneBtn.addEventListener("click", function(){
        //if user tries to add empty string - show error message
            if (this.input.value == "") {
                errorMessage.innerText = "Kan inte lägga till uppgift utan innehåll";
            } //if user inputs string add string to new input field and close field, 
            //clear input box for new tasks and add items to toDoList
                else {
                errorMessage.innerText = "";
                this.newInput.value = this.input.value;
                this.newInput.setAttribute("disabled", "");
                this.input.value = "";

                //check if object has done-button
                if (this.doneBtn == undefined) {
                    //add elements to doneList ul and input to li
                    doneList.append(this.listItem, this.changebtn, this.deletebtn);
                    this.listItem.appendChild(this.newInput);
                } else {
                    //add elements to toDolist and input to li
                    toDoList.append(this.listItem, this.changebtn, this.doneBtn, this.deletebtn);
                    this.listItem.appendChild(this.newInput);
                }
            }
        })
    }
}

//APPLICATION CODE STARTS HERE

//add function to addButton on click
addButton.addEventListener("click", function() {
    //create a li with input in #to-do-list ul
        let newToDoListItem = "";
        let newToDoInput = "";
    
        //generate change button for newToDo-li
        let changeBtnToDo = "";

        //generate done button for newToDo-li
        let doneBtnToDo = "";
        doneBtnToDo.id = "done-btn";

        //generate delete button for newToDo-li
        let deleteBtnToDo = "";
        
        //declare object: newToDo
        let newToDo = new listItem(newToDoListItem, addInput, newToDoInput, changeBtnToDo, doneBtnToDo, deleteBtnToDo);
        
        newToDo.addFunction();
        
        console.log(changeBtnToDo);
        
         //add function to change-button on click
        newToDo.changeButtonFunction();

        //add function to delete-button on click
        newToDo.deleteButtonFunction();

        //add function to done-button on click
            //create a li with input in #done-list ul - use addInput as value
            let doneItem = "";
            let doneInput = "";
            
            //generate change button for doneList li
            let changeBtnDone = "";

            //generate delete button for doneList li
            let deleteBtnDone = "";

            //declare object: done
            let done = new listItem(doneItem, newToDoInput, doneInput, changeBtnDone, undefined, deleteBtnDone);

            done.addFunction();

            //check for errormessages, call objects method if none
            if (errorMessage.innerText == "") {
            newToDo.deleteButtonFunction();
            }

            //add function button on click
                done.changeButtonFunction();

            //add function on button on click
                done.deleteButtonFunction();

        //call object method
});

//generate reset button to erase all list items in both lists
resetButton.addEventListener ("click", function(){
    toDoList.innerText = "";
    doneList.innerText = "";
});