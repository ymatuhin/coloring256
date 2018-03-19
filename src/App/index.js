import './index.scss';
import { rootSelector, imageAttributeName } from '../config';
import { ColoringArea } from '../ColoringArea';
import { PrimaryColors } from '../PrimaryColors';
import { ShadesColors } from '../ShadesColors';
import { Fullscreen } from '../Fullscreen';
import { Color } from '../Color';
import { enter, exit } from '../utils/fullscreen';

export class App {
  constructor() {
    this.color = new Color({ h: 0, s: 100, l: 50 });
    this.coloringArea = null;
    this.primmaryColors = null;
    this.fullscreen = null;

    this.$root = document.querySelector(rootSelector);
    if (!this.$root)
      throw new Error(`App: can't find root element (${rootSelector})`);

    this.imageUrl = this.$root.getAttribute(imageAttributeName);
    if (!this.imageUrl)
      throw new Error(`Image url must be provided by [data-image]`);

    this.init();
  }

  init() {
    this.$root.innerHTML = '<span class="loading-text">Loading...</span>';
    this.$root.classList.add('loading');
    this.$root.classList.add('coloring-root');
    this.createArea();
  }

  createArea() {
    const node = document.createElement('div');
    this.coloringArea = new ColoringArea(node, this.imageUrl);
    this.coloringArea.on('ready', this.onAreaReady.bind(this, node));
    this.coloringArea.on('error', this.onAreaError.bind(this));
    this.coloringArea.on('click', this.onAreaClick.bind(this));
  }

  createPrimaryColors() {
    const node = document.createElement('div');
    this.primmaryColors = new PrimaryColors(node, this.color);
    this.primmaryColors.on('changeColor', color => {
      this.color = color;
      this.shadesColors.changeActiveColor(color);
    });
    this.$root.appendChild(node);
  }

  createShadeColors() {
    const node = document.createElement('div');
    this.shadesColors = new ShadesColors(node, this.color);
    this.shadesColors.on('changeColor', color => (this.color = color));
    this.$root.appendChild(node);
  }

  createFullButton() {
    const node = document.createElement('button');
    node.setAttribute('type', 'button');
    this.fullscreen = new Fullscreen(node);
    this.fullscreen.on('toggle', this.toggleFullScreen.bind(this));
    this.$root.appendChild(node);
  }

  onAreaReady(node) {
    this.$root.innerHTML = '';
    this.$root.classList.remove('loading');
    this.$root.appendChild(node);
    this.createShadeColors();
    this.createPrimaryColors();
    this.createFullButton();
  }

  onAreaError(error) {
    this.$root.innerHTML = `<span class="error-text">${error}</span>`;
  }

  onAreaClick(target) {
    this.coloringArea.fillTarget(target, this.color.toString());
  }

  toggleFullScreen(state) {
    if (state) enter(this.$root);
    else exit(this.$root);

    this.$root.classList[state ? 'add' : 'remove']('coloring-root__fullscreen');
  }
}
