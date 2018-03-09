// const hash = config.hash;

// const createColor = color =>
//   `<i class="${hash}-color" data-color="${color}" style="background-color: ${color}"></i>`;

// const createLine = colors =>
//   colors.reduce((acc, color) => acc + createColor(color), '');

// const createColors = colors =>
//   colors.reduce((acc, color) => `${acc}<div>${createLine(color)}</div>`, '');

export const createHtml = ({ image, hash }) => `
  <div class="${hash}-container">
      <div class="${hash}-coloring">${image}</div>
      <div class="${hash}-colors">
        <div class="${hash}-shades"></div>
        <div class="${hash}-primary"></div>
      </div>
  </div>`;

export const updateShades = ($shades, shades) => {
  console.info(`# updateShades`);
};
export const updateColors = ($primary, colors) => {
  console.info(`# updateColors`);
};
export const updateColor = ($root, color) => {
  console.info(`# updateColors`);
};
