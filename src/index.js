// write your code here
document.addEventListener("DOMContentLoaded", () => {
    const ramenMenu = document.getElementById("ramen-menu");
    const ramenDetail = document.getElementById("ramen-detail");
    const newRamenForm = document.getElementById("new-ramen");
  
    // Fetch and display all ramen images
    fetch("http://localhost:3000/ramens")
      .then((response) => response.json())
      .then((ramens) => {
        ramens.forEach((ramen) => {
          displayRamenImage(ramen);
        });
      });
  
    // Event listener for clicking on a ramen image
    ramenMenu.addEventListener("click", (event) => {
      if (event.target.tagName === "IMG") {
        const ramenId = event.target.dataset.id;
        fetchRamenDetails(ramenId);
      }
    });
  
    // Event listener for submitting the new ramen form
    newRamenForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("new-name").value;
      const restaurant = document.getElementById("new-restaurant").value;
      const image = document.getElementById("new-image").value;
      const rating = document.getElementById("new-rating").value;
      const comment = document.getElementById("new-comment").value;
  
      // Create a new ramen and add it to the menu
      createNewRamen(name, restaurant, image, rating, comment);
    });
  
    // Function to display a ramen image
    function displayRamenImage(ramen) {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.alt = ramen.name;
      img.dataset.id = ramen.id;
      ramenMenu.appendChild(img);
    }
  
    // Function to fetch and display ramen details
    function fetchRamenDetails(ramenId) {
      fetch(`http://localhost:3000/ramens/${ramenId}`)
        .then((response) => response.json())
        .then((ramen) => {
          ramenDetail.innerHTML = `
            <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
            <h2 class="name">${ramen.name}</h2>
            <h3 class="restaurant">${ramen.restaurant}</h3>
          `;
  
          document.getElementById("rating-display").textContent = ramen.rating;
          document.getElementById("comment-display").textContent = ramen.comment;
        });
    }
  
    // Function to create a new ramen
    function createNewRamen(name, restaurant, image, rating, comment) {
      const newRamen = {
        name: name,
        restaurant: restaurant,
        image: image,
        rating: rating,
        comment: comment,
      };
  
      // Add the new ramen to the menu
      displayRamenImage(newRamen);
  
      // Clear the form inputs
      document.getElementById("new-name").value = "";
      document.getElementById("new-restaurant").value = "";
      document.getElementById("new-image").value = "";
      document.getElementById("new-rating").value = "";
      document.getElementById("new-comment").value = "";
    }
  });
  