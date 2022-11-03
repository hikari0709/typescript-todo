// TODOの詳細を保存
// TODOの期限を保存
// 上2つの処理はデータがあれば代入、そうでなければ初期値を使う処理を加える
// TODOのフィルター、並び替えができるようにリストの上に設置する（検索窓？）
// リストの編集と削除のアイコンの間にディバイダーを設置する
// 期限や詳細が設定されていることをリストに表示できる
// 完了したリストに切り替えられる機能を追加
// 完了したものを戻すこともできる

const data: Array<Object> = [];
const today: Date = new Date();

const addTodoButton: HTMLElement = document.getElementById('js-add-todo')!;
const clearTodoButton: HTMLElement = document.getElementById('js-clear-todo')!;
const todoList: HTMLElement = document.getElementById('js-todo-list')!;
const modal: HTMLElement = document.getElementById('js-defaultModal')!;
const modalCloseBtn: HTMLElement = document.getElementById('js-edit-close')!;

const modalClassSer = [
  'bg-gray-900',
  'bg-opacity-50',
  'dark:bg-opacity-80',
  'fixed',
  'inset-0',
  'z-40'
];

type ItemData = {
  [key: string]: string | boolean;
};

type DateValue = {
  year: number;
  month: string;
  day: string;
};

const date: DateValue = {
  year: today.getFullYear(),
  month: `0${today.getMonth()}`.slice(-2),
  day: `0${today.getDay()}`.slice(-2)
};

const initDateValue = `${date.year}-${date.month}-${date.day}`;

const appendHandler = (event: any): void => {
  event.preventDefault();
  registerLocalStorage();
  appendListItem();
  clearTextInput();
  const deleteTodoList: HTMLElement =
    document.querySelector('.js-delete-todo')!;
  const editTodoList: HTMLElement = document.querySelector('.js-edit-todo')!;
  deleteTodoList && deleteTodoList.addEventListener('click', deleteListItem);
  editTodoList && editTodoList.addEventListener('click', editListItem);
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
  const parseData = fetchLocalStorage();
  parseData.push({ value: value, checked: false });
  localStorage.setItem('json', JSON.stringify(parseData));
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
  const parseData = fetchLocalStorage();

  for (let i = 0; i < parseData.length; i++) {
    const itemData: ItemData = {
      value: '',
      checked: false
    };

    for (let key in parseData[i]) {
      itemData[key] = parseData[i][key];
    }

    const listItem = createListItem(itemData, i);
    todoList.insertAdjacentHTML('afterbegin', listItem);
    const deleteTodoList: HTMLElement =
      document.querySelector('.js-delete-todo')!;
    const editTodoList: HTMLElement = document.querySelector('.js-edit-todo')!;
    const checkTodoList: HTMLElement = document.querySelector(
      'input[id^="js-checkbox-"]'
    )!;
    deleteTodoList.addEventListener('click', deleteListItem);
    checkTodoList.addEventListener('click', updateTodoStatus);
    editTodoList && editTodoList.addEventListener('click', editListItem);
  }
};

// リストアイテムの削除
function deleteListItem(event: any): void {
  const id = event.target.closest('li').id;
  const target = document.getElementById(id);
  target && target.remove();
  localStorage.removeItem(id);
}

// リストアイテムの編集
function editListItem(event: any): void {
  const id = event.target.closest('li').id;
  const title = event.target.closest('li').innerText;
  const modalBody = document.getElementById('js-editModal-body')!;
  const updateTodoBtn = document.getElementById('js-update-todo')!;
  const modalBodyContent = createModalBody(id, title);

  modalBody.innerHTML = modalBodyContent;

  const editInput = document.getElementById('js-edit-todoTitle')!;

  modal.classList.remove('hidden');
  modal.classList.add(...modalClassSer);
  modalCloseBtn.addEventListener('click', closeModal);
  updateTodoBtn.addEventListener('click', updateTodo);
  editInput.addEventListener('change', changeTodoTitle);
}

// ListItemの生成
const createListItem = (argument?: ItemData, index?: number) => {
  const value = argument ? argument.value : getTodoTitle();
  const checkStatus = argument && argument.checked;
  const listId = index !== undefined ? index : localStorage.length - 1;

  const checkedAttribute = checkStatus && ' checked';
  const inputTag = `<input id="js-checkbox-${listId}" type="checkbox" value="" data-list-id="${listId}" class="col-span-1 inline-block"${checkedAttribute}>`;

  const listItem: string = `
    <li id=${listId} class="p-2 grid grid-cols-12">
      ${inputTag}
      <p class="col-span-9 border-r-2 js-list-title">${value}</p>
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

// 表示したmodalをクローズする
const closeModal = () => {
  modal.classList.add('hidden');
  modal.classList.remove(...modalClassSer);
};

// TODOリストタイトルの更新
const updateTodo = () => {
  // js-current-todo-title　→ 中身にタイトルの要素がないので命名を変更する
  const label = document.getElementById('js-edit-label')!;
  const editInput = document.getElementById('js-edit-todoTitle')!;
  const targetId = label.getAttribute('data-id')!;
  const targetList = document.querySelector(
    `#\\3${targetId} > .js-list-title`
  )!;
  const updateTitle = editInput.getAttribute('value')!;
  targetList.textContent = updateTitle;
  localStorage.setItem(targetId, updateTitle);
  modal.classList.add('hidden');
  modal.classList.remove(...modalClassSer);
};

// TODOリストのチェック状態
const updateTodoStatus = (event: any) => {
  const listId = event.target.getAttribute('data-list-id');
  const parseData = fetchLocalStorage();
  parseData[listId].checked = !parseData[listId].checked;
  localStorage.setItem('json', JSON.stringify(parseData));
};

// TODOのタイトルが変更された時
const changeTodoTitle = (event: any) => {
  const value = event.target.value;
  const editInput = document.getElementById('js-edit-todoTitle')!;
  editInput.setAttribute('value', value);
};

const createModalBody = (id: number, title: string) => {
  const modalBody: string = `
    <label
      class="block text-gray-700 text-sm font-bold mb-1"
      for="js-edit-todoTitle"
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
      value="${title}"
    />
    <label
      class="block text-gray-700 text-sm font-bold mb-1"
      for="js-edit-todoDetail"
      data-id="${id}"
      id="js-edit-detail"
    >
      TODOの詳細
    </label>
    <textarea
      class="border mb-5 p-1 w-full"
      id="js-edit-todoDetail"
      type="text"
      placeholder="TODOの詳細"
      value="${title}"
    ></textarea>
    <label for="date" class="block text-gray-700 text-sm font-bold mb-1">TODOの期限を設定</label>
    <input type="date" id="date" class="border mb-5 w-full p-1" value="${initDateValue}" />
    <button
      class="block text-gray-700 text-sm font-bold mb-1"
      for="js-edit-todoDetail"
      data-id="${id}"
      id="js-edit-task"
    >
      ＋TODOのサブタスクを追加する
    </button>
  `;

  return modalBody;
};

const fetchLocalStorage = () => {
  let fetchData: string = localStorage.getItem('json')!;
  return JSON.parse(fetchData);
};

// 初期ローディング時に発火させる関数アセット
function initialize(): void {
  showListItem();
}

initialize();
addTodoButton.addEventListener('click', appendHandler);
clearTodoButton.addEventListener('click', clearAllStorageItems);
