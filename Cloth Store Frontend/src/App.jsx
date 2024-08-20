import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShowCloth from './pages/ShowCloth';
import EditCloth from './pages/EditCloth';
import DeleteCloth from './pages/DeleteCloth';
import CreateClothes from './pages/CreateClothes';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clothes/create" element={<CreateClothes />} />
      <Route path="/clothes/details/:id" element={<ShowCloth />} />
      <Route path="/clothes/edit/s:id" element={<EditCloth />} />
      <Route path="/clothes/delete/:id" element={<DeleteCloth />} />




    </Routes>
  )
}

export default App