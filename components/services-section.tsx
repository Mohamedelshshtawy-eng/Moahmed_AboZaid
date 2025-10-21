"use client"

import { useEffect, useRef, useState } from "react"
import { Plane, MSquare as Mosque, MapPin } from "lucide-react"

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      icon: Plane,
      title: "Umrah Packages",
      description:
        "Easy visa processing and hotel booking for your spiritual journey. Comprehensive packages including flights, accommodation, and guided tours.",
      features: ["Visa Assistance", "Hotel Booking", "Airport Transfer", "24/7 Support"],
    },
    {
      icon: Mosque,
      title: "Hajj Guidance",
      description:
        "Partnered with certified Hajj companies to provide complete guidance. Expert coordination for a smooth and meaningful pilgrimage experience.",
      features: ["Expert Guidance", "Certified Partners", "Group Coordination", "Ritual Support"],
    },
    {
      icon: MapPin,
      title: "Saudi Tourism",
      description:
        "Explore the diverse destinations across the Kingdom. From ancient heritage sites to modern attractions, discover Saudi Arabia's wonders.",
      features: ["Destination Planning", "Cultural Tours", "Adventure Activities", "Local Experiences"],
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="relative py-20 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-foreground mb-4 transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Our <span className="text-accent">Services</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Comprehensive travel solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className={`group relative transition-all duration-1000 transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card */}
                <div className="relative bg-gradient-to-br from-primary/80 to-background border-2 border-accent/20 group-hover:border-accent/60 rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                  {/* Icon */}
                  <div className="mb-6 inline-block p-4 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover border animation */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-accent/0 group-hover:border-accent/30 transition-all duration-300 pointer-events-none" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
