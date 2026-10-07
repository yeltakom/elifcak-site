// PLACEHOLDER CONTENT. Images are low-res crops from Elif's Instagram grid; names, sizes and prices are invented.
// Replace with real objects + original photos before launch.
// col: "tableware" (open editions, priced) | "objects" (1/1 collectibles, price:null → Inquire)
const IMG = p => `../img/${p}.jpg`;
const OBJECTS = [
  {n:"015",col:"tableware",mat:"glass",name:{en:"Smoked Rose Goblet",de:"Kelch Rauchrosa"},colour:"Smoked Rose ~ Clear",dims:"Ø 9 × H 11 cm · 320 ml",year:2026,price:149,stock:6,
   imgs:["015-goblet"],situ:["e-studio"],d:{en:"Mouth-blown, with a heavy base that keeps the press of the tool. Sold individually.",de:"Mundgeblasen, mit schwerem Boden, der den Abdruck des Werkzeugs behält. Einzeln erhältlich."}},
  {n:"016",col:"tableware",mat:"porcelain",name:{en:"Pressed Plate",de:"Gepresster Teller"},colour:"Bone",dims:"Ø 26 cm",year:2026,price:120,stock:4,
   imgs:["016-plate"],situ:["018-service"],d:{en:"Pressed by hand while the clay is soft. The thumb marks stay in the rim.",de:"Von Hand gepresst, solange der Ton weich ist. Die Daumenabdrücke bleiben im Rand."}},
  {n:"018",col:"tableware",mat:"porcelain",name:{en:"Pebble Service",de:"Kiesel-Service"},colour:"Bone ~ Ash ~ Ink",dims:"Set of 5 · 8–16 cm",year:2026,price:240,stock:2,
   imgs:["018-service"],situ:["016-plate"],d:{en:"Five pinched dishes for small bites. No two hold the same amount.",de:"Fünf gekniffene Schälchen für kleine Happen. Keines fasst dieselbe Menge."}},
  {n:"012",col:"tableware",mat:"glass",name:{en:"Clear Carafe",de:"Klare Karaffe"},colour:"Clear",dims:"H 19 cm · 1 L",year:2025,price:190,stock:3,
   imgs:["012-carafe"],situ:["p-held"],d:{en:"Blown thin. The lip is folded by hand so it pours without dripping.",de:"Dünn geblasen. Die Lippe ist von Hand gefaltet, damit nichts tropft."}},
  {n:"019",col:"tableware",mat:"glass",name:{en:"Wave Bowl",de:"Wellenschale"},colour:"Clear",dims:"Ø 14 cm",year:2025,price:95,stock:5,
   imgs:["019-wave"],situ:["p-blown"],d:{en:"A clear bowl with a base pinched into ridges while hot.",de:"Eine klare Schale, deren Boden heiß zu Graten gekniffen wurde."}},
  {n:"020",col:"tableware",mat:"porcelain",name:{en:"Ink Cup",de:"Tintentasse"},colour:"Bone",dims:"Ø 11 cm · 120 ml",year:2025,price:68,stock:8,
   imgs:["020-ink"],situ:["e-rainbow"],d:{en:"A wide espresso cup, thrown thick and turned thin at the lip.",de:"Eine breite Espressotasse, dick gedreht und am Rand dünn abgedreht."}},
  {n:"014",col:"objects",mat:"porcelain",name:{en:"Spiked Vessel",de:"Gefäß mit Dornen"},colour:"Bone",dims:"28 × 19 × 7 cm",year:2026,price:null,stock:1,
   imgs:["014-spiked"],situ:["p-pressed"],d:{en:"One of one. Each spike is set by hand into the wet body.",de:"Unikat. Jeder Dorn wird von Hand in den feuchten Körper gesetzt."}},
  {n:"017",col:"objects",mat:"porcelain",name:{en:"Bubble Form",de:"Blasenform"},colour:"Bone",dims:"24 × 17 × 9 cm",year:2025,price:null,stock:1,
   imgs:["017-bubble"],situ:["p-pressed"],d:{en:"One of one. A tray grown from small pressed spheres.",de:"Unikat. Eine Schale aus kleinen gepressten Kugeln."}},
  {n:"021",col:"objects",mat:"porcelain",name:{en:"Coral",de:"Koralle"},colour:"Bone",dims:"H 32 cm",year:2025,price:null,stock:1,
   imgs:["021-coral"],situ:["e-studio"],d:{en:"One of one. Built in layers over several weeks.",de:"Unikat. Über mehrere Wochen in Schichten aufgebaut."}},
  {n:"022",col:"objects",mat:"porcelain",name:{en:"Spore",de:"Spore"},colour:"Blush",dims:"Ø 21 cm",year:2025,price:null,stock:1,
   imgs:["022-spore"],situ:["e-holo"],d:{en:"One of one. Several hundred hand-set points, tinted after firing.",de:"Unikat. Mehrere hundert handgesetzte Spitzen, nach dem Brand getönt."}},
  {n:"006",col:"objects",mat:"porcelain",name:{en:"Gilded Bowl",de:"Vergoldete Schale"},colour:"Gold lustre",dims:"Ø 18 cm",year:2024,price:null,stock:1,
   imgs:["006-chrome"],situ:["023-chrome"],d:{en:"One of one. Lustre fired in a third kiln firing.",de:"Unikat. Lüster im dritten Brand."}},
  {n:"009",col:"objects",mat:"glass",name:{en:"Hot Glass Study",de:"Studie, heißes Glas"},colour:"Amber ~ Orange",dims:"Ø 12 cm",year:2025,price:null,stock:1,
   imgs:["009-hotglass"],situ:["e-amber"],d:{en:"One of one. Left as it cooled on the marver.",de:"Unikat. So belassen, wie es auf dem Marbel abkühlte."}},
  {n:"024",col:"objects",mat:"porcelain",name:{en:"Skin",de:"Haut"},colour:"Blush ~ Rust",dims:"30 × 22 cm",year:2024,price:null,stock:1,
   imgs:["024-skin"],situ:["e-gloves"],d:{en:"One of one. A thin slab, stretched by hand before firing.",de:"Unikat. Eine dünne Platte, vor dem Brand von Hand gedehnt."}}
];
const EDITORIAL = { // home page blocks
  hero:{img:"016-plate",eyebrow:{en:"New",de:"Neu"},title:{en:"Pressed Plate",de:"Gepresster Teller"},href:"#/p/016"},
  single:{img:"015-goblet",eyebrow:{en:"Drinkware",de:"Gläser"},title:{en:"Smoked Rose Goblet",de:"Kelch Rauchrosa"},href:"#/p/015"},
  pair:[{img:"014-spiked",eyebrow:{en:"One of one",de:"Unikate"},title:{en:"Objects",de:"Objekte"},href:"#/shop/objects"},
        {img:"p-blown",eyebrow:{en:"Explore",de:"Entdecken"},title:{en:"Process",de:"Prozess"},href:"#/process"}],
  trio:[{img:"portrait",cap:{en:"Studio, Berlin",de:"Atelier, Berlin"}},{img:"e-rings",cap:{en:"Porcelain rings",de:"Porzellanringe"}},{img:"e-holo",cap:{en:"Glass, packed",de:"Glas, verpackt"}}]
};
const PROCESS = [
  {img:"p-pressed",cap:{en:"Pressed",de:"Gepresst"},t:{en:"Porcelain is pressed by hand while still soft.",de:"Porzellan wird von Hand gepresst, solange es weich ist."}},
  {img:"p-blown",cap:{en:"Blown",de:"Geblasen"},t:{en:"Glass is gathered, blown and shaped at the bench.",de:"Glas wird aufgenommen, geblasen und an der Bank geformt."}},
  {img:"009-hotglass",cap:{en:"Hot",de:"Heiß"},t:{en:"Some pieces are left as they cooled.",de:"Manche Stücke bleiben, wie sie abgekühlt sind."}},
  {img:"p-pinched",cap:{en:"Pinched",de:"Gekniffen"},t:{en:"Small dishes are pinched one by one.",de:"Kleine Schälchen werden einzeln gekniffen."}},
  {img:"p-held",cap:{en:"Held",de:"Gehalten"},t:{en:"Everything is made to be picked up.",de:"Alles ist gemacht, um in die Hand genommen zu werden."}},
  {img:"e-studio",cap:{en:"Studio",de:"Atelier"},t:{en:"Neukölln, Berlin.",de:"Neukölln, Berlin."}}
];
