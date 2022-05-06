import React from "react";
import { Route, Link, BrowserRouter, Routes } from 'react-router-dom'
import Barang from './components/barang'
import Pelanggan from './components/pelanggan'
import Penjualan from './components/penjualan'

function App() {
  return (
    < BrowserRouter >
      <div>
          <ul>
            <li>
                <Link to="/pelanggan">Pelanggan</Link>
            </li>
            <li>
                <Link to="/barang">Barang</Link>
            </li>
            <li>
                <Link to="/penjualan">Penjualan</Link>
            </li>
          </ul>
          <Routes>
            <Route exact path="/pelanggan" element={<Pelanggan/>} />
            <Route exact path="/barang" element={<Barang/>} />
            <Route exact path="/penjualan" element={<Penjualan/>} />
          </Routes>
      </div>
    </ BrowserRouter >
  )
}

export default App;