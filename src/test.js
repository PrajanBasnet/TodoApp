let AddNewTodo = document.querySelector("#AddNewTodo");
let dialogInput = document.querySelector(".inputTag");


AddNewTodo.addEventListener("click", (e) => {
    e.preventDefault();
    dialogInput.showModal();
})