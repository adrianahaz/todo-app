import { getIcons } from '../../utils/getIcons.js';

const styles = new CSSStyleSheet();
styles.replaceSync(`
  .todo__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .todo__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    color: #002765;
    margin: 0;
    padding: 0 10px;
  }

  .todo__content {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;

    min-width: 0;
  }

  .todo__text {
    flex: 1;
    line-height: 1.4;

    white-space: normal;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  .todo__checkbox {
    appearance: none;
    -webkit-appearance: none;

    width: 20px;
    height: 20px;
    border-radius: 50%;

    border: 2px solid #002765;
    background-color: transparent;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.15s ease, border-color 0.15s ease;
  }

  .todo__checkbox:checked {
    background-color: #002765;
    border-color: #002765;
  }

  .todo__checkbox::after {
    content: '✔';
    color: white;
    font-size: 14px;
    font-weight: bold;
    line-height: 1;
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 0.15s ease, transform 0.15s ease;
  }

  .todo__checkbox:checked::after {
    opacity: 1;
    transform: scale(1);
  }

  .todo__delete {
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 25px;
    cursor: pointer;
    padding: 10px;
  }

   .done .todo__text {
    text-decoration: line-through;
  }

  @media screen and (min-width: 768px) {
    .todo__content {
      font-size: 18px;
    }
  }
`);

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [styles];

    this.handleClick = this.handleClick.bind(this);
  }

  set todos(value) {
    this._todos = value;
    this.render();
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this.handleClick);
    this.render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.handleClick);
  }

  handleClick(event) {
    const item = event.target.closest('.todo__item');
    if (!item) return;

    const index = Number(item.dataset.index);
    const todo = this._todos[index];

    if (event.target.matches('.todo__checkbox')) {
      this.dispatchEvent(
        new CustomEvent('update-todo', {
          detail: { ...todo, done: !todo.done },
          bubbles: true,
          composed: true,
        }),
      );
    }

    if (event.target.closest('.todo__delete')) {
      this.dispatchEvent(
        new CustomEvent('delete-todo', {
          detail: index,
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  renderItem(todo, index) {
    return `
      <li class="todo__item ${todo.done ? 'done' : ''}" data-index="${index}">
        <div class="todo__content">
          <input class="todo__checkbox" type="checkbox" ${todo.done ? 'checked' : ''} />
          <span class="todo__text">${todo.text}</span>
        </div>
        <button class="todo__delete">
          <i data-lucide="x"></i>
        </button>
      </li>
    `;
  }

  render() {
    if (!this._todos) return;

    this.shadowRoot.innerHTML = `
      <ul class="todo__list">
        ${this._todos.map(this.renderItem).join('')}
      </ul>
    `;

    getIcons(this.shadowRoot);
  }
}

customElements.define('todo-list', TodoList);
