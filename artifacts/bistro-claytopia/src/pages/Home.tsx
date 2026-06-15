import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Experiences } from "@/components/Experiences";
import { Process } from "@/components/Process";
import { Menu } from "@/components/Menu";
import { Events } from "@/components/Events";
import { Gallery } from "@/components/Gallery";
import { Book } from "@/components/Book";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Experiences />
        <Process />
        <Menu />
        <Events />
        <Gallery />
        <Book />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
