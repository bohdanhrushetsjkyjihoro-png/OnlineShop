import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <p className="footer__copy">
          &copy; 2026 OnlineShop React. Усі права захищені.
        </p>
        <div className="footer__links">
          <a href="#" className="footer__link">
            Політика конфіденційності
          </a>
          <a href="#" className="footer__link">
            Умови використання
          </a>
        </div>
      </div>
    </footer>
  );
}
