import './index.scss';
import throttle from 'lodash.throttle';
import {
  createHtml,
  downloadAsText,
  updateShades,
  updateColors,
  updateColor,
} from './utils';
import store from './store';

const { hash, imageExtension, rootSelector } = store.state;

class App {
  constructor() {
    this.create();
    this.storeListeners();
    this.domListeners();
    this.init();
  }

  async create() {
    this.$root = document.querySelector(rootSelector);
    const url = this.$root.getAttribute('data-image');
    const fullUrl = `${url}.${imageExtension}`;
    const svgText = await downloadAsText(fullUrl);
    this.$root.innerHTML = createHtml({ image: svgText, hash });
    this.$shades = this.$root.querySelector(`.${hash}-shades`);
    this.$primary = this.$root.querySelector(`.${hash}-primary`);
  }

  storeListeners() {
    store.on('update:shades', () =>
      updateShades(this.$shades, store.state.shades),
    );
    store.on('update:colors', () =>
      updateColors(this.$primary, store.state.colors),
    );
    store.on('update:color', () => updateColor(this.$root, store.state.color));
  }

  domListeners() {}

  init() {
    store.createColors();
    store.createShades();
  }
}

new App();

// listeners() {
//   const $pallete = this.$root.querySelector(`.${config.hash}-primary`);
//   const bindedOnSelectColor = this.onSelectColor.bind(this);
//   $pallete.addEventListener('click', bindedOnSelectColor, false);

//   const $coloring = this.$root.querySelector(`.${config.hash}-coloring`);
//   console.info(`# $coloring`, $coloring);
//   const bindedOnImageClick = this.onImageClick.bind(this);
//   $coloring.addEventListener('click', bindedOnImageClick, false);
// }

// onSelectColor({ target }) {
//   const newColor = target.getAttribute('data-color');
//   if (!newColor) return newColor;

//   this.activeColor = newColor;
// }

// onImageClick({ target }) {
//   const fill = target.getAttribute('fill');
//   if (!fill || fill < '#aaa') return;
//   target.style.fill = this.activeColor;
// }
