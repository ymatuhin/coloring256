import './index.scss';
import flatry from 'flatry';
import { downloadAsText } from '../utils/downloadAsText';
import EventEmitter from 'eventemitter3';

export class ColoringArea extends EventEmitter {
  constructor($root, imageUrl) {
    super();
    if (!$root) throw new Error('ColoringArea: $root element must be provided');
    if (!imageUrl) throw new Error('ColoringArea: imageUrl must be provided');
    this.$root = $root;
    this.imageUrl = imageUrl;
    this.originalImage = null;

    this.init();
  }

  async init() {
    this.$root.classList.add('coloring-area');
    const [err, imageText] = await flatry(this.loadImage());
    if (err) return this.emit('error', err);
    this.$root.innerHTML = imageText;
    this.emit('ready');
    this.$root.addEventListener('click', this.onClick.bind(this), false);
  }

  async loadImage() {
    const image = downloadAsText(this.imageUrl);
    this.originalImage = image;
    return image;
  }

  onClick({ target }) {
    const fill = target.getAttribute('fill');
    if (!fill || fill < '#aaa') return;
    this.emit('click', target);
  }

  fillTarget(target, color) {
    target.style.fill = color;
  }

  reset() {
    this.innerHTML = this.originalImage;
  }
}
