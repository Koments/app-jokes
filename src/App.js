import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favoriteJokes } from "./store";
import MainForm from "./components/MainForm";
import JokeCard from "./components/JokeCard";
import Favorites from "./components/Favorites";
import styles from "./App.module.css";
import cardStyles from "./components/JokeCard/JokeCard.module.css";
import cardStylesFav from "./components/Favorites/Favorites.module.css";

function App() {
  const activeRadio = useSelector((state) => state.activeRadio);
  const searchJoke = useSelector((state) => state.searchJoke);
  const randomJoke = useSelector((state) => state.randomJoke);
  const isFavorite = useSelector((state) => state.favoriteJokes);
  const [menuActive, setMenuActive] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const favoritesFromLocalStorage = JSON.parse(
      localStorage.getItem("favJoke")
    );
    if (favoritesFromLocalStorage) {
      dispatch(favoriteJokes(favoritesFromLocalStorage));
    }
  }, [dispatch]);

  function renderCorrectComponent() {
    return (
      <>
        {activeRadio !== "search" ? (
          <JokeCard cardStyles={cardStyles} joke={randomJoke} />
        ) : (
          searchJoke.map((joke) => (
            <JokeCard cardStyles={cardStyles} key={joke.id} joke={joke} />
          ))
        )}
      </>
    );
  }
  return (
    <>
      <div className={styles.bodyApp}>
        <div className={styles.mainJokes}>
          <div className={styles.headerAppJokes}>
            <h2 className={styles.title}>Hey!</h2>
            <div
              className={
                !isFavorite.length
                  ? styles.humburgerBtn
                  : styles.humburgerBtnWithSmth
              }
              onClick={() => setMenuActive(!menuActive)}
            >
              Favorite
            </div>
          </div>
          <p className={styles.title_desr}>Let’s try to find a joke for you:</p>
          <MainForm />
          {renderCorrectComponent()}
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className={
            menuActive ? styles.favoriteJokes : styles.favoriteJokesModal
          }
        >
          <div className={styles.favHeaderNav}>
            <p className={styles.appFavoritesTitle}>Favorites</p>
            <img
              className={styles.favHeaderNavImg}
              onClick={() => setMenuActive(!menuActive)}
              src="https://img.icons8.com/material/24/000000/return.png"
              alt="goBack"
            />
          </div>
          {isFavorite.length === 0 ? (
            <div className={styles.emptyFav}>no jokes added... </div>
          ) : null}
          <div
            className={styles.blur}
            onClick={() => {
              setMenuActive(true);
            }}
          ></div>
          <Favorites cardStylesFav={cardStylesFav} />
        </div>
      </div>
    </>
  );
}

export default App;
