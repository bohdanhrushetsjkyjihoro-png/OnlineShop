import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import "./App.css";

function App() {
  const projects = [
    {
      id: 1,
      title: "Смартфон Galaxy S24",
      text: "Потужний флагман із сучасними AI-функціями та чудовою камерою.",
      image: "/images/product-1.svg",
      price: "34 999 ₴",
      tag: "Хіт",
      tagType: "hit",
    },
    {
      id: 2,
      title: 'Ноутбук Pro 16"',
      text: "Ідеальний вибір для розробників, дизайнерів та роботи з відео.",
      image: "/images/product-2.svg",
      price: "62 499 ₴",
      tag: null,
      tagType: null,
    },
    {
      id: 3,
      title: "Бездротові навушники",
      text: "Активне шумозаглушення та до 30 годин автономної роботи.",
      image: "/images/product-3.svg",
      price: "5 899 ₴",
      tag: "Знижка",
      tagType: "sale",
    },
    {
      id: 4,
      title: "Смарт-годинник Ultra",
      text: "Надійний супутник для тренувань, моніторингу здоров’я та подорожей.",
      image: "/images/product-4.svg",
      price: "12 999 ₴",
      tag: "Новинка",
      tagType: "hit",
    },
  ];

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section id="products" className="products-section">
          <h1 className="section-title">Каталог товарів</h1>
          <div className="products-grid">
            {projects.map((project) => (
              <Card
                key={project.id}
                title={project.title}
                text={project.text}
                image={project.image}
                price={project.price}
                tag={project.tag}
                tagType={project.tagType}
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
