import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { Navbar } from "@/components/home/Navbar";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex flex-grow flex-col justify-center gap-12 py-10">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
