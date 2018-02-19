const hash = 'z46Juzcyx';

const createColor = color =>
  `<i class="${hash}-color_${color}" style="background: ${color}"></i>`;

const createColors = colors =>
  colors.reduce((acc, color) => acc + createColor(color), '');

export const createHtml = ($element, colors) => {
  $element.innerHTML = `
    <div class="${hash}-container">
        <canvas width="" height=""></canvas>
        <div class="${hash}-colors">
            ${createColors(colors)}
        </div>
    </div>
    `;

    const canvas = $element.querySelector('canvas');
    const pallete = $element.querySelector(`.${hash}-colors`);
    return { canvas, pallete };
};
