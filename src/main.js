import {createSiteMenuTemplate} from './view/site-menu.js';
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
