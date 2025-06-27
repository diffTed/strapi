// Complete attribute data with Russian translations
const { completeValueTranslations } = require("./complete-value-translations");

const completeAttributeData = {
  "fragrance-family": {
    category: "fragrance-family",
    selectionType: "multi",
    sortOrder: 1,
    labels: {
      en: {
        label: "Fragrance Family",
        description: "Describes the core scent identity",
      },
      lt: {
        label: "Kvapo šeima",
        description: "Aprašo pagrindinį kvapo tapatumą",
      },
      lv: {
        label: "Smaržu saime",
        description: "Apraksta galveno smaržu identitāti",
      },
      et: {
        label: "Lõhna perekond",
        description: "Kirjeldab põhilist lõhna identiteeti",
      },
      pl: {
        label: "Rodzina zapachowa",
        description: "Opisuje podstawową tożsamość zapachu",
      },
      de: {
        label: "Duftfamilie",
        description: "Beschreibt die Kern-Duftidentität",
      },
      ru: {
        label: "Семейство ароматов",
        description: "Описывает основную идентичность аромата",
      },
    },
    values: [
      "oud",
      "amber",
      "oriental",
      "woody",
      "floral",
      "spicy",
      "musky",
      "balsamic",
      "citrus",
      "fresh",
      "aquatic",
      "sweet",
      "green",
      "fruity",
      "leather",
      "gourmand",
      "earthy",
      "powdery",
      "aromatic",
      "herbal",
      "resinous",
      "smoky",
      "animalic",
      "metallic",
      "incense",
      "aldehydic",
      "chypre",
      "fougere",
    ],
  },

  accords: {
    category: "accords",
    selectionType: "multi",
    sortOrder: 2,
    labels: {
      en: {
        label: "Accords",
        description: "Describes the scent personality and emotional experience",
      },
      lt: {
        label: "Akordai",
        description: "Aprašo kvapo asmenybę ir emocinį patyrimą",
      },
      lv: {
        label: "Akordi",
        description: "Apraksta smaržu personību un emocionālo pieredzi",
      },
      et: {
        label: "Akordid",
        description: "Kirjeldab lõhna isiksust ja emotsionaalset kogemust",
      },
      pl: {
        label: "Akordy",
        description: "Opisuje osobowość zapachu i doświadczenie emocjonalne",
      },
      de: {
        label: "Akkorde",
        description:
          "Beschreibt die Duftpersönlichkeit und emotionale Erfahrung",
      },
      ru: {
        label: "Аккорды",
        description: "Описывает характер аромата и эмоциональный опыт",
      },
    },
    values: [
      "smoky",
      "sweet",
      "animalic",
      "earthy",
      "metallic",
      "creamy",
      "warm",
      "spicy",
      "cool",
      "bright",
      "soft",
      "dense",
      "sharp",
      "powdery",
      "silky",
      "resinous",
      "caramelic",
      "gourmand",
      "woody",
      "zesty",
      "honeyed",
      "floral",
      "medicinal",
      "incense-like",
      "mossy",
      "bready",
      "mineral",
      "bubbly",
      "butter-like",
      "nutty",
      "musky",
      "sharp-green",
      "icy",
    ],
  },

  "notes-top": {
    category: "notes",
    subcategory: "top",
    selectionType: "multi",
    sortOrder: 3,
    labels: {
      en: {
        label: "Top Notes",
        description: "First impression notes that appear immediately",
      },
      lt: {
        label: "Viršutinės natos",
        description: "Pirmojo įspūdžio natos, kurios atsiranda iš karto",
      },
      lv: {
        label: "Augšējās notis",
        description: "Pirmā iespaida notis, kas parādās uzreiz",
      },
      et: {
        label: "Ülemised noodid",
        description: "Esmamulje noodid, mis ilmuvad kohe",
      },
      pl: {
        label: "Nuty głowy",
        description:
          "Nuty pierwszego wrażenia, które pojawiają się natychmiast",
      },
      de: {
        label: "Kopfnoten",
        description: "Erste Eindruck-Noten, die sofort erscheinen",
      },
      ru: {
        label: "Верхние ноты",
        description: "Ноты первого впечатления, которые появляются немедленно",
      },
    },
    values: [
      "bergamot",
      "lemon",
      "orange",
      "grapefruit",
      "saffron",
      "lavender",
      "pink-pepper",
      "mint",
      "cardamom",
      "neroli",
      "basil",
      "green-apple",
      "ginger",
      "galbanum",
      "cypress",
      "artemisia",
    ],
  },

  "country-of-origin": {
    category: "country-origin",
    selectionType: "single",
    sortOrder: 5,
    labels: {
      en: {
        label: "Country of Origin",
        description: "The GCC country where this product originates from",
      },
      lt: {
        label: "Kilmės šalis",
        description: "ŠKT šalis, iš kurios kilęs šis produktas",
      },
      lv: {
        label: "Izcelsmes valsts",
        description: "ŠKP valsts, no kuras nāk šis produkts",
      },
      et: {
        label: "Päritolumaa",
        description: "ŠKN riik, kust see toode pärineb",
      },
      pl: {
        label: "Kraj pochodzenia",
        description:
          "Kraj Rady Współpracy Zatoki Perskiej, z którego pochodzi ten produkt",
      },
      de: {
        label: "Herkunftsland",
        description: "Das GCC-Land, aus dem dieses Produkt stammt",
      },
      ru: {
        label: "Страна происхождения",
        description: "Страна ССАГПЗ, откуда происходит этот продукт",
      },
    },
    values: ["uae", "saudi-arabia", "qatar", "kuwait", "bahrain", "oman"],
  },

  "notes-heart": {
    category: "notes",
    subcategory: "heart",
    selectionType: "multi",
    sortOrder: 7,
    labels: {
      en: {
        label: "Heart Notes",
        description: "Middle notes that form the main body of the fragrance",
      },
      lt: {
        label: "Širdies natos",
        description: "Vidurinės natos, kurios sudaro pagrindinį kvapo kūną",
      },
      lv: {
        label: "Sirds notis",
        description: "Vidējās notis, kas veido galveno smaržu ķermeni",
      },
      et: {
        label: "Südamenoodid",
        description: "Keskmised noodid, mis moodustavad lõhna põhikeha",
      },
      pl: {
        label: "Nuty serca",
        description: "Nuty środkowe tworzące główny korpus zapachu",
      },
      de: {
        label: "Herznoten",
        description: "Mittlere Noten, die den Hauptkörper des Duftes bilden",
      },
      ru: {
        label: "Ноты сердца",
        description: "Средние ноты, которые формируют основное тело аромата",
      },
    },
    values: [
      "rose-taif",
      "rose-turkish",
      "rose-bulgarian",
      "jasmine-sambac",
      "jasmine-grandiflorum",
      "patchouli",
      "cinnamon",
      "ylang-ylang",
      "geranium",
      "carnation",
      "nutmeg",
      "clove",
      "violet",
      "tuberose",
      "freesia",
      "tea",
      "incense",
      "cashmeran",
      "olibanum",
      "orris-root",
    ],
  },

  "notes-base": {
    category: "notes",
    subcategory: "base",
    selectionType: "multi",
    sortOrder: 8,
    labels: {
      en: {
        label: "Base Notes",
        description: "Foundation notes that provide depth and longevity",
      },
      lt: {
        label: "Bazinės natos",
        description: "Pagrindo natos, suteikiančios gylį ir ilgaamžiškumą",
      },
      lv: {
        label: "Bāzes notis",
        description: "Pamata notis, kas nodrošina dziļumu un ilgmūžību",
      },
      et: {
        label: "Baasnooodid",
        description: "Aluse noodid, mis annavad sügavust ja püsivust",
      },
      pl: {
        label: "Nuty bazy",
        description: "Nuty podstawowe zapewniające głębię i trwałość",
      },
      de: {
        label: "Basisnoten",
        description: "Grundnoten, die Tiefe und Langlebigkeit verleihen",
      },
      ru: {
        label: "Базовые ноты",
        description: "Основные ноты, обеспечивающие глубину и стойкость",
      },
    },
    values: [
      "oud-cambodian",
      "oud-indian",
      "oud-laotian",
      "sandalwood",
      "musk-white",
      "musk-deer",
      "musk-synthetic",
      "amber",
      "vanilla",
      "tonka-bean",
      "labdanum",
      "leather",
      "civet",
      "cedarwood",
      "benzoin",
      "myrrh",
      "oakmoss",
      "tobacco",
      "frankincense",
      "vetiver",
    ],
  },

  "perfume-type": {
    category: "perfume-type",
    selectionType: "single",
    sortOrder: 9,
    labels: {
      en: {
        label: "Perfume Type",
        description: "Concentration and type of fragrance",
      },
      lt: {
        label: "Kvepalų tipas",
        description: "Kvapo koncentracija ir tipas",
      },
      lv: {
        label: "Parfīma tips",
        description: "Smaržu koncentrācija un tips",
      },
      et: {
        label: "Parfüümi tüüp",
        description: "Lõhna kontsentratsioon ja tüüp",
      },
      pl: { label: "Typ perfum", description: "Koncentracja i typ zapachu" },
      de: {
        label: "Parfümtyp",
        description: "Konzentration und Art des Duftes",
      },
      ru: { label: "Тип парфюма", description: "Концентрация и тип аромата" },
    },
    values: [
      "edp",
      "edt",
      "edc",
      "parfum",
      "attar",
      "solid-perfume",
      "body-spray",
      "hair-mist",
    ],
  },

  projection: {
    category: "projection",
    selectionType: "single",
    sortOrder: 10,
    labels: {
      en: {
        label: "Projection",
        description: "How far the fragrance projects from the skin",
      },
      lt: {
        label: "Projekcija",
        description: "Kaip toli kvapas sklinda nuo odos",
      },
      lv: {
        label: "Projekcija",
        description: "Cik tālu smarža izplatās no ādas",
      },
      et: {
        label: "Projektsioon",
        description: "Kui kaugele lõhn nahalt levib",
      },
      pl: {
        label: "Projekcja",
        description: "Jak daleko zapach unosi się od skóry",
      },
      de: {
        label: "Projektion",
        description: "Wie weit sich der Duft von der Haut ausbreitet",
      },
      ru: {
        label: "Проекция",
        description: "Насколько далеко аромат распространяется от кожи",
      },
    },
    values: ["skin-scent", "moderate", "strong", "heavy"],
  },

  longevity: {
    category: "longevity",
    selectionType: "single",
    sortOrder: 11,
    labels: {
      en: {
        label: "Longevity",
        description: "How long the fragrance lasts on the skin",
      },
      lt: {
        label: "Ilgaamžiškumas",
        description: "Kiek laiko kvapas išlieka ant odos",
      },
      lv: {
        label: "Ilgmūžība",
        description: "Cik ilgi smarža saglabājas uz ādas",
      },
      et: { label: "Püsivus", description: "Kui kaua lõhn nahal püsib" },
      pl: {
        label: "Trwałość",
        description: "Jak długo zapach utrzymuje się na skórze",
      },
      de: {
        label: "Haltbarkeit",
        description: "Wie lange der Duft auf der Haut anhält",
      },
      ru: {
        label: "Стойкость",
        description: "Как долго аромат держится на коже",
      },
    },
    values: [
      "2-4-hours",
      "4-6-hours",
      "6-8-hours",
      "8-12-hours",
      "12-plus-hours",
    ],
  },

  gender: {
    category: "gender",
    selectionType: "single",
    sortOrder: 12,
    labels: {
      en: {
        label: "Gender Suitability",
        description: "Target gender for the fragrance",
      },
      lt: { label: "Lyties tinkamumas", description: "Tikslinė kvapų lytis" },
      lv: {
        label: "Dzimuma piemērotība",
        description: "Mērķa dzimums smaržām",
      },
      et: { label: "Soo sobivus", description: "Lõhna sihtgrupi sugu" },
      pl: {
        label: "Odpowiedniość płci",
        description: "Docelowa płeć dla zapachu",
      },
      de: {
        label: "Geschlechtseignung",
        description: "Zielgeschlecht für den Duft",
      },
      ru: {
        label: "Гендерная принадлежность",
        description: "Целевой пол для аромата",
      },
    },
    values: ["masculine", "feminine", "unisex"],
  },

  occasions: {
    category: "occasions",
    selectionType: "multi",
    sortOrder: 10,
    labels: {
      en: {
        label: "Occasion",
        description: "Suitable occasions for wearing this fragrance",
      },
      lt: { label: "Proga", description: "Tinkamos progos šiam kvapui dėvėti" },
      lv: {
        label: "Gadījums",
        description: "Piemēroti gadījumi šo smaržu valkāšanai",
      },
      et: {
        label: "Puhk",
        description: "Sobivad puhud selle lõhna kandmiseks",
      },
      pl: {
        label: "Okazja",
        description: "Odpowiednie okazje do noszenia tego zapachu",
      },
      de: {
        label: "Anlass",
        description: "Geeignete Anlässe für das Tragen dieses Duftes",
      },
      ru: {
        label: "Повод",
        description: "Подходящие случаи для ношения этого аромата",
      },
    },
    values: [
      "everyday",
      "evening",
      "romantic",
      "spiritual",
      "weddings",
      "office-friendly",
      "summer-party",
      "winter-cozy",
      "formal",
      "gifting",
    ],
  },
};

module.exports = { completeAttributeData, completeValueTranslations };
