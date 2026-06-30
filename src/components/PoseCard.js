'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PoseCard({ slug, title, image }) {
  return (
    <Link
      href={`/models/${slug}`}
      className="group block border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
    </Link>
  );
}
