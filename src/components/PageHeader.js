import { html, render } from "../lit-html/lit-html.js";
import GoogleAuth2 from './GoogleAuth2.js'

class PageHeader extends HTMLElement {
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
        .header {
          width: 100%;
          padding: 4px;
          border-bottom: 1px solid #ccc !important;
          overflow: hidden;
        }
        .user-block {
          float: right;
          display:flex;          
        }
        .user-block img.user-image {
          border-radius: 50%;
          width: 28px;
        }
        .user-block .name-block {
          padding-right: 8px;
        }
        .user-name {
          font-weight: bold;
        }
      </style>

      <header>
        <div class="header">
          <div class="user-block">
            <div class="name-block">
              <div class="user-name">${this.getUserName()}</div>
              <div><a href="#" @click="${(_) => this.onSignOut()}">Exit</a></div>
            </div>
            <div class="image-block">
              <img class="user-image" src="${this.getUserImage()}"></img>
            </div>
          </div>
        </div>
      </header>      
    `;
    render(template, this.shadowRoot);
  }

  async onSignOut() {
    await this.googleAuth.signOut();
    if (!this.googleAuth.isSigned()) {
      window.location.href = 'login.html';
    }
  }

  getUserImage() {
    return this.googleAuth.getProfileImage();
  }

  getUserName() {
    return this.googleAuth.getUserName();
  }
}

customElements.define("page-header", PageHeader);