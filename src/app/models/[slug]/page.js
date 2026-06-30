import Link from "next/link";
import ModelDetail from "@/components/ModelDetail";
import models from "@/data/models.json";

export async function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }) {
  const model = models.find((m) => m.slug === params.slug);
  return {
    title: model ? model.title : "3D Model",
    description: model?.description || "",
  };
}

export default function ModelDetailPage({ params }) {
  const model = models.find((m) => m.slug === params.slug);

  if (!model) {
    return (
      <main className="w-full flex-1 px-6 py-10 bg-white text-black">
        <p>Model nebyl nalezen.</p>
      </main>
    );
  }

  return (
    <main className="w-full flex-1 px-6 py-10 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            &larr; Zpět na galerii
          </Link>
        </div>

        <ModelDetail {...model} />
      </div>
    </main>
  );
}
