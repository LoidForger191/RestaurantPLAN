import { useEffect, useRef } from "react";
import { diets } from "../data/menu";
import Photo from "./Photo";
import "./DishModal.css";

export default function DishModal({ dish, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (dish && !d.open) d.showModal();
    if (!dish && d.open) d.close();
  }, [dish]);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="dish-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {dish && (
        <>
          <Photo src={dish.img} alt={dish.name} />
          <div className="modal-body">
            <p className="meta">
              {dish.cat}
              {dish.pick ? ", chef’s pick" : ""}
              {dish.season ? ", seasonal" : ""}
            </p>
            <h3 id="dish-title">{dish.name}</h3>
            <p>{dish.desc}</p>
            <p className="meta">
              <strong>Dietary:</strong>{" "}
              {dish.tags.length
                ? dish.tags.map((t) => diets[t]).join(", ")
                : "Contains meat or fish"}
            </p>
            <p className="meta">
              <strong>Allergens:</strong>{" "}
              {dish.allergens.join(", ") || "None declared"}
            </p>
            <span className="price">€{dish.price}</span>
            <button className="btn btn-solid" onClick={onClose}>
              Close
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
