let todoData = document.querySelector(".todoData");
let sumbitTodoBtn = document.querySelector("#sumbitTodoBtn");
let dialog = document.querySelector("#editDialog");
let dialogInput = document.querySelector(".inputTag");

let closeBtn = document.querySelector("dialog button")
let submitEditValue = document.querySelector("#submitEditValue");
let AddNewTodo = document.querySelector("#AddNewTodo");

let todoArryValue = localStorage.getItem("ArrayItem");
let storingInLocal = todoArryValue ? JSON.parse(todoArryValue) : [];
let i = 0;

function generateTags(data, myDate) {
    i = i + 1;

    let pTag = document.createElement("p");
    pTag.innerHTML = `${data.content} <h3> ${myDate} </h3>`;
    let edit = document.createElement("button");
    let deleteButton = document.createElement("button");

    edit.textContent = "Edit";
    deleteButton.textContent = "delete";

    edit.setAttribute("id", i)
    edit.addEventListener("click", (e) => {
        dialog.showModal()
        editTheTodo(data);
    })

    deleteButton.addEventListener("click", (e) => {
        deleteTheTodo(data)
    })
    todoData.append(pTag, edit, deleteButton);
}

function deleteTheTodo(data) {
    const updatedTodo = storingInLocal.filter((item) => item != data);
    localStorage.setItem("ArrayItem", JSON.stringify(updatedTodo));
    location.reload()
}

function editTheTodo(item) {
    let e = document.querySelector("#editInputTag");
    e.value = item;
    console.log(item)
    submitEditValue.addEventListener("click", (e) => {
        let editInputTag = document.querySelector("#editInputTag").value;
        dialog.close();
        for (let i = 0; i < storingInLocal.length; i++) {
            if (storingInLocal[i] === item) {
                storingInLocal[i] = editInputTag;
                console.log(storingInLocal[i])
                localStorage.setItem("ArrayItem", JSON.stringify(storingInLocal))
                location.reload()
            }
        }
    })
}

function saveItemInStorage(data, myDate) {
    let test = {
        "content": data,
        "todoDate": myDate
    }
    console.log(test)
    storingInLocal.push(test)
    localStorage.setItem("ArrayItem", JSON.stringify(storingInLocal));

}

// submit the Add button 

sumbitTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputValue = document.querySelector("#inputTag").value;
    let myDate = document.querySelector("#myDate").value;
    console.log(myDate)
    generateTags(inputValue, myDate);
    saveItemInStorage(inputValue, myDate)

})

AddNewTodo.addEventListener("click", (e) => {
    e.preventDefault();
    dialogInput.showModal();
})

document.addEventListener("DOMContentLoaded", (e) => {
    storingInLocal.forEach(todoItems => {
        console.log(todoItems)
        console.log(todoItems["todoDate"])
        generateTags(todoItems,todoItems["todoDate"])
    });
})



