let addButton    = document.querySelector("#add-btn");
let resetButton  = document.querySelector("#reset-btn");
let addInput     = document.querySelector("#add-container input");

let toDoList     = document.querySelector("#to-do-list ul");
let doneList     = document.querySelector("#done-list ul");

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
            errorMessage.innerText = "";
            this.input.removeAttribute("disabled", "");
            this.changebtn.innerText = "Spara";
        //reset button to change, lock input field
        } else {
            errorMessage.innerText = "";
            this.changebtn.innerText = "Ändra";
            this.input.setAttribute("disabled", "");
            }
    }

    deleteButtonFunction() {
        //remove items and related buttons
        this.listItem.remove();
        this.changebtn.remove();
        this.deletebtn.remove();
        //added if-statement to have method work for both objects
        if (this.doneBtn != undefined) {
            this.doneBtn.remove();
        }
    }

    doneButtonFunction() {
        //if user clicks done button deleteButtonFunction is called first, 
        //then this method sets attribute and input value
        this.input.setAttribute("disabled", "");
        this.input.value = this.newInput.value;
    }

    errorFunction() {
        //if user tries to add empty string - show error message
        if (this.newInput.value == "") {
            errorMessage.innerText = "Kan inte lägga till uppgift utan innehåll";
        } //if user inputs string add string to new input field and close field, 
          //clear input box for new tasks and add items to toDoList
            else {
            errorMessage.innerText = "";
            this.input.value = this.newInput.value;
            this.input.setAttribute("disabled", "");
            this.newInput.value = "";

             //add elements to toDoList ul and input to li
            toDoList.append(this.listItem, this.changebtn, this.doneBtn, this.deletebtn);
            this.listItem.appendChild(this.input);
        }
    }
}


//add function to addButton on click
addButton.addEventListener("click", function() {
    //create a li with input in #to-do-list ul - use addInput as value
    let newToDoListItem = document.createElement("li");
    let newToDoInput = document.createElement("input");
    
        //generate change button for newToDo-li
        let changeBtnToDo = document.createElement("button");
        changeBtnToDo.innerText = "Ändra";

        //generate done button for newToDo-li
        let doneBtnToDo = document.createElement("button");
        doneBtnToDo.innerText = "Färdig";

        //generate delete button for newToDo-li
        let deleteBtnToDo = document.createElement("button");
        deleteBtnToDo.innerText = "Radera"; 

        //declare object: newToDo
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

            //declare object: done
            let done = new listItem(doneItem, doneInput, newToDoInput, changeBtnDone, undefined, deleteBtnDone);

            //call object methods
            newToDo.deleteButtonFunction();
            done.doneButtonFunction();

            //add function button on click
            changeBtnDone.addEventListener("click", function(){
                done.changeButtonFunction();
            })
            //add function on button on click
            deleteBtnDone.addEventListener ("click", function(){
                done.deleteButtonFunction();
            })
            
            //add elements to doneList ul and input to li
            doneList.append(doneItem, changeBtnDone, deleteBtnDone);
            doneItem.appendChild(doneInput);
        })
        //call object method
        newToDo.errorFunction();
});

//generate reset button to erase all list items in both lists
resetButton.addEventListener ("click", function(){
    toDoList.innerText = "";
    doneList.innerText = "";
});

