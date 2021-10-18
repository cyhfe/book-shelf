import * as auth from '../auth-provider';

const API_URL = process.env.REACT_APP_API_URL;

export default function client(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };
  return window
    .fetch(`${API_URL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        auth.logout();
        // window.location.assign(window.location);
        return Promise.reject({ message: 'Please re-authenticate.' });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data.message);
      }
    });
}
