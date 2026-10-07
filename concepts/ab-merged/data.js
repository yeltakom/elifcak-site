// PLACEHOLDER IMAGES are low-res crops from Instagram; replace with Elif's originals.
// CONTENT — replace placeholders with Elif's real objects and photos.
// img: "../../img/014.jpg" etc. Without img, a tone gradient stands in.
// price: null  → archive piece (shown in Index, not in Shop).
// stock: 0 with a price → made to order.
const TONES={rose:["#d8b8ba","#7d5a5e"],por:["#f2f1ed","#b8b6af"],ash:["#bdbbb4","#64625d"],clear:["#e1e8e8","#93a5a6"],smoke:["#8f8b8a","#3c3838"],hot:["#ffb08a","#c2421a"]};
const OBJECTS=[
  {n:"014",name:{en:"Spiked Vessel",de:"Gefäß mit Dornen"},mat:"porcelain",dims:"Ø 14 × 16 cm",year:2026,price:280,stock:1,tone:TONES.por,img:"../../img/014-spiked.jpg",
   d:{en:"Slip-cast porcelain, each spike set by hand. Unglazed outside, glazed inside. Food safe.",de:"Gegossenes Porzellan, jeder Dorn von Hand gesetzt. Außen unglasiert, innen glasiert. Lebensmittelecht."}},
  {n:"015",name:{en:"Smoked Rose Goblet",de:"Kelch, Rauchrosa"},mat:"glass",dims:"Ø 9 × 18 cm",year:2026,price:149,stock:3,tone:TONES.rose,img:"../../img/015-goblet.jpg",
   d:{en:"Mouth-blown glass with a pressed, uneven base. Sold individually. Hand wash.",de:"Mundgeblasenes Glas mit gepresstem, unebenem Fuß. Einzeln verkauft. Handwäsche."}},
  {n:"016",name:{en:"Pressed Plate",de:"Gepresster Teller"},mat:"porcelain",dims:"Ø 26 cm",year:2026,price:120,stock:2,tone:TONES.ash,img:"../../img/016-plate.jpg",
   d:{en:"Porcelain pressed by hand while soft; the fingerprints stay in the rim. Dishwasher safe.",de:"Porzellan, im weichen Zustand von Hand gepresst; die Fingerabdrücke bleiben im Rand. Spülmaschinenfest."}},
  {n:"017",name:{en:"Bubble Form",de:"Blasenform"},mat:"porcelain",dims:"22 × 16 × 9 cm",year:2025,price:340,stock:0,tone:TONES.por,img:"../../img/017-bubble.jpg",
   d:{en:"Sculptural porcelain. Made to order, 4–6 weeks; every surface comes out different.",de:"Skulpturales Porzellan. Auf Bestellung, 4–6 Wochen; jede Oberfläche wird anders."}},
  {n:"012",name:{en:"Clear Carafe",de:"Klare Karaffe"},mat:"glass",dims:"1 L",year:2025,price:null,stock:0,tone:TONES.clear,img:"../../img/012-carafe.jpg"},
  {n:"009",name:{en:"Hot Glass Study",de:"Studie, heißes Glas"},mat:"glass",dims:"Ø 12 cm",year:2025,price:null,stock:0,tone:TONES.hot,img:"../../img/009-hotglass.jpg"},
  {n:"006",name:{en:"Gilded Bowl",de:"Vergoldete Schale"},mat:"porcelain",dims:"Ø 18 cm",year:2024,price:null,stock:0,tone:TONES.smoke,img:"../../img/006-chrome.jpg"}
];
// Process images for the dark "touch" strip.
const PROCESS=[
  {cap:{en:"Pressed",de:"Gepresst"},tone:TONES.por,img:"../../img/p-pressed.jpg"},
  {cap:{en:"Blown",de:"Geblasen"},tone:TONES.hot,img:"../../img/p-blown.jpg"},
  {cap:{en:"Pinched",de:"Gekniffen"},tone:TONES.rose,img:"../../img/p-pinched.jpg"},
  {cap:{en:"Held",de:"Gehalten"},tone:TONES.ash,img:"../../img/p-held.jpg"}
];
