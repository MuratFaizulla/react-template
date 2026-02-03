import { useLocation } from 'react-router-dom';

export const RegistrationPage: React.FC = () => {
  const { state } = useLocation();
  console.log('state:', state);
  return <div>Registration Page for {(state as any).username}</div>;
};
