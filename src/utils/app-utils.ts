export const checkResponse = (res: any) => {
  return res.ok
    ? res.json()
    : res.json().then((err: any) => Promise.reject(err));
};

export const request = (url: string, options?: any) => {
  return fetch(url, options).then(checkResponse);
};
