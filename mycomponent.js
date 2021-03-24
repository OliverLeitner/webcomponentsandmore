let tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>:host { color: red; font-weight: bold; }</style>
  <b id="testing2">I'm in shadow dom!</b>
  <slot></slot>`;

class MyComponent extends HTMLElement {
    constructor() {
        super(); // grab all the htmlelement features
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }

    connectedCallback() {
        console.log("connected callback called")
        this.innerHTML = "<div id=\"testing\">demo testing</div>"
    }
}
window.customElements.define('my-component', MyComponent);