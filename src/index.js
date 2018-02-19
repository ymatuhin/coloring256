import './index.scss';
import { createHtml } from './html';

class Coloring256 {
  constructor() {
    const colors = ['#fc9', '#000'];
    const $element = document.querySelector('.js-coloring');
    const { canvas, palette } = createHtml($element, colors);

    this.$canvas = canvas;
    this.$palette = palette;
  }
}

new Coloring256();
