export interface CityData {
  slug: string;
  name: string;
  nameAr?: string;
  lat: number;
  lon: number;
  region: string;
  description: string;
  descriptionAr?: string;
  descriptionEn?: string;
  emoji: string;
}

export const MOROCCAN_CITIES: CityData[] = [
  // ── Grand Casablanca-Settat ──────────────────────────────
  {
    slug: "casablanca",
    name: "Casablanca",
    nameAr: "الدار البيضاء",
    lat: 33.5731, lon: -7.5898,
    region: "Grand Casablanca-Settat",
    emoji: "🏙️",
    description:
      "Casablanca est la capitale économique du Maroc et sa plus grande ville. Elle bénéficie d'un climat méditerranéen atlantique avec des étés chauds et secs et des hivers doux et humides. La température annuelle moyenne est d'environ 18°C.",
    descriptionAr:
      "الدار البيضاء هي العاصمة الاقتصادية للمغرب وأكبر مدنه. تتمتع بمناخ متوسطي أطلسي مع صيف دافئ وجاف وشتاء معتدل ورطب. يبلغ متوسط درجة الحرارة السنوية حوالي 18 درجة مئوية.",
    descriptionEn:
      "Casablanca is Morocco's economic capital and largest city. It enjoys an Atlantic Mediterranean climate with warm dry summers and mild wet winters. The average annual temperature is around 18°C.",
  },
  {
    slug: "mohammedia",
    name: "Mohammedia",
    nameAr: "المحمدية",
    lat: 33.6861, lon: -7.3838,
    region: "Casablanca-Settat",
    emoji: "🌊",
    description:
      "Mohammedia est une ville côtière atlantique connue pour ses plages et son industrie pétrochimique. Son climat est similaire à Casablanca : doux toute l'année grâce à la brise marine.",
    descriptionAr:
      "المحمدية مدينة ساحلية أطلسية تشتهر بشواطئها وصناعتها البتروكيماوية. مناخها مشابه للدار البيضاء: معتدل طوال العام بفضل النسيم البحري.",
    descriptionEn:
      "Mohammedia is an Atlantic coastal city known for its beaches and petrochemical industry. Its climate mirrors Casablanca's — mild year-round thanks to the ocean breeze.",
  },
  {
    slug: "berrechid",
    name: "Berrechid",
    nameAr: "برشيد",
    lat: 33.2659, lon: -7.5862,
    region: "Casablanca-Settat",
    emoji: "🌾",
    description:
      "Berrechid est une ville de la plaine du Chaouia au climat semi-aride. Les étés sont chauds et secs, les hivers frais avec quelques pluies. Ville à vocation agricole et industrielle.",
    descriptionAr:
      "برشيد مدينة في سهل الشاوية ذات مناخ شبه جاف. الصيف حار وجاف والشتاء معتدل مع بعض الأمطار. مدينة ذات طابع زراعي وصناعي.",
    descriptionEn:
      "Berrechid is a city in the Chaouia plain with a semi-arid climate. Summers are hot and dry, winters cool with some rainfall. The city has an agricultural and industrial character.",
  },
  {
    slug: "settat",
    name: "Settat",
    nameAr: "سطات",
    lat: 33.0013, lon: -7.6161,
    region: "Casablanca-Settat",
    emoji: "🌻",
    description:
      "Settat, chef-lieu de la province du même nom, est au cœur de la plaine du Chaouia. Climat continental semi-aride avec des étés chauds (35°C+) et des hivers frais pouvant descendre sous 5°C.",
    descriptionAr:
      "سطات عاصمة إقليمها في قلب سهل الشاوية. مناخها قاري شبه جاف مع صيف حار (35°C وأكثر) وشتاء بارد قد ينخفض تحت 5°C.",
    descriptionEn:
      "Settat is the provincial capital in the heart of the Chaouia plain. Its continental semi-arid climate brings hot summers (35°C+) and cool winters that can drop below 5°C.",
  },
  {
    slug: "el-jadida",
    name: "El Jadida",
    nameAr: "الجديدة",
    lat: 33.2549, lon: -8.5078,
    region: "Casablanca-Settat",
    emoji: "🏰",
    description:
      "El Jadida est une ville portuaire historique sur la côte atlantique. Son climat est océanique doux, avec des températures agréables toute l'année (15-25°C) et des précipitations modérées en hiver.",
    descriptionAr:
      "الجديدة مدينة ساحلية تاريخية على المحيط الأطلسي. تتمتع بمناخ محيطي معتدل مع درجات حرارة مريحة طوال العام (15-25°C) وأمطار معتدلة في الشتاء.",
    descriptionEn:
      "El Jadida is a historic port city on the Atlantic coast with a mild oceanic climate. Comfortable temperatures year-round (15-25°C) with moderate winter rainfall.",
  },
  {
    slug: "safi",
    name: "Safi",
    nameAr: "آسفي",
    lat: 32.2994, lon: -9.2372,
    region: "Marrakech-Safi",
    emoji: "🎨",
    description:
      "Safi est une ville côtière réputée pour sa poterie et son industrie de sardines. Climat atlantique doux avec des vents fréquents et des températures stables entre 15 et 26°C.",
    descriptionAr:
      "آسفي مدينة ساحلية تشتهر بفخارها وصناعة السردين. مناخها أطلسي معتدل مع رياح متكررة ودرجات حرارة مستقرة بين 15 و26°C.",
    descriptionEn:
      "Safi is a coastal city renowned for its pottery and sardine industry. Its mild Atlantic climate features frequent winds and stable temperatures between 15 and 26°C.",
  },

  // ── Rabat-Salé-Kénitra ───────────────────────────────────
  {
    slug: "rabat",
    name: "Rabat",
    nameAr: "الرباط",
    lat: 34.0209, lon: -6.8416,
    region: "Rabat-Salé-Kénitra",
    emoji: "🏛️",
    description:
      "Rabat, capitale administrative du Maroc, bénéficie d'un climat méditerranéen tempéré grâce à sa position sur la côte atlantique. Les étés sont chauds et ensoleillés, les hivers doux et humides avec une température annuelle de 18°C.",
    descriptionAr:
      "الرباط العاصمة الإدارية للمغرب تتمتع بمناخ متوسطي معتدل بفضل موقعها على الساحل الأطلسي. الصيف حار ومشمس والشتاء معتدل ورطب، بمتوسط درجة حرارة سنوية 18°C.",
    descriptionEn:
      "Rabat, Morocco's administrative capital, benefits from a temperate Mediterranean climate thanks to its Atlantic coast position. Summers are warm and sunny, winters mild and wet, with an annual average of 18°C.",
  },
  {
    slug: "sale",
    name: "Salé",
    nameAr: "سلا",
    lat: 34.0531, lon: -6.7985,
    region: "Rabat-Salé-Kénitra",
    emoji: "🌙",
    description:
      "Salé est la ville jumelle de Rabat, séparée par le fleuve Bouregreg. Son climat est identique à celui de Rabat : méditerranéen doux avec une légère influence atlantique.",
    descriptionAr:
      "سلا المدينة التوأم للرباط يفصلها نهر أبي رقراق. مناخها مطابق لمناخ الرباط: متوسطي معتدل مع تأثير أطلسي خفيف.",
    descriptionEn:
      "Salé is Rabat's twin city, separated by the Bouregreg river. Its climate is identical to Rabat's — mild Mediterranean with a slight Atlantic influence.",
  },
  {
    slug: "kenitra",
    name: "Kénitra",
    nameAr: "القنيطرة",
    lat: 34.261, lon: -6.5802,
    region: "Rabat-Salé-Kénitra",
    emoji: "🌿",
    description:
      "Kénitra est une ville portuaire sur l'Oued Sebou. Son climat méditerranéen est légèrement plus humide que Rabat grâce à sa proximité de la forêt de la Mamora. Étés chauds, hivers doux.",
    descriptionAr:
      "القنيطرة مدينة ميناء على وادي سبو. مناخها المتوسطي أكثر رطوبة قليلاً من الرباط بفضل قربها من غابة المعمورة. صيف دافئ وشتاء معتدل.",
    descriptionEn:
      "Kénitra is a port city on the Sebou river. Its Mediterranean climate is slightly more humid than Rabat's thanks to proximity to the Mamora forest. Warm summers, mild winters.",
  },
  {
    slug: "temara",
    name: "Témara",
    nameAr: "تمارة",
    lat: 33.9247, lon: -6.9152,
    region: "Rabat-Salé-Kénitra",
    emoji: "🏖️",
    description:
      "Témara est une ville balnéaire au sud de Rabat, connue pour ses plages et son zoo. Climat atlantique doux avec des brises marines rafraîchissantes en été.",
    descriptionAr:
      "تمارة مدينة شاطئية جنوب الرباط تشتهر بشواطئها وحديقة حيواناتها. مناخها أطلسي معتدل مع نسيم بحري منعش في الصيف.",
    descriptionEn:
      "Témara is a seaside city south of Rabat, known for its beaches and zoo. Its mild Atlantic climate brings refreshing sea breezes in summer.",
  },
  {
    slug: "souk-el-arbaa",
    name: "Souk El Arbaa",
    nameAr: "سوق الأربعاء",
    lat: 34.6841, lon: -6.0073,
    region: "Rabat-Salé-Kénitra",
    emoji: "🛒",
    description:
      "Souk El Arbaa est un centre agricole et commercial dans la plaine du Gharb. Climat méditerranéen avec des hivers pluvieux et des étés chauds. Zone de production maraîchère importante.",
    descriptionAr:
      "سوق الأربعاء مركز زراعي وتجاري في سهل الغرب. مناخه متوسطي مع شتاء ماطر وصيف حار. منطقة إنتاج خضروات مهمة.",
    descriptionEn:
      "Souk El Arbaa is an agricultural and commercial hub in the Gharb plain. Mediterranean climate with rainy winters and hot summers. An important vegetable-growing area.",
  },
  {
    slug: "sidi-kacem",
    name: "Sidi Kacem",
    nameAr: "سيدي قاسم",
    lat: 34.2233, lon: -5.7094,
    region: "Rabat-Salé-Kénitra",
    emoji: "🌄",
    description:
      "Sidi Kacem est un nœud ferroviaire et agricole au carrefour des principales voies du Maroc. Climat continental avec des étés chauds et des hivers froids par rapport à la côte.",
    descriptionAr:
      "سيدي قاسم عقدة سكك حديدية وزراعية في ملتقى الطرق الرئيسية بالمغرب. مناخه قاري مع صيف حار وشتاء أكثر برودة من الساحل.",
    descriptionEn:
      "Sidi Kacem is a railway and agricultural junction at Morocco's main road crossroads. Continental climate with hot summers and colder winters compared to the coast.",
  },

  // ── Tanger-Tétouan-Al Hoceïma ────────────────────────────
  {
    slug: "tanger",
    name: "Tanger",
    nameAr: "طنجة",
    lat: 35.7673, lon: -5.7998,
    region: "Tanger-Tétouan-Al Hoceïma",
    emoji: "⛵",
    description:
      "Tanger, porte entre l'Europe et l'Afrique, jouit d'un climat méditerranéen avec des influences atlantiques. Les hivers sont doux et pluvieux, les étés chauds mais rafraîchis par la brise maritime et les vents fréquents.",
    descriptionAr:
      "طنجة بوابة أفريقيا وأوروبا تتمتع بمناخ متوسطي مع تأثيرات أطلسية. الشتاء معتدل وماطر، الصيف دافئ لكن يبرده النسيم البحري والرياح المتكررة.",
    descriptionEn:
      "Tangier, the gateway between Africa and Europe, enjoys a Mediterranean climate with Atlantic influences. Winters are mild and rainy, summers warm but cooled by sea breezes and frequent winds.",
  },
  {
    slug: "tetouan",
    name: "Tétouan",
    nameAr: "تطوان",
    lat: 35.5785, lon: -5.3684,
    region: "Tanger-Tétouan-Al Hoceïma",
    emoji: "🏔️",
    description:
      "Tétouan est nichée entre le Rif et la Méditerranée. Ville aux influences andalouses, elle bénéficie d'un microclimat méditerranéen avec des hivers pluvieux et des étés chauds et humides.",
    descriptionAr:
      "تطوان مدينة محاطة بجبال الريف والبحر الأبيض المتوسط. تتمتع بطابع أندلسي ومناخ متوسطي مع شتاء ماطر وصيف حار ورطب.",
    descriptionEn:
      "Tétouan nestles between the Rif mountains and the Mediterranean. With its Andalusian character, it enjoys a Mediterranean microclimate: rainy winters and warm, humid summers.",
  },
  {
    slug: "al-hoceima",
    name: "Al Hoceïma",
    nameAr: "الحسيمة",
    lat: 35.2518, lon: -3.9372,
    region: "Tanger-Tétouan-Al Hoceïma",
    emoji: "🌊",
    description:
      "Al Hoceïma est une perle méditerranéenne dans le Rif. Elle jouit d'un des meilleurs climats du Maroc : étés chauds et ensoleillés, eau turquoise, hivers doux. Destination estivale prisée.",
    descriptionAr:
      "الحسيمة جوهرة المتوسط في الريف تتمتع بأحد أفضل المناخات بالمغرب: صيف مشمس ودافئ، مياه فيروزية، وشتاء معتدل. وجهة صيفية مفضلة.",
    descriptionEn:
      "Al Hoceïma is a Mediterranean jewel in the Rif region with one of Morocco's finest climates: warm sunny summers, turquoise waters, and mild winters. A prized summer destination.",
  },
  {
    slug: "chefchaouen",
    name: "Chefchaouen",
    nameAr: "شفشاون",
    lat: 35.1689, lon: -5.2637,
    region: "Tanger-Tétouan-Al Hoceïma",
    emoji: "💙",
    description:
      "La ville bleue du Rif à 600m d'altitude. Chefchaouen a un climat montagnard méditerranéen : étés tempérés (22-28°C), hivers frais et pluvieux, neige occasionnelle. Air pur et atmosphère magique.",
    descriptionAr:
      "شفشاون المدينة الزرقاء في جبال الريف على ارتفاع 600م. مناخها جبلي متوسطي: صيف معتدل (22-28°C)، شتاء بارد وماطر مع تساقط ثلجي أحياناً. هواء نقي وأجواء ساحرة لا تُنسى.",
    descriptionEn:
      "The Blue City of the Rif Mountains at 600m altitude. Its mountain Mediterranean climate brings temperate summers (22-28°C), cool rainy winters with occasional snow, and pure mountain air.",
  },
  {
    slug: "larache",
    name: "Larache",
    nameAr: "العرائش",
    lat: 35.1922, lon: -6.1565,
    region: "Tanger-Tétouan-Al Hoceïma",
    emoji: "🌅",
    description:
      "Larache est une ville côtière atlantique à l'embouchure de l'Oued Loukkouss. Climat atlantique doux avec des étés agréables, des hivers tempérés et des vents fréquents.",
    descriptionAr:
      "العرائش مدينة ساحلية أطلسية عند مصب وادي اللوكوس. مناخها معتدل مع صيف لطيف وشتاء دافئ ورياح متكررة.",
    descriptionEn:
      "Larache is an Atlantic coastal city at the mouth of the Loukkouss river. Mild Atlantic climate with pleasant summers, temperate winters, and frequent winds.",
  },
  {
    slug: "fnideq",
    name: "Fnideq",
    nameAr: "الفنيدق",
    lat: 35.8496, lon: -5.3605,
    region: "Tanger-Tétouan-Al Hoceïma",
    emoji: "🚢",
    description:
      "Fnideq, aux portes de Ceuta, est une ville frontière sur la Méditerranée. Climat méditerranéen agréable avec des étés chauds et des hivers doux, idéal pour les activités nautiques.",
    descriptionAr:
      "الفنيدق على أبواب سبتة مدينة حدودية على البحر الأبيض المتوسط. مناخها متوسطي لطيف مع صيف دافئ وشتاء معتدل، مثالي للأنشطة البحرية.",
    descriptionEn:
      "Fnideq, at the gates of Ceuta, is a border city on the Mediterranean. Pleasant Mediterranean climate with warm summers and mild winters, ideal for water activities.",
  },
  {
    slug: "asilah",
    name: "Asilah",
    nameAr: "أصيلة",
    lat: 35.4648, lon: -6.0362,
    region: "Tanger-Tétouan-Al Hoceïma",
    emoji: "🎭",
    description:
      "Asilah est une cité andalouse sur l'Atlantique, célèbre pour ses fresques murales. Climat côtier atlantique doux, avec des plages magnifiques et des brises marines en été.",
    descriptionAr:
      "أصيلة مدينة أندلسية على المحيط الأطلسي تشتهر بجداريتها الفنية. مناخها ساحلي معتدل مع شواطئ رائعة ونسيم بحري منعش صيفاً.",
    descriptionEn:
      "Asilah is an Andalusian city on the Atlantic coast, famous for its colorful wall murals. Mild coastal climate with beautiful beaches and refreshing sea breezes in summer.",
  },

  // ── Fès-Meknès ──────────────────────────────────────────
  {
    slug: "fes",
    name: "Fès",
    nameAr: "فاس",
    lat: 34.0372, lon: -5.0001,
    region: "Fès-Meknès",
    emoji: "🏺",
    description:
      "Fès, capitale spirituelle et culturelle du Maroc, a un climat continental semi-aride. Les étés sont très chauds (35-40°C), les hivers froids et humides avec des gelées possibles. Printemps et automne sont les meilleures saisons.",
    descriptionAr:
      "فاس العاصمة الروحية والثقافية للمغرب تتميز بمناخ قاري شبه جاف. الصيف حار جداً (35-40°C)، الشتاء بارد ورطب مع إمكانية الصقيع. الربيع والخريف أجمل المواسم وأكثرها ملاءمة للزيارة.",
    descriptionEn:
      "Fès, Morocco's spiritual and cultural capital, has a continental semi-arid climate. Summers are very hot (35-40°C), winters cold and wet with possible frost. Spring and autumn are the most pleasant seasons to visit.",
  },
  {
    slug: "meknes",
    name: "Meknès",
    nameAr: "مكناس",
    lat: 33.8935, lon: -5.5473,
    region: "Fès-Meknès",
    emoji: "🏰",
    description:
      "Meknès, ville impériale entourée de vignobles et d'oliviers, a un climat continental tempéré. Étés chauds (32°C), hivers froids (5-12°C). La région produit certains des meilleurs vins du Maroc.",
    descriptionAr:
      "مكناس المدينة الإمبراطورية المحاطة بكروم العنب وأشجار الزيتون تتمتع بمناخ قاري معتدل. الصيف حار (32°C) والشتاء بارد (5-12°C). المنطقة معروفة بإنتاجها الزراعي المتميز.",
    descriptionEn:
      "Meknès, the imperial city surrounded by vineyards and olive groves, has a temperate continental climate. Summers are warm (32°C) and winters cool (5-12°C). The region is known for its rich agricultural production.",
  },
  {
    slug: "taza",
    name: "Taza",
    nameAr: "تازة",
    lat: 34.2153, lon: -4.0053,
    region: "Fès-Meknès",
    emoji: "🌲",
    description:
      "Taza est une ville stratégique entre le Rif et le Moyen Atlas. Climat méditerranéen continental avec des hivers pluvieux et des étés chauds. Porte vers les forêts de cèdres du Moyen Atlas.",
    descriptionAr:
      "تازة مدينة استراتيجية بين الريف والأطلس المتوسط. مناخها متوسطي قاري مع شتاء ماطر وصيف حار. بوابة لغابات الأرز في الأطلس المتوسط.",
    descriptionEn:
      "Taza is a strategic city between the Rif and Middle Atlas. Its continental Mediterranean climate brings rainy winters and hot summers. Gateway to the cedar forests of the Middle Atlas.",
  },
  {
    slug: "ifrane",
    name: "Ifrane",
    nameAr: "إفران",
    lat: 33.5228, lon: -5.1075,
    region: "Fès-Meknès",
    emoji: "❄️",
    description:
      "Surnommée la 'Suisse du Maroc', Ifrane est la ville la plus froide du pays. Située à 1665m d'altitude, elle reçoit d'importantes chutes de neige en hiver. Étés frais et agréables, idéaux pour fuir la chaleur.",
    descriptionAr:
      "إفران 'سويسرا المغرب' هي أبرد مدن المملكة وأجملها. تقع على ارتفاع 1665م وتشهد تساقطاً كثيفاً للثلوج في الشتاء. الصيف منعش وجميل ومثالي للهروب من حرارة السهول.",
    descriptionEn:
      "Ifrane, 'Switzerland of Morocco', is the country's coldest city at 1665m altitude. Heavy snowfall in winter transforms it into a ski resort, while refreshing summers make it an ideal escape from the plains heat.",
  },
  {
    slug: "azrou",
    name: "Azrou",
    nameAr: "أزرو",
    lat: 33.4362, lon: -5.2224,
    region: "Fès-Meknès",
    emoji: "🌲",
    description:
      "Azrou est un village berbère à 1250m d'altitude au cœur du Moyen Atlas, entouré de forêts de cèdres. Climat montagnard avec des hivers très froids et enneigés, des étés frais et verdoyants.",
    descriptionAr:
      "أزرو قرية أمازيغية على ارتفاع 1250م في قلب الأطلس المتوسط محاطة بغابات الأرز. مناخها جبلي مع شتاء بارد جداً وثلوج وصيف منعش وأخضر.",
    descriptionEn:
      "Azrou is a Berber village at 1250m in the heart of the Middle Atlas, surrounded by cedar forests. Mountain climate with very cold snowy winters and fresh, green summers.",
  },
  {
    slug: "sefrou",
    name: "Séfrou",
    nameAr: "صفرو",
    lat: 33.8309, lon: -4.8354,
    region: "Fès-Meknès",
    emoji: "🍒",
    description:
      "Séfrou, 'la petite Fès', est réputée pour ses cerises et ses sources d'eau. Nichée dans une gorge, elle bénéficie d'un microclimat légèrement plus frais que Fès, avec de l'eau en abondance.",
    descriptionAr:
      "صفرو 'فاس الصغيرة' مشهورة بالكرز ومصادر المياه. تقع في واد وتستمتع بمناخ محلي أكثر برودة قليلاً من فاس مع وفرة مائية.",
    descriptionEn:
      "Séfrou, 'Little Fès', is renowned for its cherries and water springs. Nestled in a gorge, it enjoys a microclimate slightly cooler than Fès, with abundant water resources.",
  },

  // ── Marrakech-Safi ───────────────────────────────────────
  {
    slug: "marrakech",
    name: "Marrakech",
    nameAr: "مراكش",
    lat: 31.6295, lon: -7.9811,
    region: "Marrakech-Safi",
    emoji: "🕌",
    description:
      "La ville ocre, capitale touristique du Maroc, a un climat semi-aride chaud. Les étés sont torrides (40°C+), les hivers doux (12-20°C). Le printemps et l'automne sont idéaux pour visiter les souks et les jardins.",
    descriptionAr:
      "مراكش الحمراء العاصمة السياحية للمغرب تتميز بمناخ شبه جاف حار. الصيف قائظ (40°C وأكثر) والشتاء معتدل (12-20°C). الربيع والخريف أفضل المواسم لاستكشاف الأسواق والحدائق التاريخية.",
    descriptionEn:
      "Marrakech, the Red City and Morocco's tourism capital, has a hot semi-arid climate. Summers are scorching (40°C+), winters mild (12-20°C). Spring and autumn are the best seasons for exploring the souks and historic gardens.",
  },
  {
    slug: "essaouira",
    name: "Essaouira",
    nameAr: "الصويرة",
    lat: 31.5127, lon: -9.7695,
    region: "Marrakech-Safi",
    emoji: "💨",
    description:
      "Essaouira, cité des alizés, est la capitale mondiale du windsurf. Ses vents constants (15-25 nœuds) maintiennent une température estivale fraîche (20-25°C). Hivers doux, ciel bleu quasi permanent.",
    descriptionAr:
      "الصويرة مدينة الرياح العالمية وعاصمة ركوب الأمواج بالريح في المغرب. رياحها الدائمة (15-25 عقدة) تُبقي الصيف منعشاً (20-25°C). شتاء دافئ وسماء زرقاء شبه دائمة.",
    descriptionEn:
      "Essaouira, the City of Winds and Morocco's windsurfing capital. Its constant trade winds (15-25 knots) keep summer temperatures refreshingly cool (20-25°C). Mild winters and near-permanent blue skies.",
  },
  {
    slug: "beni-mellal",
    name: "Béni Mellal",
    nameAr: "بني ملال",
    lat: 32.3373, lon: -6.3498,
    region: "Béni Mellal-Khénifra",
    emoji: "🏞️",
    description:
      "Béni Mellal est une ville agricole au pied du Moyen Atlas. Climat méditerranéen semi-aride : étés chauds (35°C), hivers frais avec des gelées nocturnes possibles. Célèbre pour ses orangeraies.",
    descriptionAr:
      "بني ملال مدينة زراعية عند سفح الأطلس المتوسط. مناخها متوسطي شبه جاف: صيف حار (35°C) وشتاء بارد مع إمكانية الصقيع ليلاً. تشتهر بحدائق البرتقال.",
    descriptionEn:
      "Béni Mellal is an agricultural city at the foot of the Middle Atlas. Its semi-arid Mediterranean climate brings hot summers (35°C) and cool winters with possible overnight frost. Famous for its orange groves.",
  },

  // ── Oriental ────────────────────────────────────────────
  {
    slug: "oujda",
    name: "Oujda",
    nameAr: "وجدة",
    lat: 34.6814, lon: -1.9076,
    region: "Oriental",
    emoji: "🌄",
    description:
      "Oujda est la capitale de l'Oriental, aux portes de l'Algérie. Climat continental semi-aride avec des étés très chauds (38°C+) et des hivers froids. La ville est un carrefour commercial et culturel.",
    descriptionAr:
      "وجدة عاصمة الجهة الشرقية على بوابة الجزائر. مناخها قاري شبه جاف مع صيف حار جداً (38°C وأكثر) وشتاء بارد. مدينة تجارية وثقافية في ملتقى المسالك الكبرى.",
    descriptionEn:
      "Oujda is the capital of Morocco's Oriental region at the Algerian border. Its continental semi-arid climate brings very hot summers (38°C+) and cold winters. An important commercial and cultural crossroads.",
  },
  {
    slug: "nador",
    name: "Nador",
    nameAr: "الناظور",
    lat: 35.1681, lon: -2.9287,
    region: "Oriental",
    emoji: "🎣",
    description:
      "Nador est un port méditerranéen avec une lagune exceptionnelle. Climat méditerranéen agréable avec des étés chauds et secs, des hivers doux. La région est réputée pour sa pêche et ses plages.",
    descriptionAr:
      "الناظور ميناء متوسطي بحيرة بحيرة استثنائية. مناخه متوسطي لطيف مع صيف حار وجاف وشتاء معتدل. المنطقة مشهورة بالصيد والشواطئ.",
    descriptionEn:
      "Nador is a Mediterranean port with an exceptional lagoon. Pleasant Mediterranean climate with hot dry summers and mild winters. The region is renowned for fishing and beaches.",
  },
  {
    slug: "berkane",
    name: "Berkane",
    nameAr: "بركان",
    lat: 34.9206, lon: -2.3198,
    region: "Oriental",
    emoji: "🍊",
    description:
      "Berkane est célèbre pour ses clémentines et ses agrumes. Climat méditerranéen continental avec des étés chauds et des hivers frais. La Moulouya arrose cette fertile plaine agricole.",
    descriptionAr:
      "بركان مشهورة باليوسفي والحمضيات. مناخها متوسطي قاري مع صيف حار وشتاء معتدل. ملوية تروي هذه السهل الزراعي الخصيب.",
    descriptionEn:
      "Berkane is famous for its clementines and citrus fruits. Continental Mediterranean climate with hot summers and cool winters. The Moulouya river irrigates this fertile agricultural plain.",
  },
  {
    slug: "taourirt",
    name: "Taourirt",
    nameAr: "تاوريرت",
    lat: 34.4078, lon: -2.8934,
    region: "Oriental",
    emoji: "🚂",
    description:
      "Taourirt est un nœud ferroviaire entre Oujda et Fès. Climat semi-aride continental avec des étés très chauds et des hivers frais. Porte d'entrée vers le Sahara oriental.",
    descriptionAr:
      "تاوريرت عقدة سكك حديدية بين وجدة وفاس. مناخها قاري شبه جاف مع صيف حار جداً وشتاء معتدل. بوابة الصحراء الشرقية.",
    descriptionEn:
      "Taourirt is a railway junction between Oujda and Fès. Semi-arid continental climate with very hot summers and cool winters. Gateway to the eastern Sahara.",
  },

  // ── Souss-Massa ─────────────────────────────────────────
  {
    slug: "agadir",
    name: "Agadir",
    nameAr: "أكادير",
    lat: 30.4278, lon: -9.5981,
    region: "Souss-Massa",
    emoji: "🌴",
    description:
      "Agadir jouit d'un microclimat exceptionnel avec plus de 300 jours de soleil par an. C'est l'une des destinations balnéaires les plus prisées du Maroc. Les étés sont chauds et secs, les hivers très doux (18-22°C).",
    descriptionAr:
      "تتمتع أكادير بمناخ استثنائي مع أكثر من 300 يوم مشمس في السنة، مما يجعلها من أبرز الوجهات الشاطئية بالمغرب. الصيف حار وجاف والشتاء دافئ جداً (18-22°C).",
    descriptionEn:
      "Agadir enjoys an exceptional microclimate with over 300 sunny days a year, making it Morocco's top beach resort destination. Summers are hot and dry, winters very mild (18-22°C).",
  },
  {
    slug: "inezgane",
    name: "Inezgane",
    nameAr: "إنزكان",
    lat: 30.3564, lon: -9.5351,
    region: "Souss-Massa",
    emoji: "🏪",
    description:
      "Inezgane, jumelle commerciale d'Agadir, bénéficie du même microclimat exceptionnel. Marché régional animé avec des températures agréables toute l'année.",
    descriptionAr:
      "إنزكان التوأم التجاري لأكادير تتمتع بنفس المناخ الاستثنائي. سوق إقليمي نابض بالحياة ودرجات حرارة مريحة طوال السنة.",
    descriptionEn:
      "Inezgane, Agadir's commercial twin, enjoys the same exceptional microclimate. A busy regional market city with comfortable temperatures all year round.",
  },
  {
    slug: "taroudant",
    name: "Taroudant",
    nameAr: "تارودانت",
    lat: 30.4729, lon: -8.8799,
    region: "Souss-Massa",
    emoji: "🌵",
    description:
      "Taroudant, la 'petite Marrakech', est entourée de remparts ocres et d'orangeraies. Climat semi-aride chaud avec des étés très chauds (38°C), des hivers doux. Située dans la plaine du Souss.",
    descriptionAr:
      "تارودانت 'مراكش الصغيرة' محاطة بأسوار حمراء وبساتين البرتقال. مناخها شبه جاف حار مع صيف قائظ (38°C) وشتاء دافئ في سهل سوس.",
    descriptionEn:
      "Taroudant, the 'Little Marrakech', is surrounded by ochre ramparts and orange groves. Hot semi-arid climate with very hot summers (38°C) and mild winters in the Souss plain.",
  },
  {
    slug: "tiznit",
    name: "Tiznit",
    nameAr: "تيزنيت",
    lat: 29.6985, lon: -9.7323,
    region: "Souss-Massa",
    emoji: "💍",
    description:
      "Tiznit est réputée pour son artisanat en argent et ses bijoux berbères. Climat pré-saharien avec des étés très chauds et secs, des hivers doux. Porte d'entrée vers l'Anti-Atlas.",
    descriptionAr:
      "تيزنيت مشهورة بمشغولاتها الفضية والمجوهرات الأمازيغية. مناخها شبه صحراوي مع صيف حار جداً وجاف وشتاء دافئ. بوابة جبال الأطلس الصغير.",
    descriptionEn:
      "Tiznit is renowned for its silverwork and Berber jewellery. Pre-Saharan climate with very hot dry summers and mild winters. Gateway to the Anti-Atlas mountains.",
  },
  {
    slug: "taghazout",
    name: "Taghazout",
    nameAr: "تغازوت",
    lat: 30.5437, lon: -9.7098,
    region: "Souss-Massa",
    emoji: "🏄",
    description:
      "Taghazout est le paradis mondial du surf sur l'Atlantique. Spot légendaire avec des vagues régulières toute l'année. Climat côtier doux, températures de l'eau entre 18-22°C.",
    descriptionAr:
      "تغازوت جنة ركوب الأمواج على المحيط الأطلسي. موقع أسطوري بأمواج منتظمة طوال العام ومناخ ساحلي معتدل، ودرجات حرارة الماء بين 18-22°C.",
    descriptionEn:
      "Taghazout is the world's paradise for Atlantic surfing. A legendary spot with consistent waves year-round, mild coastal climate, and water temperatures between 18-22°C.",
  },

  // ── Drâa-Tafilalet ───────────────────────────────────────
  {
    slug: "ouarzazate",
    name: "Ouarzazate",
    nameAr: "ورزازات",
    lat: 30.9189, lon: -6.8934,
    region: "Drâa-Tafilalet",
    emoji: "🎬",
    description:
      "Ouarzazate, Hollywood du désert, est réputée pour ses studios de cinéma et la kasbah Aït Ben Haddou. Climat désertique : étés très chauds (38°C), hivers frais avec des nuits froides, soleil quasi permanent.",
    descriptionAr:
      "ورزازات 'هوليود الصحراء' مشهورة باستوديوهات السينما وقصبة أيت بن حدو التاريخية. مناخها صحراوي: صيف حار جداً (38°C)، شتاء بارد مع ليالٍ قارسة، وشمس شبه دائمة.",
    descriptionEn:
      "Ouarzazate, the 'Hollywood of the Desert', is famous for its film studios and the UNESCO-listed Aït Ben Haddou kasbah. Its desert climate brings very hot summers (38°C), cold winters with freezing nights, and near-constant sunshine.",
  },
  {
    slug: "errachidia",
    name: "Errachidia",
    nameAr: "الرشيدية",
    lat: 31.9318, lon: -4.4244,
    region: "Drâa-Tafilalet",
    emoji: "🏜️",
    description:
      "Errachidia est la porte du Sahara et du Tafilalet. Climat désertique extrême : étés torrides (42°C+), hivers froids (-5°C la nuit), amplitudes thermiques journalières spectaculaires.",
    descriptionAr:
      "الرشيدية بوابة الصحراء وتافيلالت. مناخها صحراوي قاسٍ: صيف لاهب (42°C وأكثر) وليالي شتاء باردة جداً (-5°C) مع تذبذب حراري يومي مذهل.",
    descriptionEn:
      "Errachidia is the gateway to the Sahara and the Tafilalet oasis. Extreme desert climate: scorching summers (42°C+), cold winter nights (-5°C), with spectacular daily temperature swings.",
  },
  {
    slug: "zagora",
    name: "Zagora",
    nameAr: "زاكورة",
    lat: 30.3321, lon: -5.8381,
    region: "Drâa-Tafilalet",
    emoji: "🐪",
    description:
      "Zagora est le point de départ des caravanes vers Tombouctou. Climat saharien intense : étés parmi les plus chauds du Maroc (45°C), hivers froids la nuit, ciel étoilé exceptionnel.",
    descriptionAr:
      "زاكورة نقطة انطلاق قوافل تمبكتو. مناخها صحراوي شديد: صيف من أحر فصول المغرب (45°C) وليالي شتاء باردة وسماء تعج بالنجوم.",
    descriptionEn:
      "Zagora is the departure point for caravans to Timbuktu. Intense Saharan climate with summers among Morocco's hottest (45°C), cold winter nights, and exceptional starry skies.",
  },
  {
    slug: "merzouga",
    name: "Merzouga",
    nameAr: "مرزوقة",
    lat: 31.0988, lon: -4.0126,
    region: "Drâa-Tafilalet",
    emoji: "🌅",
    description:
      "Merzouga est la porte des dunes de l'Erg Chebbi, les plus hautes du Maroc (150m). Climat saharien pur avec des étés extrêmement chauds, des nuits froides en hiver et des couchers de soleil époustouflants.",
    descriptionAr:
      "مرزوقة بوابة كثبان عرق الشبي، أعلى كثبان المغرب (150م). مناخها صحراوي خالص: صيف حار للغاية وليالي شتاء باردة وشروق وغروب شمس خلّابَان.",
    descriptionEn:
      "Merzouga is the gateway to the Erg Chebbi dunes, Morocco's tallest (150m). Pure Saharan climate with extremely hot summers, cold winter nights, and breathtaking sunrises and sunsets.",
  },
  {
    slug: "midelt",
    name: "Midelt",
    nameAr: "ميدلت",
    lat: 32.6783, lon: -4.7327,
    region: "Drâa-Tafilalet",
    emoji: "🍎",
    description:
      "Midelt est la 'capitale de la pomme' marocaine, à 1488m d'altitude entre le Haut et le Moyen Atlas. Climat montagnard : étés frais (28°C), hivers rigoureux avec neige. Paysages époustouflants.",
    descriptionAr:
      "ميدلت 'عاصمة التفاح' المغربية على ارتفاع 1488م بين الأطلس الكبير والمتوسط. مناخها جبلي: صيف منعش (28°C) وشتاء قارس مع ثلوج ومناظر خلّابة.",
    descriptionEn:
      "Midelt is Morocco's 'apple capital' at 1488m altitude between the High and Middle Atlas. Mountain climate: fresh summers (28°C), harsh snowy winters, and breathtaking alpine landscapes.",
  },
  {
    slug: "tinghir",
    name: "Tinghir",
    nameAr: "تنغير",
    lat: 31.5153, lon: -5.5243,
    region: "Drâa-Tafilalet",
    emoji: "🏔️",
    description:
      "Tinghir est célèbre pour les gorges du Todra, fissure spectaculaire de 300m de haut. Climat semi-désertique de montagne : étés chauds mais supportables, hivers froids, éblouissante clarté de l'air.",
    descriptionAr:
      "تنغير مشهورة بمضيق تودرا الرائع بارتفاع 300م. مناخها شبه صحراوي جبلي: صيف حار ومحتمل وشتاء بارد ووضوح جوي خلّاب.",
    descriptionEn:
      "Tinghir is famous for the Todra Gorge, a spectacular 300m-high canyon. Semi-desert mountain climate: hot but bearable summers, cold winters, and dazzlingly clear air.",
  },

  // ── Béni Mellal-Khénifra ────────────────────────────────
  {
    slug: "khouribga",
    name: "Khouribga",
    nameAr: "خريبكة",
    lat: 32.8811, lon: -6.9063,
    region: "Béni Mellal-Khénifra",
    emoji: "⛏️",
    description:
      "Khouribga est le centre mondial du phosphate. Ville intérieure au climat semi-aride continental : étés chauds (35°C), hivers frais, précipitations concentrées en hiver.",
    descriptionAr:
      "خريبكة مركز الفوسفاط العالمي. مدينة داخلية بمناخ قاري شبه جاف: صيف حار (35°C) وشتاء معتدل وأمطار متركزة في الشتاء.",
    descriptionEn:
      "Khouribga is the world centre of phosphate mining. An inland city with a continental semi-arid climate: hot summers (35°C), cool winters, and rainfall concentrated in winter.",
  },
  {
    slug: "azilal",
    name: "Azilal",
    nameAr: "أزيلال",
    lat: 31.9613, lon: -6.5715,
    region: "Béni Mellal-Khénifra",
    emoji: "💧",
    description:
      "Azilal est la porte des cascades d'Ouzoud et du plateau des lacs. Climat montagnard avec des étés agréables, des hivers froids et de nombreuses sources d'eau cristalline.",
    descriptionAr:
      "أزيلال بوابة شلالات أوزود وهضبة البحيرات. مناخها جبلي مع صيف لطيف وشتاء بارد ومصادر مياه عذبة وفيرة.",
    descriptionEn:
      "Azilal is the gateway to the Ouzoud waterfalls and the lakes plateau. Mountain climate with pleasant summers, cold winters, and abundant crystal-clear water springs.",
  },
  {
    slug: "fquih-ben-salah",
    name: "Fquih Ben Salah",
    nameAr: "الفقيه بن صالح",
    lat: 32.5023, lon: -6.688,
    region: "Béni Mellal-Khénifra",
    emoji: "🌿",
    description:
      "Fquih Ben Salah est un centre agricole dans la plaine de Tadla. Climat continental semi-aride avec des étés chauds, des hivers frais et une agriculture irriguée par l'oued Oum Er-Rbia.",
    descriptionAr:
      "الفقيه بن صالح مركز زراعي في سهل تادلة. مناخه قاري شبه جاف مع صيف حار وشتاء معتدل وزراعة مروية بمياه نهر أم الربيع.",
    descriptionEn:
      "Fquih Ben Salah is an agricultural hub in the Tadla plain. Continental semi-arid climate with hot summers, cool winters, and farming irrigated by the Oum Er-Rbia river.",
  },

  // ── Guelmim-Oued Noun ────────────────────────────────────
  {
    slug: "guelmim",
    name: "Guelmim",
    nameAr: "كلميم",
    lat: 28.9863, lon: -10.0572,
    region: "Guelmim-Oued Noun",
    emoji: "🏕️",
    description:
      "Guelmim, 'porte du désert' et carrefour des caravanes, a un climat saharien. Étés très chauds (42°C), hivers doux sur la côte, nuits fraîches. Célèbre pour son marché de dromadaires.",
    descriptionAr:
      "كلميم 'بوابة الصحراء' وملتقى القوافل مناخها صحراوي. الصيف حار جداً (42°C) والشتاء دافئ على الساحل مع ليالٍ منعشة. مشهورة بسوق الجمال.",
    descriptionEn:
      "Guelmim, the 'Gateway to the Desert' and caravan crossroads, has a Saharan climate. Very hot summers (42°C), mild coastal winters, and cool nights. Famous for its camel market.",
  },
  {
    slug: "tan-tan",
    name: "Tan-Tan",
    nameAr: "طانطان",
    lat: 28.4382, lon: -11.1024,
    region: "Guelmim-Oued Noun",
    emoji: "🐠",
    description:
      "Tan-Tan est une ville de pêche sur l'Atlantique dans le Sahara marocain. Climat côtier désertique avec des étés chauds atténués par les alizés, des hivers doux. Pêche artisanale réputée.",
    descriptionAr:
      "طانطان مدينة صيد أطلسية في الصحراء المغربية. مناخها صحراوي ساحلي مع صيف دافئ يُطيّبه الهواء الأطلسي وشتاء معتدل. الصيد الحرفي متميز.",
    descriptionEn:
      "Tan-Tan is a fishing town on the Atlantic in Morocco's Sahara. Coastal desert climate with warm summers moderated by Atlantic trade winds and mild winters. Known for artisanal fishing.",
  },
  {
    slug: "sidi-ifni",
    name: "Sidi Ifni",
    nameAr: "سيدي إفني",
    lat: 29.3789, lon: -10.1726,
    region: "Guelmim-Oued Noun",
    emoji: "🌴",
    description:
      "Sidi Ifni, ancienne enclave espagnole, est une ville balnéaire à l'architecture art déco. Climat atlantique doux avec un brouillard marin fréquent et des températures stables (15-25°C).",
    descriptionAr:
      "سيدي إفني الجيب الإسباني السابق مدينة شاطئية بعمارة آرت ديكو. مناخها أطلسي معتدل مع ضباب بحري متكرر ودرجات حرارة مستقرة (15-25°C).",
    descriptionEn:
      "Sidi Ifni, former Spanish enclave, is a seaside city with art deco architecture. Mild Atlantic climate with frequent sea fog and stable temperatures (15-25°C).",
  },

  // ── Laâyoune-Sakia El Hamra ──────────────────────────────
  {
    slug: "laayoune",
    name: "Laâyoune",
    nameAr: "العيون",
    lat: 27.1418, lon: -13.1799,
    region: "Laâyoune-Sakia El Hamra",
    emoji: "🌇",
    description:
      "Laâyoune est la capitale du Sahara marocain. Climat désertique côtier avec des températures modérées par l'Atlantique (20-30°C). Ensoleillement quasi permanent et vent régulier.",
    descriptionAr:
      "العيون عاصمة الصحراء المغربية. مناخها صحراوي ساحلي مع درجات حرارة معتدلة بفضل تأثير المحيط الأطلسي (20-30°C). إشراق شمسي شبه دائم ورياح منتظمة.",
    descriptionEn:
      "Laâyoune is the capital of Morocco's Sahara region. Its coastal desert climate is moderated by the Atlantic Ocean (20-30°C). Near-constant sunshine and regular winds characterize the city year-round.",
  },
  {
    slug: "boujdour",
    name: "Boujdour",
    nameAr: "بوجدور",
    lat: 26.1255, lon: -14.4851,
    region: "Laâyoune-Sakia El Hamra",
    emoji: "🌊",
    description:
      "Boujdour, ville côtière saharienne, est réputée pour ses eaux poissonneuses. Climat désertique atlantique avec des températures modérées (18-28°C) et un fort ensoleillement toute l'année.",
    descriptionAr:
      "بوجدور مدينة صحراوية ساحلية تشتهر بمياهها السمكية الثرية. مناخها صحراوي أطلسي مع درجات حرارة معتدلة (18-28°C) وإشراق شمسي وفير طوال العام.",
    descriptionEn:
      "Boujdour is a Saharan coastal city renowned for its rich fishing waters. Atlantic desert climate with moderate temperatures (18-28°C) and abundant sunshine throughout the year.",
  },

  // ── Dakhla-Oued Ed-Dahab ─────────────────────────────────
  {
    slug: "dakhla",
    name: "Dakhla",
    nameAr: "الداخلة",
    lat: 23.6848, lon: -15.9572,
    region: "Dakhla-Oued Ed-Dahab",
    emoji: "🏄",
    description:
      "Dakhla est la capitale mondiale du kitesurf. Sa lagune bleue de 40 km offre des conditions exceptionnelles : vent constant, eau plate, soleil 350 jours/an. Températures agréables toute l'année (22-32°C).",
    descriptionAr:
      "الداخلة عاصمة رياضة الكايتسيرف في العالم. بحيرتها الزرقاء الممتدة على 40 كم توفر ظروفاً استثنائية: رياح دائمة، مياه هادئة، وشمس تُشرق 350 يوماً في السنة. درجات حرارة مثالية طوال العام (22-32°C).",
    descriptionEn:
      "Dakhla is the world capital of kitesurfing. Its 40km blue lagoon offers exceptional conditions: constant wind, flat water, and 350 sunny days a year. Pleasant temperatures year-round (22-32°C).",
  },

  // ── Additional important cities ──────────────────────────
  {
    slug: "khemisset",
    name: "Khémisset",
    nameAr: "الخميسات",
    lat: 33.8242, lon: -6.0655,
    region: "Rabat-Salé-Kénitra",
    emoji: "🌾",
    description:
      "Khémisset est un centre commercial et agricole entre Rabat et Meknès. Climat méditerranéen légèrement continental avec des étés chauds et des hivers frais.",
    descriptionAr:
      "الخميسات مركز تجاري وزراعي بين الرباط ومكناس. مناخه متوسطي شبه قاري مع صيف حار وشتاء معتدل.",
    descriptionEn:
      "Khémisset is a commercial and agricultural hub between Rabat and Meknès. Slightly continental Mediterranean climate with hot summers and cool winters.",
  },
  {
    slug: "ksar-el-kebir",
    name: "Ksar El Kébir",
    nameAr: "القصر الكبير",
    lat: 35.0, lon: -5.9,
    region: "Tanger-Tétouan-Al Hoceïma",
    emoji: "🌉",
    description:
      "Ksar El Kébir est une ville historique sur l'Oued Loukkouss. Climat méditerranéen avec des étés chauds et secs, des hivers doux et pluvieux. Région agricole productive.",
    descriptionAr:
      "القصر الكبير مدينة تاريخية على وادي اللوكوس. مناخها متوسطي مع صيف حار وجاف وشتاء دافئ وماطر. منطقة زراعية منتجة.",
    descriptionEn:
      "Ksar El Kébir is a historic city on the Loukkouss river. Mediterranean climate with hot dry summers and mild rainy winters. A productive agricultural region.",
  },
  {
    slug: "figuig",
    name: "Figuig",
    nameAr: "فجيج",
    lat: 32.1044, lon: -1.2296,
    region: "Oriental",
    emoji: "🌴",
    description:
      "Figuig est une oasis saharienne aux palmiers millénaires à la frontière algérienne. Climat désertique continental extrême : étés torrides (45°C), hivers froids (-5°C la nuit). Sources jaillissantes miraculeuses.",
    descriptionAr:
      "فجيج واحة صحراوية بنخيل عريقة على الحدود الجزائرية. مناخها صحراوي قاري متطرف: صيف لاهب (45°C) وليالي شتاء باردة جداً (-5°C) وينابيع طبيعية رائعة.",
    descriptionEn:
      "Figuig is a Saharan oasis with ancient palm trees on the Algerian border. Extreme continental desert climate: scorching summers (45°C), very cold winter nights (-5°C), and miraculous natural springs.",
  },
  {
    slug: "benguerir",
    name: "Ben Guerir",
    nameAr: "بن جرير",
    lat: 32.2336, lon: -7.9573,
    region: "Marrakech-Safi",
    emoji: "⚡",
    description:
      "Ben Guerir, ville nouvelle entre Marrakech et Casablanca, est le siège de l'Université Mohammed VI Polytechnique. Climat semi-aride avec de forts ensoleillement, propice au solaire.",
    descriptionAr:
      "بن جرير مدينة حديثة بين مراكش والدار البيضاء وتضم جامعة محمد السادس للعلوم والتقنيات. مناخها شبه جاف مع إشراق شمسي وفير يُيسّر الطاقة الشمسية.",
    descriptionEn:
      "Ben Guerir is a modern city between Marrakech and Casablanca, home to Mohammed VI Polytechnic University. Semi-arid climate with abundant sunshine, ideal for solar energy.",
  },
  {
    slug: "youssoufia",
    name: "Youssoufia",
    nameAr: "اليوسفية",
    lat: 32.2463, lon: -8.5268,
    region: "Marrakech-Safi",
    emoji: "⛏️",
    description:
      "Youssoufia est une ville minière (phosphates) entre Safi et Marrakech. Climat semi-aride : étés chauds, hivers frais, précipitations modérées en hiver.",
    descriptionAr:
      "اليوسفية مدينة تعدينية (فوسفاط) بين آسفي ومراكش. مناخها شبه جاف: صيف حار وشتاء معتدل وأمطار معتدلة في الشتاء.",
    descriptionEn:
      "Youssoufia is a mining town (phosphates) between Safi and Marrakech. Semi-arid climate: hot summers, cool winters, and moderate winter rainfall.",
  },
  {
    slug: "oued-zem",
    name: "Oued Zem",
    nameAr: "واد زم",
    lat: 32.8614, lon: -6.5712,
    region: "Béni Mellal-Khénifra",
    emoji: "🏭",
    description:
      "Oued Zem est une ville industrielle dans la plaine du Chaouia-Ouardigha. Climat continental semi-aride avec des étés chauds et des hivers frais. Important centre d'industrie légère.",
    descriptionAr:
      "واد زم مدينة صناعية في سهل الشاوية الوارديغة. مناخها قاري شبه جاف مع صيف حار وشتاء معتدل. مركز صناعة خفيفة مهم.",
    descriptionEn:
      "Oued Zem is an industrial city in the Chaouia-Ouardigha plain. Continental semi-arid climate with hot summers and cool winters. An important light-industry centre.",
  },
  {
    slug: "tiflet",
    name: "Tiflet",
    nameAr: "تيفلت",
    lat: 33.8953, lon: -6.3045,
    region: "Rabat-Salé-Kénitra",
    emoji: "🛤️",
    description:
      "Tiflet est une ville carrefour entre Rabat et Meknès. Climat méditerranéen légèrement continental, étés chauds, hivers frais. Zone résidentielle en développement rapide.",
    descriptionAr:
      "تيفلت مدينة ملتقى طرق بين الرباط ومكناس. مناخها متوسطي شبه قاري مع صيف حار وشتاء معتدل. منطقة سكنية في نمو متسارع.",
    descriptionEn:
      "Tiflet is a crossroads city between Rabat and Meknès. Slightly continental Mediterranean climate with hot summers and cool winters. A rapidly developing residential area.",
  },
  {
    slug: "smara",
    name: "Smara",
    nameAr: "السمارة",
    lat: 26.7356, lon: -11.676,
    region: "Laâyoune-Sakia El Hamra",
    emoji: "🏛️",
    description:
      "Smara est une ville saharienne historique fondée par Ma el-Ainine. Climat désertique continental : étés très chauds, hivers froids la nuit, vents de sable fréquents, ensoleillement maximum.",
    descriptionAr:
      "السمارة مدينة صحراوية تاريخية أسسها ماء العينين. مناخها صحراوي قاري: صيف حار جداً وليالي شتاء باردة ورياح رملية متكررة وإشراق شمسي أقصاه.",
    descriptionEn:
      "Smara is a historic Saharan city founded by Ma el-Ainine. Continental desert climate: very hot summers, cold winter nights, frequent sandstorms, and maximum sunshine.",
  },
];

// Fast lookup by slug
export const CITIES_BY_SLUG = Object.fromEntries(
  MOROCCAN_CITIES.map((c) => [c.slug, c])
);

// All slugs for generateStaticParams
export const ALL_CITY_SLUGS = MOROCCAN_CITIES.map((c) => c.slug);
