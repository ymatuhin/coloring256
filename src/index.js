import './index.scss';
import throttle from 'lodash.throttle';
import config from './config';
import { createHtml, downloadAsText, syncActiveColor } from './utils';

class Coloring256 {
  constructor(settings) {
    this.$root = document.querySelector(config.rootSelector);
    this.config = config;
    this.activeColor = this.config.defaultColor;
    this.init();
  }

  async init() {
    const urlNoExtension = this.$root.dataset.image;
    const whiteName = `${urlNoExtension}${this.config.whitePostfix}`;
    const blackUrl = `${urlNoExtension}.${this.config.imageExtension}`;
    const whiteUrl = `${whiteName}.${this.config.imageExtension}`;

    const [outline, image] = await Promise.all([
      downloadAsText(blackUrl),
      downloadAsText(whiteUrl),
    ]);

    this.$root.innerHTML = createHtml({
      colors: this.config.colors,
      active: this.activeColor,
      outline,
      image,
    });

    this.listeners();
  }

  listeners() {
    const $pallete = this.$root.querySelector(`.${config.hash}-colors`);
    const bindedOnSelectColor = this.onSelectColor.bind(this);
    $pallete.addEventListener('click', bindedOnSelectColor, false);

    const $coloring = this.$root.querySelector(`.${config.hash}-coloring`);
    const bindedOnImageClick = this.onImageClick.bind(this);
    $coloring.addEventListener('click', bindedOnImageClick, false);
  }

  onResize() {
    const params = {
      context: this.context,
      maxHeight: this.config.maxHeight,
      sensitivity: 30,
    };
  }

  onSelectColor({ target }) {
    const newColor = target.style.background;
    if (!newColor) return newColor;

    this.activeColor = newColor;
    syncActiveColor(this.$root, newColor);
  }

  onImageClick({ target }) {
    target.setAttribute('fill', this.activeColor);
  }
}

new Coloring256();
