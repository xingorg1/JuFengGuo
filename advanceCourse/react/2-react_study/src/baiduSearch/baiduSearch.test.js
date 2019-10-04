import React from 'react';
import ReactDOM from 'react-dom';
import BaiduSearch from './baiduSearch/baiduSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BaiduSearch />, div);
  ReactDOM.unmountComponentAtNode(div);
});
