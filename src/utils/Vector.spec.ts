import { Vector } from "./Vector";

describe('utils/Vector', () => {
  it('returns values correctly', () => {
    const vector1 = new Vector(0, 1);
    expect(vector1.getValues()).toEqual({ x: 0, y: 1 });
  });

  it('calculates length correctly', () => {
    const vector1 = new Vector(0, 1);
    expect(vector1.getLength()).toEqual(1);
    
    const vector2 = new Vector(1, 1);
    expect(vector2.getLength()).toEqual(Math.sqrt(2));
  })

  it('calculates degrees corectly', () => {
    const vector1 = new Vector(0, -1);
    expect(vector1.getDegrees()).toEqual(0);

    const vector2 = new Vector(1, 0);
    expect(vector2.getDegrees()).toEqual(90);

    const vector3 = new Vector(0, 1);
    expect(vector3.getDegrees()).toEqual(180);

    const vector4 = new Vector(-1, 0);
    expect(vector4.getDegrees()).toEqual(270);
  })

  it('modifies degrees correctly', () => {
    const vector1 = new Vector(0, 1);
    vector1.setDegrees(0);
    expect(vector1.getValues()).toEqual({ x: 0, y: -1 });

    vector1.setDegrees(360);
    expect(vector1.getValues()).toEqual({ x: 0, y: -1 });
    
    vector1.setDegrees(90);
    expect(vector1.getValues()).toEqual({ x: 1, y: 0 });

    vector1.setDegrees(360 + 90);
    expect(vector1.getValues()).toEqual({ x: 1, y: 0 });

    vector1.setDegrees(180);
    expect(vector1.getValues()).toEqual({ x: 0, y: 1 });

    vector1.setDegrees(270);
    expect(vector1.getValues()).toEqual({ x: -1, y: 0 });

    const vector2 = new Vector(0, Math.sqrt(2));
    vector2.setDegrees(45);
    expect(vector2.getValues()).toEqual({ x: 1, y: -1 });
  })

  it('modifies length correctly', () => {
    const vector1 = new Vector(0, 1);
    vector1.setLength(2);
    expect(vector1.getValues()).toEqual({ x: 0, y: 2 });

    const vector2 = new Vector(1, 1);
    vector2.setLength(Math.sqrt(2) * 2);
    expect(vector2.getValues()).toEqual({ x: 2, y: 2 });

    const vector3 = new Vector(0, 0);
    vector3.setLength(2);
    expect(vector3.getValues()).toEqual({ x: 0, y: 0 });
  });

  it('adds vectors correctly', () => {
    const vector1 = new Vector(0, 1);
    const vector2 = new Vector(0, 1);
    vector1.add(vector2);
    expect(vector1.getValues()).toEqual({ x: 0, y: 2 });

    const vector3 = new Vector(-10, -20);
    const vector4 = new Vector(20, -30);
    vector3.add(vector4);
    expect(vector3.getValues()).toEqual({ x: 10, y: -50 });
  })
});