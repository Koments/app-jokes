import { React, useEffect } from "react";
import styles from "../MainForm/MainForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  activeRadio,
  getRandomJoke,
  getCategory,
  chooseCategory,
  searchJoke,
  inputSearchValue,
} from "../../store";
export default function MailForm() {
  const wholeState = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((response) => response.json())
      .then((categories) => {
        dispatch(getCategory(categories));
      });
  }, [dispatch]);

  function getJokeBtn() {
    if (wholeState.activeRadio === "random") {
      fetch("https://api.chucknorris.io/jokes/random")
        .then((response) => response.json())
        .then((joke) => dispatch(getRandomJoke(joke)));
    }
    if (wholeState.activeRadio === "categories") {
      if (wholeState.availableCategories.includes(wholeState.chosenCategory)) {
        fetch(
          `https://api.chucknorris.io/jokes/random?category=${wholeState.chosenCategory}`
        )
          .then((response) => response.json())
          .then((joke) => dispatch(getRandomJoke(joke)));
      }
    }
    if (wholeState.activeRadio === "search") {
      fetch(
        `https://api.chucknorris.io/jokes/search?query=${wholeState.inputSearchValue}`
      )
        .then((response) => response.json())
        .then((joke) => {
          dispatch(searchJoke(joke.result.slice(0, 10)));
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div>
      <form className={styles.form}>
        <label htmlFor="random">
          <input
            type="radio"
            name="choosejoke"
            id="random"
            onChange={() => dispatch(activeRadio("random"))}
          ></input>
          Random
        </label>
        <label htmlFor="categories">
          <input
            type="radio"
            name="choosejoke"
            id="categories"
            onChange={() => dispatch(activeRadio("categories"))}
          ></input>
          From categories
        </label>
        <div className={styles.btnsCategoryBox}>
          {wholeState.availableCategories.map((category) => {
            return (
              <input
                key={category}
                type="button"
                className={
                  wholeState.activeRadio === "categories"
                    ? styles.categoriesBtns
                    : styles.categoriesBtnsNone
                }
                value={category}
                onClick={() => dispatch(chooseCategory(category))}
              ></input>
            );
          })}
        </div>

        <label htmlFor="search">
          <input
            type="radio"
            name="choosejoke"
            id="search"
            onChange={() => dispatch(activeRadio("search"))}
          ></input>
          Search
          <br />
          <input
            type="text"
            placeholder="Free text search..."
            className={
              wholeState.activeRadio === "search"
                ? styles.categoriesSearchInput
                : styles.categoriesSearchInputNone
            }
            onChange={(e) => {
              dispatch(inputSearchValue(e.target.value));
            }}
          ></input>
        </label>
        <button
          className={styles.getJokeBtn}
          type="button"
          onClick={() => getJokeBtn()}
        >
          Get a joke
        </button>
      </form>
    </div>
  );
}
