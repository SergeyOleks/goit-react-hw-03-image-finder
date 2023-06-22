import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '2513506-17c592ffee8e679236e75c0c2';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
const PER_PAGE = 12;
const ORIENTATION = 'horizontal';
const SAFE_SEARCH = true;

async function fetchFindResult(findName, currentPage) {
  const URL = `${BASE_URL}?key=${API_KEY}&q=${findName}&page=${currentPage}&per_page=${PER_PAGE}&orientation=${ORIENTATION}&safesearch=${SAFE_SEARCH}`;

  if (findName.trim() === '') {
    return;
    }
      try {
        return await axios.get(URL);
      } catch (err) {
        console.log(err);
      }
  ;
}

export { fetchFindResult };
