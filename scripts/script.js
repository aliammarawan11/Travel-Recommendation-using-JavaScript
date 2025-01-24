// Fetch data from JSON file
let recommendationsData = {};
fetch('data/travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    recommendationsData = data;
  })
  .catch(error => console.error('Error fetching data:', error));

// Handle search functionality
document.getElementById('search-btn').addEventListener('click', () => {
  const keyword = document.getElementById('search-bar').value.toLowerCase();
  const resultsContainer = document.getElementById('recommendations');
  resultsContainer.innerHTML = ''; // Clear previous results

  let results = [];

  // Search for beaches
  if (keyword.includes('beach')) {
    results = recommendationsData.beaches;
  }
  // Search for temples
  else if (keyword.includes('temple')) {
    results = recommendationsData.temples;
  }
  // Search for countries
  else if (keyword.includes('country')) {
    results = recommendationsData.countries.map(country => ({
      name: country.name,
      imageUrl: country.cities[0].imageUrl,
      description: `Explore cities like ${country.cities.map(city => city.name).join(', ')}.`,
    }));
  }

  // Display results
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
    resultsContainer.innerHTML = '<p>No results found for your search.</p>';
  }
});

// Handle clear button functionality
document.getElementById('clear-btn').addEventListener('click', () => {
  document.getElementById('search-bar').value = ''; // Clear search bar
  document.getElementById('recommendations').innerHTML = ''; // Clear results
});


function scrollToRecommendations() {
  const recommendationsSection = document.getElementById('recommendations');
  recommendationsSection.scrollIntoView({
    behavior: 'smooth',  // Smooth scrolling
    block: 'start'       // Scroll to the top of the section
  });
}
