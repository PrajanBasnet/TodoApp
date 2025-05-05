let todoData = document.querySelector(".todoData");
let sumbitTodoBtn = document.querySelector("#sumbitTodoBtn");
let dialog = document.querySelector("dialog");
let closeBtn = document.querySelector("dialog button")

let a = 0;

let currentEditingPTag = null;

function deleteTodoTags(divContainer) {
    let deletebutton = document.createElement("button");
    deletebutton.textContent = "Delete";
    deletebutton.classList = "deleteButton";
    deletebutton.addEventListener("click", () => {
        divContainer.innerHTML = "";
    })
    return deletebutton;
}

let submitEditValue = document.querySelector("#submitEditValue");
let editInputTag = document.querySelector("#editInputTag");

submitEditValue.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentEditingPTag) {
        currentEditingPTag.textContent = editInputTag.value;
        dialog.close();
    }
})

closeBtn.addEventListener("click", () => {
    dialog.close();
});


function createTodoTags() {
    let inputTagValue = document.querySelector("#inputTag").value;
    //div tag for p
    if(inputTagValue){
       
        let divContainer = document.createElement("div");
        divContainer.classList = "divContainer";
        let pTag = document.createElement("p");
    

    pTag.textContent = inputTagValue;
    pTag.classList = "todoInfo";
    
    let deleteDiv = deleteTodoTags(divContainer);
    
    let editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.classList = "editButton";
    
    editButton.addEventListener("click", (e) => {
        e.preventDefault();

        currentEditingPTag = pTag;
        editInputTag.value = pTag.textContent;
        dialog.showModal();
    })
    
    divContainer.appendChild(pTag)
    divContainer.appendChild(deleteDiv)
    divContainer.appendChild(editButton)
    
    todoData.appendChild(divContainer);
}
}


sumbitTodoBtn.addEventListener("click", (e) => {
    e.preventDefault()
    createTodoTags()
})



export { createTodoTags }