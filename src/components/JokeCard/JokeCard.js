import { React } from "react";
import likeImg from "../images/Vector.png";
import textImg from "../images/Group 1.png";
import likeImgClicked from "../images/heart.png";
import styles from "../JokeCard/JokeCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { favoriteJokes } from "../../store";

export default function JokeCard({ joke, cardStyles }) {
  const favoriteJokesArr = useSelector((state) => state.favoriteJokes);

  const dispatch = useDispatch();

  const isFavorite = Boolean(
    favoriteJokesArr.find((jokes) => jokes.id === joke.id)
  );

  function addAndDeleteFromFavorites() {
    if (!isFavorite) {
      let favoriteAdded = [...favoriteJokesArr, joke];
      localStorage.setItem("favJoke", JSON.stringify(favoriteAdded));
      return dispatch(favoriteJokes(favoriteAdded));
    }

    let favoriteAdded = favoriteJokesArr.filter(
      (jokes) => jokes.id !== joke.id
    );

    localStorage.setItem("favJoke", JSON.stringify(favoriteAdded));
    dispatch(favoriteJokes(favoriteAdded));

    //   dispatch(
    //   favoriteJokes([І
    //     ...favoriteJokesArr.filter((jokes) => jokes.id !== joke.id),
    //   ])
    // )
  }
  console.log(joke.updated_at);
  function getDate() {
    let hrs = Math.floor(Date.parse(joke.updated_at) / 1000 / 3600);
    let hrsToday = Math.floor(Date.now() / 1000 / 3600);
    return hrsToday - hrs;
  }
  if (joke.id === undefined) {
    return <div></div>;
  }
  return (
    <>
      <section className={cardStyles.jokeCard}>
        <div className={styles.jokeCardFavoriteImg}>
          <img
            onClick={() => {
              addAndDeleteFromFavorites();
            }}
            src={!isFavorite ? `${likeImg}` : `${likeImgClicked}`}
            alt="favorite"
          ></img>
        </div>
        <div className={styles.jokeCardJoke}>
          <div className={cardStyles.textImage}>
            <img src={textImg} alt="text of joke"></img>
          </div>
          <div className={styles.jokeCardText}>
            <span className={styles.jokeCardId}>
              ID:
              <a
                href={`https://api.chucknorris.io/jokes/${joke.id}`}
                target="_blank"
                rel="noreferrer"
              >
                {joke.id}
              </a>
            </span>
            <p className={cardStyles.jokeCardTextJoke}>{joke.value}</p>
            <div className={styles.jokeCardFooter}>
              <span className={styles.jokeCardLast_Update}>
                Last update: {getDate() + ` hours ago`}
              </span>

              <span
                className={
                  joke.categories.length === 0
                    ? styles.jokeCardCategoryNone
                    : cardStyles.jokeCardCategory
                }
              >
                {joke.categories[0]}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
