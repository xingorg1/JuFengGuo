import React from 'react';
import ReactDOM from 'react-dom';
import App from '@view/App/App';
import { GlobalStyled } from '@css/style';
console.log(<App />)
const Index = <>
  <GlobalStyled />
  <App />
</>
ReactDOM.render(Index, document.getElementById('root'));
