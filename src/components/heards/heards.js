/* eslint-disable no-console */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favoriteArticle, unfavoriteArticle } from "../../store/actions";
import heard from "./Vector.png";
import redheard from "./Heart_corazón 1.png";
import "./heards.css";

const Heards = ({ heards, favorited, slug }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [optimisticFavorited, setOptimisticFavorited] = useState(favorited);
  const [optimisticHeards, setOptimisticHeards] = useState(heards);

  const handleFavoriteClick = async () => {
    const userr = localStorage.getItem("userName");
    if (!userr) return;

    setIsLoading(true);

    const wasFavorited = optimisticFavorited;
    setOptimisticFavorited(!wasFavorited);
    setOptimisticHeards(wasFavorited ? optimisticHeards - 1 : optimisticHeards + 1);

    try {
      if (wasFavorited) {
        await dispatch(unfavoriteArticle(slug));
      } else {
        await dispatch(favoriteArticle(slug));
      }
    } catch (error) {
      setOptimisticFavorited(wasFavorited);
      setOptimisticHeards(wasFavorited ? optimisticHeards + 1 : optimisticHeards - 1);
      console.error("Error handling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="heards-component">
      <button className="heards-button" onClick={handleFavoriteClick} disabled={isLoading}>
        <img
          className="heards-icon"
          src={optimisticFavorited ? redheard : heard}
          alt={optimisticFavorited ? "Liked" : "Not liked"}
        ></img>
      </button>
      <span className="number-heards">{optimisticHeards}</span>
    </div>
  );
};

export default Heards;
