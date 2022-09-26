// developmentやprod
const addTodoButton: HTMLElement | null =
  document.getElementById('js-add-todo');
const todoList: HTMLElement | null = document.getElementById('js-todo-list');
//const todoTitle = todoTitleElement?.value;

const appendTodoList = (event: any) => {
  event.preventDefault();
  const todoTitleElement: HTMLInputElement = <HTMLInputElement>(
    document.getElementById('js-todo-title')
  );
  const todoTitle: string = todoTitleElement.value;

  registerLocalLocalStrage(todoTitle);
  showList();
  // todoList?.insertAdjacentHTML('afterbegin', listItem);
  todoTitleElement.value = '';
};

const registerLocalLocalStrage = (value: string) => {
  localStorage.setItem(localStorage.length.toString(), value);
};

const showList = () => {
  for (let i = 0; i < localStorage.length; i++) {
    todoList!.insertAdjacentHTML(
      'afterbegin',
      `<li class="border border-solid border-gray-100 p-2">${localStorage.getItem(
        localStorage.key(i)
      )}</li>`
    );
  }
};

addTodoButton!.addEventListener('click', appendTodoList);
