// Elementの取得
const addTodoButton: HTMLElement = document.getElementById('js-add-todo')!;
const clearTodoButton: HTMLElement = document.getElementById('js-clear-todo')!;
const todoList: HTMLElement = document.getElementById('js-todo-list')!;

type listItemType = `
    <li ${string}>
      ${string}
      <button ${string}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px" viewBox="0 0 24 24"
          fill="#000000"
          class="${string}"
        >
          <path
            d="M0 0h24v24H0V0z"
            fill="none"
          />
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"
          />
        </svg>
      </button>
      <button ${string}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          class="${string}"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
          />
        </svg>
      </button>
    </li>
  `;

const appendHandler = (event: any): void => {
  event.preventDefault();
  registerLocalStorage();
  appendListItem();
  clearTextInput();
  const deleteTodoList: HTMLElement = document.querySelector('js-delete-todo')!;
  deleteTodoList && deleteTodoList.addEventListener('click', deleteListItem);
};

// TODOに登録する【タイトル】の取得
const getTodoTitle = () => {
  const todoTitleElement: HTMLInputElement = <HTMLInputElement>(
    document.getElementById('js-todo-title')
  );
  const todoTitle: string = todoTitleElement.value;
  return todoTitle;
};

// 取得した値をlocalStorageに保存
const registerLocalStorage = (): void => {
  const value = getTodoTitle();
  localStorage.setItem(localStorage.length.toString(), value);
};

// リストに新しく追加されたTODOを追加
const appendListItem = (): void => {
  if (!todoList) return;
  const listItem = createListItem();
  todoList.insertAdjacentHTML('afterbegin', listItem);
};

// リロードした際にlacalStorageにあるデータを表示する
const showListItem = (): void => {
  if (localStorage.length === 0) return;
  for (let i = 0; i < localStorage.length; i++) {
    const value = localStorage.getItem(`${i}`);
    if (!value) return;
    const listItem = createListItem(value, i);
    todoList.insertAdjacentHTML('afterbegin', listItem);
    const targetItem: HTMLElement = document.querySelector('.js-delete-todo')!;
    targetItem.addEventListener('click', deleteListItem);
  }
};

// リストアイテムの削除
function deleteListItem(event: any): void {
  const id = event.target.closest('li').id;
  const target = document.getElementById(id);
  target && target.remove();
}

// ListItemの生成
const createListItem = (argument?: string, index?: number) => {
  const value = argument ? argument : getTodoTitle();
  const listId = index !== undefined ? index : localStorage.length - 1;

  const listItem: listItemType = `
    <li id=${listId} class="p-2 grid grid-cols-12">
      <p class="col-span-10 border-r-2">${value}</p>
      <button class="col-span-1 js-edit-todo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px" viewBox="0 0 24 24"
          fill="#000000"
          class="inline-block"
        >
          <path
            d="M0 0h24v24H0V0z"
            fill="none"
          />
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"
          />
        </svg>
      </button>
      <button class="col-span-1 js-delete-todo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          class="inline-block"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
          />
        </svg>
      </button>
    </li>
  `;
  return listItem;
};

// localStorageに登録されたものを全て削除する
const clearAllStorageItems = (): void => {
  localStorage.clear();
};

// 入力したテキストをクリアする
const clearTextInput = () => {
  const todoTitleElement: HTMLInputElement = <HTMLInputElement>(
    document.getElementById('js-todo-title')
  );
  todoTitleElement.value = '';
};

// 初期ローディング時に発火させる関数アセット
function initialize(): void {
  showListItem();
}

initialize();
addTodoButton.addEventListener('click', appendHandler);
clearTodoButton.addEventListener('click', clearAllStorageItems);
