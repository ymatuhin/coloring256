import './index.scss';
import { shadesCount } from '../config';
import { Color } from '../Color';
import { Cell } from '../Cell';
import EventEmitter from 'eventemitter3';

export class ShadesColors extends EventEmitter {
  constructor($root, activeColor) {
    super();
    if (!$root) throw new Error('ShadesColors: $root element must be provided');
    this.$root = $root;
    this.activeColor = activeColor;
    this.colors = this.createColors();
    this.cells = this.createCells();

    this.init();
  }

  init() {
    this.$root.classList.add('shades-colors');
    this.cells.forEach(cell => cell.on('click', this.onCellClick.bind(this)));
    this.updateActive();
  }

  createColors() {
    const { h, s, l } = this.activeColor.color;
    const addCount = 100 / shadesCount - 1;
    const arr = Array.from(Array(shadesCount)).map((item, index) => {
      return new Color({ h, s, l: (index + 1) * addCount });
    });
    return arr;
  }

  createCells() {
    return this.colors.slice(0).map(color => {
      const node = document.createElement('div');
      this.$root.appendChild(node);
      return new Cell(node, color);
    });
  }

  changeActiveColor(color) {
    this.activeColor = color;
    this.updateActive();
    this.updateColors();
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

  updateColors() {
    const colors = this.createColors();
    colors.forEach((cell, index) => {
      this.cells[index].setColor(colors[index]);
    });
  }
}
