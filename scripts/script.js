
let recommendationsData = {};
fetch('data/travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    recommendationsData = data;
  })
  .catch(error => console.error('Error fetching data:', error));

document.getElementById('search-btn').addEventListener('click', () => {
  const keyword = document.getElementById('search-bar').value.toLowerCase();
  const resultsContainer = document.getElementById('recommendations');
  resultsContainer.innerHTML = ''; 

  let results = [];

 
  if (keyword.includes('beach')) {
    results = recommendationsData.beaches;
  }
  else if (keyword.includes('temple')) {
    results = recommendationsData.temples;
  }
  
  else if (keyword.includes('country')) {
    results = recommendationsData.countries.map(country => ({
      name: country.name,
      imageUrl: country.cities[0].imageUrl,
      description: `Explore cities like ${country.cities.map(city => city.name).join(', ')}.`,
    }));
  }
  
  else {
    results = recommendationsData.countries.flatMap(country =>
      country.cities.filter(city => city.name.toLowerCase().includes(keyword)).map(city => ({
        name: city.name,
        imageUrl: city.imageUrl,
        description: city.description
      }))
    );
  }

  
  if (results.length === 0) {
    results = [
      ...recommendationsData.beaches.filter(beach => beach.description.toLowerCase().includes(keyword)),
      ...recommendationsData.temples.filter(temple => temple.description.toLowerCase().includes(keyword)),
      ...recommendationsData.countries.flatMap(country =>
        country.cities.filter(city => city.description.toLowerCase().includes(keyword))
      )
    ];
  }

 
  if (results.length > 0) {
    results.forEach(recommendation => {
      const card = document.createElement('div');
      card.classList.add('recommendation-card');
      card.innerHTML = `
        <img src="images/${recommendation.imageUrl}" alt="${recommendation.name}">
        <h3>${recommendation.name}</h3>
        <p>${recommendation.description}</p>
      `;
      resultsContainer.appendChild(card);
    });
  } else {
    resultsContainer.innerHTML = '<p>No results found. Try searching for beaches, temples, or countries.</p>';
  }
});


document.getElementById('clear-btn').addEventListener('click', () => {
  document.getElementById('search-bar').value = ''; 
  document.getElementById('recommendations').innerHTML = ''; 
});


function scrollToRecommendations() {
  const recommendationsSection = document.getElementById('recommendations');
  recommendationsSection.scrollIntoView({
    behavior: 'smooth',  
    block: 'start'       
  });
}
