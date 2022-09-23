// developmentやprod
const addTodoButton: HTMLElement | null =
  document.getElementById('js-add-todo');
addTodoButton!.addEventListener('click', hoge);

function hoge() {
  alert('hoge');
}
