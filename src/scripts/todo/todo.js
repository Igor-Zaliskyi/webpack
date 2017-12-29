// 1. Implement deleting
// 2. Display counts
const todos = [
  {
    id: 1,
    value: "Купити квитки",
    isChecked: false
  },
  {
    id: 2,
    value: "Поїхати додому",
    isChecked: true
  },
  {
    id: 3,
    value: "Замовити таксі",
    isChecked: false
  }
];


const todoAppView = document.getElementById("todo-list");

const changeStatusById = todoId => {
  const todo = todos.find(todo => todo.id === todoId);  // not anderstood
  todo.isChecked = !todo.isChecked;
};

 //not anderstood
const getTodoHTML = (item, index) => `<li>
    <input type="checkbox" id="todo${index}" ${item.isChecked
  ? "checked"
  : ""} onChange="changeStatusById(${item.id})"/>             
    <label for="todo${index}">${item.value}</label>
    <button onclick="removeElement()">X</button>
  </li>`;

const renderTodoList = () => {
  todoAppView.innerHTML = todos.map(getTodoHTML).join("");
};

let counter =0;
const addTodo = () => {
  const input = document.getElementById("input").value;
  const doneCount = document.getElementById('doneCount');
  counter += 1
  doneCount.innerText = counter;
 
 
  todos.push({
    id: todos.length + 1,
    value: input,
    isChecked: false
  });
  todoAppView.innerHTML = '';

  renderTodoList();
  return false;
};

renderTodoList();



    //  removeElement
    let reverscounter = counter;  // counter
    const removeElement = () => {
      reverscounter -=1;
        const input = document.getElementById("input").value;
        const undoneCount = document.getElementById('undoneCount');
        undoneCount.innerText = reverscounter;
        
        todos.pop({
          id: todos.length + 1,
          value: input,
          isChecked: false
        });
        renderTodoList();
        return false;
      };
      
     window.addTodo = addTodo;
     window.removeElement = removeElement;
