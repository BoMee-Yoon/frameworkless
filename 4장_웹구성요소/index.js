import HelloWorld from "./attributeChangedCallback.js";
import GitHubAvatar, { EVENTS } from './GitHubAvatar.js';
window.customElements.define('hello-world', HelloWorld);
window.customElements.define('git-hub-avatar', GitHubAvatar);

document.querySelectorAll('git-hub-avatar')
  .forEach(avartar => {
    avartar
      .addEventListener(
        EVENTS.AVATAR_LOAD_COMPLETE,
        e => {
          console.log('Avartar Loaded', e.detail.avartar);
        }
      )
  
    avartar
      .addEventListener(
        EVENTS.AVATAR_LOAD_ERROR,
        e => {
          console.log('Avartar Loading error', e.detail.error);
        }
      )
  })