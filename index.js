const renderEvents = (data) => {
    // Get the container element for event cards
    const eventContainer = document.getElementById('wrapper');
  
    // Loop through the data and create event card elements
    data.forEach((event) => {
      const eventCard = document.createElement('div');
      eventCard.classList.add('event-card');
  
      // Event heading
      const eventHeading = document.createElement('h1');
      eventHeading.textContent = event.name;
      eventCard.appendChild(eventHeading);
  
      // Event image (check if image URL exists)
      if (event.image) {
        const eventImage = document.createElement('img');
        eventImage.src = event.image; 
        eventImage.classList.add('event-image');
        eventImage.addEventListener('click', handleImageClick);
        eventCard.appendChild(eventImage);
      }
  
      // Event details (date, time, etc.)
      const eventDetails = document.createElement('p');
      eventDetails.classList.add('event-details');
      eventDetails.textContent = 
      `${event.date} 
       ${event.time} 
       ${event.capacity} 
       ${event.tickets_sold} `; // Adjust content as needed
      eventCard.appendChild(eventDetails);
  
      // Event description (optional)
      if (event.description) {
        const eventDescription = document.createElement('p');
        eventDescription.classList.add('event-description');
        eventDescription.textContent = event.description;
        eventCard.appendChild(eventDescription);
      }
  
      // Add the event card to the container
      eventContainer.appendChild(eventCard);
    });
  };
  const searchBar = document.getElementById('search-bar');
  const searchButton = document.getElementById('search-button');


  let cart = []; // Array to store cart items (objects)



  // Fetch data from db.json (replace with your actual file path)
  fetchData('http://localhost:3000/events')
    .then(data => renderEvents(data))
    .catch(error => console.error('Error fetching data:', error));
  
  // Function to fetch data from an external JSON file
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  function handleImageClick(event) {
    // Get the clicked event card element (parent of the clicked image)
    const clickedCard = event.currentTarget.parentElement;
  
    // Create button (or other element) for "Add to Cart"
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.addEventListener('click', handleAddToCart); // Add listener for "Add to Cart"
  
    // Append button to the card (or a container within the card)
    clickedCard.appendChild(addToCartButton);
  } 

  
  
  function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    cart.forEach((event) => {
      const cartItem = document.createElement('li');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
      <p>${event.date} - ${event.time}</p>
      <button data-id="${event.id}" class="remove-button">Remove</button>`
      cartContainer.appendChild(cartItem);
    }
  )}

  updateCart()



  function handleAddToCart(event) {
    // Simulate adding the event to cart (replace with actual logic)
    console.log('Event added to cart (simulation)');
    
    // Redirect to Cart section using window.location.href
    window.location.href = "#Cart"; // Adjust URL if needed
  }