const styles = new CSSStyleSheet();
styles.replaceSync(`
  :host {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: #edeef0;
    border-radius: 30px;
  }

  .input {
    flex: 1;
    width: 50%;
    border: none;
    outline: none;
    background: transparent;
    padding: 20px;
    font-size: 16px;
  }

  .button {
    border: none;
    outline: none;
    background: #ff5945;
    padding: 20px 25px;
    color: #fff;
    font-size: 16px;
    border-radius: 30px;
  }
`);

class TodoInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.render();

    this.shadowRoot.querySelector('.button').addEventListener('click', () => {
      const input = this.shadowRoot.querySelector('.input');
      if (!input.value) return;

      this.dispatchEvent(
        new CustomEvent('add-todo', {
          detail: { id: Date.now(), text: input.value, done: false },
          bubbles: true,
          composed: true,
        }),
      );

      input.value = '';
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <input type="text" placeholder="Add your task" class="input" />
      <button class="button">Add</button>
    `;
  }
}

customElements.define('todo-input', TodoInput);
