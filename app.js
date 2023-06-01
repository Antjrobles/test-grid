const btnEl = document.getElementById('btn');
const cardsContainer = document.querySelector('.grid');

const searchBtn = document.querySelector('.searchBtn');
const searchBar = document.querySelector('.searchBar');
const searchInput = document.getElementById('searchInput');
const searchClose = document.getElementById('searchClose');
const inputField = document.getElementById('searchInput')


async function fetchImages() {
  cardsContainer.innerHTML = ''; // Limpiar el contenido existente
  const perPage = 5;
  // const searchParameter = inputText;
  
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=landscape&per_page=${perPage}`,
      {
        headers: {
          Authorization: 'F5RU35VJ0hiSHmLcbiwhy9S5IjzIyJuDWByJRt2kwXs6qEY31oE9i955',
        },
      }
    );
    const data = await response.json();
    const photos = data.photos;
    shuffle(photos);


    photos.forEach((photo) => {
      const card = createCard(photo);
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}

function createCard(photo) {
  const card = document.createElement('div');
  card.classList.add('cards');

  const front = document.createElement('div');
  front.classList.add('front');

  const img = document.createElement('img');
  img.src = photo.src.medium;
  front.appendChild(img);

  const back = document.createElement('div');
  back.classList.add('back');

  const text = document.createElement('textBack');
  text.innerText = photo.alt;
  back.appendChild(text);

  const author = document.createElement('author');
  author.innerText = photo.photographer;

  author.innerHTML = author.innerHTML === 'Pixabay' ? 'Stefan Keller' :
                  author.innerHTML === 'Nextvoyage' ? 'Antonio Robles' :
                  author.innerHTML === 'katja' ? 'Katja Salenko' :
                  author.innerHTML === 'Baskin Creative Studios' ? 'Mario Baskin' :
                  author.innerHTML;

  text.appendChild(author);
  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', () => {
    card.classList.toggle('flip');
  });

  return card;
}

// SEARCH BAR
searchBtn.addEventListener('click', function() {
  searchBar.style.visibility = 'visible';
  searchBtn.style.visibility = 'hidden'; 
  searchBar.classList.add('open');
});



searchClose.addEventListener('click', function() {
  searchBtn.style.visibility = 'visible';
  searchBar.style.visibility = 'hidden';
  searchBar.classList.remove('open');
 });


 // SHUFFLE FOTOS
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }
  return array;
}


// SEARCH INPUT
inputField.addEventListener('keyup', (e) => {
  const inputText = e.target.value;
  fetchSearchImages(inputText);  
})

btnEl.addEventListener('click', fetchImages);





//fetchSearchImages
async function fetchSearchImages(inputText) {
  cardsContainer.innerHTML = ''; // Limpiar el contenido existente
  const perPage = 5;
  const searchParameter = inputText;
  
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${searchParameter}&per_page=${perPage}`,
      {
        headers: {
          Authorization: 'F5RU35VJ0hiSHmLcbiwhy9S5IjzIyJuDWByJRt2kwXs6qEY31oE9i955',
        },
      }
    );
    const data = await response.json();
    const photos = data.photos;


    photos.forEach((photo) => {
      const card = createCard(photo);
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}

function createCard(photo) {
  const card = document.createElement('div');
  card.classList.add('cards');

  const front = document.createElement('div');
  front.classList.add('front');

  const img = document.createElement('img');
  img.src = photo.src.medium;
  front.appendChild(img);

  const back = document.createElement('div');
  back.classList.add('back');

  const text = document.createElement('textBack');
  text.innerText = photo.alt;
  back.appendChild(text);

  const author = document.createElement('author');
  author.innerText = photo.photographer;

  author.innerHTML = author.innerHTML === 'Pixabay' ? 'Stefan Keller' :
                  author.innerHTML === 'Nextvoyage' ? 'Antonio Robles' :
                  author.innerHTML === 'katja' ? 'Katja Salenko' :
                  author.innerHTML === 'Baskin Creative Studios' ? 'Mario Baskin' :
                  author.innerHTML;

  text.appendChild(author);
  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', () => {
    card.classList.toggle('flip');
  });

  return card;
}
