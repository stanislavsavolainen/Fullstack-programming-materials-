import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ParrentCompoent from './example1/ParrentComponent';

import ProductList from './onlineshop1/ProductList';
import SelectedProduct from './onlineshop1/SelectedProductPage';
import AddImage from './onlineshop1/AddImageToProduct';
import EditProduct from './onlineshop1/EditProduct';
import DeleteProduct from './onlineshop1/DeleteProduct';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <BrowserRouter>

    <ParrentCompoent></ParrentCompoent>

    <Routes>
    
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:productUUID" element={ <SelectedProduct/>} />
      <Route path="/productimage/:productUUID" element={<AddImage/>} />
      <Route path="/editproduct/:productUUID" element={<EditProduct/>} /> 
      <Route path="/deleteproduct/:productUUID" element={<DeleteProduct/>} />  
   
    </Routes>
  
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
