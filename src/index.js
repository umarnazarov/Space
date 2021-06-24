import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import SpaceLand from './SpaceLand/components/SpaceLand';

ReactDOM.render(
  <BrowserRouter>
      <SpaceLand/>
  </BrowserRouter>,
  document.getElementById('root')
);