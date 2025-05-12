import { format, isFuture, isToday } from "date-fns";
import { deleteTheTodo, storingInLocal } from "./storage.js";
import "./project.js";
import { createTags , selectTags } from "./dom.js";

let todoData = document.querySelector(".todoData");
let sumbitTodoBtn = document.querySelector("#sumbitTodoBtn");
let dialog = document.querySelector("#editDialog");
let closeBtn = document.querySelector("#close");
let submitEditValue = document.querySelector("#submitEditValue");

let projectNames = localStorage.getItem("projectArray");
let projectNamesArray = projectNames ? JSON.parse(projectNames) : [];

export function generateTags(data, myDate, project,priority,checkBox) {
    if (data.content != "") {
        let dates = new Date(myDate)
        let pTag = createTags("p",`${data.content} ${priority}`,"test")
        let pTagDate = createTags("p",`${format(dates, 'EEEE/MM/yyyy')}`,"pdate")
        let edit = createTags("button","Edit","edit");
        let deleteButton = createTags("button","Delete","delete");
        let checkBoxTag = document.createElement("INPUT");

        checkBoxTag.setAttribute("type","checkbox")
        checkBoxTag.checked = checkBox; 
        
        checkBoxTag.addEventListener("click",(e)=>{
            checkBoxTick(data.content, checkBoxTag.checked)
        })

        edit.addEventListener("click", (e) => {
            dialog.showModal()
            editTheTodo(data, myDate);
        })
      
        deleteButton.addEventListener("click", (e) => {
            deleteTheTodo(data)
        })
        todoData.append(pTag, pTagDate, edit, deleteButton,checkBoxTag);
    }
}

function checkBoxTick(data,check){

    let a = storingInLocal.map(item => {
        if(item.content === data){
            return { ...item, checkBox: check}            
        }
        return item;
    })
    storingInLocal.length = 0;
    storingInLocal.push(...a);
    localStorage.setItem("ArrayItem", JSON.stringify(a));

     
}

function editTheTodo(item, myItem) {
    let ed = document.querySelector("#mDate");
    let test = new Date(myItem);
    ed.valueAsDate = test;

    selectTags("#editInputTag",item.content);
    submitEditValue.addEventListener("click", (e) => {
        e.preventDefault()
        let editInputTag = document.querySelector("#editInputTag").value;
        let ed = document.querySelector("#mDate").value;

        for (let i = 0; i < storingInLocal.length; i++) {
            if (storingInLocal[i] === item) {
                storingInLocal[i]["content"] = editInputTag;
                storingInLocal[i]["todoDate"] = ed;
                localStorage.setItem("ArrayItem", JSON.stringify(storingInLocal))
                location.reload()
            }
        }
    })
    closeBtn.addEventListener("click", () => {
        dialog.close()
    })
}

export function localStorageForeach(){
    storingInLocal.forEach(todoItems => {
        generateTags(todoItems, todoItems.todoDate, todoItems.project,todoItems.priority ,todoItems.checkBox )
    });
}

// saveItemInStorage(data,myData)
function saveItemInStorage(data, myDate, project,priority,checkBox) {
    let test = {
        "content": data,
        "todoDate": myDate,
        "project": project,
        "priority":priority,
        "checkBox":checkBox
    }
    storingInLocal.push(test)
    localStorage.setItem("ArrayItem", JSON.stringify(storingInLocal));
}
document.querySelector("#myDate").valueAsDate = new Date();

sumbitTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let checkBox = document.querySelector('#check').checked;

    let defaultProject = document.querySelector("#defaultprj");
    let inputValue = document.querySelector("#inputTag").value;
    let myDate = document.querySelector("#myDate").value;
    let selectBar = document.querySelector("#selectBar").value;
    generateTags(inputValue, myDate, defaultProject.value,selectBar,checkBox);
    saveItemInStorage(inputValue, myDate, defaultProject.value,selectBar , checkBox)

})
document.addEventListener("DOMContentLoaded", (e) => {
    localStorageForeach()
    projectNamesArray.forEach(element => {
        newProjectNav(element)
    });

})

//project area
let newProject = document.querySelector("#newProject");
let projectDialog = document.querySelector(".projectDialog");
let submitProjectName = document.querySelector("#submitProjectName");
let myprj = document.querySelector(".myprj")

newProject.addEventListener("click", (e) => {
    e.preventDefault();
    projectDialog.showModal()
})

function savePrjNames(data) {
    projectNamesArray.push(data);
    localStorage.setItem("projectArray", JSON.stringify(projectNamesArray));
}

submitProjectName.addEventListener("click", (e) => {
    e.preventDefault();
    let projectName = document.querySelector("#projectName").value;
    saveItemInStorage("", "", projectName,"");
    savePrjNames(projectName)
    newProjectNav(projectName)
    projectDialog.close()
})

function newProjectNav(data) {
    console.log(data)
    let ptag = createTags("p",`${data}`,"prjClass")
    let defaultProject = document.querySelector("#defaultprj");
    ptag.addEventListener("click", (e) => {
        defaultProject.value = data;
        todoData.innerHTML = "";
        storingInLocal.forEach(todoItems => {
            if (data === "All" || todoItems.project === data) {
                console.log("this is it")
                generateTags(todoItems, todoItems.todoDate, todoItems.project,todoItems.priority,todoItems.checkBox);

            }
        });
    })
    myprj.appendChild(ptag);
}

