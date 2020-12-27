import { html, render } from "../lit-html/lit-html.js";
import GoogleAuth2 from './GoogleAuth2.js'

class HelloComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.googleAuth = new GoogleAuth2();    
  }

  async connectedCallback() {
    await this.googleAuth.init();
    this.render();
  }

  render() {
    const template = html`
    <style>
        h1 {
            text-align: center;
        }
    </style>    
    <h1>Hello ${this.getUserName()}</h1>
    `;
    render(template, this.shadowRoot);
  }

  getUserName() {
    return this.googleAuth.getUserName();
  }
}

customElements.define("hello-component", HelloComponent);