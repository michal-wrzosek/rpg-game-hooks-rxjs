
//         (0deg)
//           |
//           |
//           |
//           |
// ----------+----------> x (90deg)
//           |
//           |
//           |
//           |
//          \ /
//          y (180deg)

export class Vector {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  protected setValues = (x: number, y: number) => {
    // Have to round the numbers because, for example, "cos(90deg)" gives "6.123233995736766e-17" instead of "0"
    const roundedX = Math.round(x * 1e10) / 1e10;
    const roundedY = Math.round(y * 1e10) / 1e10;

    const xWithPositiveZero = roundedX === 0 ? 0 : roundedX;
    const yWithPositiveZero = roundedY === 0 ? 0 : roundedY;

    this.x = xWithPositiveZero;
    this.y = yWithPositiveZero;
  }

  // Modifiers
  public setDegrees = (degrees: number) => {
    const length = this.getLength();
    const radians = degrees * (Math.PI / 180);
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
    const x = sin * length;
    const y = cos * length * -1;
    this.setValues(x, y);
    return this;
  }

  public setLength = (length: number) => {
    if (this.getLength() > 0) {
      const degrees = this.getDegrees();
      this.setValues(0, length);
      this.setDegrees(degrees);
    }
    return this;
  }

  public add = (vector: Vector) => {
    const { x: otherX, y: otherY } = vector.getValues();
    this.setValues(this.x + otherX, this.y + otherY);
    return this;
  }

  // Getters
  public getValues = () => ({ x: this.x, y: this.y })

  public getLength = () => Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))

  public getDegrees = () => {
    const radians = Math.atan2(this.x, this.y * -1);
    const degrees = radians / Math.PI * 180;
    return degrees >= 0 ? degrees : 180 + Math.abs(degrees);
  }
}