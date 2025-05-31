/********************************************************************************************************************
 ***** VAPORSCAPE GALLERY
 *****
 ***** This script dynamically generates a gallery of vaporwave-style images using the Unsplash API.
 *
 *
 * @author:  Duygu Dağdelen
 * @date:    2024-07-14
 *
 */

// Function to generate a random integer up to a maximum value
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

// Function to calculate a random position for the images within the window
const getImgPosValue = (imgSize, winSize, offset = 0) => {
    const windowSize = winSize;
    const totalWidth = windowSize - imgSize - offset;
    const randomPosVal = getRandomInt(totalWidth) + offset;

    return `${randomPosVal}px`;
};

// Function to set the position of each image
const setImgPosition = (elImg) => {
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    const imgWidth = Math.round(elImg.getBoundingClientRect().width);
    const imgHeight = Math.round(elImg.getBoundingClientRect().height);

    const headerHeight = document.querySelector('header').offsetHeight;

    elImg.style.left = getImgPosValue(imgWidth, windowW);
    elImg.style.top = getImgPosValue(imgHeight, windowH, headerHeight);
};

// Function to position all images in the gallery randomly
const createImgArray = () => {
    const vaporscapeImg = document.querySelectorAll(".vaporscape");

    vaporscapeImg.forEach((el) => {
        setImgPosition(el);
    });
};

// Set to keep track of used fallback images to avoid repeats
let usedFallbacks = new Set();

// Function to get a random fallback image path, ensuring no repeats
const getRandomFallbackImage = () => {
    if (usedFallbacks.size >= 90) {
        usedFallbacks.clear();
    }
    let fallbackNumber;
    do {
        fallbackNumber = getRandomInt(90) + 1;
    } while (usedFallbacks.has(fallbackNumber));
    usedFallbacks.add(fallbackNumber);
    return `local/${String(fallbackNumber).padStart(2, '0')}.png`;
};

// Function to fetch images from Unsplash or use fallback images if fetching fails
const fetchImages = async () => {
    const gallery = document.getElementById('js-gallery');
    gallery.innerHTML = ''; // Clear previous images

    for (let i = 0; i < 5; i++) {
        const imgElement = document.createElement('figure');
        imgElement.classList.add('vaporscape');
        imgElement.id = `js-item-${i + 1}`;
        
        const img = document.createElement('img');
        img.classList.add('vaporscape-img');
        const randomNum = Math.floor(Math.random() * 1000); // Generate a random number
        const timestamp = Date.now(); // Get the current timestamp
        const imgUrl = `https://source.unsplash.com/random/800x600/?vaporwave&t=${timestamp}${randomNum}`;
        img.alt = `Vaporscape ${i + 1}`;
        img.loading = 'lazy';

        // Add error handling for image loading
        const loader = document.createElement('div');
        loader.classList.add('loader');
        imgElement.appendChild(loader);

        const tempImg = new Image();
        tempImg.src = imgUrl;
        tempImg.onload = () => {
            img.src = imgUrl;
            loader.remove(); // Remove the loader once the image is loaded
            imgElement.appendChild(img);
        };
        tempImg.onerror = () => {
            img.src = getRandomFallbackImage();
            loader.remove(); // Remove the loader and show fallback image
            imgElement.appendChild(img);
        };

        gallery.appendChild(imgElement);
    }

    const signalDiv = document.createElement('div');
    signalDiv.classList.add('click-tap', 'vaporscape');
    signalDiv.id = 'js-item-signal';
    signalDiv.innerText = 'CLICK / TAP';
    gallery.appendChild(signalDiv);

    createImgArray();
};

let imgArray = [];
let signalDiv;

// Function to initialize the gallery by setting up the image array and signal div
const initializeGallery = () => {
    imgArray = Array.from(document.querySelectorAll('.vaporscape'));
    signalDiv = imgArray.pop(); // Remove signalDiv from array and store it
};

// Function to toggle the visibility of images and handle gallery reloading
const toggleImgVisibility = () => {
    if (imgArray.length === 0) {
        signalDiv.classList.remove('is-hidden');
        fetchImages();
        initializeGallery();
        return;
    }
    
    const currentImg = imgArray.pop();
    currentImg.classList.add('is-hidden');

    // Remove the signalDiv when the first image is hidden
    if (imgArray.length === 4) {
        signalDiv.classList.add('is-hidden');
    }

    // Show the signalDiv when all images are hidden
    if (imgArray.length === 0) {
        signalDiv.classList.remove('is-hidden');
    }
};

// Set up the event listener for the gallery clicks
const gallery = document.querySelector("#js-gallery");
gallery.addEventListener("click", toggleImgVisibility);

// Fetch the initial set of images and initialize the gallery
fetchImages();
initializeGallery();