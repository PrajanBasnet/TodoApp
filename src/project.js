import { format, isFuture, isToday } from "date-fns";
import { deleteTheTodo, storingInLocal } from "./storage.js";
import { generateTags,localStorageForeach } from "./input.js";
let color = "#cccccc";

let todoData = document.querySelector(".todoData");

function setTagProperties(selector,color){
    let element = document.querySelector(selector);

    if(element){
        element.addEventListener("mouseover",() =>{
            
            element.style.background = color;
        })
        element.addEventListener("mouseout",()=>{
            element.style.background = "#dddddd"
        })
    }
    return element
}

let AllTask = setTagProperties("#AllTask",color)
let Upcomming = setTagProperties("#Upcomming",color);
let today = setTagProperties("#today",color)

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