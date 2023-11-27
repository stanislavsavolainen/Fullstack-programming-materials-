import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
//import React, { useState, useEffect } from 'react';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ProductList from './onlineshop1/ProductList';
import ParrentCompoent from './example1/ParrentComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ParrentCompoent/>
    <ProductList />
  </React.StrictMode>
);


//<App />

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
