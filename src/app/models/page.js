import ModelCard from "@/components/ModelCard";
import models from "@/data/models.json";

export const metadata = {
  title: "3D Modely",
  description: "Galerie 3D objektů",
};

export default function ModelsPage() {
  return (
    <main className="w-full flex-1 px-6 py-10 bg-white text-black">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">3D Modely</h1>
        <p className="text-gray-600">Interaktivní galerie 3D objektů</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {models.map((model) => (
          <ModelCard key={model.id} {...model} />
        ))}
      </section>
    </main>
  );
}
