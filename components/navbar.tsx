"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Partners", href: "#partners" },
    { label: "Contact", href: "#contact" },
  ]

  const handleWhatsApp = () => {
    const phoneNumber = "+966502690349" // Replace with actual WhatsApp number
    const message = "Hello, I'm interested in your travel services."
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-accent/30 shadow-lg shadow-accent/10"
          : "bg-background/50 backdrop-blur-sm border-b border-accent/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="#home"
            className="text-2xl font-bold text-accent hover:text-accent/80 transition-colors duration-300"
          >
            MAZ
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-accent transition-colors duration-300 relative group text-sm font-medium"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <button
              onClick={handleWhatsApp}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 flex items-center gap-2 text-sm font-semibold"
            >
              <MessageCircle size={16} />
              Chat
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-accent" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-accent/20 pt-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-foreground hover:text-accent hover:bg-primary/50 rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                handleWhatsApp()
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 bg-accent text-accent-foreground rounded font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
