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

  function handleAddToCart(event) {
    const eventCard = event.currentTarget.parentElement;
    const eventName = eventCard.querySelector('h1').textContent;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.addEventListener('click', () => handleRemoveFromCart(listItem));
  
    
    // Create list item for the event
    const listItem = document.createElement('li');
    listItem.textContent = eventName;
  
    // Append the list item to the cart list
    const cartList = document.getElementById('cart-list');
    cartList.appendChild(listItem);
    // Implement logic to add the event to cart (simulation or actual implementation)
    console.log('Event added to cart (simulation)'); // Placeholder message
    // You can replace this with actual logic to add the event data to a cart list, send data to server, etc.
    listItem.appendChild(deleteButton);
  }

  // Search functionality
function handleSearch() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const eventCards = document.querySelectorAll('.event-card');

  let eventFound = false;

  // Loop through all event cards to find the one matching the search query
  eventCards.forEach((eventCard) => {
    const eventName = eventCard.querySelector('h1').textContent.toLowerCase();

    if (eventName.includes(searchInput)) {
      eventCard.scrollIntoView({ behavior: 'smooth' }); // Scroll to the event card
      eventFound = true;
    }
  });

  // Display message if event not found
  if (!eventFound) {
    alert('Event not found');
  }
}

function handleRemoveFromCart(item) {
  // Remove the list item from the cart list
  const cartList = document.getElementById('cart-list');
  cartList.removeChild(item);
}