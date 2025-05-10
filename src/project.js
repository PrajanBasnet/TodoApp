let newProject = document.querySelector("#newProject");
let todoData = document.querySelector(".todoData");
let addItem = document.querySelector(".addItem");
let projectDialog = document.querySelector(".projectDialog");
let submitProjectName = document.querySelector("#submitProjectName");
let myprj = document.querySelector(".myprj");

let AddNewTodo = document.querySelector("#AddNewTodo");
let project = "All";


let prj = localStorage.getItem("ArrayItem");

let prjToJson = prj ? JSON.parse(prj) : [];

newProject.addEventListener("click", (event) => {
        projectDialog.showModal()
})

submitProjectName.addEventListener("click", (e) => {
        e.preventDefault()
        projectDialog.close();
        let ptag = document.createElement("p");
        let projectName = document.querySelector("#projectName").value;

        ptag.innerHTML = `${projectName} </br>`;
        ptag.className = "prjClass";

        ptag.addEventListener("click",(e)=>{
                todoData.style.display = "none"
                console.log(ptag.innerHTML)
                

        })
        myprj.appendChild(ptag);
        // console.log(projectName);

})

let test = document.querySelectorAll(".prjClass"); 
if(test){

        test.forEach(element => {
                element.addEventListener("click",()=>{
                        console.log("working",element.innerHTML)
                })
        });
}