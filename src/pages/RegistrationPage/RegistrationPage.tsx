import { useLocation } from 'react-router-dom';

export const RegistrationPage: React.FC = () => {
  const { state } = useLocation();
  const locationState = state as { username: string } | null;
  console.log('state:', state);
  return <div>Registration Page for {locationState?.username}</div>;
};
