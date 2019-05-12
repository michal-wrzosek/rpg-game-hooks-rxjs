import { calculateVelocity, CalculateVelocityProps } from "./calculateVelocity";

describe('utils/calculateVelocity/calculateVelocity()', () => {
  it('returns correct velocity for a given props', () => {
    expect(calculateVelocity({
      xV: 0,
      yV: 0,
      acc: 10,
      timeFromPrevFrame: 1000,
      maxV: 10,
      degrees: 0,
    })).toEqual({ xV: 0, yV: -10 });

    expect(calculateVelocity({
      xV: 0,
      yV: -10,
      acc: 10,
      timeFromPrevFrame: 1000,
      maxV: 100,
      degrees: 90,
    })).toEqual({ xV: 10, yV: -10 });

    expect(calculateVelocity({
      xV: 0,
      yV: -10,
      acc: 100,
      timeFromPrevFrame: 1000,
      maxV: 20,
      degrees: 180,
    })).toEqual({ xV: 0, yV: 20 });

    expect(calculateVelocity({
      xV: 0,
      yV: 0,
      acc: 100,
      timeFromPrevFrame: 1000,
      maxV: 10,
      degrees: 45,
    })).toEqual({
      xV: Math.round(Math.sqrt(50) * 1e10) / 1e10,
      yV: (Math.round(Math.sqrt(50) * 1e10) / 1e10) * -1,
    });
  })
})
