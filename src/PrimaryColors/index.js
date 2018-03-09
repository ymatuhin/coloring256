import './index.scss';
import { Color } from '../Color';
import { Cell } from '../Cell';
import EventEmitter from 'eventemitter3';

export class PrimaryColors extends EventEmitter {
  constructor($root, activeColor) {
    super();
    if (!$root)
      throw new Error('PrimaryColors: $root element must be provided');
    this.$root = $root;
    this.activeColor = activeColor;
    this.colors = [
      new Color({ h: 0, s: 100, l: 50 }),
      new Color({ h: 30, s: 100, l: 50 }),
      new Color({ h: 60, s: 100, l: 50 }),
      new Color({ h: 120, s: 100, l: 50 }),
      new Color({ h: 180, s: 100, l: 50 }),
      new Color({ h: 210, s: 100, l: 50 }),
      new Color({ h: 240, s: 100, l: 50 }),
      new Color({ h: 270, s: 100, l: 50 }),
      new Color({ h: 300, s: 100, l: 50 }),
      new Color({ h: 330, s: 100, l: 50 }),
    ];
    this.cells = this.createCells();
    this.init();
  }

  init() {
    this.$root.classList.add('primary-colors');
    this.cells.forEach(cell => cell.on('click', this.onCellClick.bind(this)));
    this.updateActive();
  }

  createCells() {
    return this.colors.slice(0).map(color => {
      const node = document.createElement('div');
      this.$root.appendChild(node);
      return new Cell(node, color);
    });
  }

  onCellClick(color) {
    this.emit('changeColor', color);
    this.activeColor = color;
    this.updateActive();
  }

  updateActive() {
    const activeColor = this.activeColor.toString();
    this.cells.forEach(cell => {
      const cellColor = cell.color.toString();
      if (cellColor === activeColor) cell.activate();
      else cell.deactivate();
    });
  }
}
