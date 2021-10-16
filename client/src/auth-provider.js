const localStorageKey = '__auth_provider_token__';

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse(user) {
  window.localStorage.setItem(localStorageKey, user.token);
  return user;
}

function login({ username, password }) {
  return client('login', { username, password }).then(handleUserResponse);
}

function register({ username, password }) {
  return client('register', { username, password }).then(handleUserResponse);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

const authURL = process.env.REACT_APP_AUTH_URL;

export async function client(endpoint, data) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  };

  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      if (!response.ok) {
        return Promise.reject(response.data);
      }
      const data = await response.json();
      return data;
    });
}

export { getToken, login, register, logout, localStorageKey };