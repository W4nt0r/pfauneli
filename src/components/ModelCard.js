import Image from "next/image";

export default function ModelCard({ slug, title, thumbnail }) {
  return (
    <a href={`/models/${slug}`} className="group block border border-gray-200 hover:shadow-lg transition">
      <div className="bg-white relative w-full h-64 bg-gray-100">
        {/* Static preview image for the 3D model */}
        <Image src={thumbnail} alt={title} fill className="object-contain" priority />
      </div>
      <div className="p-4 text-center border border-gray-200">
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
    </a>
  );
}
