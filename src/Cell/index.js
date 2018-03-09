import './index.scss';
import EventEmitter from 'eventemitter3';

export class Cell extends EventEmitter {
  constructor($root, color) {
    super();
    if (!$root) throw new Error('Cell: $root element must be provided');
    if (!color) throw new Error('Cell: color must be provided');
    this.$root = $root;
    this.color = color;
    this.activeClass = 'active';

    this.init();
  }

  init() {
    this.$root.classList.add('color-cell');
    this.$root.addEventListener('click', () => this.emit('click', this.color));
    this.setColor(this.color);
  }

  setColor(color) {
    this.color = color;
    this.$root.style.backgroundColor = color;
  }

  activate() {
    this.$root.classList.add(this.activeClass);
  }

  deactivate() {
    this.$root.classList.remove(this.activeClass);
  }
}
