import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Cadastro from './pages/cadastro';
import Conta from './pages/conta';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/conta" element={<Conta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;