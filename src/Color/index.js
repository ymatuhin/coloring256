export class Color {
  constructor(hslObject) {
    this.color = hslObject;
  }

  toString() {
    const { h, s, l } = this.color;
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
}
