import './index.scss';
import { toggleOnSvg, toggleOffSvg } from './config';
import EventEmitter from 'eventemitter3';

export class Fullscreen extends EventEmitter {
  constructor($root) {
    super();
    if (!$root) throw new Error('Fullscreen: $root element must be provided');
    this.$root = $root;
    this.isFull = false;
    this.init();
  }

  init() {
    this.$root.classList.add('fullscreen');
    this.$root.innerHTML = toggleOnSvg;
    this.$root.addEventListener('click', this.onClick.bind(this), false);
  }

  onClick() {
    this.isFull = !this.isFull;
    this.emit('toggle', this.isFull);

    if (this.isFull) {
      this.$root.innerHTML = toggleOffSvg;
    } else {
      this.$root.innerHTML = toggleOnSvg;
    }
  }
}
