document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.getElementById('card-container');
  
    // Fetch data from Restcountries API
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        data.forEach(country => {
          // Create Bootstrap card
          const card = document.createElement('div');
          card.classList.add('card', 'mb-3');
          
          // Create card header
          const cardHeader = document.createElement('div');
          cardHeader.classList.add('card-header');
          cardHeader.textContent = country.name.common;
          
          // Create card body
          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');
  
          // Create card content
          const capital = document.createElement('p');
          capital.textContent = `Capital: ${country.capital}`;
  
          const latlng = document.createElement('p');
          latlng.textContent = `Latlng: ${country.latlng}`;
  
          const region = document.createElement('p');
          region.textContent = `Region: ${country.region}`;
  
          const flag = document.createElement('img');
          flag.src = country.flags.svg;
          flag.style.width = '100px';
  
          const button = document.createElement('button');
          button.classList.add('btn', 'btn-primary');
          button.textContent = 'Click for Weather';
  
          // Append content to card body
          cardBody.appendChild(capital);
          cardBody.appendChild(latlng);
          cardBody.appendChild(region);
          cardBody.appendChild(flag);
          cardBody.appendChild(button);
  
          // Append header and body to card
          card.appendChild(cardHeader);
          card.appendChild(cardBody);
  
          // Append card to container
          cardContainer.appendChild(card);
  
          // Add event listener to button
          button.addEventListener('click', function() {
            // Fetch weather data from OpenWeatherMap API
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=YOUR_API_KEY`)
              .then(response => response.json())
              .then(weatherData => {
                // Display weather information
                alert(`Weather in ${country.capital}: ${weatherData.weather[0].description}`);
              })
              .catch(error => console.error('Error fetching weather data:', error));
          });
        });
      })
      .catch(error => console.error('Error fetching country data:', error));
  });
  