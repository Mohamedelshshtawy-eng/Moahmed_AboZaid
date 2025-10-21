"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import voco from "../public/voco.jpg";
import six from "../public/six.jpeg";
import three from "../public/three.jpg";
import four from "../public/four.jpg";

export function PartnersCarousel() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const partners = [
    {
      name: "معاد العالمية",
      englishName: "Maad International Company for Umrah Services",
      description:
        "Providing comprehensive Umrah services with world-class standards, including program organization, accommodation, and transportation — ensuring comfort and ease for pilgrims from arrival to departure.",
      background: four,
    },
    {
      name: "أفق الضيافة لخدمات العمرة",
      englishName: "Ofuq Aldiafa Company for Umrah Services",
      description:
        "Dedicated to offering an exceptional Umrah experience through premium hospitality, comfort, and care for every pilgrim throughout their sacred journey.",
      background: three,
    },
    {
      name: "فندق فوكو",
      englishName: "Voco Hotel & Restaurant",
      description:
        "A luxurious destination that combines elegant accommodation with exceptional dining — delivering a unique experience of comfort and authentic hospitality.",
      background: voco,
    },
    {
      name: "دلة للنقل",
      englishName: "Dallah Transport Company",
      description:
        "Offering reliable and comfortable transportation services for pilgrims, with a modern fleet and professional drivers to ensure safe and organized journeys during their pilgrimage.",
      background: six,
    },
  ];

  // ✅ مراقبة ظهور القسم لتفعيل الأنيميشن
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ تشغيل تلقائي للكاروسيل
  useEffect(() => {
    if (isVisible) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % partners.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isVisible, partners.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const nextSlide = () => goToSlide((currentIndex + 1) % partners.length);
  const prevSlide = () =>
    goToSlide((currentIndex - 1 + partners.length) % partners.length);

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative py-20 sm:py-32 overflow-hidden "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان القسم */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-foreground mb-4 transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Authorized Agent <span className="text-accent">For</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Trusted partnerships with leading Saudi travel agencies
          </p>
        </div>

        {/* الكاروسيل */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {partners.map((partner, index) => (
                <div key={index} className="w-full flex-shrink-0 relative">
                  {/* خلفية الصورة */}
                  <Image
                    src={partner.background}
                    alt={partner.name}
                    fill
                    className="object-cover rounded-2xl"
                    priority={index === currentIndex}
                  />
                  {/* طبقة التعتيم */}
                  <div className="absolute inset-0 bg-black/60 rounded-2xl backdrop-blur-[2px]" />

                  {/* المحتوى */}
                  <div className="relative z-10 flex flex-col justify-center items-center text-center px-8 sm:px-12 py-20">
                    <div className="mb-6 inline-block p-4 bg-accent/20 rounded-full">
                      <div className="text-4xl sm:text-6xl font-bold text-accent">
                        {partner.name}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {partner.englishName}
                    </h3>
                    <p className="text-lg text-gray-200 max-w-md mx-auto leading-relaxed mb-8">
                      {partner.description}
                    </p>
                  
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* أزرار التنقل */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-accent/30 hover:bg-accent/50 rounded-full transition-all duration-300 transform hover:scale-110"
            aria-label="Previous partner"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-accent/30 hover:bg-accent/50 rounded-full transition-all duration-300 transform hover:scale-110"
            aria-label="Next partner"
          >
            <ChevronRight size={24} className="text-white" />
          </button>

          {/* النقاط السفلية */}
          <div className="flex justify-center gap-3 mt-8">
            {partners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-accent"
                    : "w-3 bg-accent/40 hover:bg-accent/60"
                }`}
                aria-label={`Go to partner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
