import { AuthProvider } from './auth-context';
import { BrowserRouter as Router } from 'react-router-dom';
export default function AppProviders({ children }) {
  return (
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  );
}
