import { format, compareAsc, differenceInCalendarDays, isPast , isFuture, isToday } from "date-fns";
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

export function generateTags(data, myDate, project,priority,checkBox) {
    if (data.content != "") {
        let pTag = document.createElement("p");
        let pTagDate = document.createElement("p");
        let edit = document.createElement("button");
        let deleteButton = document.createElement("button");
        let checkBoxTag = document.createElement("INPUT");
        checkBoxTag.setAttribute("type","checkbox")
        checkBoxTag.checked = checkBox; 
        
        let dates = new Date(myDate)
        pTag.innerHTML = `${data.content} <br> ${priority}`;

        edit.textContent = "Edit";
        deleteButton.textContent = "delete";

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
        pTagDate.innerHTML = `${format(dates, 'EEEE/MM/yyyy')}`;
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
    console.log(typeof(a))
    storingInLocal.length = 0;
    storingInLocal.push(...a);
    console.log(a)
    localStorage.setItem("ArrayItem", JSON.stringify(a));

     
}

function editTheTodo(item, myItem) {
    let e = document.querySelector("#editInputTag");
    let ed = document.querySelector("#mDate");
    let test = new Date(myItem);
    ed.valueAsDate = test;
    e.value = item.content;
   
    submitEditValue.addEventListener("click", (a) => {
        a.preventDefault()
        let editInputTag = document.querySelector("#editInputTag").value;
        let ed = document.querySelector("#mDate").value;

        for (let i = 0; i < storingInLocal.length; i++) {
            if (storingInLocal[i] === item) {
                storingInLocal[i]["content"] = editInputTag;
                storingInLocal[i]["todoDate"] = ed;
                console.log("test", ed)
                localStorage.setItem("ArrayItem", JSON.stringify(storingInLocal))
                location.reload()
            }
        }
    })
    closeBtn.addEventListener("click", () => {
        dialog.close()
    })
}

function localStorageForeach(){
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
    console.log(checkBox)
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
    let ptag = document.createElement("p");
    ptag.classList = "prjClass"
    ptag.innerHTML = data;
    let defaultProject = document.querySelector("#defaultprj");
    ptag.addEventListener("click", (e) => {
        defaultProject.value = data;
        todoData.innerHTML = "";
        storingInLocal.forEach(todoItems => {
            if (data === "All" || todoItems.project === data) {
                generateTags(todoItems, todoItems.todoDate, todoItems.project,todoData.priority,todoItems.checkBox);
            }
        });
    })
    myprj.appendChild(ptag);
}

// All task


let AllTask = document.querySelector("#AllTask");
let Upcomming = document.querySelector("#Upcomming");
let today = document.querySelector("#today")
AllTask.addEventListener("click", (e) => {
    todoData.innerHTML = " "
    localStorageForeach()
})

Upcomming.addEventListener("click",(e)=>{
    todoData.innerHTML = "";
    storingInLocal.forEach(todoItems => {
        let dateObj = isFuture(new Date(todoItems.todoDate));
        console.log(dateObj)
        if(dateObj === true){
            generateTags(todoItems, todoItems.todoDate, todoItems.project,todoItems.priority , todoItems.checkBox )
        }
    });

})

today.addEventListener("click",(e)=>{
    todoData.innerHTML = "";
    storingInLocal.forEach(todoItems => {
        let dateObj = isToday(new Date(todoItems.todoDate));
        console.log(dateObj)
        if(dateObj === true){
            generateTags(todoItems, todoItems.todoDate, todoItems.project,todoItems.priority,todoItems.checkBox )
        }
    });

})