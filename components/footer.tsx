"use client"

import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/mohammed.abuzeid.56", label: "Facebook" },

  ]

  return (
    <footer className="bg-primary border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-accent text-2xl font-bold mb-2">MAZ</h3>
            <p className="text-muted-foreground text-sm">
              Your trusted travel partner for Umrah, Hajj, and Saudi tourism experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-accent text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="#home" className="hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-accent transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-accent transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-accent text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="#services" className="hover:text-accent transition-colors">
                  Umrah Packages
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-accent transition-colors">
                  Hajj Guidance
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-accent transition-colors">
                  Saudi Tourism
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-accent text-lg font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <span>+966502690349</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <span>mohabozaid32@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-accent flex-shrink-0" />
                <span>Saudi Arabia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent/20 pt-8">
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-6">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-accent/10 hover:bg-accent/20 rounded-full text-accent transition-all duration-300 transform hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>

          {/* Footer Text */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-2">
              Connecting You to the Heart of Saudi Arabia — with Trust, Care, and Experience.
            </p>
            <p className="text-xs text-muted-foreground/70">
              © {currentYear} Mohamed Abo Zaid. All rights reserved. | Premium Travel Services
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
