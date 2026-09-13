export interface Article {
  slug: string;
  date: string;
  image: string;
  title: { fr: string; ar: string; en: string };
  excerpt: { fr: string; ar: string; en: string };
  content: { fr: React.ReactNode; ar: React.ReactNode; en: React.ReactNode };
}

// Example article to get them started
export const ARTICLES: Article[] = [
  {
    slug: "meteo-ramadan-2026",
    date: "2026-02-10",
    image: "/images/blog-ramadan.jpg",
    title: {
      fr: "Prévisions Météo pour le Ramadan 2026 au Maroc",
      ar: "توقعات الطقس لشهر رمضان 2026 في المغرب",
      en: "Weather Forecast for Ramadan 2026 in Morocco"
    },
    excerpt: {
      fr: "Découvrez les tendances météorologiques attendues pour le mois sacré de Ramadan 2026 à travers les différentes régions du Maroc.",
      ar: "تعرف على الاتجاهات الجوية المتوقعة لشهر رمضان المبارك 2026 في مختلف مناطق المغرب.",
      en: "Discover the expected weather trends for the holy month of Ramadan 2026 across different regions of Morocco."
    },
    content: {
      fr: (
        <>
          <p>Le mois de Ramadan est une période particulièrement importante au Maroc. En 2026, il coïncidera avec le début du printemps, ce qui signifie que les températures commenceront à s'adoucir, bien que des variations importantes soient possibles selon les régions.</p>
          <h3>À quoi s'attendre ?</h3>
          <p>Dans les régions côtières comme Casablanca et Rabat, le climat devrait être doux et clément. Cependant, dans les régions intérieures comme Marrakech et Fès, les journées pourraient commencer à devenir chaudes, nécessitant une bonne hydratation entre le Ftour et le Shour.</p>
        </>
      ),
      ar: (
        <>
          <p>شهر رمضان هو فترة مهمة بشكل خاص في المغرب. في عام 2026، سيتزامن مع بداية فصل الربيع، مما يعني أن درجات الحرارة ستبدأ في الاعتدال، على الرغم من احتمال وجود اختلافات كبيرة حسب المناطق.</p>
          <h3>ماذا تتوقع؟</h3>
          <p>في المناطق الساحلية مثل الدار البيضاء والرباط، من المتوقع أن يكون المناخ معتدلاً ولطيفاً. ومع ذلك، في المناطق الداخلية مثل مراكش وفاس، قد تبدأ الأيام في أن تصبح حارة، مما يتطلب ترطيباً جيداً بين الفطور والسحور.</p>
        </>
      ),
      en: (
        <>
          <p>The month of Ramadan is a particularly important period in Morocco. In 2026, it will coincide with the beginning of spring, meaning temperatures will start to milden, although significant variations are possible depending on the regions.</p>
          <h3>What to expect?</h3>
          <p>In coastal regions like Casablanca and Rabat, the climate should be mild and pleasant. However, in inland regions like Marrakech and Fez, the days might start getting hot, requiring good hydration between Iftar and Suhoor.</p>
        </>
      )
    }
  }
];
