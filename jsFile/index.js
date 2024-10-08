

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
        btn.classList.add('bg-white'); 
        btn.style.backgroundColor = ''; 
    });
    button.classList.add('border-2', 'border-[#0E7A81]');
    button.classList.remove('bg-white'); 
    button.style.backgroundColor = '#0E7A811A'; 
    const loadingElement = document.getElementById("loading");
    const petsContainer = document.getElementById("pets-card");
    const categoriesContainer = document.getElementById("Catagories");
    petsContainer.classList.add("hidden"); 
    loadingElement.classList.remove("hidden"); 


    setTimeout(() => {
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
            .then((res) => res.json())
            .then((data) => {
                displaypets(data.data);
                loadingElement.classList.add("hidden"); 
                petsContainer.classList.remove("hidden"); 
               
            })
            .catch((error) => {
                console.log(error);
                loadingElement.classList.add("hidden"); 
                petsContainer.classList.remove("hidden"); 
            });
    }, 2000); 
};


const displayCatagories = (items) => {
    const catagorieselement = document.getElementById("Catagories");
    catagorieselement.innerHTML = ""; // Clear previous categories

    items.forEach((item) => {
        const buttonContainer = document.createElement("div");

        buttonContainer.innerHTML = `
            <button class="category-btn h-[50px] p-1 bg-white rounded-md flex items-center space-x-2 border border-slate-400 rounded-full" onclick="loadcard('${item.category}', this)">
                <img src="${item.category_icon}" alt="" class="h-full object-cover">
                <h1 class="text-2xl font-bold hidden lg:block">${item.category}</h1>
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
            const imageSrc = event.target.closest('button').dataset.imageSrc; 
            const imageContainer = document.getElementById('image');
        
            const imgElement = document.createElement('img');
            imgElement.src = imageSrc;
            imgElement.alt = 'Liked Pet Image';
            imgElement.classList.add('w-full', 'h-auto', 'rounded-xl'); 

            
            imageContainer.appendChild(imgElement);
        });
    });
};


// here


// Call this function after rendering the pet cards



// Call this function after rendering the pet cards




const sortByPrice = (pets) => {
    // Sort pets array by price in descending order
    const sortedPets = pets.sort((a, b) => {
        const priceA = a.price ? parseFloat(a.price) : 0;
        const priceB = b.price ? parseFloat(b.price) : 0;
        return priceB - priceA; // Descending order
    });

   
    displaypets(sortedPets);
};
document.getElementById('asending').addEventListener('click', () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => sortByPrice(data.pets))  
        .catch((error) => console.log(error));
});

const displaypets = (pets) => {
    const petsContainer = document.getElementById('pets-card');
    petsContainer.innerHTML = "";  
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
<button class="btn btn-sm text-lg text-[#0E7A81] view-details-btn" onclick="handleViewButtonClick(${pet.petId})">Details</button>
                </div>
            </div>
        `;
        petsContainer.append(card);
    });
    handleLikeButtonClick();
    handleAdoptButtonClick();
    handleViewButtonClick();
};
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('pet-details-modal').classList.add('hidden');
});
const handleAdoptButtonClick = () => {
    const adoptButtons = document.querySelectorAll('.adopt-btn');
    const countdownContainer = document.getElementById('countdown-container');

    adoptButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const petsContainer = document.getElementById('pets-card');
            petsContainer.classList.add('hidden'); 
            const countdownCard = document.createElement('div');
            countdownCard.className = 'bg-white p-8 rounded-md shadow-lg mb-4 w-[300px] h-[300px] flex flex-col justify-center items-center';
            countdownCard.innerHTML = `
                <img src="https://img.icons8.com/?size=48&id=80676&format=png" alt="">
                <h1 class="text-5xl font-bold">Congrats</h1>
                <p>Adoption process will start for your pet</p>
                <span class="countdown text-6xl">3</span>
            `;
            countdownContainer.innerHTML = ''; 
            countdownContainer.appendChild(countdownCard); 
            let countdownValue = 3; 
            const interval = setInterval(() => {
                countdownValue--; 
                countdownCard.querySelector('.countdown').innerText = countdownValue; 
                if (countdownValue < 0) {
                    clearInterval(interval);
                    countdownCard.innerHTML = '<span class="font-mono text-6xl">Adopted</span>';  
                    button.innerText = 'Adopted';
                    button.disabled = true;
                    setTimeout(() => {
                        countdownContainer.innerHTML = ''; 
                        petsContainer.classList.remove('hidden'); 
                    }, 1000); 
                }
            }, 1000);  
        });
    });
};
const handleViewButtonClick = async(petdetails)=>{
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petdetails}`
    const res =await fetch(url)
    const data= await res.json()
    displaydetails(data.petData)
} 
const displaydetails = (data) => {
    // Populate modal content with pet data
    document.getElementById('petName').innerText = data.pet_name;
    document.getElementById('petImage').src = data.image;
    document.getElementById('petImage').alt = data.pet_name;
    document.getElementById('petDetails').innerText = data.pet_details;
    document.getElementById('petBreed').innerText = data.breed;
    document.getElementById('petCategory').innerText = data.category;
    document.getElementById('petDOB').innerText = data.date_of_birth;
    document.getElementById('petPrice').innerText = data.price;
    document.getElementById('petGender').innerText = data.gender;
    document.getElementById('petVaccinationStatus').innerText = data.vaccinated_status;

    // Show the modal
    const modal = document.getElementById('my_modal_5');
    modal.showModal(); // Use showModal() to open the modal
};

// Function to close the modal
const closeModal = () => {
    const modal = document.getElementById('my_modal_5');
    modal.close(); // Close the modal
};

loadCatagories();
petCatagories();
