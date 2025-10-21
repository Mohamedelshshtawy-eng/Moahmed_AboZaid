import { ImageSlideshow } from "@/components/image-slideshow"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { PartnersCarousel } from "@/components/partners-carousel"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative">
      <ImageSlideshow />
      <div className="relative z-20">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PartnersCarousel />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
