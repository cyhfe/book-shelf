import * as React from 'react';
import * as auth from '../auth-provider';
import { useAsync } from '../utils/hooks';
import { client } from '../auth-provider';
import * as colors from '../styles/colors';
import { FullPageSpinner } from '../components/lib';

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

async function getUser() {
  let user = null;
  const token = await auth.getToken();
  if (token) {
    user = await client('me', { token });
  }

  return user;
}

export function AuthProvider(props) {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();

  React.useEffect(() => {
    run(getUser());
  }, [run]);

  const login = React.useCallback(
    (form) => auth.login(form).then((u) => setData(u)),
    [setData]
  );

  const register = React.useCallback(
    (form) => auth.register(form).then((u) => setData(u)),
    [setData]
  );
  const logout = React.useCallback(() => {
    auth.logout();
    setData(null);
  }, [setData]);

  const value = React.useMemo(
    () => ({ user, login, logout, register }),
    [login, logout, register, user]
  );

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error}</pre>
      </div>
    );
  }
  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }
}

export function useAuth() {
  return React.useContext(AuthContext);
}
