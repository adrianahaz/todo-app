class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.state = {
      todos: [],
    };
  }

  connectedCallback() {
    this.loadFromStorage();
    this.render();

    this.addEventListener('add-todo', (event) => {
      this.state.todos.push(event.detail);
      this.commit();
    });

    this.addEventListener('update-todo', (event) => {
      const id = event.detail.id;
      const index = this.state.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        this.state.todos[index] = event.detail;
        this.commit();
      }
    });

    this.addEventListener('delete-todo', (event) => {
      const index = event.detail;
      this.state.todos.splice(index, 1);
      this.commit();
    });
  }

  loadFromStorage() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.state.todos = JSON.parse(storedTodos);
    }
  }

  saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  commit() {
    this.saveToStorage();
    this.propagate();
  }

  propagate() {
    const todoWrapper = this.querySelector('todo-wrapper');
    if (todoWrapper) {
      todoWrapper.todos = this.state.todos;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="app-root">
        <slot></slot>
      </div>
    `;

    queueMicrotask(() => this.propagate());
  }
}

customElements.define('app-root', AppRoot);
