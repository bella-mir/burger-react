export const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: any) => Promise.reject(`Error ${res.status}`));
};

export const request = (url: string, options?: any) => {
  return fetch(url, options).then(checkResponse);
};
