import { html, render } from "../lit-html/lit-html.js";
import GoogleAuth2 from './GoogleAuth2.js'

class LoginButton extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.googleAuth = new GoogleAuth2();
  }

  async connectedCallback() {
    await this.googleAuth.init();
    this.render();
  }

  render() {
    const template = html`
      <style>
        .block {
          margin: auto;
          width: 240px;
          background-color: #4285f4;
          border: 1px solid transparent;
          color: #fff;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .25);
        }
        .block:hover {
          -webkit-box-shadow: 0 0 3px 3px rgba(66, 133, 244, .3);
          box-shadow: 0 0 3px 3px rgba(66, 133, 244, .3)
        }
        .image {
          padding: 15px;
          background-color: #fff;
          border-radius: 1px;
          float: left;
          width: 18px;
          height: 18px;
        }
        span {
          font-size: 16px;
          line-height: 48px;
          font-family: Roboto,arial,sans-serif;
          font-weight: 500;
          letter-spacing: .21px;
          margin-left: 6px;
          margin-right: 6px;
          vertical-align: top;
        }
      </style>
      <div>
      <div class="block" @click=${(_) => this.onSignIn()}>
          <div class="image">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48">
              <g>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
                </path><path fill="none" d="M0 0h48v48H0z"></path>
              </g>
            </svg>
          </div>
          <span>Sign in with Google</span>
      </div>
      </div>
    `;
    render(template, this.shadowRoot);
  }

  async onSignIn() {
    await this.googleAuth.signIn();
    if (this.googleAuth.isSigned()) {
        window.location.href = 'index.html';
    }
  }
}

customElements.define("loging-button", LoginButton);
