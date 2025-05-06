let todoData = document.querySelector(".todoData");
let sumbitTodoBtn = document.querySelector("#sumbitTodoBtn");
let dialog = document.querySelector("dialog");
let closeBtn = document.querySelector("dialog button")


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

function loadTodos() {
    let todo = JSON.parse(localStorage.getItem("todolist")) || [];
    todo.forEach(item => {
        addTodoToDOM(item);
    });
}

function createTodoTags() {
    let inputTagValue = document.querySelector("#inputTag").value;
    //div tag for p
    if (inputTagValue) {
        // let todo = JSON.parse(localStorage.getItem("todolist")) || [];

        let divContainer = document.createElement("div");
        divContainer.classList = "divContainer";
        let pTag = document.createElement("p");


        pTag.textContent = localStorage.getItem("todolist");
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
        // localStorage.clear();

        todo.push(inputTagValue);
        localStorage.setItem("todolist", JSON.stringify(todo))
        console.log(localStorage.getItem("todolist"));
        
        divContainer.appendChild(pTag)
        divContainer.appendChild(deleteDiv)
        divContainer.appendChild(editButton)
        todoData.appendChild(divContainer);
    }
}
console.log(localStorage.getItem("todoList"))


sumbitTodoBtn.addEventListener("click", (e) => {
    e.preventDefault()
    createTodoTags()
})



export { createTodoTags }