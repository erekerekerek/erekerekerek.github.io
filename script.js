document.getElementById("file-input").addEventListener("change", function (event) {
    const files = event.target.files;
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const closeModal = document.getElementById("close-modal");
    const gallery = document.getElementById("gallery");

    // Clear the gallery items before appending new ones
    const galleryItems = []; // Array to hold gallery items

    // Loop through each file
    for (let file of files) {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        if (file.type.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                // Set gallery-item dimensions to match image aspect ratio
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                galleryItem.style.width = `${200 * aspectRatio}px`; // Set a base width (200px) and adjust height
                galleryItem.style.height = `${200}px`; // Set a fixed height
            };

            // Open modal to view image
            img.onclick = () => {
                modal.style.display = "flex";
                modalImage.src = img.src; // Set the source for the modal image
            };

            galleryItem.appendChild(img);
        } else if (file.type.startsWith("audio/")) {
            const audio = document.createElement("audio");
            audio.src = URL.createObjectURL(file);
            audio.controls = true;

            // Set a default width and height for audio
            galleryItem.style.width = "200px"; // Fixed width for audio
            galleryItem.style.height = "60px"; // Fixed height for audio
            galleryItem.appendChild(audio);

            // Open modal to view audio
            audio.onclick = (e) => {
                e.stopPropagation(); // Prevent the click event from bubbling to the gallery item
                document.getElementById("enlargeModal").style.display = "flex";
                document.getElementById("enlarge-audio").src = audio.src; // Set audio source in modal
                document.getElementById("enlarge-audio").style.display = "block"; // Show the audio player
                document.getElementById("enlarged-text").innerText = file.name; // Show the audio file name
            };
        }

        galleryItems.push(galleryItem); // Add item to the array
    }

    // Close modal when clicking outside of modal content
    closeModal.onclick = () => {
        modal.style.display = "none";
    };

    modal.onclick = () => {
        modal.style.display = "none"; // Close modal
    };

    // Append items to the gallery after previewing
    galleryItems.forEach(item => {
        gallery.appendChild(item);
    });
});

// Functionality for posting tweets
document.getElementById("tweet-btn").addEventListener("click", function () {
    const tweetInput = document.getElementById("tweet-input");
    const tweetText = tweetInput.value.trim();

    if (tweetText) {
        const gallery = document.getElementById("gallery");
        const tweetItem = document.createElement("div");
        tweetItem.classList.add("gallery-item");
        tweetItem.style.width = "300px"; // Fixed width for tweets
        tweetItem.style.height = "auto"; // Height can be auto based on text

        const tweetContent = document.createElement("p");
        tweetContent.textContent = tweetText;
        tweetContent.style.margin = "10px"; // Margin for the text

        tweetItem.appendChild(tweetContent);
        gallery.appendChild(tweetItem); // Add tweet item to the gallery
        tweetInput.value = ""; // Clear the input field
    }
});
