import './components/app-root.js';
import './components/ui/wrapper.js';
import './components/layout/todo-wrapper.js';

document.querySelector('#app').innerHTML = `
  <app-root>
    <todo-wrapper></todo-wrapper>
  </app-root>
`;
