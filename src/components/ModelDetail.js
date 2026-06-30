"use client";

import Image from "next/image";
import Link from "next/link";
import ModelCanvas from "@/components/ModelCanvas"; // uses your existing component

export default function ModelDetail({
  title,
  thumbnail,     // static image for the model
  glb,            // path to your .glb, e.g. "/models/pose-1.glb"
  description,
  year,
  dimensions,
  price,
  available,
}) {
  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col lg:flex-row gap-6 items-start">
      <div className="w-full lg:w-1/2">
        {/* If a GLB is provided, show the interactive viewer; else show the static image */}
        {glb ? (
          <div className="rounded shadow overflow-hidden">
            <ModelCanvas url={glb} />
          </div>
        ) : (
          <Image
            src={thumbnail}
            alt={title}
            width={800}
            height={800}
            unoptimized
            className="rounded shadow"
          />
        )}
      </div>

      <div className="w-full lg:w-1/2">
        <h1 className="text-3xl font-bold mb-4 text-black text-lg">{title}</h1>
        {description && <p className="text-black text-lg mb-2">{description}</p>}
        {year && <p className="text-black text-lg mb-2">Rok: {year}</p>}
        {dimensions && <p className="text-black text-lg mb-2">Rozměry: {dimensions}</p>}
        {price && <p className="text-black text-lg mb-2">Cena: {price}</p>}
        {typeof available === "boolean" && (
          <p className="text-black text-lg mb-2">
            Dostupnost:{" "}
            <span className={available ? "text-green-600" : "text-red-600"}>
              {available ? "Dostupné" : "Nedostupné"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
