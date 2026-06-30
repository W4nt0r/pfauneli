import Image from "next/image";

export default function ArtworkCard({ slug, title, image, available }) {
  return (
    <a href={`/product/${slug}`} className="group transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <div className="bg-white relative w-full h-64 bg-gray-100">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className={`rounded-t object-cover transition duration-300 ${!available ? 'grayscale' : ''}`} 
          priority/>
      </div>
      <div className="p-4 text-center border border-gray-200">
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
    </a>
  );
}
