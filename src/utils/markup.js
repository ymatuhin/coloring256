import config from '../config';

const hash = config.hash;

const createColor = color =>
  `<i class="${hash}-color" style="background:${color}"></i>`;

const createLine = colors =>
  colors.reduce((acc, color) => acc + createColor(color), '');

const createColors = colors =>
  colors.reduce((acc, color) => `${acc}<div>${createLine(color)}</div>`, '');

export const createHtml = ({ outline, image, colors, active }) => `
  <div class="${hash}-container">
      <div class="${hash}-coloring">
        <div class="${hash}-outline">${outline}</div>
        <div class="${hash}-image">${image}</div>
      </div>
      <div class="${hash}-active-color" style="background:${active}"></div>
      <div class="${hash}-colors">
          ${createColors(colors)}
      </div>
  </div>`;

export const syncActiveColor = (root, color) => {
  root.querySelector(`.${hash}-active-color`).style.background = color;
};
