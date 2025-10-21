"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.partners': 'Partners',
    'nav.contact': 'Contact',
    'nav.chat': 'Chat',
    'nav.chat.whatsapp': 'Chat on WhatsApp',
    
    // Hero Section
    'hero.title': 'Your Trusted Travel Agent in',
    'hero.saudi': 'Saudi Arabia',
    'hero.subtitle': 'Specialized in Umrah, Hajj, and Saudi Tourism Services',
    'hero.description': 'With over 7 years of experience, I connect you to the heart of Saudi Arabia with trust, care, and expertise.',
    'hero.book': 'Book Now',
    'hero.learn': 'Learn More',
    
    // About Section
    'about.title': 'About',
    'about.mohamed': 'Mohamed',
    'about.description1': 'As a licensed travel agent with over a decade of experience, I specialize in connecting travelers to the most authentic and meaningful experiences in Saudi Arabia. My mission is to make your journey seamless, comfortable, and unforgettable.',
    'about.description2': 'Whether you\'re seeking spiritual fulfillment through Umrah or Hajj, or exploring the breathtaking landscapes and rich culture of Saudi Arabia, I work directly with top-tier travel agencies to ensure you receive the best service possible.',
    'about.experience': '7+ Years Experience',
    'about.experience.desc': 'Dedicated to providing exceptional travel services',
    'about.trusted': 'Trusted by Companies',
    'about.trusted.desc': 'Partnered with major corporations for group travel',
    'about.personalized': 'Personalized Arrangements',
    'about.personalized.desc': 'Customized itineraries for every traveler',
    
    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive travel solutions for your journey',
    'services.umrah.title': 'Umrah Services',
    'services.umrah.desc': 'Complete Umrah packages with accommodation, transportation, and guidance',
    'services.hajj.title': 'Hajj Services',
    'services.hajj.desc': 'Full Hajj arrangements with experienced guides and premium accommodations',
    'services.tourism.title': 'Saudi Tourism',
    'services.tourism.desc': 'Explore the beauty of Saudi Arabia with customized tour packages',
    'services.visa.title': 'Visa Assistance',
    'services.visa.desc': 'Complete visa processing and documentation support',
    'services.transport.title': 'Transportation',
    'services.transport.desc': 'Reliable airport transfers and inter-city transportation',
    'services.accommodation.title': 'Accommodation',
    'services.accommodation.desc': 'Carefully selected hotels and accommodations for your comfort',
    
    // Partners Section
    'partners.title': 'Our Trusted Partners',
    'partners.subtitle': 'Working with leading travel agencies and service providers',
    
    // Contact Section
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Ready to start your journey? Contact us today',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.service': 'Service Type',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.whatsapp': 'WhatsApp',
    'contact.call': 'Call Now',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.developed': 'Developed with ❤️ for travelers',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.partners': 'شركاؤنا',
    'nav.contact': 'اتصل بنا',
    'nav.chat': 'محادثة',
    'nav.chat.whatsapp': 'محادثة عبر واتساب',
    
    // Hero Section
    'hero.title': 'وكيل السفر الموثوق في',
    'hero.saudi': 'المملكة العربية السعودية',
    'hero.subtitle': 'متخصص في خدمات العمرة والحج والسياحة السعودية',
    'hero.description': 'مع أكثر من 7 سنوات من الخبرة، أصل بينك وبين قلب المملكة العربية السعودية بالثقة والرعاية والخبرة.',
    'hero.book': 'احجز الآن',
    'hero.learn': 'اعرف المزيد',
    
    // About Section
    'about.title': 'من نحن',
    'about.mohamed': 'محمد',
    'about.description1': 'بصفتي وكيل سفر مرخص مع أكثر من عقد من الخبرة، أتخصص في ربط المسافرين بأكثر التجارب الأصيلة والهادفة في المملكة العربية السعودية. مهمتي هي جعل رحلتك سلسة ومريحة ولا تُنسى.',
    'about.description2': 'سواء كنت تسعى للوفاء الروحي من خلال العمرة أو الحج، أو استكشاف المناظر الطبيعية الخلابة والثقافة الغنية للمملكة العربية السعودية، أعمل مباشرة مع وكالات السفر الرائدة لضمان حصولك على أفضل خدمة ممكنة.',
    'about.experience': 'أكثر من 7 سنوات خبرة',
    'about.experience.desc': 'ملتزم بتقديم خدمات سفر استثنائية',
    'about.trusted': 'موثوق من الشركات',
    'about.trusted.desc': 'شريك مع الشركات الكبرى لرحلات المجموعات',
    'about.personalized': 'ترتيبات شخصية',
    'about.personalized.desc': 'برامج سفر مخصصة لكل مسافر',
    
    // Services Section
    'services.title': 'خدماتنا',
    'services.subtitle': 'حلول سفر شاملة لرحلتك',
    'services.umrah.title': 'خدمات العمرة',
    'services.umrah.desc': 'باقات عمرة كاملة مع الإقامة والنقل والإرشاد',
    'services.hajj.title': 'خدمات الحج',
    'services.hajj.desc': 'ترتيبات حج كاملة مع مرشدين ذوي خبرة وإقامة متميزة',
    'services.tourism.title': 'السياحة السعودية',
    'services.tourism.desc': 'استكشف جمال المملكة العربية السعودية مع باقات جولات مخصصة',
    'services.visa.title': 'مساعدة التأشيرة',
    'services.visa.desc': 'معالجة التأشيرة الكاملة ودعم الوثائق',
    'services.transport.title': 'النقل',
    'services.transport.desc': 'نقل موثوق من وإلى المطار والنقل بين المدن',
    'services.accommodation.title': 'الإقامة',
    'services.accommodation.desc': 'فنادق وإقامة مختارة بعناية لراحتك',
    
    // Partners Section
    'partners.title': 'شركاؤنا الموثوقون',
    'partners.subtitle': 'نعمل مع وكالات السفر الرائدة ومقدمي الخدمات',
    
    // Contact Section
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'مستعد لبدء رحلتك؟ اتصل بنا اليوم',
    'contact.name': 'الاسم الكامل',
    'contact.email': 'عنوان البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف',
    'contact.service': 'نوع الخدمة',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال الرسالة',
    'contact.whatsapp': 'واتساب',
    'contact.call': 'اتصل الآن',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.developed': 'تم التطوير بـ ❤️ للمسافرين',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    // Load language from localStorage or default to English
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('language', language)
    
    // Update document direction and language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
