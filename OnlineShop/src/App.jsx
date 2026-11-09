import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [category, setCategory] = useState("all");
  const [name, setName] = useState("");

  const projects = [
    {
      id: 1,
      title: "Смартфон Galaxy S24",
      text: "Потужний флагман із сучасними AI-функціями.",
      image: "/images/product-1.svg",
      price: "34 999 ₴",
      tag: "Хіт",
      tagType: "hit",
      category: "web",
    },
    {
      id: 2,
      title: "Дизайн-система Figma",
      text: "Комплект UI-компонентів для створення веб-застосунків.",
      image: "/images/product-2.svg",
      price: "12 499 ₴",
      tag: null,
      tagType: null,
      category: "design",
    },
    {
      id: 3,
      title: "Бездротові навушники",
      text: "Активне шумозаглушення та 30 годин роботи.",
      image: "/images/product-3.svg",
      price: "5 899 ₴",
      tag: "Знижка",
      tagType: "sale",
      category: "web",
    },
    {
      id: 4,
      title: "Ребрендинг OnlineShop",
      text: "Концепт айдентики та макети інтерфейсу.",
      image: "/images/product-4.svg",
      price: "25 000 ₴",
      tag: "Новинка",
      tagType: "hit",
      category: "design",
    },
  ];

  const filteredProjects =
    category === "all"
      ? projects
      : projects.filter((project) => project.category === category);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return (
    <div className={`app ${theme}`}>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="container">
        <section className="user-section">
          <h1 className="section-title">Вітаємо на сайті!</h1>
          <div className="form-group">
            <label htmlFor="user-name">Введіть своє ім'я:</label>
            <input
              id="user-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Наприклад: Богдан"
              className="input-field"
              autoComplete="given-name"
            />
          </div>
          <p className="greeting-text">
            👋 Привіт, <strong>{name.trim() || "Гість"}</strong>! Раді бачити
            вас.
          </p>
        </section>

        <section className="filter-section" aria-labelledby="filter-title">
          <h2 id="filter-title">Фільтр за категоріями:</h2>
          <div className="filter-buttons">
            {[
              ["all", "Усі"],
              ["web", "Веб"],
              ["design", "Дизайн"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`btn-filter ${category === value ? "active" : ""}`}
                aria-pressed={category === value}
                onClick={() => setCategory(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section id="products" className="products-section">
          <h2 className="section-title">Каталог товарів</h2>
          <div className="products-grid">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                {...project}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
