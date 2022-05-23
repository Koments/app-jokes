import { createStore } from "redux";

const ACTIVE_RADIO = "activeRadio";
const GET_RANDOM_JOKE = "getRandomJoke";
const GET_CATEGORY = "getCategory";
const CHOOSE_CATEGORY = "chooseCategory";
const SEARCH_JOKE = "searchJoke";
const INPUT_SEARCH_VALUE = "inputSearchValue";
const FAVORITE_JOKE = "favoriteJokes";

function reducer(
  state = {
    activeRadio: [],
    randomJoke: [],
    availableCategories: [],
    chosenCategory: [],
    inputSearchValue: [],
    searchJoke: [],
    favoriteJokes: [],
  },
  action
) {
  switch (action.type) {
    case ACTIVE_RADIO: {
      return { ...state, activeRadio: action.payload };
    }
    case GET_RANDOM_JOKE: {
      return { ...state, randomJoke: action.payload };
    }
    case GET_CATEGORY: {
      return { ...state, availableCategories: action.payload };
    }
    case CHOOSE_CATEGORY: {
      return { ...state, chosenCategory: action.payload };
    }
    case INPUT_SEARCH_VALUE: {
      return { ...state, inputSearchValue: action.payload };
    }
    case SEARCH_JOKE: {
      return { ...state, searchJoke: action.payload };
    }
    case FAVORITE_JOKE: {
      return {
        ...state,
        favoriteJokes: action.payload,
      };
    }

    default:
      return state;
  }
}

export function activeRadio(payload) {
  return { type: ACTIVE_RADIO, payload };
}
export function getRandomJoke(payload) {
  return { type: GET_RANDOM_JOKE, payload };
}
export function getCategory(payload) {
  return { type: GET_CATEGORY, payload };
}
export function chooseCategory(payload) {
  return { type: CHOOSE_CATEGORY, payload };
}
export function searchJoke(payload) {
  return { type: SEARCH_JOKE, payload };
}
export function inputSearchValue(payload) {
  return { type: INPUT_SEARCH_VALUE, payload };
}
export function favoriteJokes(payload) {
  return { type: FAVORITE_JOKE, payload };
}

const store = createStore(reducer);
export default store;
