import { EventEmitter } from './utils';

class Store extends EventEmitter {
  constructor() {
    super();

    this.state = {
      hash: 'z46Juzcyx',
      color: null,
      colors: [],
      shades: [],
      rootSelector: '.js-coloring',
      imageExtension: 'svg',
      colorsCount: 10,
      shadesCount: 10,
    };
  }

  changeColor(index) {
    this.state.color = this.state.colors[index];
    this.emit('update:color');
    this.createShades();
  }

  createColors() {
    for (let i = 0; i < 360; i += 360 / this.state.colorsCount) {
      this.state.colors.push({ h: i, s: 100, l: 50 });
    }
    this.state.color = this.state.colors[0];
    this.state.colors[0].active = true;
    this.emit('update:colors');
  }

  createShades() {
    const { h, s } = this.state.color;
    for (let i = 0; i < 100; i += 100 / this.state.shadesCount) {
      this.state.shades.push({ h, s, l: i });
    }
    this.emit('update:shades');
  }
}

export default new Store();
