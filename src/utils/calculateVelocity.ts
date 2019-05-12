import { Vector } from "./Vector";

export type CalculateVelocityProps = {
  xV: number;
  yV: number;
  maxV: number;
  acc: number;
  timeFromPrevFrame: number;
  degrees: number;
}

export type CalculateVelocityResult = {
  xV: number;
  yV: number;
}

export function calculateVelocity({
  xV,
  yV,
  maxV,
  acc,
  timeFromPrevFrame,
  degrees,
}: CalculateVelocityProps): CalculateVelocityResult {
  const currentVelocity = new Vector(xV, yV);
  
  const appliedVelocityLength = acc * timeFromPrevFrame / 1000;
  const appliedVelocity = new Vector(0, appliedVelocityLength).setDegrees(degrees);
  
  const newVelocity = currentVelocity.add(appliedVelocity);

  if (newVelocity.getLength() > maxV) {
    newVelocity.setLength(maxV);
  }

  const { x: newXV, y: newYV } = newVelocity.getValues();
  
  return {
    xV: newXV,
    yV: newYV,
  }
}
