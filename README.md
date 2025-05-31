# Vaporscape Gallery
This interactive web application generates and displays vaporwave-style images using the Unsplash API. The images are generated dynamically by making requests to the Unsplash API, fetching random images tagged with 'vaporwave'.

Vaporscape Gallery provides a dynamic and engaging experience by continually refreshing its visual content upon user interaction. Users can click or tap anywhere on the screen to interact and reveal new random vaporwave images.

## Set Up
The core logic for fetching images, handling errors, positioning images, and managing interactions is contained in `app.js`.

1. Generates a random integer between 0 and the specified maximum value.
2. Calculates a random position value for an image within the window.
3. Sets the random position for each image element.
4. Dynamically fetches random vaporwave images from Unsplash, handles image load errors by switching to local fallback images, and adds them to the gallery.
6. Toggles the visibility of images and handles the display of the "CLICK / TAP" signal to guide user interaction.


> ### Customization options
> - Modify the `fetchImages` function in `app.js` to change the Unsplash query parameters or to adjust the number of images fetched.
> - Add or replace images in the `local/` directory to customize the fallback images used when the Unsplash API fails.


*This application was developed by Duygu Dağdelen and last updated on July 14, 2024.*
