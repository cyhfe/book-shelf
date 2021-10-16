import * as React from 'react';
import AuthenticatedApp from './authenticated-app';
import UnauthenticatedApp from './unauthenticated-app';

export default function App() {
  const [user, setUser] = React.useState(null);
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}
