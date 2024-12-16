import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>&copy; {new Date().getFullYear()} SGF. Todos los derechos reservados.</p>
      <p>Uptc - Seccional Sogamoso</p>
    </footer>
  );
};

export default Footer;
