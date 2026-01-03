import { getIcons } from '../../utils/getIcons.js';

import '../content/todo-input.js';
import '../content/todo-list.js';

const styles = new CSSStyleSheet();
styles.replaceSync(`
  :host {
    width: calc(100vw - 25px);
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    background-color: #f5f5f5;
    gap: 20px;
  }

  .todo__title {
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #002765;
    margin: 0;
  }

  @media screen and (min-width: 768px) {
    :host {
      width: calc(100vw - 200px);
    }
  }

  @media screen and (min-width: 1024px) {
    :host {
      width: calc(100vw - 800px);
    }
  }
`);

class TodoWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  set todos(todos) {
    this._todos = todos;

    if (!this.shadowRoot) return;

    const todoList = this.shadowRoot.querySelector('todo-list');
    if (todoList) {
      todoList.todos = this._todos;
    }
  }

  connectedCallback() {
    this.render();
    getIcons(this.shadowRoot);

    if (this._todos) {
      const todoList = this.shadowRoot.querySelector('todo-list');
      if (todoList) {
        todoList.todos = this._todos;
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <h1 class="todo__title">
        <span>To-Do List</span>
        <i data-lucide="list-todo"></i>
      </h1>

      <todo-input></todo-input>
      <todo-list></todo-list>
    `;
  }
}

customElements.define('todo-wrapper', TodoWrapper);
