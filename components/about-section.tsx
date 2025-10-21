"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Users, Globe } from "lucide-react"
import Image from "next/image"
import  one  from "../public/one.jpeg"
export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const highlights = [
    {
      icon: Award,
      title: "7+ Years Experience",
      description: "Dedicated to providing exceptional travel services",
    },
    {
      icon: Users,
      title: "Trusted by Companies",
      description: "Partnered with major corporations for group travel",
    },
    {
      icon: Globe,
      title: "Personalized Arrangements",
      description: "Customized itineraries for every traveler",
    },
  ]

  return (
    <section id="about" ref={sectionRef} className="relative py-20 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image/Avatar */}
          <div
            className={`transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-500 via-yellow-300 to-yellow-600 rounded-2xl blur-lg opacity-40"></div>
              <Image
                src={one}
                alt="Mohamed Abo Zaid"
                width={500}
                height={600}
                className="relative rounded-2xl object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div
            className={`transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              About <span className="text-accent">Mohamed</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              As a licensed travel agent with over a decade of experience, I specialize in connecting travelers to the
              most authentic and meaningful experiences in Saudi Arabia. My mission is to make your journey seamless,
              comfortable, and unforgettable.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Whether you're seeking spiritual fulfillment through Umrah or Hajj, or exploring the breathtaking
              landscapes and rich culture of Saudi Arabia, I work directly with top-tier travel agencies to ensure you
              receive the best service possible.
            </p>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon
                return (
                  <div
                    key={index}
                    className={`flex gap-4 p-4 rounded-lg bg-primary/50 border border-accent/20 hover:border-accent/50 transition-all duration-300 transform hover:translate-x-2 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Icon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{highlight.title}</h4>
                      <p className="text-sm text-muted-foreground">{highlight.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
