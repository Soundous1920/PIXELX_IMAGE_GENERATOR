const inp = document.getElementById('inp');
const images = document.querySelector('.images');
const api = "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";
let loadedImages = [];

document.getElementById('generateBtn').addEventListener('click', async function() {
    // Show loader when button is clicked
    document.getElementById('loader').style.display = 'block';
    await getImage();
});

async function getImage() {
    // Make a request to OpenAI
    const methods = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api}`
        },
        body: JSON.stringify({
            prompt: inp.value,
            n: 3,
            size: '1024x1024',
            quality: 'hd',
        
        })
    };
    
    try {
        const res = await fetch("https://api.openai.com/v1/images/generations", methods);
        const data = await res.json();
        const listImages = data.data;
        loadedImages = listImages; // Store the loaded images

        renderImages(listImages);

        // Hide loader when images are loaded
        document.getElementById('loader').style.display = 'none';
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function renderImages(listImages) {
    images.innerHTML = '';

    listImages.forEach((photo, index) => {
        // Create a container for the image and download link
        const container = document.createElement("div");
        images.appendChild(container);

        // Create an image element
        const img = document.createElement("img");
        img.src = photo.url;
        img.classList.add('image-thumbnail');
        container.appendChild(img);

        // Create a download link for the image
        const downloadLink = document.createElement("a");
        downloadLink.href = photo.url;
        

        downloadLink.download = `generated_image_${index + 1}.jpg`; // Set the filename for download
        downloadLink.textContent = 'Download Image';
        downloadLink.style.fontSize="16px";
        downloadLink.style.color="white";
        downloadLink.style.fontWeight="600";
        downloadLink.style.paddingTop="20px";
        downloadLink.style.fontFamily="'Silkscreen', sans-serif";

        downloadLink.classList.add('download-link');
        container.appendChild(downloadLink);

        // Event listener to show full-size image on click
        img.addEventListener('click', function() {
            showFullSizeImage(photo.url);
        });

        // Event listener to prevent default behavior of download link
        downloadLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default behavior
            downloadImage(photo.url, `generated_image_${index + 1}.jpg`); // Download the image
        });
    });
}

function downloadImage(imageUrl, filename) {
    // Create a temporary anchor element
    const anchor = document.createElement('a');
    anchor.href = imageUrl;
    anchor.download = filename;

    // Click the anchor to initiate download
    anchor.click();
}
