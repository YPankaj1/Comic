document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const panelInput = document.getElementById('panel-input');
    const comicDisplay = document.getElementById('comic-display');
    const errorMessage = document.getElementById('error-message');

    generateBtn.addEventListener('click', async () => {
        const text = panelInput.value.trim();

        if (text === '') {
            errorMessage.textContent = 'Please enter text for each panel.';
            return;
        }

        // Clear previous error messages
        errorMessage.textContent = '';

        // Show loading indicator
        const loadingMessage = document.createElement('p');
        loadingMessage.textContent = 'Generating comic...';
        comicDisplay.innerHTML = '';
        comicDisplay.appendChild(loadingMessage);

        try {
            // Call the text-to-image API
            const imageBlob = await queryAPI({ "inputs": text });

            // Display images in their respective panels
            await displayImageFromBlob(imageBlob, comicDisplay);
        } catch (error) {
            // Handle API call error
            errorMessage.textContent = 'Failed to generate comic. Please try again.';
        }
    });

    async function queryAPI(data) {
        const response = await fetch(
            "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
            {
                headers: {
                    "Accept": "image/png",
                    "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        return response.blob();
    }

    async function displayImageFromBlob(blob, displayContainer) {
        // Remove loading indicator
        displayContainer.innerHTML = '';

        // Create image element
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        img.alt = 'Generated Comic';
        displayContainer.appendChild(img);
    }
});
