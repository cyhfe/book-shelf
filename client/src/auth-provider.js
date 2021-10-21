const localStorageKey = '__auth_provider_token__';

function getToken() {
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

function logout(token) {
  return client('logout', { token })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      Promise.reject(err);
    })
    .finally(() => {
      window.localStorage.removeItem(localStorageKey);
      window.location.href = '/';
    });
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
        return Promise.reject(response.statusText);
      }
      const data = await response.json();
      return data;
    });
}

export { getToken, login, register, logout, localStorageKey };
