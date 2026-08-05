import React from 'react';

export default function Footer() {
  // This automatically gets the current year, so you never have to update it.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pharaoh-dark border-t border-egyptian-gold/20 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-papyrus/70 font-inter text-sm tracking-wide">
          Copyright © {currentYear} Ahmed Hamdy. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}