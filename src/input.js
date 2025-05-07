let todoData = document.querySelector(".todoData");
let sumbitTodoBtn = document.querySelector("#sumbitTodoBtn");
let dialog = document.querySelector("dialog");
let closeBtn = document.querySelector("dialog button")
let submitEditValue = document.querySelector("#submitEditValue");



let todoArryValue = localStorage.getItem("ArrayItem") ;
let storingInLocal = todoArryValue ? JSON.parse(todoArryValue) : [];

let i = 0;
function generateTags(data){
     i = i + 1;
    let pTag = document.createElement("p");
    pTag.textContent = data;

    let button = document.createElement("button");
    button.textContent = "Edit";

    button.setAttribute("id", i)
    button.addEventListener("click",(e)=>{
        dialog.showModal()
        editTheTodo(data);
    })
    todoData.append(pTag,button);
}


function editTheTodo(item){
    const editedItem = storingInLocal.filter((data) => data === item);
    submitEditValue.addEventListener("click",(e)=>{
        dialog.close();
        let editInputTag = document.querySelector("#editInputTag").value;
        for (let i = 0; i < storingInLocal.length; i++) {
            if( storingInLocal[i] === item){
                storingInLocal[i] = editInputTag;
                console.log(storingInLocal[i])
                localStorage.setItem("ArrayItem",JSON.stringify(storingInLocal))
                location.reload()
            }
            
        }
    })
}

function saveItemInStorage(data){
    storingInLocal.push(data)
    localStorage.setItem("ArrayItem",JSON.stringify(storingInLocal));

}

sumbitTodoBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let inputValue = document.querySelector("#inputTag").value;
    saveItemInStorage(inputValue)
    generateTags(inputValue);

})

document.addEventListener("DOMContentLoaded",(e)=>{
    storingInLocal.forEach(todoItems => {
        generateTags(todoItems)
    });
})



