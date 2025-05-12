import { format, compareAsc, differenceInCalendarDays, isPast } from "date-fns";
import { deleteTheTodo, storingInLocal } from "./storage.js";
import "./project.js";
let todoData = document.querySelector(".todoData");
let sumbitTodoBtn = document.querySelector("#sumbitTodoBtn");
let dialog = document.querySelector("#editDialog");
let closeBtn = document.querySelector("#close");
let submitEditValue = document.querySelector("#submitEditValue");
let defaultProject = document.querySelector("#defaultprj");


let projectNames = localStorage.getItem("projectArray");
let projectNamesArray = projectNames ? JSON.parse(projectNames) : [];

let i = 0;

export function generateTags(data, myDate, project) {
    i = i + 1;
    if(data.content != ""){

    let pTag = document.createElement("p");    
    let pTagDate = document.createElement("p");
    let edit = document.createElement("button");
    let deleteButton = document.createElement("button");
    let dateObj = isPast(new Date(myDate.todoDate));
    let dates = new Date(myDate)
    pTag.innerHTML = `${data.content}`;

    edit.textContent = "Edit";
    deleteButton.textContent = "delete";
    
    edit.addEventListener("click", (e) => {
        dialog.showModal()
        editTheTodo(data, myDate.todoDate);
    })    

    deleteButton.addEventListener("click", (e) => {
        deleteTheTodo(data)
    })    
    // pTagDate.innerHTML = `${format(dates, 'EEEE/MM/yyyy')}`;
    todoData.append(pTag, pTagDate, edit, deleteButton);
}    
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
    let defaultProject = document.querySelector("#defaultprj");
    let inputValue = document.querySelector("#inputTag").value;
    let myDate = document.querySelector("#myDate").value;
    let project = "All";

    generateTags(inputValue, myDate, defaultProject.value);
    saveItemInStorage(inputValue, myDate, defaultProject.value)

})    
document.addEventListener("DOMContentLoaded", (e) => {
    storingInLocal.forEach(todoItems => {
        generateTags(todoItems, todoItems.todoDate, todoItems.project)

    });    
    projectNamesArray.forEach(element => {
        newProjectNav(element)

    });

})    

//project area
let newProject = document.querySelector("#newProject");
let projectDialog = document.querySelector(".projectDialog");
let submitProjectName = document.querySelector("#submitProjectName");
let myprj = document.querySelector(".myprj")

newProject.addEventListener("click",(e)=>{
    e.preventDefault();
    projectDialog.showModal()
})

function savePrjNames(data){
    projectNamesArray.push(data);
    localStorage.setItem("projectArray",JSON.stringify(projectNamesArray));
}

submitProjectName.addEventListener("click",(e)=>{
    e.preventDefault();
    let projectName = document.querySelector("#projectName").value;
    
    saveItemInStorage("","",projectName);
    savePrjNames(projectName)
    newProjectNav(projectName)
    projectDialog.close()
})

function newProjectNav(data){
    let ptag = document.createElement("p");
    ptag.classList = "prjClass"
    ptag.innerHTML = data;
    let defaultProject = document.querySelector("#defaultprj");
    ptag.addEventListener("click",(e)=>{
        defaultProject.value = data;
        todoData.innerHTML = "";
        storingInLocal.forEach(todoItems => {
            if(data === "All" || todoItems.project === data){
                generateTags(todoItems, todoItems.todoDate, todoItems.project);
            }
    
        });
    })
    myprj.appendChild(ptag);
}

