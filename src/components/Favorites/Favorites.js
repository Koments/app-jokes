import React from "react";
import JokeCard from "../JokeCard";
import { useSelector } from "react-redux";

export default function Favorites({ cardStylesFav }) {
  const jokesFavorite = useSelector((state) => state.favoriteJokes);
  let fav = localStorage.getItem("favJoke");

  return (
    <div>
      {jokesFavorite.map((joke) => (
        <JokeCard cardStyles={cardStylesFav} key={joke.id} joke={joke} />
      ))}
    </div>
  );
}
