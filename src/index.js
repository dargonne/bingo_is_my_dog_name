import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './page/Root'; 
import { createStore } from 'redux'; 
import bingoStore from './store'; 
import { Provider } from 'react-redux'; 

const devTools = 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUS_DEVTOOLS_TXTENSION__(); 
const store = createStore(bingoStore, devTools); 

ReactDOM.render(<Provider store={store}>
                  <Root />
                </Provider>,
                document.getElementById('root'));