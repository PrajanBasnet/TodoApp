// import { generateTags } from "./input.js";
// import { deleteTheTodo, storingInLocal } from "./storage.js";

// let newProject = document.querySelector("#newProject");
// let todoData = document.querySelector(".todoData");
// let addItem = document.querySelector(".addItem");
// let projectDialog = document.querySelector(".projectDialog");
// let submitProjectName = document.querySelector("#submitProjectName");
// let myprj = document.querySelector(".myprj");

// let AddNewTodo = document.querySelector("#AddNewTodo");
// let project = "All";


// let prj = localStorage.getItem("ArrayItem");
// let prjToJson = prj ? JSON.parse(prj) : [];

// newProject.addEventListener("click", (event) => {
//         projectDialog.showModal()
// })

// function saveItemInStorage(data, myDate, project) {
//         let test = {
//             "content": data,
//             "todoDate": myDate,
//             "project": project
//         }
//         storingInLocal.push(test)
//         localStorage.setItem("ArrayItem", JSON.stringify(storingInLocal));
//     }


// export function testF() {

//         submitProjectName.addEventListener("click", (e) => {
//                 e.preventDefault()
//                 projectDialog.close();
//                 let ptag = document.createElement("p");
//                 let projectName = document.querySelector("#projectName").value;

//                 ptag.innerHTML = `${projectName}`;
//                 ptag.className = "prjClass";
//                 let a = ptag.innerHTML;
                
//                 ptag.addEventListener("click", (e) => {
//                         todoData.style.display = "none"
//                         sumbitTodoBtn.addEventListener("click", (e) => {
//                             e.preventDefault();
//                             let inputValue = document.querySelector("#inputTag").value;
//                             let myDate = document.querySelector("#myDate").value;
//                             generateTags(inputValue, myDate, a);
//                             saveItemInStorage(inputValue, myDate, a)
//                         })
                        
//                 })
//                 myprj.appendChild(ptag);
//         })
// }


