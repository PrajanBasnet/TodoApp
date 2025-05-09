import {format, compareAsc , differenceInCalendarDays ,isPast } from "date-fns";
import "./test.js"
import { deleteTheTodo  , todoArryValue , storingInLocal } from "./storage.js";

let todoData = document.querySelector(".todoData");
let sumbitTodoBtn = document.querySelector("#sumbitTodoBtn");
let dialog = document.querySelector("#editDialog");
let closeBtn = document.querySelector("dialog button")
let submitEditValue = document.querySelector("#submitEditValue");


let i = 0;

function generateTags(data, myDate) {
    i = i + 1;
    let pTag = document.createElement("p");
    let pTagDate = document.createElement("p");
    pTag.innerHTML = `${data.content} <h3> ${myDate} </h3>`;
    let edit = document.createElement("button");
    let deleteButton = document.createElement("button");

    edit.textContent = "Edit";
    deleteButton.textContent = "delete";

    edit.setAttribute("id", i)
    edit.addEventListener("click", (e) => {
        dialog.showModal()
        editTheTodo(data,myDate);
    })

    deleteButton.addEventListener("click", (e) => {
        deleteTheTodo(data)
    })
    let dateObj = isPast(new Date(myDate));
    let checkPast = dateObj;
    let dates = new Date(myDate)
    pTagDate.innerHTML = `${format(dates, "EEEE/MMM/yyy")}`
    if(checkPast === false){
        
    }
    console.log(checkPast)

    todoData.append(pTag, pTagDate, edit, deleteButton);
}



function editTheTodo(item,myItem) {
    let e = document.querySelector("#editInputTag");
    e.value = item.content;
    console.log(item)
    submitEditValue.addEventListener("click", (a) => {
        a.preventDefault()
        let editInputTag = document.querySelector("#editInputTag").value;
        for (let i = 0; i < storingInLocal.length; i++) {
            if (storingInLocal[i] === item) {
                storingInLocal[i]["content"] = editInputTag;
                console.log(storingInLocal[i])
                localStorage.setItem("ArrayItem", JSON.stringify(storingInLocal))
                location.reload()

            }
      
        }
        dialog.close();
    })
}


// saveItemInStorage(data,myData)
function saveItemInStorage(data, myDate) {
    let test = {
        "content": data,
        "todoDate": myDate
    }
    storingInLocal.push(test)
    localStorage.setItem("ArrayItem", JSON.stringify(storingInLocal));
}

sumbitTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputValue = document.querySelector("#inputTag").value;
    let myDate = document.querySelector("#myDate").value;
    generateTags(inputValue, myDate);
    saveItemInStorage(inputValue, myDate)

})

document.addEventListener("DOMContentLoaded", (e) => {
    storingInLocal.forEach(todoItems => {
        generateTags(todoItems,todoItems["todoDate"])
    });
})



