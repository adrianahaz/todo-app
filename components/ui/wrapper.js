const sharedStyles = new CSSStyleSheet();
sharedStyles.replaceSync(`
  :host {
    width: 100%;
    display: flex;
    padding: 20px;
    border-radius: 10px;
    background-color: #f5f5f5;
  }
`);

class UiWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [sharedStyles];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <slot></slot>
    `;
  }
}

customElements.define('ui-wrapper', UiWrapper);
