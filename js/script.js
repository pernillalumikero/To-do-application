//CLASS AND METHODS

class listItem {
    constructor(li, input, newInput, changebtn, doneBtn, deletebtn) {
        this.li         = li;
        this.input      = input;
        this.newInput   = newInput;
        this.changebtn  = changebtn;
        this.doneBtn    = doneBtn;
        this.deletebtn  = deletebtn;
    }

    errorMessageFunction() {
        //if user tries to add empty string - show error message
        if (this.newInput.value == "") {
            errorMessage.innerText = "Kan inte spara uppgift utan innehåll";
        } else {
            errorMessage.innerText = "";
        }
    }

    changeButtonFunction(){
        this.errorMessageFunction();
        if (errorMessage.innerText == "") {
            //unlock input field to let user change input, show save button
            if (this.newInput.hasAttribute("disabled")) {
                this.newInput.removeAttribute("disabled", "");
                this.changebtn.innerText = "Spara";
            //reset button to change, lock input field
            } else {
                this.changebtn.innerText = "Ändra";
                this.newInput.setAttribute("disabled", "");
                }
        }
    }

    deleteButtonFunction() {
        //remove items and related buttons
        errorMessage.innerText = "";
        this.li.remove();
        this.changebtn.remove();
        this.deletebtn.remove();
        //check for done button and remove if found
        if (this.doneBtn != undefined) {
            this.doneBtn.remove();
        }
    }

    addFunction() {
        //if user inputs string add string to new input field and close field, 
        //clear input box for new tasks
        this.newInput.value = this.input.value;
        this.newInput.setAttribute("disabled", "");
        this.input.value = "";

        //check if object has done-button
        if (this.doneBtn == undefined) {
            //add elements to doneList ul and input to li
            doneList.append(this.li, this.changebtn, this.deletebtn);
            this.li.appendChild(this.newInput);
        } else {
            //add elements to toDolist and input to li
            toDoList.append(this.li, this.changebtn, this.doneBtn, this.deletebtn);
            this.li.appendChild(this.newInput);
        }
        }
    }

//GLOBAL VARIABLES

let addButton    = document.querySelector("#add-btn");
let resetButton  = document.querySelector("#reset-btn");

let toDoList     = document.querySelector("#to-do-list ul");
let doneList     = document.querySelector("#done-list ul");

let errorMessage = document.querySelector("#error-message");

//APPLICATION CODE STARTS HERE

addButton.addEventListener("click", function() {
    let addInput = document.querySelector("#add-container input");
    
    let newToDoListItem = document.createElement("li");
    let newToDoInput = document.createElement("input");
    
    let changeBtnToDo = document.createElement("button");
    changeBtnToDo.innerText = "Ändra";

    let doneBtnToDo = document.createElement("button");
    doneBtnToDo.innerText = "Färdig";
    doneBtnToDo.id = "done-btn";

    let deleteBtnToDo = document.createElement("button");
    deleteBtnToDo.innerText = "Radera"; 

    let newToDo = new listItem(newToDoListItem, addInput, newToDoInput, changeBtnToDo, doneBtnToDo, deleteBtnToDo);
        
    changeBtnToDo.addEventListener("click", function(){
            newToDo.changeButtonFunction();
    });

    deleteBtnToDo.addEventListener ("click", function(){
        newToDo.deleteButtonFunction();
    })

    doneBtnToDo.addEventListener("click", function(){

        let doneItem = document.createElement("li");
        let doneInput = document.createElement("input");
            
        let changeBtnDone = document.createElement("button");
        changeBtnDone.innerText = "Ändra";

        let deleteBtnDone = document.createElement("button");
        deleteBtnDone.innerText = "Radera";

        let done = new listItem(doneItem, newToDoInput, doneInput, changeBtnDone, undefined, deleteBtnDone);

        newToDo.errorMessageFunction();
        if (errorMessage.innerText == "") {
        done.addFunction();
        }

        if (errorMessage.innerText == "") {
            newToDo.deleteButtonFunction();
        }

        changeBtnDone.addEventListener("click", function(){
                done.changeButtonFunction();
        })

        deleteBtnDone.addEventListener ("click", function(){
            done.deleteButtonFunction();
        })
        })
    
    if (addInput.value == "") {
        errorMessage.innerText = "Kan inte lägga till uppgift utan innehåll";
    } else {
        errorMessage.innerText = "";
        newToDo.addFunction();
    }

});

resetButton.addEventListener ("click", function(){
    toDoList.innerText = "";
    doneList.innerText = "";
});