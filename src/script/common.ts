const data: Array<Object> = [];

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

type SubTask = {
  id: string;
  value: string;
  checked: boolean;
};

type InnerArray = {
  [key: number]: SubTask;
};

type ItemData = {
  [key: string]: string | boolean | SubTask[];
};

type DateValue = {
  year: number;
  month: string;
  day: string;
};

const handleAppend = (event: any): void => {
  event.preventDefault();
  registerLocalStorage();
  appendListItem();
  clearTextInput();
  const deleteTodoList: HTMLElement =
    document.querySelector('.js-delete-todo')!;
  const editTodoList: HTMLElement = document.querySelector('.js-edit-todo')!;
  deleteTodoList && deleteTodoList.addEventListener('click', deleteListItem);
  const itemData = setItemData();
  editTodoList.addEventListener('click', (event) => {
    editListItem(event);
  });
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
  const parseData = localStorage.length ? fetchLocalStorage() : [];
  parseData.push({
    title: value,
    checked: false,
    detail: '',
    subTask: [],
    date: createTimeStamp()
  });
  localStorage.setItem('json', JSON.stringify(parseData));
};

// TODOの追加
const appendListItem = (): void => {
  if (!todoList) return;
  const listItem = createListItem();
  todoList.insertAdjacentHTML('afterbegin', listItem);
};

// ページが再描画された際にlocalStorageにあるデータを表示する
const showListItem = (): void => {
  if (localStorage.length === 0) return;
  const parseData = fetchLocalStorage();
  const itemData = setItemData();
  for (let i = 0; i < parseData.length; i++) {
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
    editTodoList.addEventListener('click', (event) => {
      editListItem(event);
    });
  }
};

// localStrageのデータをfeatchからイベントの登録までのイベント
const setItemData = () => {
  const parseData = fetchLocalStorage();
  const itemData: ItemData = {
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
function deleteListItem(event: any): void {
  const id = event.target.closest('li').id;
  const target = document.getElementById(id);
  target && target.remove();
  localStorage.removeItem(id);
}

// リストアイテムの編集
function editListItem(event: any): void {
  const id = event.target.closest('li').id;
  const modalBody = <HTMLDivElement>(
    document.getElementById('js-editModal-body')
  );
  const updateTodoBtn = <HTMLDivElement>(
    document.getElementById('js-update-todo')
  );
  const itemData = setItemData();
  const modalBodyContent = createModalBody(id, itemData);

  modalBody.innerHTML = modalBodyContent;

  const editInput = <HTMLInputElement>(
    document.getElementById('js-edit-todoTitle')
  );
  const addTask = <HTMLButtonElement>document.getElementById('js-edit-task');
  const subTaskCheckbox = document.querySelectorAll('.js-subTask-checkbox');

  subTaskCheckbox.forEach((target) => {
    target.addEventListener('click', (event: any) => {
      const subTaskId = event.currentTarget.getAttribute('data-subTask-id');
      const parseData = fetchLocalStorage();
      parseData[id].subTask[subTaskId].checked =
        !parseData[id].subTask[subTaskId].checked;
      localStorage.setItem('json', JSON.stringify(parseData));
    });
  });

  modal.classList.remove('hidden');
  modal.classList.add(...modalClassSer);
  modalCloseBtn.addEventListener('click', closeModal);
  updateTodoBtn.addEventListener('click', updateTodo);
  addTask.addEventListener('click', addsubTask);
  editInput.addEventListener('change', changeTodoTitle);
}

const addsubTask = () => {
  const taskInput = <HTMLInputElement>(
    document.getElementById('js-edit-task-input')
  );
  const taskList = <HTMLInputElement>document.getElementById('js-subTask-list');

  const targetId = taskInput.getAttribute('data-id')!;
  const parseData = fetchLocalStorage();
  const taskId = parseData[targetId].subTask.length;
  const task: SubTask = { id: taskId, value: taskInput.value, checked: false };
  parseData[targetId].subTask.push(task);
  const listItem = `
    <li>
      <input id="subTask${taskId}" data-subTask-id="${taskId}" type="checkbox" class="col-span-1 inline-block js-subTask-checkbox">
      <label for="subTask${taskId}">${taskInput.value}</label>
    </li>
  `;
  taskList.insertAdjacentHTML('beforeend', listItem);
  taskInput.value = '';
  localStorage.setItem('json', JSON.stringify(parseData));
};

// ListItemの生成
const createListItem = (argument?: ItemData, index?: number) => {
  const title = argument ? argument.title : getTodoTitle();
  const checkStatus = argument && argument.checked;
  const listId = index !== undefined ? index : localStorage.length - 1;

  const checkedAttribute = checkStatus && ' checked';
  const inputTag = `<input id="js-checkbox-${listId}" type="checkbox" value="" data-list-id="${listId}" class="col-span-1 inline-block"${checkedAttribute}>`;

  const listItem: string = `
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
const clearAllStorageItems = (): void => {
  localStorage.clear();
};

// TODOを登録した日付を生成する
const createTimeStamp = () => {
  const today: Date = new Date();
  const date: DateValue = {
    year: today.getFullYear(),
    month: `0${today.getMonth() + 1}`.slice(-2),
    day: `0${today.getDate()}`.slice(-2)
  };
  return `${date.year}-${date.month}-${date.day}`;
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
  const label = document.getElementById('js-edit-label')!;
  const editTitle = <HTMLInputElement>(
    document.getElementById('js-edit-todoTitle')
  );
  const editDetail = <HTMLInputElement>(
    document.getElementById('js-edit-todoDetail')
  );
  const editDate = <HTMLInputElement>document.getElementById('js-edit-date');
  const targetId = label.getAttribute('data-id')!;
  const targetTitle = document.querySelector(
    `#\\3${targetId} > .js-list-title`
  )!;

  const updateTitle = editTitle.value;
  const updateDetail = editDetail.value;
  const updateDate = editDate.value;
  targetTitle.textContent = updateTitle;
  const parseData = fetchLocalStorage();
  parseData[targetId].title = updateTitle;
  parseData[targetId].detail = updateDetail;
  parseData[targetId].date = updateDate;
  localStorage.setItem('json', JSON.stringify(parseData));
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

const createModalBody = (id: number, argument: ItemData) => {
  const subTask = argument['subTask'] as InnerArray;
  let subTaskList: string = '';
  for (let i: number = 0; i < Object.keys(subTask).length; i++) {
    const checkedAttribute = subTask[i].checked && ' checked';
    subTaskList += `
    <li>
      <input id="subTask${subTask[i].id}" data-subTask-id="${subTask[i].id}" type="checkbox" class="col-span-1 inline-block js-subTask-checkbox"${checkedAttribute}>
      <label for="subTask${subTask[i].id}">${subTask[i].value}</label>
    </li>
  `;
  }

  const modalBody: string = `
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
    <input type="date" id="js-edit-date" class="border mb-5 w-full p-1" value="${argument.date}" />
    <label class="block text-gray-700 text-sm font-bold mb-1">サブタスクを追加する</label>
    <div class="grid grid-cols-4 mb-2">
      <input type="input" id="js-edit-task-input" class="border col-span-3 p-1" value="" data-id="${id}"/>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 col-span-1 ml-2"
        data-id="${id}"
        id="js-edit-task"
      >
        Add Task
      </button>
    </div>
    <ul id="js-subTask-list">
      ${subTaskList}
    </ul>
  `;

  return modalBody;
};

const fetchLocalStorage = () => {
  const fetchData = localStorage.getItem('json')!;
  return JSON.parse(fetchData);
};

// 初期ローディング時に発火させる
function initialize(): void {
  showListItem();
}

initialize();
addTodoButton.addEventListener('click', handleAppend);
clearTodoButton.addEventListener('click', clearAllStorageItems);
