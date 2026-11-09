import React, { useState } from "react";

export default function Card({
  title,
  text,
  image,
  price,
  tag,
  tagType,
  category = "",
}) {
  const [likes, setLikes] = useState(0);

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
        {category && (
          <span className="card__category">{category.toUpperCase()}</span>
        )}
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{text}</p>
        <div className="card__footer">
          {price && <span className="card__price">{price}</span>}
          <div className="card__actions">
            <button
              type="button"
              className="btn btn--like btn--sm card__like"
              aria-label={`Вподобати товар ${title}. Вподобань: ${likes}`}
              onClick={() => setLikes((currentLikes) => currentLikes + 1)}
            >
              ❤️ {likes}
            </button>
            <button type="button" className="btn btn--primary btn--sm">
              Купити
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
