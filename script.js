//your code here
document.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.querySelector(".flex");
  
    // State variables
    let images = ["img1", "img2", "img3", "img4", "img5"];
    let shuffledImages = [];
    let selectedImages = [];
    let resetButton, verifyButton, resultMessage;
  
    // Function to shuffle and generate images, ensuring one duplicate
    function initializeImages() {
      const duplicateImage = images[Math.floor(Math.random() * images.length)];
      shuffledImages = [...images, duplicateImage];
      shuffledImages.sort(() => Math.random() - 0.5);
  
      // Assign classes to images dynamically
      mainContainer.innerHTML = "";
      shuffledImages.forEach((imgClass, index) => {
        const div = document.createElement("div");
        div.className = `${imgClass} img`;
        div.dataset.index = index; // To track image clicks
        mainContainer.appendChild(div);
      });
    }
  
    // Function to reset the state
    function resetState() {
      selectedImages = [];
      if (resetButton) resetButton.remove();
      if (verifyButton) verifyButton.remove();
      if (resultMessage) resultMessage.remove();
  
      resetButton = null;
      verifyButton = null;
      resultMessage = null;

      initializeImages();
    }
  
    // Function to handle image clicks
    function handleImageClick(e) {
      const clickedImage = e.target;
      const clickedIndex = clickedImage.dataset.index;
  
      // Avoid selecting the same image twice
      if (selectedImages.some((item) => item.index === clickedIndex)) return;
  
      // Add the image to the selected list
      clickedImage.classList.add("selected");
      selectedImages.push({
        className: clickedImage.className,
        index: clickedIndex,
      });
  
      // Render Reset button when an image is clicked
      if (!resetButton) {
        resetButton = document.createElement("button");
        resetButton.id = "reset";
        resetButton.textContent = "Reset";
        resetButton.addEventListener("click", resetState);
        document.body.appendChild(resetButton);
      }
  
      // Handle state transitions
      if (selectedImages.length === 2) {
        if (!verifyButton) {
          verifyButton = document.createElement("button");
          verifyButton.id = "verify";
          verifyButton.textContent = "Verify";
          verifyButton.addEventListener("click", verifySelection);
          document.body.appendChild(verifyButton);
        }
      }
    }
  
    // Function to verify the selected images
    function verifySelection() {
      if (verifyButton) verifyButton.remove();
  
      resultMessage = document.createElement("p");
      resultMessage.id = "para";
  
      if (selectedImages[0].className === selectedImages[1].className) {
        resultMessage.textContent = "You are a human. Congratulations!";
      } else {
        resultMessage.textContent =
          "We can't verify you as a human. You selected the non-identical tiles.";
      }
  
      document.body.appendChild(resultMessage);
  
      // Clear the selectedImages but allow the Reset button to reappear on click
      selectedImages = [];
    }
  
    // Event delegation for image clicks
    mainContainer.addEventListener("click", (e) => {
      // Ensure only images are clicked
      if (e.target.classList.contains("img")) {
        handleImageClick(e);
  
        // Recreate Reset button if it was removed after verification
        if (!resetButton && selectedImages.length === 1) {
          resetButton = document.createElement("button");
          resetButton.id = "reset";
          resetButton.textContent = "Reset";
          resetButton.addEventListener("click", resetState);
          document.body.appendChild(resetButton);
        }
      }
    });
  
    // Initialize the game
    resetState();
  });
  