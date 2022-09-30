// developmentやprod
const addTodoButton: HTMLElement = document.getElementById('js-add-todo')!;
const clearTodoButton: HTMLElement = document.getElementById('js-clear-todo')!;
const todoList: HTMLElement | null = document.getElementById('js-todo-list');

const appendHandler = (event: any): void => {
  event.preventDefault();
  registerLocalStorage();
  appendListItem();
};

// TODOに登録する【タイトル】の取得
const getTodoTitle = () => {
  const todoTitleElement: HTMLInputElement = <HTMLInputElement>(
    document.getElementById('js-todo-title')
  );
  const todoTitle: string = todoTitleElement.value;
  // inputのリセットのタイミングがうまくいかない
  // todoTitleElement.value = '';
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
  const value = getTodoTitle();
  console.log(value);
  const listItem: HTMLElement = document.createElement('li');
  listItem.classList.add('p-2');
  listItem.innerText = value;
  todoList.appendChild(listItem);
};

const showListItem = (): void => {
  if (!todoList) return;
  if (localStorage.length === 0) return;
  for (let i = 0; i < localStorage.length; i++) {
    todoList.insertAdjacentHTML(
      'afterbegin',
      `<li class="p-2">${localStorage.getItem(`${i}`)}</li>`
    );
  }
};

// const updateList = () => {
//   const cloneList: Node = todoList.cloneNode(false);
//   todoList.replaceWith(cloneList);
// };

/*
  はじめにlacalStoreから呼び出して、データ一覧を取得
  取得したデータを変数に格納する
  格納した変数データを表示させる
  TODOが追加されたら場合データの一番後ろに追加してもらう
*/

// const emptyTodoList = () => {
//   const cloneList: Node = todoList.cloneNode(false);
//   // 置き換えでなく中身をなくすのが良さそう
//   todoList.replaceWith(cloneList);
// };

const clearStorage = (): void => {
  localStorage.clear();
};

function initialize(): void {
  showListItem();
}

initialize();

addTodoButton.addEventListener('click', appendHandler);
clearTodoButton.addEventListener('click', clearStorage);
