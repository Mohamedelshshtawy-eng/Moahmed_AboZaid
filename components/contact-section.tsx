"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // تحديث الفورم
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // الإرسال إلى واتساب مباشرة
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = "966502690349"; // رقم واتساب محمد أبو زيد بدون +
    const message = language === 'ar' 
      ? `*استفسار سفر جديد*

👤 الاسم: ${formData.name}
📞 الهاتف: ${formData.phone}
💬 الرسالة: ${formData.message}`
      : `*New Travel Inquiry*

👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
💬 Message: ${formData.message}`;

    // فتح واتساب مباشرة
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");

    // تنظيف الحقول
    setFormData({ name: "", phone: "", message: "" });
  };

  const handleWhatsApp = () => {
    const phoneNumber = "966502690349";
    const message = language === 'ar' 
      ? "مرحباً، أود معرفة المزيد عن خدمات السفر الخاصة بك."
      : "Hello, I'd like to know more about your travel services.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const contactInfo = [
    { icon: Phone, label: "WhatsApp", value: "+966 50 269 0349", action: handleWhatsApp },
    { icon: Mail, label: "Email", value: "mohabozaid32@gmail.com", action: () => (window.location.href = "mailto:mohabozaid32@gmail.com") },
    { icon: MapPin, label: "Location", value: "Saudi Arabia", action: () => {} },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان الصفحة */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-foreground mb-4 transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {t('contact.title')} <span className="text-accent">Touch</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ✅ بيانات التواصل */}
          <div
            className={`transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <button
                    key={index}
                    onClick={info.action}
                    className="w-full text-left p-6 bg-primary/50 border-2 border-accent/20 hover:border-accent/60 rounded-xl transition-all duration-300 group hover:shadow-lg hover:shadow-accent/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
                          {info.label}
                        </h3>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* زر واتساب */}
            <button
              onClick={handleWhatsApp}
              className="mt-8 w-full py-4 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              {t('contact.whatsapp')}
            </button>
          </div>

          {/* ✅ نموذج الرسالة */}
          <div
            className={`transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* الاسم */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-primary/50 border-2 border-accent/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/60 transition-colors duration-300"
                  placeholder={language === 'ar' ? 'اسمك الكامل' : 'Your name'}
                />
              </div>

              {/* رقم الجوال */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                  {t('contact.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-primary/50 border-2 border-accent/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/60 transition-colors duration-300"
                  placeholder={language === 'ar' ? '+966 ...' : '+966 ...'}
                />
              </div>

              {/* الرسالة */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-primary/50 border-2 border-accent/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/60 transition-colors duration-300 resize-none"
                  placeholder={language === 'ar' ? 'أخبرني عن خطط سفرك...' : 'Tell me about your travel plans...'}
                />
              </div>

              {/* زر الإرسال */}
              <button
                type="submit"
                className="w-full py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                {t('contact.send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
