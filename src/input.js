import { format, compareAsc, differenceInCalendarDays, isPast } from "date-fns";
// import "./test.js"
import { deleteTheTodo, storingInLocal } from "./storage.js";
import { testF } from "./project.js";
let todoData = document.querySelector(".todoData");
let sumbitTodoBtn = document.querySelector("#sumbitTodoBtn");
let dialog = document.querySelector("#editDialog");
let closeBtn = document.querySelector("#close");
let submitEditValue = document.querySelector("#submitEditValue");

let i = 0;

export function generateTags(data, myDate, project) {
    i = i + 1;
    let pTag = document.createElement("p");
    let pTagDate = document.createElement("p");
    let edit = document.createElement("button");
    let deleteButton = document.createElement("button");
    let dateObj = isPast(new Date(myDate));
    let checkPast = dateObj;
    let dates = new Date(myDate)

    pTag.innerHTML = `${data.content} <h3> ${myDate} </h3>`;
    

    edit.textContent = "Edit";
    deleteButton.textContent = "delete";

    edit.addEventListener("click", (e) => {
        dialog.showModal()
        editTheTodo(data, myDate);
    })

    deleteButton.addEventListener("click", (e) => {
        deleteTheTodo(data)
    })
    pTagDate.innerHTML = `${format(dates, "EEEE/MMM/yyy")}`
    todoData.append(pTag, pTagDate, edit, deleteButton);
}

function editTheTodo(item, myItem) {
    let e = document.querySelector("#editInputTag");
    e.value = item.content;
    submitEditValue.addEventListener("click", (a) => {
        a.preventDefault()
        let editInputTag = document.querySelector("#editInputTag").value;
        for (let i = 0; i < storingInLocal.length; i++) {
            if (storingInLocal[i] === item) {
                storingInLocal[i]["content"] = editInputTag;
                localStorage.setItem("ArrayItem", JSON.stringify(storingInLocal))
                location.reload()

            }
        }
    })
    closeBtn.addEventListener("click", () => {
        dialog.close()
    })
}

// saveItemInStorage(data,myData)
function saveItemInStorage(data, myDate, project) {
    let test = {
        "content": data,
        "todoDate": myDate,
        "project": project
    }
    storingInLocal.push(test)
    localStorage.setItem("ArrayItem", JSON.stringify(storingInLocal));
}
document.querySelector("#myDate").valueAsDate = new Date();

sumbitTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputValue = document.querySelector("#inputTag").value;
    let myDate = document.querySelector("#myDate").value;
    let project = "All";
    generateTags(inputValue, myDate, project);
    saveItemInStorage(inputValue, myDate, project)

})




document.addEventListener("DOMContentLoaded", (e) => {
    testF()

    storingInLocal.forEach(todoItems => {
        generateTags(todoItems, todoItems["todoDate"])
    });

    storingInLocal.forEach(projectName => {
        if(projectName.project != "All"){
            console.log(projectName.project)

        }
    });
})



