import chapters from '@/data/storytell.json';
import ArtworkDetail from '@/components/ArtworkDetail';
import { getArtworkImages } from '@/lib/getArtworkImages';

const artworks = chapters.flatMap((chapter) => chapter.artworks || []);

export function generateStaticParams() {
    return artworks.map((artwork) => ({
        slug: artwork.slug,
    }));
}

export default async function StorytellArtworkPage({ params }) {
    const { slug } = await params;

    const artwork = artworks.find((item) => item.slug === slug);

    if (!artwork) {
        return <div>Artwork not found</div>;
    }

    const images = getArtworkImages(artwork.slug);

    return (
        <ArtworkDetail
            {...artwork}
            {...images}
        />
    );
}