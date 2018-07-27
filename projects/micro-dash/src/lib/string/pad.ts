/**
 * Pads `string` on the left and right sides if it's shorter than `length`. Padding characters are truncated if they can't be evenly divided by `length`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,373 bytes
 * - Micro-dash: 191 bytes
 */
export function pad(s: string, length: number, chars = ' ') {
  const needed = (length - s.length) / 2;
  return (
    _makePadding(Math.floor(needed), chars) +
    s +
    _makePadding(Math.ceil(needed), chars)
  );
}

/** @private */
export function makePadding(s: string, length: number, chars: string) {
  return _makePadding(length - s.length, chars);
}

function _makePadding(needed: number, chars: string) {
  return needed > 0 && chars.length > 0
    ? chars.repeat(Math.ceil(needed / chars.length)).substr(0, needed)
    : '';
}
