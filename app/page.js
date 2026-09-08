import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col justify-between relative bg-[#050608] overflow-x-hidden w-full max-w-full">
        <Navbar />

        <main className="flex-grow flex flex-col items-center justify-center w-full max-w-full overflow-x-hidden">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
