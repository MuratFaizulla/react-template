// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './static/css/global.css';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
