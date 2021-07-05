import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import Father from './components/before_16.3/Father';
import Father2 from './components/after_16.3/Father';

ReactDOM.render(<>
                  {/*  16.3版本以前生命周期流程图 - 需要时放开注释即可  */}
                  {/* <Father /> */}
                  {/*  16.3版本以后生命周期流程图  */}
                  <Father2 />
                </>, 
document.getElementById('root'));

