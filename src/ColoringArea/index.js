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
    this.$root.innerHTML = await this.loadImage();
    this.emit('ready');
    this.$root.addEventListener('click', this.onClick.bind(this), false);
  }

  async loadImage() {
    const promise = downloadAsText(this.imageUrl);
    const [err, imageText] = await flatry(promise);
    if (err) return this.emit('error', err);
    this.originalImage = imageText;
    return imageText;
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
