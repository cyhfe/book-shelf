/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from './components/lib';
import { useAuth } from './context/auth-context';
import DiscoverBooksScreen from './screens/discover';
import { Switch, Route, Redirect } from 'react-router-dom';
import BookScreen from './screens/book';
import NotFoundScreen from './screens/not-found';
export default function AuthenticatedApp() {
  const { user, logout } = useAuth();
  return (
    <div>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: 20px;
          margin-right: 20px;
        `}
      >
        {user.username}
        <Button
          variant="secondary"
          css={{ marginLeft: '10px' }}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
      <AppRoutes />
    </div>
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/discover" />} />
      <Route path="/discover" component={DiscoverBooksScreen} />
      <Route path="/book/:bookId" component={BookScreen} />
      <Route path="*" component={NotFoundScreen} />
    </Switch>
  );
}
