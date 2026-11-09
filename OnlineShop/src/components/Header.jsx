import React from "react";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="container header__container">
        <a href="#" className="header__logo">
          OnlineShop React
        </a>
        <nav className="header__nav" aria-label="Головна навігація">
          <ul className="nav__list">
            <li>
              <a href="#hero" className="nav__link nav__link--active">
                Головна
              </a>
            </li>
            <li>
              <a href="#products" className="nav__link">
                Каталог
              </a>
            </li>
            <li>
              <a href="#about" className="nav__link">
                Про нас
              </a>
            </li>
          </ul>
        </nav>
        <div className="header__actions">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onToggleTheme}
            aria-label={`Увімкнути ${theme === "light" ? "темну" : "світлу"} тему`}
            aria-pressed={theme === "dark"}
          >
            {theme === "light" ? "Темна тема" : "Світла тема"}
          </button>
          <button type="button" className="btn btn--secondary">
            Увійти
          </button>
          <button type="button" className="btn btn--primary">
            Кошик
          </button>
        </div>
      </div>
    </header>
  );
}
