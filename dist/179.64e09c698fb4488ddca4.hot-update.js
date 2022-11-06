"use strict";
self["webpackHotUpdatetypescript_dev"](179,{

/***/ 72:
/***/ (() => {


// TODOの詳細を保存
// TODOの期限を保存
// TODOの詳細を変更した直後に反映されない
// TODOのフィルター、並び替えができるようにリストの上に設置する（検索窓？）
// リストの編集と削除のアイコンの間にディバイダーを設置する
// 期限や詳細が設定されていることをリストに表示できる
// 完了したリストに切り替えられる機能を追加
// 完了したものを戻すこともできる
const data = (/* unused pure expression or super */ null && ([]));
const today = new Date();
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
console.log(today.getMonth());
const date = {
    year: today.getFullYear(),
    month: `0${today.getMonth()}`.slice(-2),
    day: `0${today.getDay()}`.slice(-2)
};
console.log(date);
const initDateValue = `${date.year}-${date.month}-${date.day}`;
const handleAppend = (event) => {
    event.preventDefault();
    registerLocalStorage();
    appendListItem();
    clearTextInput();
    const deleteTodoList = document.querySelector('.js-delete-todo');
    const editTodoList = document.querySelector('.js-edit-todo');
    deleteTodoList && deleteTodoList.addEventListener('click', deleteListItem);
    const itemData = setItemData();
    editTodoList.addEventListener('click', (event) => {
        editListItem(event, itemData);
    });
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
    const parseData = localStorage.length ? fetchLocalStorage() : [];
    parseData.push({
        title: value,
        checked: false,
        detail: '',
        subTask: [],
        date: ''
    });
    localStorage.setItem('json', JSON.stringify(parseData));
};
// TODOの追加
const appendListItem = () => {
    if (!todoList)
        return;
    const listItem = createListItem();
    todoList.insertAdjacentHTML('afterbegin', listItem);
};
// ページが再描画された際にlocalStorageにあるデータを表示する
const showListItem = () => {
    if (localStorage.length === 0)
        return;
    const parseData = fetchLocalStorage();
    const itemData = setItemData();
    for (let i = 0; i < parseData.length; i++) {
        const listItem = createListItem(itemData, i);
        todoList.insertAdjacentHTML('afterbegin', listItem);
        const deleteTodoList = document.querySelector('.js-delete-todo');
        const editTodoList = document.querySelector('.js-edit-todo');
        const checkTodoList = document.querySelector('input[id^="js-checkbox-"]');
        deleteTodoList.addEventListener('click', deleteListItem);
        checkTodoList.addEventListener('click', updateTodoStatus);
        editTodoList.addEventListener('click', (event) => {
            editListItem(event, itemData);
        });
    }
};
// localStrageのデータをfeatchからイベントの登録までのイベント
const setItemData = () => {
    const parseData = fetchLocalStorage();
    const itemData = {
        title: '',
        checked: false,
        detail: '',
        subTask: [],
        date: ''
    };
    for (let i = 0; i < parseData.length; i++) {
        for (let key in parseData[i]) {
            itemData[key] = parseData[i][key];
        }
    }
    return itemData;
};
// リストアイテムの削除
function deleteListItem(event) {
    const id = event.target.closest('li').id;
    const target = document.getElementById(id);
    target && target.remove();
    localStorage.removeItem(id);
}
// リストアイテムの編集
function editListItem(event, itemData) {
    const id = event.target.closest('li').id;
    const modalBody = document.getElementById('js-editModal-body');
    const updateTodoBtn = document.getElementById('js-update-todo');
    const modalBodyContent = createModalBody(id, itemData);
    modalBody.innerHTML = modalBodyContent;
    const editInput = document.getElementById('js-edit-todoTitle');
    modal.classList.remove('hidden');
    modal.classList.add(...modalClassSer);
    modalCloseBtn.addEventListener('click', closeModal);
    updateTodoBtn.addEventListener('click', updateTodo);
    editInput.addEventListener('change', changeTodoTitle);
}
// ListItemの生成
const createListItem = (argument, index) => {
    const title = argument ? argument.title : getTodoTitle();
    const checkStatus = argument && argument.checked;
    const listId = index !== undefined ? index : localStorage.length - 1;
    const checkedAttribute = checkStatus && ' checked';
    const inputTag = `<input id="js-checkbox-${listId}" type="checkbox" value="" data-list-id="${listId}" class="col-span-1 inline-block"${checkedAttribute}>`;
    const listItem = `
    <li id=${listId} class="p-2 grid grid-cols-12">
      ${inputTag}
      <p class="col-span-9 border-r-2 js-list-title">${title}</p>
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
    const label = document.getElementById('js-edit-label');
    const editTitle = (document.getElementById('js-edit-todoTitle'));
    const editDetail = (document.getElementById('js-edit-todoDetail'));
    const targetId = label.getAttribute('data-id');
    const targetTitle = document.querySelector(`#\\3${targetId} > .js-list-title`);
    const updateTitle = editTitle.value;
    const updateDetail = editDetail.value;
    targetTitle.textContent = updateTitle;
    const parseData = fetchLocalStorage();
    parseData[targetId].title = updateTitle;
    parseData[targetId].detail = updateDetail;
    localStorage.setItem('json', JSON.stringify(parseData));
    modal.classList.add('hidden');
    modal.classList.remove(...modalClassSer);
};
// TODOリストのチェック状態
const updateTodoStatus = (event) => {
    const listId = event.target.getAttribute('data-list-id');
    const parseData = fetchLocalStorage();
    parseData[listId].checked = !parseData[listId].checked;
    localStorage.setItem('json', JSON.stringify(parseData));
};
// TODOのタイトルが変更された時
const changeTodoTitle = (event) => {
    const value = event.target.value;
    const editInput = document.getElementById('js-edit-todoTitle');
    editInput.setAttribute('value', value);
};
const createModalBody = (id, argument) => {
    const modalBody = `
    <label
      class="block text-gray-700 text-sm font-bold mb-1"
      data-id="${id}"
      id="js-edit-label"
    >
      現在のタイトル
    </label>
    <input
      class="border p-1 mb-5 w-full"
      id="js-edit-todoTitle"
      type="text"
      placeholder="新しいTODOのタイトルを入力"
      value="${argument.title}"
    />
    <label
      class="block text-gray-700 text-sm font-bold mb-1"
      data-id="${id}"
      id="js-edit-detail"
    >
      TODOの詳細
    </label>
    <textarea
      class="border mb-5 p-1 w-full h-40"
      id="js-edit-todoDetail"
      placeholder="TODOの詳細"
    >${argument.detail}</textarea>
    <label class="block text-gray-700 text-sm font-bold mb-1">TODOの期限を設定</label>
    <input type="date" id="js-edit-date" class="border mb-5 w-full p-1" value="${initDateValue}" />
    <button
      class="block text-gray-700 text-sm font-bold mb-1"
      for="js-edit-addTask"
      data-id="${id}"
      id="js-edit-task"
    >
      ＋TODOのサブタスクを追加する
    </button>
  `;
    return modalBody;
};
const fetchLocalStorage = () => {
    const fetchData = localStorage.getItem('json');
    return JSON.parse(fetchData);
};
// 初期ローディング時に発火させる
function initialize() {
    showListItem();
}
initialize();
addTodoButton.addEventListener('click', handleAppend);
clearTodoButton.addEventListener('click', clearAllStorageItems);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7f445b7c96c8990f4581")
/******/ })();
/******/ 
/******/ }
);