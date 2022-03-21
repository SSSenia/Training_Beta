//Page navigation variables
let
    currentPage = 1,
    minPage = 1,
    maxPage;


//Elements variables
const
    first = document.querySelector('.first'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    last = document.querySelector('.last'),
    pagesList = document.querySelectorAll(".num");


//Parsing
async function getResponse() {
    const response = await fetch(`http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${currentPage}`);
    const content = await response.json();
    maxPage = content.total_pages;
    const list = document.querySelector('.cards');

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    for (const element of content.results) {
        const DOM_a = document.createElement("a"),
            DOM_img = document.createElement("img"),
            DOM_name = document.createElement("div"),
            DOM_p = document.createElement("p"),
            DOM_rate = document.createElement("div");

        DOM_a.href = "#";
        DOM_a.className = "cards__card";

        DOM_img.src = element.poster_path != null ? "https://image.tmdb.org/t/p/w500/" + element.poster_path : "../img/jpg/none.jpg";
        DOM_img.alt = element.title;

        DOM_name.className = "cards__name";
        DOM_p.textContent = element.title;
        DOM_name.appendChild(DOM_p);

        DOM_rate.className = "cards__rate";
        DOM_rate.textContent = element.vote_average;

        DOM_a.appendChild(DOM_img);
        DOM_a.appendChild(DOM_name);
        DOM_a.appendChild(DOM_rate);

        list.appendChild(DOM_a);
    }
    navigationCheck();
};


//Startup setup
getResponse();


//Check navigation buttons
const navigationCheck = () => {
    for (const element of pagesList) {
        element.textContent = currentPage + Number(element.dataset.page);
        if (!Number(element.dataset.page)) element.disabled = true;
        if ((element.dataset.page).slice(-1) == "3") element.textContent = "...";
        element.style.display =
            currentPage + Number(element.dataset.page) < minPage
                || currentPage + Number(element.dataset.page) > maxPage
                ? "none" : "block";
    }

    first.disabled = minPage >= currentPage;
    prev.disabled = minPage >= currentPage;

    next.disabled = maxPage <= currentPage;
    last.disabled = maxPage <= currentPage;
    },
    navigate = (position) => {
        currentPage = position;
        getResponse();
    };


//Navigation buttons listeners
first.addEventListener('click', () => { navigate(minPage) });
prev.addEventListener('click', () => { navigate(currentPage - 1) });

for (const element of pagesList) {
    element.addEventListener('click', () => { navigate(currentPage + Number(element.dataset.page)) });
};

next.addEventListener('click', () => { navigate(currentPage + 1) });
last.addEventListener('click', () => { navigate(maxPage) });
