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

// 以下代码来自 artifact 项目
export function whatis(w: string, dict: { [key: string]: string }) {
  for (let key in dict) {
    if (dict[key] == w) {
      return key;
    }
  }
  return undefined;
}

export function assert(p: any, msg?: string) {
  if (!p) {
    throw new Error(msg);
  }
}

export function argmax(obj: { [key: string]: number }, A: Set<string>): unknown {
  let m: number | undefined = undefined,
    ma: string | undefined = undefined;
  A.forEach((a) => {
    if (a in obj) {
      if (m === undefined || obj[a] > m) {
        m = obj[a];
        ma = a;
      }
    }
  });
  return ma;
}

export function argmin(obj: { [key: string]: number }, A: Set<string>): unknown {
  let m: number | undefined = undefined,
    ma: string | undefined = undefined;
  A.forEach((a) => {
    if (a in obj) {
      if (m === undefined || obj[a] < m) {
        m = obj[a];
        ma = a;
      }
    }
  });
  return ma;
}
