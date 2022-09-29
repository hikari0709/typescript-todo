// developmentやprod
const addTodoButton: HTMLElement | null =
  document.getElementById('js-add-todo');
const todoList: HTMLElement = document.getElementById('js-todo-list')!;

const appendTodoList = (event: any) => {
  event.preventDefault();
  const todoTitleElement: HTMLInputElement = <HTMLInputElement>(
    document.getElementById('js-todo-title')
  );
  const todoTitle: string = todoTitleElement.value;

  registerLocalLocalStrage(todoTitle);
  emptyTodoList();
  showList();
  // todoList?.insertAdjacentHTML('afterbegin', listItem);
  todoTitleElement.value = '';
};

const registerLocalLocalStrage = (value: string) => {
  localStorage.setItem(localStorage.length.toString(), value);
};

const showList = () => {
  if (localStorage.length === 0) return;
  for (let i = 0; i < localStorage.length; i++) {
    todoList.insertAdjacentHTML(
      'afterbegin',
      `<li class="p-2">${localStorage.getItem(`${i}`)}</li>`
    );
  }
};

const emptyTodoList = () => {
  const cloneList: Node = todoList.cloneNode(false);
  //todoList?.replaceWith(cloneList);
};

function initialize() {
  showList();
}

initialize();

addTodoButton!.addEventListener('click', appendTodoList);
