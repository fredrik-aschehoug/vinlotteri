
const getUrl = (path: string) => `api/${path}`

const headers = {
    'Content-Type': 'application/json'
  }

export const getJsonAsync = async (path: string) => {
    const response = await fetch(getUrl(path));
    const data = await response.json();

    return data;
};

export const postJsonAsync = async (path: string, payload: any) => {
    const options = { method: 'POST', body: JSON.stringify(payload), headers }
    const response = await fetch(getUrl(path), options);
    const data = await response.json();

    return data;
};

export const putJsonAsync = async (path: string, payload: any) => {
    const options = { method: 'PUT', body: JSON.stringify(payload), headers }
    const response = await fetch(getUrl(path), options);
    const data = await response.json();

    return data;
};