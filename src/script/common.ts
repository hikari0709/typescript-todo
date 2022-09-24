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

  const listItem = `
  <li class="border-bottom border-solid border-gray-100 p-2">${todoTitle}</li>
`;
  todoList?.insertAdjacentHTML('afterbegin', listItem);
  todoTitleElement.value = '';
};

addTodoButton!.addEventListener('click', appendTodoList);
