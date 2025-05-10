let todoArryValue = localStorage.getItem("ArrayItem");
let AddNewTodo = document.querySelector("#AddNewTodo");
let dialogInput = document.querySelector(".inputTag");

let storingInLocal = todoArryValue ? JSON.parse(todoArryValue) : [];

function deleteTheTodo(data) {
    const updatedTodo = storingInLocal.filter((item) => item != data);
    localStorage.setItem("ArrayItem", JSON.stringify(updatedTodo));
    location.reload()
}

AddNewTodo.addEventListener("click", (e) => {
    e.preventDefault();
    dialogInput.showModal();
})
export { deleteTheTodo , storingInLocal , todoArryValue }