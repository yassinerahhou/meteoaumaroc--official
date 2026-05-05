export type Locale = "fr" | "ar" | "en";

export const LOCALES: { code: Locale; label: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { code: "fr", label: "Français", flag: "🇲🇦", dir: "ltr" },
  { code: "ar", label: "العربية",  flag: "🇲🇦", dir: "rtl" },
  { code: "en", label: "English",  flag: "🇬🇧", dir: "ltr" },
];

export type TranslationKey =
  | "nav.home"
  | "nav.cities"
  | "nav.allCities"
  | "nav.contact"
  | "nav.faq"
  | "hero.title1"
  | "hero.title2"
  | "hero.subtitle"
  | "hero.badge"
  | "search.placeholder"
  | "search.button"
  | "search.loading"
  | "search.recent"
  | "search.geolocate"
  | "cities.badge"
  | "cities.title"
  | "cities.subtitle"
  | "cities.viewWeather"
  | "cities.viewAll"
  | "weather.current"
  | "weather.feelsLike"
  | "weather.humidity"
  | "weather.wind"
  | "weather.visibility"
  | "weather.pressure"
  | "weather.sunrise"
  | "weather.sunset"
  | "weather.celsius"
  | "weather.fahrenheit"
  | "weather.source"
  | "forecast.title"
  | "forecast.selectDay"
  | "city.breadcrumb.home"
  | "city.breadcrumb.weather"
  | "city.live"
  | "city.about"
  | "city.back"
  | "city.maxToday"
  | "city.minToday"
  | "footer.tagline"
  | "footer.cities"
  | "footer.info"
  | "footer.stayInformed"
  | "footer.stayInformedDesc"
  | "footer.contactUs"
  | "footer.rights"
  | "footer.dataSource"
  | "prayer.badge"
  | "prayer.title"
  | "prayer.subtitle"
  | "prayer.today"
  | "prayer.next"
  | "prayer.error"
  | "cities.search"
  | "cities.searchPlaceholder"
  | "cities.noResults"
  | "contact.title"
  | "contact.subtitle"
  | "contact.formTitle"
  | "contact.formRequired"
  | "contact.labelName"
  | "contact.labelEmail"
  | "contact.labelMessage"
  | "contact.placeholderName"
  | "contact.placeholderEmail"
  | "contact.placeholderMessage"
  | "contact.submit"
  | "contact.sending"
  | "contact.successTitle"
  | "contact.successMsg"
  | "contact.errorGeneric"
  | "contact.errorNetwork"
  | "contact.infoTitle"
  | "contact.responseTitle"
  | "contact.responseMsg"
  | "contact.responseStrong"
  | "faq.badge"
  | "faq.title"
  | "faq.subtitle"
  | "faq.notFound"
  | "faq.contact"
  | "about.title"
  | "about.subtitle"
  | "about.missionTitle"
  | "about.valuesTitle"
  | "about.techTitle"
  | "about.contactTitle"
  | "about.contactDesc"
  | "about.contactBtn"
  | "footer.newsletterPlaceholder"
  | "footer.newsletterBtn"
  | "footer.newsletterSuccess"
  | "footer.newsletterError"
  | "city.dailyForecast"
  | "city.hourlyDetail"
  | "city.climate"
  | "city.climate.high"
  | "city.climate.low"
  | "city.climate.rain"
  | "city.climate.sun"
  | "city.climate.type"
  | "city.climate.bestTime"
  | "city.sun.title"
  | "city.sun.dayLength"
  | "city.faq.title"
  | "city.tips.title"
  | "city.tips.humidity"
  | "city.tips.wind"
  | "city.tips.comfort";

type Translations = Record<TranslationKey, string>;

export const translations: Record<Locale, Translations> = {
  fr: {
    "nav.home":        "Accueil",
    "nav.cities":      "Villes",
    "nav.allCities":   "Toutes les villes",
    "nav.contact":     "Contact",
    "nav.faq":         "FAQ",
    "hero.title1":     "Prévisions Météo Fiables",
    "hero.title2":     "Partout au Maroc",
    "hero.subtitle":   "Météo actuelle, prévisions 14 jours et alertes pour plus de 60 villes marocaines.",
    "hero.badge":      "🌍 Météo en temps réel pour tout le Maroc",
    "search.placeholder": "Chercher une ville au Maroc…",
    "search.button":   "Chercher",
    "search.loading":  "Chargement",
    "search.recent":   "Dernières recherches",
    "search.geolocate": "Ma position",
    "cities.badge":    "🇲🇦 {count} villes couvertes",
    "cities.title":    "Météo dans les Principales Villes du Maroc",
    "cities.subtitle": "Prévisions météo en temps réel pour toutes les grandes villes et régions du Maroc.",
    "cities.viewWeather": "Voir la météo",
    "cities.viewAll":  "Voir toutes les {count} villes",
    "weather.current": "MÉTÉO ACTUELLE",
    "weather.feelsLike": "Ressenti",
    "weather.humidity": "Humidité",
    "weather.wind":    "Vent",
    "weather.visibility": "Visibilité",
    "weather.pressure": "Pression",
    "weather.sunrise": "Lever",
    "weather.sunset":  "Coucher",
    "weather.celsius": "Celsius",
    "weather.fahrenheit": "Fahrenheit",
    "weather.source":  "Données en temps réel · Source: OpenWeatherMap",
    "forecast.title":  "Prévisions 5 Jours",
    "forecast.selectDay": "Sélectionnez un jour pour voir les prévisions détaillées",
    "city.breadcrumb.home": "Accueil",
    "city.breadcrumb.weather": "Météo",
    "city.live":       "En direct",
    "city.about":      "À propos de la météo à {city}",
    "city.back":       "Retour à l'accueil",
    "city.maxToday":   "Max aujourd'hui",
    "city.minToday":   "Min aujourd'hui",
    "footer.tagline":  "Votre source fiable pour des prévisions météo précises et des mises à jour en temps réel, partout au Maroc.",
    "footer.cities":   "Villes Populaires",
    "footer.info":     "Informations",
    "footer.stayInformed": "Restez Informé",
    "footer.stayInformedDesc": "Consultez les alertes météo et les mises à jour importantes pour votre région.",
    "footer.contactUs": "Nous contacter",
    "footer.rights":   "© {year} MeteoAuMaroc.com — Tous droits réservés",
    "footer.dataSource": "Données météo: OpenWeatherMap",
    "prayer.badge":      "🕌 Exclusif au Maroc",
    "prayer.title":      "Horaires des Prières",
    "prayer.subtitle":   "Horaires de prière précis pour votre ville au Maroc, mis à jour quotidiennement.",
    "prayer.today":      "Aujourd'hui",
    "prayer.next":       "Prochaine",
    "prayer.error":      "Impossible de charger les horaires.",
    "cities.search":     "Rechercher",
    "cities.searchPlaceholder": "Filtrer les villes…",
    "cities.noResults":  "Aucune ville trouvée.",
    "contact.title":         "Contactez-nous",
    "contact.subtitle":      "Une question, une suggestion ? Notre équipe vous répond sous 24h.",
    "contact.formTitle":     "Envoyez un message",
    "contact.formRequired":  "Tous les champs sont obligatoires.",
    "contact.labelName":     "Nom complet",
    "contact.labelEmail":    "Adresse email",
    "contact.labelMessage":  "Message",
    "contact.placeholderName":    "Votre nom",
    "contact.placeholderEmail":   "vous@exemple.com",
    "contact.placeholderMessage": "Comment pouvons-nous vous aider ?",
    "contact.submit":        "Envoyer le message",
    "contact.sending":       "Envoi en cours…",
    "contact.successTitle":  "Message envoyé !",
    "contact.successMsg":    "Nous vous répondrons dans les plus brefs délais.",
    "contact.errorGeneric":  "Une erreur est survenue.",
    "contact.errorNetwork":  "Impossible d'envoyer le message. Vérifiez votre connexion.",
    "contact.infoTitle":     "Informations de contact",
    "contact.responseTitle": "Délai de réponse",
    "contact.responseMsg":   "Notre équipe répond généralement dans les {hours} heures ouvrables. Pour les questions urgentes, mentionnez-le dans votre message.",
    "contact.responseStrong": "24",
    "faq.badge":    "Aide & Support",
    "faq.title":    "Questions Fréquentes",
    "faq.subtitle": "Tout ce que vous devez savoir sur MeteoAuMaroc.com",
    "faq.notFound": "Vous n'avez pas trouvé votre réponse ?",
    "faq.contact":  "Nous contacter",
    "about.title":       "À propos de MeteoAuMaroc",
    "about.subtitle":    "Notre mission : vous donner accès à des prévisions météo précises, rapides et fiables pour toutes les villes du Maroc.",
    "about.missionTitle": "Notre Mission",
    "about.valuesTitle":  "Nos Valeurs",
    "about.techTitle":    "Notre Technologie",
    "about.contactTitle": "Une question ?",
    "about.contactDesc":  "Notre équipe est disponible pour répondre à toutes vos questions.",
    "about.contactBtn":   "Nous contacter",
    "footer.newsletterPlaceholder": "votre@email.com",
    "footer.newsletterBtn":     "S'abonner",
    "footer.newsletterSuccess": "✅ Abonnement confirmé !",
    "footer.newsletterError":   "Erreur. Réessayez.",
    "city.dailyForecast":    "Prévisions jour par jour",
    "city.hourlyDetail":     "Détail horaire",
    "city.climate":          "Climat mensuel moyen",
    "city.climate.high":     "Max °C",
    "city.climate.low":      "Min °C",
    "city.climate.rain":     "Pluie mm",
    "city.climate.sun":      "Soleil h/j",
    "city.climate.type":     "Type de climat",
    "city.climate.bestTime": "Meilleure période",
    "city.sun.title":        "Lever & coucher du soleil",
    "city.sun.dayLength":    "Durée du jour",
    "city.faq.title":        "Questions fréquentes sur la météo",
    "city.tips.title":       "Conditions du moment",
    "city.tips.humidity":    "Humidité",
    "city.tips.wind":        "Vent",
    "city.tips.comfort":     "Confort",
  },

  ar: {
    "nav.home":        "الرئيسية",
    "nav.cities":      "المدن",
    "nav.allCities":   "جميع المدن",
    "nav.contact":     "اتصل بنا",
    "nav.faq":         "الأسئلة الشائعة",
    "hero.title1":     "توقعات الطقس الموثوقة",
    "hero.title2":     "في كل مكان بالمغرب",
    "hero.subtitle":   "الطقس الحالي، توقعات 14 يوماً والتنبيهات لأكثر من 60 مدينة مغربية.",
    "hero.badge":      "🌍 الطقس في الوقت الفعلي في جميع أنحاء المغرب",
    "search.placeholder": "ابحث عن مدينة في المغرب…",
    "search.button":   "بحث",
    "search.loading":  "جاري التحميل",
    "search.recent":   "آخر عمليات البحث",
    "search.geolocate": "موقعي",
    "cities.badge":    "🇲🇦 {count} مدينة مغطاة",
    "cities.title":    "الطقس في أهم مدن المغرب",
    "cities.subtitle": "توقعات الطقس الفورية لجميع المدن والمناطق الكبرى في المغرب.",
    "cities.viewWeather": "عرض الطقس",
    "cities.viewAll":  "عرض جميع المدن ({count})",
    "weather.current": "الطقس الحالي",
    "weather.feelsLike": "الإحساس بالحرارة",
    "weather.humidity": "الرطوبة",
    "weather.wind":    "الرياح",
    "weather.visibility": "مدى الرؤية",
    "weather.pressure": "الضغط الجوي",
    "weather.sunrise": "شروق الشمس",
    "weather.sunset":  "غروب الشمس",
    "weather.celsius": "درجة مئوية",
    "weather.fahrenheit": "فهرنهايت",
    "weather.source":  "بيانات فورية · المصدر: OpenWeatherMap",
    "forecast.title":  "توقعات 5 أيام",
    "forecast.selectDay": "اختر يوماً لعرض التوقعات التفصيلية",
    "city.breadcrumb.home": "الرئيسية",
    "city.breadcrumb.weather": "الطقس",
    "city.live":       "مباشر",
    "city.about":      "عن طقس {city}",
    "city.back":       "العودة إلى الرئيسية",
    "city.maxToday":   "أعلى درجة اليوم",
    "city.minToday":   "أدنى درجة اليوم",
    "footer.tagline":  "مصدرك الموثوق للتوقعات الجوية الدقيقة والتحديثات الفورية في جميع أنحاء المغرب.",
    "footer.cities":   "المدن الأكثر زيارة",
    "footer.info":     "معلومات",
    "footer.stayInformed": "ابق على اطلاع",
    "footer.stayInformedDesc": "اطلع على تنبيهات الطقس والتحديثات المهمة لمنطقتك.",
    "footer.contactUs": "اتصل بنا",
    "footer.rights":   "© {year} MeteoAuMaroc.com — جميع الحقوق محفوظة",
    "footer.dataSource": "بيانات الطقس: OpenWeatherMap",
    "prayer.badge":      "🕌 خاص بالمغرب",
    "prayer.title":      "أوقات الصلاة",
    "prayer.subtitle":   "أوقات صلاة دقيقة لمدينتك في المغرب، محدثة يومياً.",
    "prayer.today":      "اليوم",
    "prayer.next":       "التالية",
    "prayer.error":      "تعذّر تحميل أوقات الصلاة.",
    "cities.search":     "بحث",
    "cities.searchPlaceholder": "ابحث عن مدينة…",
    "cities.noResults":  "لا توجد مدينة بهذا الاسم.",
    "contact.title":         "اتصل بنا",
    "contact.subtitle":      "سؤال أو اقتراح؟ فريقنا يرد في غضون 24 ساعة.",
    "contact.formTitle":     "أرسل رسالة",
    "contact.formRequired":  "جميع الحقول مطلوبة.",
    "contact.labelName":     "الاسم الكامل",
    "contact.labelEmail":    "البريد الإلكتروني",
    "contact.labelMessage":  "الرسالة",
    "contact.placeholderName":    "اسمك",
    "contact.placeholderEmail":   "example@mail.com",
    "contact.placeholderMessage": "كيف يمكننا مساعدتك؟",
    "contact.submit":        "إرسال الرسالة",
    "contact.sending":       "جاري الإرسال…",
    "contact.successTitle":  "تم الإرسال!",
    "contact.successMsg":    "سنرد عليك في أقرب وقت ممكن.",
    "contact.errorGeneric":  "حدث خطأ غير متوقع.",
    "contact.errorNetwork":  "تعذّر إرسال الرسالة. تحقق من اتصالك بالإنترنت.",
    "contact.infoTitle":     "معلومات الاتصال",
    "contact.responseTitle": "وقت الرد",
    "contact.responseMsg":   "يرد فريقنا عادةً خلال {hours} ساعة عمل. إذا كان استفسارك عاجلاً، اذكر ذلك في رسالتك.",
    "contact.responseStrong": "24",
    "faq.badge":    "المساعدة والدعم",
    "faq.title":    "الأسئلة الشائعة",
    "faq.subtitle": "كل ما تحتاج معرفته عن MeteoAuMaroc.com",
    "faq.notFound": "لم تجد ما تبحث عنه؟",
    "faq.contact":  "اتصل بنا",
    "about.title":       "عن MeteoAuMaroc",
    "about.subtitle":    "مهمتنا: منحك توقعات طقس دقيقة وسريعة وموثوقة لجميع مدن المغرب.",
    "about.missionTitle": "مهمتنا",
    "about.valuesTitle":  "قيمنا",
    "about.techTitle":    "تقنيتنا",
    "about.contactTitle": "لديك سؤال؟",
    "about.contactDesc":  "فريقنا جاهز للرد على جميع استفساراتك.",
    "about.contactBtn":   "اتصل بنا",
    "footer.newsletterPlaceholder": "بريدك@الإلكتروني.com",
    "footer.newsletterBtn":     "اشترك",
    "footer.newsletterSuccess": "✅ تم الاشتراك بنجاح!",
    "footer.newsletterError":   "حدث خطأ. حاول مجدداً.",
    "city.dailyForecast":    "التوقعات اليومية",
    "city.hourlyDetail":     "التفاصيل بالساعة",
    "city.climate":          "متوسط المناخ الشهري",
    "city.climate.high":     "أعلى °م",
    "city.climate.low":      "أدنى °م",
    "city.climate.rain":     "أمطار مم",
    "city.climate.sun":      "شمس س/ي",
    "city.climate.type":     "نوع المناخ",
    "city.climate.bestTime": "أفضل وقت للزيارة",
    "city.sun.title":        "شروق وغروب الشمس",
    "city.sun.dayLength":    "مدة النهار",
    "city.faq.title":        "أسئلة شائعة عن الطقس",
    "city.tips.title":       "حالة الطقس الراهنة",
    "city.tips.humidity":    "الرطوبة",
    "city.tips.wind":        "الرياح",
    "city.tips.comfort":     "مستوى الراحة",
  },

  en: {
    "nav.home":        "Home",
    "nav.cities":      "Cities",
    "nav.allCities":   "All cities",
    "nav.contact":     "Contact",
    "nav.faq":         "FAQ",
    "hero.title1":     "Reliable Weather Forecasts",
    "hero.title2":     "Across Morocco",
    "hero.subtitle":   "Current weather, 14-day forecasts and alerts for 60+ Moroccan cities.",
    "hero.badge":      "🌍 Real-time weather for all of Morocco",
    "search.placeholder": "Search for a city in Morocco…",
    "search.button":   "Search",
    "search.loading":  "Loading",
    "search.recent":   "Recent searches",
    "search.geolocate": "My location",
    "cities.badge":    "🇲🇦 {count} cities covered",
    "cities.title":    "Weather in Morocco's Major Cities",
    "cities.subtitle": "Real-time weather forecasts for all major cities and regions of Morocco.",
    "cities.viewWeather": "View weather",
    "cities.viewAll":  "View all {count} cities",
    "weather.current": "CURRENT WEATHER",
    "weather.feelsLike": "Feels like",
    "weather.humidity": "Humidity",
    "weather.wind":    "Wind",
    "weather.visibility": "Visibility",
    "weather.pressure": "Pressure",
    "weather.sunrise": "Sunrise",
    "weather.sunset":  "Sunset",
    "weather.celsius": "Celsius",
    "weather.fahrenheit": "Fahrenheit",
    "weather.source":  "Real-time data · Source: OpenWeatherMap",
    "forecast.title":  "5-Day Forecast",
    "forecast.selectDay": "Select a day to view detailed forecasts",
    "city.breadcrumb.home": "Home",
    "city.breadcrumb.weather": "Weather",
    "city.live":       "Live",
    "city.about":      "About weather in {city}",
    "city.back":       "Back to home",
    "city.maxToday":   "Today's high",
    "city.minToday":   "Today's low",
    "footer.tagline":  "Your reliable source for accurate weather forecasts and real-time updates, everywhere in Morocco.",
    "footer.cities":   "Popular Cities",
    "footer.info":     "Information",
    "footer.stayInformed": "Stay Informed",
    "footer.stayInformedDesc": "Check weather alerts and important updates for your region.",
    "footer.contactUs": "Contact us",
    "footer.rights":   "© {year} MeteoAuMaroc.com — All rights reserved",
    "footer.dataSource": "Weather data: OpenWeatherMap",
    "prayer.badge":      "🕌 Morocco Exclusive",
    "prayer.title":      "Prayer Times",
    "prayer.subtitle":   "Accurate prayer times for your city in Morocco, updated daily.",
    "prayer.today":      "Today",
    "prayer.next":       "Next",
    "prayer.error":      "Could not load prayer times.",
    "cities.search":     "Search",
    "cities.searchPlaceholder": "Filter cities…",
    "cities.noResults":  "No city found.",
    "contact.title":         "Contact us",
    "contact.subtitle":      "A question or suggestion? Our team replies within 24h.",
    "contact.formTitle":     "Send a message",
    "contact.formRequired":  "All fields are required.",
    "contact.labelName":     "Full name",
    "contact.labelEmail":    "Email address",
    "contact.labelMessage":  "Message",
    "contact.placeholderName":    "Your name",
    "contact.placeholderEmail":   "you@example.com",
    "contact.placeholderMessage": "How can we help you?",
    "contact.submit":        "Send message",
    "contact.sending":       "Sending…",
    "contact.successTitle":  "Message sent!",
    "contact.successMsg":    "We will get back to you as soon as possible.",
    "contact.errorGeneric":  "An unexpected error occurred.",
    "contact.errorNetwork":  "Could not send message. Please check your connection.",
    "contact.infoTitle":     "Contact information",
    "contact.responseTitle": "Response time",
    "contact.responseMsg":   "Our team usually replies within {hours} business hours. For urgent matters, mention it in your message.",
    "contact.responseStrong": "24",
    "faq.badge":    "Help & Support",
    "faq.title":    "Frequently Asked Questions",
    "faq.subtitle": "Everything you need to know about MeteoAuMaroc.com",
    "faq.notFound": "Didn't find your answer?",
    "faq.contact":  "Contact us",
    "about.title":       "About MeteoAuMaroc",
    "about.subtitle":    "Our mission: give you accurate, fast and reliable weather forecasts for every city in Morocco.",
    "about.missionTitle": "Our Mission",
    "about.valuesTitle":  "Our Values",
    "about.techTitle":    "Our Technology",
    "about.contactTitle": "Have a question?",
    "about.contactDesc":  "Our team is available to answer all your questions.",
    "about.contactBtn":   "Contact us",
    "footer.newsletterPlaceholder": "your@email.com",
    "footer.newsletterBtn":     "Subscribe",
    "footer.newsletterSuccess": "✅ Subscribed!",
    "footer.newsletterError":   "Error. Please try again.",
    "city.dailyForecast":    "Daily forecast",
    "city.hourlyDetail":     "Hourly breakdown",
    "city.climate":          "Monthly average climate",
    "city.climate.high":     "High °C",
    "city.climate.low":      "Low °C",
    "city.climate.rain":     "Rain mm",
    "city.climate.sun":      "Sun h/d",
    "city.climate.type":     "Climate type",
    "city.climate.bestTime": "Best time to visit",
    "city.sun.title":        "Sunrise & sunset",
    "city.sun.dayLength":    "Day length",
    "city.faq.title":        "Frequently asked questions",
    "city.tips.title":       "Current conditions",
    "city.tips.humidity":    "Humidity",
    "city.tips.wind":        "Wind",
    "city.tips.comfort":     "Comfort",
  },
};

export function t(locale: Locale, key: TranslationKey, vars?: Record<string, string | number>): string {
  let str = translations[locale][key] ?? translations["fr"][key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(`{${k}}`, String(v));
    });
  }
  return str;
}
