/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from './components/lib';
import { useAuth } from './context/auth-context';
import DiscoverBooksScreen from './screens/discover';
import { Switch, Route, Redirect, Link, useRouteMatch } from 'react-router-dom';
import BookScreen from './screens/book';
import NotFoundScreen from './screens/not-found';
import * as colors from './styles/colors';
import * as mq from './styles/mq';
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
          onClick={() => logout(user.token)}
        >
          Logout
        </Button>
      </div>
      <div
        css={{
          margin: '0 auto',
          padding: '4em 2em',
          maxWidth: '840px',
          width: '100%',
          display: 'flex',
          gap: '30px',
          [mq.small]: {
            flexDirection: 'column',
          },
        }}
      >
        <div css={{ minWidth: '200px' }}>
          <Nav />
        </div>
        <main css={{ flexGrow: 1 }}>
          <AppRoutes />
        </main>
      </div>
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

function NavLink(props) {
  const match = useRouteMatch(props.to);
  return (
    <Link
      css={[
        {
          display: 'block',
          padding: '8px 15px 8px 10px',
          margin: '5px 0',
          width: '100%',
          height: '100%',
          color: colors.text,
          borderRadius: '2px',
          borderLeft: '5px solid transparent',
          textDecoration: 'none',
          ':hover': {
            color: colors.indigo,
            textDecoration: 'none',
            background: colors.gray10,
          },
        },
        match
          ? {
              borderLeft: `5px solid ${colors.indigo}`,
              background: colors.gray10,
              ':hover': {
                background: colors.gray10,
              },
            }
          : null,
      ]}
      {...props}
    />
  );
}

function Nav() {
  return (
    <nav
      css={{
        padding: '1em 1.5em',
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
        }}
      >
        <li>
          <NavLink to="/discover">Discover</NavLink>
          <NavLink to="/list">Reading List</NavLink>
          <NavLink to="/finished">Finished Books</NavLink>
        </li>
      </ul>
    </nav>
  );
}
