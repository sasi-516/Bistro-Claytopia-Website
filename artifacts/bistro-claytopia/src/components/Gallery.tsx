import { motion } from "framer-motion";
import { StudioAmbience } from "@/components/decor/StudioAmbience";
import { BrushStrokeTitle } from "@/components/decor/BrushStrokeTitle";

export function Gallery() {
  const images = [
    "/images/gallery-1.png",
    "/images/gallery-2.png",
    "/images/gallery-3.png",
    "/images/gallery-4.png",
    "/images/painting.png",
    "/images/wheel.png",
  ];

  return (
    <section id="gallery" className="py-24 bg-section-pink relative overflow-hidden">
      <StudioAmbience tone="pink" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <BrushStrokeTitle
          eyebrow="Our Studio"
          title="Gallery"
          description="A glimpse into the creative magic happening every day at our Koramangala studio."
          className="max-w-3xl"
          accent="pink"
        />

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer card-art shadow-sm"
            >
              <img
                src={src}
                alt={`Gallery image ${idx + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-paint-purple/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-serif italic text-lg font-bold drop-shadow-md">View</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
