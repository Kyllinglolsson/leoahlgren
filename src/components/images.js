// images.js
import { useState, useEffect } from 'react';

const useImages = (folder) => {
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        const importImages = async () => {
            const importedImages = [];
            for (let i = 1; i <= 999; i++) {
                const paddedIndex = String(i).padStart(3, '0');
                try {
                    const image = await import(`../assets/${folder}/LeoAhlgren_${paddedIndex}.jpg`);
                    importedImages.push(image.default);
                } catch (error) {
                    break;
                }
            }
    
            if (importedImages.length > 0) {
                setImages(importedImages);
            }
        };
    
        importImages();
    }, [folder]); // Lägg till `folder` som ett beroende
    
    return images;
}

const useGridImages = (folder) => {
    const [gridimages, setImages] = useState([]);

    useEffect(() => {
        const importImages = async () => {
            const importedImages = [];
            let i = 0;

            while (true) {
                i++;
                const paddedIndex = String(i).padStart(3, '0');
                try {
                    const image = await import(`../assets/${folder}/LeoAhlgren_${paddedIndex}.jpg`);
                    importedImages.push({ index: i, src: image.default });
                } catch (error) {
                    break;
                }
            }

            if (importedImages.length > 0) {
                importedImages.sort((a, b) => a.index - b.index); // Sortera bilder efter index
                setImages(importedImages.map(img => img.src)); // Endast src behövs för rendering
            }
        };

        importImages();
    }, [folder]); // Lägg till `folder` som ett beroende

    return gridimages;
};

export { useImages, useGridImages };