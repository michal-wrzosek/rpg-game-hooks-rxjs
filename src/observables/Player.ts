import { BehaviorSubject } from 'rxjs';
import { AnimationFrame } from './AnimationFrame';

export type PlayerProps = {
  x: number;
  y: number;
}

export type PlayerState = {
  xV: number;
  yV: number;
  slowDownRate: number;
  maxV: number;
  acc: number;
}

export const createPlayer = (initialProps: PlayerProps) => {
  const state: PlayerState = {
    xV: 0,
    yV: 0,
    slowDownRate: 150, // pixels per 1sec
    maxV: 150,
    acc: 40,
  }

  const Player = new BehaviorSubject<PlayerProps>(initialProps);

  function recalculate(timeFromPrevFrame: number) {
    const { x, y } = Player.getValue();

    // Calculating new X position
    const newX = x + (state.xV * timeFromPrevFrame / 1000);
    
    // Calculating new Y position
    const newY = y + (state.yV * timeFromPrevFrame / 1000);

    // Calculating new X Velocity
    const xVSlowDown = state.slowDownRate * timeFromPrevFrame / 1000;
    if (state.xV > 0) {
      if (state.xV > xVSlowDown) {
        state.xV = state.xV - xVSlowDown;
      } else {
        state.xV = 0;
      }
    } else if (state.xV < 0) {
      if (state.xV * -1 > xVSlowDown) {
        state.xV = state.xV + xVSlowDown;
      } else {
        state.xV = 0;
      }
    }

    // Calculating new Y Velocity
    const yVSlowDown = state.slowDownRate * timeFromPrevFrame / 1000;
    if (state.yV > 0) {
      if (state.yV > yVSlowDown) {
        state.yV = state.yV - yVSlowDown;
      } else {
        state.yV = 0;
      }
    } else if (state.yV < 0) {
      if (state.yV * -1 > yVSlowDown) {
        state.yV = state.yV + yVSlowDown;
      } else {
        state.yV = 0;
      }
    }

    
    Player.next({ x: newX, y: newY });
  }

  function moveUp() {
    state.yV = Math.max(state.yV - state.acc, state.maxV * -1);
  }

  function moveDown() {
    state.yV = Math.min(state.yV + state.acc, state.maxV);
  }

  function moveRight() {
    state.xV = Math.min(state.xV + state.acc, state.maxV);
  }

  function moveLeft() {
    state.xV = Math.max(state.xV - state.acc, state.maxV * -1);
  }

  AnimationFrame.subscribe((timeFromPrevFrame) => recalculate(timeFromPrevFrame));

  return {
    moveUp,
    moveDown,
    moveRight,
    moveLeft,
    subscribe: (callback: (playerProps: PlayerProps) => void) => Player.subscribe(callback),
  };
}
