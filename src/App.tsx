import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Backend from './pages/Backend';
import Frontend from './pages/Frontend';
import Mobile from './pages/Mobile';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/backend" element={<Backend />} />
          <Route path="/frontend" element={<Frontend />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;