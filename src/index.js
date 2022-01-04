import { render } from 'react-dom';
import { StrictMode } from 'react';
import App from './App';
import '@styles/main.scss';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
