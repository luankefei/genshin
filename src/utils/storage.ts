function helper(isSession?: boolean) {
  return isSession ? sessionStorage : localStorage;
}

function getStorage(key: string, isSession?: boolean): any {
  let data = helper(isSession).getItem(key);
  try {
    if (typeof data === "string") data = JSON.parse(data);
  } catch (e) {
    console.warn("storage parse error: ", e, key);
  }
  return data;
}

function setStorage(key: string, value: any, isSession?: boolean) {
  return helper(isSession).setItem(key, typeof value === "string" ? value : JSON.stringify(value));
}

function removeStorage(key: string, isSession?: boolean) {
  return helper(isSession).removeItem(key);
}

function clearStorage(isSession?: boolean) {
  return (isSession ? sessionStorage : localStorage).clear();
}

const storage = {
  get: getStorage,
  set: setStorage,
  remove: removeStorage,
  clear: clearStorage,
};

export default storage;
