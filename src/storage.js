let todoArryValue = localStorage.getItem("ArrayItem");
let storingInLocal = todoArryValue ? JSON.parse(todoArryValue) : [];
 
function deleteTheTodo(data) {
    const updatedTodo = storingInLocal.filter((item) => item != data);
    localStorage.setItem("ArrayItem", JSON.stringify(updatedTodo));
    location.reload()
}

export { deleteTheTodo , storingInLocal , todoArryValue }