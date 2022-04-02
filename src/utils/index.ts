/**
 * 参考lodash/set
 * @param path string
 * @param value any
 * @see https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/.internal/baseSet.js
 */
export const baseSet = (obj: { [key: string]: any }, path: string, value: any) => {
  const paths = path.split(".");

  while (paths.length) {
    // termination
    if (paths.length === 1) return (obj[paths.shift() as any] = value);

    // drill down
    obj = obj[paths.shift() as any];
  }
};
