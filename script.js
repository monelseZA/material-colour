// Define the transformations for each shade relative to the base '500' color.
// These are carefully chosen values that approximate the Material Design system.
const shadeTransformations = {
    '50': { lighten: 52, saturate: 30 },
    '100': { lighten: 37, saturate: 30 },
    '200': { lighten: 26, saturate: 28 },
    '300': { lighten: 12, saturate: 17 },
    '400': { lighten: 6, saturate: 9 },
    '500': {}, // The base color requires no transformation
    '600': { darken: 6, saturate: 9 },
    '700': { darken: 12, saturate: 17 },
    '800': { darken: 18, saturate: 28 },
    '900': { darken: 24, saturate: 30 },
    'A100': { lighten: 20, saturate: 50 },
    'A200': { lighten: 10, saturate: 60 },
    'A400': { lighten: 5, saturate: 80 },
    'A700': { darken: 10, saturate: 70 }
};

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', generatePalette);
    
    // Generate a palette for the default color on page load
    generatePalette();
});

function generatePalette() {
    const colorPicker = document.getElementById('colorPicker');
console.log("color:" + document.getElementById('colorPicker'));
    // Use TinyColor to create a color object from the input
    const baseColor = tinycolor(colorPicker.value); 

    const palette = {};

    // Iterate through the transformations to generate each shade
    for (const shade in shadeTransformations) {
        const transform = shadeTransformations[shade];
        
        // Clone the original color to avoid modifying it on each loop
        let newColor = baseColor.clone();

        // Apply transformations based on the rules
        if (transform.lighten) newColor = newColor.lighten(transform.lighten);
        if (transform.darken) newColor = newColor.darken(transform.darken);
        if (transform.saturate) newColor = newColor.saturate(transform.saturate);

        // Store the final hex string of the newly generated color
        palette[shade] = newColor.toHexString();
    }

    displayPalette(palette);
}

function displayPalette(palette) {
    const paletteContainer = document.getElementById('paletteContainer');
    paletteContainer.innerHTML = ''; // Clear previous results

    for (const shade in palette) {
        const color = palette[shade];
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        colorCard.style.backgroundColor = color;
        
        // Automatically set text to black or white for best readability
        const textColor = tinycolor(color).isLight() ? '#000' : '#fff';
        colorCard.style.color = textColor;

        colorCard.innerHTML = `<span class="shade">${shade}</span><span class="hex">${color}</span>`;
        paletteContainer.appendChild(colorCard);
    }
}
