import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './app/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


var mySqrt = function(x) {
    if(x <= 2) return x;
    let left = 1;
    let right = x;
    let result;
    while(left <= right) {
        const middle = Math.floor((right + left) / 2);
        const pow = middle * middle;
        if(pow === x) return middle;
        if(pow < x){
          left = middle + 1;
          result = middle;
        } else {
          right = middle - 1;
        }
    }
    return result;
};

console.log(mySqrt(8));
