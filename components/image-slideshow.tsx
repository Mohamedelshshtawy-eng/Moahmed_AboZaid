"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // صور الخلفية - استبدل الروابط بصورك الخاصة
  const images = [
    "/saudi-desert-landscape.jpg",
    "/mecca-kaaba-night.jpg",
    "/riyadh-skyline-modern.jpg",
    "/saudi-mountains-sunset.jpg",
    "/jeddah-corniche-beach.jpg",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000) // تغيير الصورة كل 3 ثوانٍ

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="fixed inset-0 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`Background ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            quality={85}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-gold w-6" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
