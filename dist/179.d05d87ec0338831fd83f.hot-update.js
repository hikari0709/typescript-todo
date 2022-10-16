"use strict";
self["webpackHotUpdatetypescript_dev"](179,{

/***/ 72:
/***/ (() => {


// Elementの取得
const addTodoButton = document.getElementById('js-add-todo');
const clearTodoButton = document.getElementById('js-clear-todo');
const todoList = document.getElementById('js-todo-list');
const modal = document.getElementById('js-defaultModal');
const modalCloseBtn = document.getElementById('js-edit-close');
const modalClassSer = [
    'bg-gray-900',
    'bg-opacity-50',
    'dark:bg-opacity-80',
    'fixed',
    'inset-0',
    'z-40'
];
const appendHandler = (event) => {
    event.preventDefault();
    registerLocalStorage();
    appendListItem();
    clearTextInput();
    const deleteTodoList = document.querySelector('.js-delete-todo');
    const editTodoList = document.querySelector('.js-edit-todo');
    deleteTodoList && deleteTodoList.addEventListener('click', deleteListItem);
    editTodoList && editTodoList.addEventListener('click', editListItem);
};
// TODOに登録する【タイトル】の取得
const getTodoTitle = () => {
    const todoTitleElement = (document.getElementById('js-todo-title'));
    const todoTitle = todoTitleElement.value;
    return todoTitle;
};
// 取得した値をlocalStorageに保存
const registerLocalStorage = () => {
    const value = getTodoTitle();
    localStorage.setItem(localStorage.length.toString(), value);
};
// リストに新しく追加されたTODOを追加
const appendListItem = () => {
    if (!todoList)
        return;
    const listItem = createListItem();
    todoList.insertAdjacentHTML('afterbegin', listItem);
};
// リロードした際にlacalStorageにあるデータを表示する
const showListItem = () => {
    if (localStorage.length === 0)
        return;
    for (let i = 0; i < localStorage.length; i++) {
        const value = localStorage.getItem(`${i}`);
        if (!value)
            return;
        const listItem = createListItem(value, i);
        todoList.insertAdjacentHTML('afterbegin', listItem);
        const deleteTodoList = document.querySelector('.js-delete-todo');
        const editTodoList = document.querySelector('.js-edit-todo');
        deleteTodoList.addEventListener('click', deleteListItem);
        editTodoList && editTodoList.addEventListener('click', editListItem);
    }
};
// リストアイテムの削除
function deleteListItem(event) {
    const id = event.target.closest('li').id;
    const target = document.getElementById(id);
    target && target.remove();
    localStorage.removeItem(id);
}
// リストアイテムの編集
function editListItem(event) {
    const id = event.target.closest('li').id;
    const title = event.target.closest('li').innerText;
    const currentTitle = document.getElementById('js-current-todo-title');
    const editInput = document.getElementById('js-edit-todoTitle');
    const updateTodoBtn = document.getElementById('js-update-todo');
    currentTitle.innerText = `現在のタイトル：${title}`;
    currentTitle.setAttribute('data-id', id);
    modal.classList.remove('hidden');
    modal.classList.add(...modalClassSer);
    modalCloseBtn.addEventListener('click', closeModal);
    updateTodoBtn.addEventListener('click', updateTodo);
    editInput.addEventListener('change', changeTodoTitle);
}
// ListItemの生成
const createListItem = (argument, index) => {
    const value = argument ? argument : getTodoTitle();
    const listId = index !== undefined ? index : localStorage.length - 1;
    const listItem = `
    <li id=${listId} class="p-2 grid grid-cols-12">
      <p class="col-span-10 border-r-2 js-list-title">${value}</p>
      <button class="col-span-1 js-edit-todo" data-modal-toggle="defaultModal">
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
const clearAllStorageItems = () => {
    localStorage.clear();
};
// 入力したテキストをクリアする
const clearTextInput = () => {
    const todoTitleElement = (document.getElementById('js-todo-title'));
    todoTitleElement.value = '';
};
// 表示したmodalをクローズする
const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove(...modalClassSer);
};
// TODOリストタイトルの更新
const updateTodo = () => {
    const currentTitle = document.getElementById('js-current-todo-title');
    const editInput = document.getElementById('js-edit-todoTitle');
    const targetId = currentTitle.getAttribute('data-id');
    const targetList = document.querySelector(`#\\3${targetId} > .js-list-title`);
    targetList.textContent = editInput.getAttribute('value');
    // 入力したinputがそのまま
    //localStorageを更新できていない
};
// TODOのタイトルが変更された時
const changeTodoTitle = (event) => {
    const value = event.target.value;
    const editInput = document.getElementById('js-edit-todoTitle');
    editInput.setAttribute('value', value);
    // editInput.value = '';
};
// 初期ローディング時に発火させる関数アセット
function initialize() {
    showListItem();
}
initialize();
addTodoButton.addEventListener('click', appendHandler);
clearTodoButton.addEventListener('click', clearAllStorageItems);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2230a1feb0633aa33f0b")
/******/ })();
/******/ 
/******/ }
);