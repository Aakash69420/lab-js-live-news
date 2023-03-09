const apiKey = '60937d9abdb04094bddf7a8b657a682d';

const usaNewsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const indiaNewsUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

const usaNewsSection = document.getElementById('usa-news');
const indiaNewsSection = document.getElementById('india-news');
const usaPagination = document.getElementById('usa-pagination');
const indiaPagination = document.getElementById('india-pagination');

const pageSize = 5;

let usaPageNumber = 1;
let indiaPageNumber = 1;

// get news articles from API
async function getNews(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.articles;
}

// display news articles for USA section
async function displayUsaNews() {
  const usaNews = await getNews(usaNewsUrl);
  const usaNewsSlice = usaNews.slice((usaPageNumber - 1) * pageSize, usaPageNumber * pageSize);

  usaNewsSection.innerHTML = usaNewsSlice.map((article) => `
    <div class="card">
      <div class="card-header">
        <h3>${article.title}</h3>
        <p>${new Date(article.publishedAt).toDateString()}</p>
      </div>
      <div class="card-body">
        <img src="${article.urlToImage}" alt="${article.title}">
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      </div>
    </div>
  `).join('');

  displayUsaPagination(usaNews.length);
}

// display pagination for USA section
function displayUsaPagination(totalArticles) {
  const totalPages = Math.ceil(totalArticles / pageSize);
  usaPagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.addEventListener('click', () => {
      usaPageNumber = i;
      displayUsaNews();
    });
    usaPagination.appendChild(button);
  }
}

// display news articles for India section
async function displayIndiaNews() {
  const indiaNews = await getNews(indiaNewsUrl);
  const indiaNewsSlice = indiaNews.slice((indiaPageNumber - 1) * pageSize, indiaPageNumber * pageSize);

  indiaNewsSection.innerHTML = indiaNewsSlice.map((article) => `
    <div class="card">
      <div class="card-header">
        <h3>${article.title}</h3>
        <p>${new Date(article.publishedAt).toDateString()}</p>
      </div>
      <div class="card-body">
        <img src="${article.urlToImage}" alt="${article.title}">
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      </div>
    </div>
  `).join('');

  displayIndiaPagination(indiaNews.length);
}

// display pagination for India section
function displayIndiaPagination(totalArticles) {
  const totalPages = Math.ceil(totalArticles / pageSize);
  indiaPagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.addEventListener('click', () => {
      indiaPageNumber = i;
      displayIndiaNews();
    });
    indiaPagination.appendChild(button);
  }
}

displayUsaNews();
displayIndiaNews();
