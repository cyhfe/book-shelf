import { AuthProvider } from './auth-context';
export default function AppProviders({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
