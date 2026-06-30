import fs from 'fs';
import path from 'path';

export function getArtworkImages(slug) {
    const folderPath = path.join(
        process.cwd(),
        'public',
        'images',
        'artworks',
        slug
    );

    const publicPath = `/images/artworks/${slug}`;

    if (!fs.existsSync(folderPath)) {
        return {
            imageMedium: `${publicPath}/medium.webp`,
            imageFull: `${publicPath}/image.webp`,
            details: [],
        };
    }

    const files = fs
        .readdirSync(folderPath)
        .filter((file) => file.toLowerCase().endsWith('.webp'));

    const details = files
        .filter((file) => file !== 'image.webp' 
            && file !== 'small.webp' 
            && file !== 'medium.webp'
            && file !== 'image-light.webp')
        .sort()
        .map((file) => `${publicPath}/${file}`);

    return {
        imageMedium: `${publicPath}/medium.webp`,
        imageFull: `${publicPath}/image.webp`,
        details,
    };
}