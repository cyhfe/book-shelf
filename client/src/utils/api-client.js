import * as auth from '../auth-provider';
import * as React from 'react';
import { useAuth } from '../context/auth-context';
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
        return Promise.reject({ message: 'Please re-authenticate.' });
      }

      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      const data = await response.json();
      return data;
    });
}

export function useClient() {
  const { user } = useAuth();
  const token = user?.token;
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  );
}
