//Page navigation variables
let
    currentPage = 1,
    minPage = 1,
    maxPage;


//Elements variables
const
    first = document.querySelector('.first'),
    prev = document.querySelector('.prev'),
    minus3 = document.querySelector('#minus3'),
    minus2 = document.querySelector('#minus2'),
    minus1 = document.querySelector('#minus1'),
    zero = document.querySelector('#zero'),
    plus1 = document.querySelector('#plus1'),
    plus2 = document.querySelector('#plus2'),
    plus3 = document.querySelector('#plus3'),
    next = document.querySelector('.next'),
    last = document.querySelector('.last');


//Parsing
async function getResponse() {
    let response = await fetch(`http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${currentPage}`);
    let content = await response.json();
    maxPage = content.total_pages;
    let key;
    let list = document.querySelector('.cards');
    list.innerText = '';
    for (key in content.results) {
        if (content.results[key].poster_path != null)
            list.innerHTML += `<a href="#" class="cards__card">
            <img src="${"https://image.tmdb.org/t/p/w500/" + content.results[key].poster_path}" alt="${content.results[key].title}">
            </a>`;
        else
            list.innerHTML += `<a href="#" class="cards__card">
            <img src="../img/jpg/none.jpg" alt="${content.results[key].title}">
            </a>`;
    }
    navigationCheck();
}

//Startup setup
getResponse();
zero.disabled = true;


//Check navigation buttons
const navigationCheck = () => {
    minus2.innerText = currentPage - 2;
    minus1.innerText = currentPage - 1;
    zero.innerText = currentPage;
    plus1.innerText = currentPage + 1;
    plus2.innerText = currentPage + 2;

    first.disabled = minPage >= currentPage;
    prev.disabled = minPage >= currentPage;


    minus3.style.display = currentPage - 3 < minPage ? "none" : "block";
    minus2.style.display = currentPage - 2 < minPage ? "none" : "block";
    minus1.style.display = currentPage - 1 < minPage ? "none" : "block";

    plus1.style.display = currentPage + 1 > maxPage ? "none" : "block";
    plus2.style.display = currentPage + 2 > maxPage ? "none" : "block";
    plus3.style.display = currentPage + 3 > maxPage ? "none" : "block";

    next.disabled = maxPage <= currentPage;
    last.disabled = maxPage <= currentPage;
};


//Navigation buttons listeners
first.addEventListener('click', () => {
    currentPage = minPage;
    getResponse();
});
prev.addEventListener('click', () => {
    currentPage--;
    getResponse();
});

minus3.addEventListener('click', () => {
    currentPage -= 3;
    getResponse();
});
minus2.addEventListener('click', () => {
    currentPage -= 2;
    getResponse();
});
minus1.addEventListener('click', () => {
    currentPage -= 1;
    getResponse();
});

plus1.addEventListener('click', () => {
    currentPage += 1;
    getResponse();
});
plus2.addEventListener('click', () => {
    currentPage += 2;
    getResponse();
});
plus3.addEventListener('click', () => {
    currentPage += 3;
    getResponse();
});

next.addEventListener('click', () => {
    currentPage++;
    getResponse();
});

last.addEventListener('click', () => {
    currentPage = maxPage;
    getResponse();
});