document.getElementById('scroll-to-main').addEventListener('click', function() {
    document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
});
const loadCatagories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCatagories(data.categories))
        .catch((error) => console.log(error));
};

const loadcard = (category, button) => {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach((btn) => {
        btn.classList.remove('border-2', 'border-[#0E7A81]'); // Reset the border
        btn.classList.add('bg-white'); // Reset to default background color
        btn.style.backgroundColor = ''; // Remove inline background color
    });

    button.classList.add('border-2', 'border-[#0E7A81]');
    button.classList.remove('bg-white'); // Remove the default background
    button.style.backgroundColor = '#0E7A811A'; // Set the semi-transparent background

    // Show loading indicator
    const loadingElement = document.getElementById("loading");
    const petsContainer = document.getElementById("pets-card");
    const categoriesContainer = document.getElementById("Catagories");

    // Keep categories visible and hide only pets container
    petsContainer.classList.add("hidden"); // Hide pets container
    loadingElement.classList.remove("hidden"); // Show loading

    // Delay the fetching of data
    setTimeout(() => {
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
            .then((res) => res.json())
            .then((data) => {
                displaypets(data.data);
                loadingElement.classList.add("hidden"); // Hide loading after data is fetched
                petsContainer.classList.remove("hidden"); // Show the pets container again
                // categoriesContainer remains visible
            })
            .catch((error) => {
                console.log(error);
                loadingElement.classList.add("hidden"); // Hide loading on error
                petsContainer.classList.remove("hidden"); // Show the pets container again
                // categoriesContainer remains visible
            });
    }, 2000); // Delay for 2 seconds
};


const displayCatagories = (items) => {
    const catagorieselement = document.getElementById("Catagories");
    catagorieselement.innerHTML = ""; // Clear previous categories

    items.forEach((item) => {
        const buttonContainer = document.createElement("div");

        buttonContainer.innerHTML = `
            <button class="category-btn h-[50px] p-1 bg-white rounded-md flex items-center space-x-2" onclick="loadcard('${item.category}', this)">
                <img src="${item.category_icon}" alt="" class="h-full object-cover">
                <h1 class="text-2xl font-bold">${item.category}</h1>
            </button>
        `;

        catagorieselement.append(buttonContainer);
    });
};


const petCatagories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => displaypets(data.pets))
        .catch((error) => console.log(error));
};

const handleLikeButtonClick = () => {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const imageSrc = event.target.closest('button').dataset.imageSrc; // Get the image source from data attribute
            
            // Find the div where you want to display the image (e.g. #image)
            const imageContainer = document.getElementById('image');
            
            // Clear the div before adding a new image (optional, if you only want one image)
            // imageContainer.innerHTML = ''; 

            // Create a new image element
            const imgElement = document.createElement('img');
            imgElement.src = imageSrc;
            imgElement.alt = 'Liked Pet Image';
            imgElement.classList.add('w-full', 'h-auto', 'rounded-xl'); // You can add Tailwind classes for styling

            // Append the image to the container
            imageContainer.appendChild(imgElement);
        });
    });
};

// Call this function after pets are displayed in displaypets()
// Event listener for sorting by price
const sortByPrice = (pets) => {
    // Sort pets array by price in descending order
    const sortedPets = pets.sort((a, b) => {
        const priceA = a.price ? parseFloat(a.price) : 0;
        const priceB = b.price ? parseFloat(b.price) : 0;
        return priceB - priceA; // Descending order
    });

    // Display the sorted pets
    displaypets(sortedPets);
};

// Event listener for the sort button
document.getElementById('asending').addEventListener('click', () => {
    // Fetch pets data again or sort already fetched pets (you can optimize this)
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => sortByPrice(data.pets))  // Sort by price after fetching the data
        .catch((error) => console.log(error));
});

// Function to display pets
// Function to display pets
// Function to display pets
// Function to display pets
// Function to display pets
// Function to display pets
// Function to display pets
// Function to display pets
// Function to display pets
const fetchPetDetailsById = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then((res) => res.json())
        .then((data) => {
            const pet = data.pet;
            document.getElementById('modal-pet-name').textContent = pet.pet_name;
            document.getElementById('modal-pet-image').src = pet.image;
            document.getElementById('modal-pet-description').textContent = pet.description || 'No description available.';

            // Show the modal
            document.getElementById('pet-details-modal').classList.remove('hidden');
        })
        .catch((error) => console.error('Error fetching pet details:', error));
};
  

const displaypets = (pets) => {
    const petsContainer = document.getElementById('pets-card');
    petsContainer.innerHTML = "";  // Clear previous content

    if (pets.length === 0) {
        petsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center h-screen text-center">
                <img src="./images/error.webp" alt="No Data Available" class="h-48 w-auto mb-4">
                <h1 class="text-3xl font-bold mt-4">No Information Available</h1>
                <p class="text-xs text-gray-500 mt-2">No pets found in this category.</p>
            </div>
        `;
        return;
    }

    pets.forEach((pet) => {
        const card = document.createElement("div");
        card.classList = "card card-compact px-4";
        card.innerHTML = `
            <figure>
                <img src="${pet.image}" alt="${pet.pet_name}" class="w-full h-auto" />
            </figure>
            <div class="py-2">
                <h2 class="card-title">${pet.pet_name}</h2>
                <div class="h-[30px] flex gap-2 items-center py-1">
                    <img src="https://img.icons8.com/?size=50&id=13867&format=png" alt="" class="h-full opacity-50">
                    <h5 class="text-base text-gray-400">Breed: ${pet.breed ? pet.breed : 'Not Available'}</h5>
                </div>
                <div class="h-[30px] flex gap-2 items-center py-1"> 
                    <img src="https://img.icons8.com/?size=24&id=IcbuaYQe9YGC&format=png" alt="" class="h-full opacity-50">
                    <h5 class="text-base text-gray-400">Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not Available'}</h5>
                </div>
                <div class="h-[30px] flex gap-2 items-center py-1">
                    <img src="https://img.icons8.com/?size=26&id=6564&format=png" alt="" class="h-full opacity-50">
                    <h5 class="text-base text-gray-400">Gender: ${pet.gender ? pet.gender : 'Not Available'}</h5>
                </div>
                <div class="h-[30px] flex gap-2 items-center py-1">
                    <img src="https://img.icons8.com/?size=24&id=85782&format=png" alt="" class="h-full opacity-50">
                    <h5 class="text-base text-gray-400">Price: ${pet.price ? pet.price : 'Not Available'}</h5>
                </div>
                <div class="flex justify-between items-center">
                    <button class="btn btn-sm text-lg like-btn" data-image-src="${pet.image}">
                        <i class="fa-regular fa-thumbs-up fa-beat"></i>
                    </button>
                    <button class="btn btn-sm text-lg text-[#0E7A81] adopt-btn">Adopt</button>
                    <button class="btn btn-sm text-lg text-[#0E7A81] view-details-btn" data-id="${pet.id}">View Details</button>
                </div>
            </div>
        `;

        petsContainer.append(card);
    });

    // Attach like button functionality
    handleLikeButtonClick();

    // Attach adopt button functionality
    handleAdoptButtonClick();

    // Attach view details button functionality
    handleViewDetailsButtonClick();
};

// Function to fetch and display pet details in a modal


// Attach event listener to view details buttons
const handleViewDetailsButtonClick = () => {
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const petId = event.target.getAttribute('data-id');
            fetchPetDetailsById(petId);
        });
    });
};

// Close modal on close button click
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('pet-details-modal').classList.add('hidden');
});

// Call this function after pets are displayed in the displaypets function
handleViewDetailsButtonClick();

// Function to handle Adopt button click
const handleAdoptButtonClick = () => {
    const adoptButtons = document.querySelectorAll('.adopt-btn');
    const countdownContainer = document.getElementById('countdown-container');

    adoptButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const petsContainer = document.getElementById('pets-card');
            petsContainer.classList.add('hidden'); // Hide pets container

            // Create a countdown card
            const countdownCard = document.createElement('div');
            countdownCard.className = 'bg-white p-8 rounded-md shadow-lg mb-4 w-[300px] h-[300px] flex flex-col justify-center items-center'; // Set width and height for square shape
            countdownCard.innerHTML = `
                <img src="https://img.icons8.com/?size=48&id=80676&format=png" alt="">
                <h1 class="text-5xl font-bold">Congrats</h1>
                <p>Adoption process will start for your pet</p>
                <span class="countdown text-6xl">3</span>
            `;
            countdownContainer.innerHTML = ''; // Clear previous countdown card
            countdownContainer.appendChild(countdownCard); // Append countdown card to the countdown container

            // Set initial countdown value
            let countdownValue = 3; 
            
            // Start the countdown
            const interval = setInterval(() => {
                countdownValue--; // Decrease the countdown value
                countdownCard.querySelector('.countdown').innerText = countdownValue; // Update countdown display
                
                // Stop the countdown when it reaches 0
                if (countdownValue < 0) {
                    clearInterval(interval);
                    countdownCard.innerHTML = '<span class="font-mono text-6xl">Adopted</span>';  // Update text after countdown
                    
                    // Change the text of the adopt button to "Adopted"
                    button.innerText = 'Adopted';
                    button.disabled = true; // Optionally disable the button

                    // Show the pets container again after 1 second
                    setTimeout(() => {
                        countdownContainer.innerHTML = ''; // Clear the countdown card
                        petsContainer.classList.remove('hidden'); // Show pets container again
                    }, 1000); // Adjust the timeout as needed
                }
            }, 1000);  // Update every second
        });
    });
};

// Load categories and pets on page load




    // Attach like button functionality
    


// Load categories and pets on page load
loadCatagories();
petCatagories();
