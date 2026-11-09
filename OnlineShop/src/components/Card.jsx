import React from "react";

export default function Card({ title, text, image, price, tag, tagType }) {
  return (
    <article className="card">
      <div className="card__image-container">
        <img src={image} alt={title} className="card__image" />
        {tag && (
          <span
            className={`card__tag ${tagType === "sale" ? "card__tag--sale" : ""}`}
          >
            {tag}
          </span>
        )}
      </div>
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{text}</p>
        <div className="card__footer">
          {price && <span className="card__price">{price}</span>}
          <button type="button" className="btn btn--primary btn--sm">
            Купити
          </button>
        </div>
      </div>
    </article>
  );
}
