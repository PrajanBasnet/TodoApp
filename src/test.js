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


function createTodos(itms){
    let pTag = document.createElement("p");
    pTag.textContent = itms
    pTag.classList = "todoInfo";
    todoData.appendChild(pTag);
    saveTask(itms);
}

let tasks = JSON.parse(localStorage.getItem("myTask")) || [];

function saveTask(items){
    
    tasks.push(items);
    localStorage.setItem("myTask",JSON.stringify(tasks));
    loadTasks()
}

function loadTasks(){
    console.log(JSON.parse(localStorage.getItem("myTask")));
}


sumbitTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputTagValue = document.querySelector("#inputTag").value;
    createTodos(inputTagValue)

})
function t(x){
    let pTag = document.createElement("p");
    pTag.textContent = x;
    pTag.classList = "todoInfo";
    todoData.appendChild(pTag);
}
window.addEventListener("DOMContentLoaded", () => {

    tasks.forEach(task => {
       t(task)
    });
});

export {createTodos} ;