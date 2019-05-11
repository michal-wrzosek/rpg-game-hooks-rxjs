import { fromEvent } from 'rxjs';
import { map, filter, merge, scan } from 'rxjs/operators';

export enum KEYS {
  ARROW_UP = 'ArrowUp',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft'
}

export enum KEY_EVENT_TYPES {
  DOWN = 'down',
  UP = 'up',
}

export type KeyEventType = {
  type: KEY_EVENT_TYPES,
  key: KEYS
}

export type KeyPressedType = KEYS[];

const keyUps = fromEvent<KeyboardEvent>(document, "keyup").pipe(
  filter(
    (event) => [
      KEYS.ARROW_UP,
      KEYS.ARROW_RIGHT,
      KEYS.ARROW_DOWN,
      KEYS.ARROW_LEFT,
    ].includes(event.key as any)
  ),
  map((event) => ({ type: KEY_EVENT_TYPES.UP, key: event.key as KEYS })),
)
const keyDowns = fromEvent<KeyboardEvent>(document, "keydown").pipe(
  filter(
    (event) => [
      KEYS.ARROW_UP,
      KEYS.ARROW_RIGHT,
      KEYS.ARROW_DOWN,
      KEYS.ARROW_LEFT,
    ].includes(event.key as any)
  ),
  map((event) => ({ type: KEY_EVENT_TYPES.DOWN, key: event.key as KEYS })),
)

export const keysPressed = keyDowns.pipe(
  merge(keyUps),
  scan((acc: KeyPressedType, event: KeyEventType) => {
    if (event.type === KEY_EVENT_TYPES.DOWN && !acc.includes(event.key)) {
      return [...acc, event.key];
    } else if (event.type === KEY_EVENT_TYPES.UP) {
      console.log(event);
      return acc.filter(key => key !== event.key);
    } else {
      return acc;
    }
  }, [])
)