// Everything a guest reads on the site lives in this file: the hotel's details,
// rooms, dining, offers and directions. Change it here and every page follows.
// All names, places and numbers below are fictional placeholders.

export type Palette = {
  wall: string;
  floor: string;
  linen: string;
  throw: string;
  wood: string;
};

export type Room = {
  slug: string;
  number: string;
  name: string;
  kind: string;
  summary: string;
  description: string[];
  size: string;
  beds: string;
  sleeps: number;
  view: string;
  rateFrom: number;
  amenities: string[];
  palette: Palette;
  // Which drawn views appear in the gallery, in order. See src/components/RoomScene.astro.
  gallery: { view: "bed" | "window" | "bath" | "desk" | "porch"; caption: string }[];
};

export const site = {
  name: "Saltmarsh House",
  tagline: "Fourteen rooms at the edge of the Calder marsh",
  description:
    "Saltmarsh House is a fourteen-room hotel on the tidal marsh at Calder Point, with a dining room that cooks what the boats and farms bring in.",
  email: "stay@saltmarshhouse.example",
  phone: "(207) 555-0148",
  address: {
    street: "2 Heron Lane",
    city: "Calder Point",
    region: "ME",
    postal: "04577",
    country: "US",
  },
  checkIn: "3:00 pm",
  checkOut: "11:00 am",
  currency: "USD",

  // Booking: set PUBLIC_BOOKING_URL (or bookingUrl below) to your booking engine's
  // address. The widget adds the guest's dates, guests and room as query parameters
  // named in bookingParams, so match them to what your booking engine expects.
  // With no URL set, the widget sends guests to the inquiry form instead.
  bookingUrl: "",
  bookingParams: {
    checkIn: "arrive",
    checkOut: "depart",
    adults: "adults",
    children: "children",
    room: "room",
  },

  nav: [
    { label: "Rooms", href: "/rooms/" },
    { label: "Dining", href: "/dining/" },
    { label: "Offers", href: "/offers/" },
    { label: "Getting here", href: "/location/" },
    { label: "Contact", href: "/contact/" },
  ],

  home: {
    headline: "A quiet house on the tide line",
    intro:
      "Fourteen rooms in an 1890s boarding house on the Calder marsh, with wide windows over the reeds, a dining room with a wood grill, and a dock where the tide does the scheduling.",
    arrival: {
      title: "Arriving",
      text: [
        "The lane ends at the house. Leave the car under the elms and come in through the porch, where there is always a pot of coffee and someone to carry bags up the stairs.",
        "Rooms are ready from 3:00 pm. If you arrive early, the bar keeps your luggage, and the marsh path starts at the bottom of the garden.",
      ],
      facts: [
        { label: "Rooms", value: "14" },
        { label: "Check-in", value: "3:00 pm" },
        { label: "Check-out", value: "11:00 am" },
        { label: "From Portland", value: "1 hr 40 min" },
      ],
    },
  },

  dining: {
    name: "The Long Room",
    intro:
      "Breakfast for house guests, dinner for everyone. The menu changes with the catch at Calder Point and three farms within ten miles. Most of the cooking happens over a wood grill at the end of the room.",
    hours: [
      { meal: "Breakfast", days: "Daily", time: "7:30 to 10:30 am", note: "House guests" },
      { meal: "Lunch on the porch", days: "Friday to Sunday", time: "12:00 to 2:30 pm", note: "May to October" },
      { meal: "Dinner", days: "Wednesday to Sunday", time: "5:30 to 9:00 pm", note: "Booking recommended" },
      { meal: "Bar", days: "Daily", time: "4:00 to 11:00 pm", note: "Small plates until 10" },
    ],
    menus: [
      {
        title: "Breakfast",
        items: [
          { name: "Brown butter oats", detail: "Wild blueberry compote, cream from Alder Farm", price: 12 },
          { name: "Smoked haddock hash", detail: "Crisp potatoes, soft egg, chives", price: 18 },
          { name: "Buttermilk pancakes", detail: "Maple from the Corliss sugarhouse", price: 14 },
          { name: "The house plate", detail: "Two eggs, bacon, toast, roast tomato", price: 17 },
        ],
      },
      {
        title: "Dinner",
        items: [
          { name: "Calder oysters", detail: "Half dozen, cider mignonette", price: 21 },
          { name: "Grilled mackerel", detail: "Charred leeks, buttermilk, dill oil", price: 26 },
          { name: "Hake in brown butter", detail: "Clams, white beans, sea herbs", price: 34 },
          { name: "Half chicken from the grill", detail: "Bread sauce, greens, pan juices", price: 31 },
          { name: "Burnt honey tart", detail: "Crème fraîche, sea salt", price: 11 },
        ],
      },
    ],
    note: "Tell us about allergies when you book. The kitchen cooks without gluten or dairy on request.",
  },

  location: {
    intro:
      "Calder Point sits at the end of a peninsula on the mid-coast, past the last gas station and the fish co-op. The house is the white one at the end of Heron Lane.",
    directions: [
      {
        mode: "By car",
        text: "From Route 1, take Route 129 south at Wexham for 14 miles. Turn left at the co-op onto Heron Lane. Parking is free under the elms, and there are two chargers for electric cars.",
      },
      {
        mode: "By train and bus",
        text: "Take the train to Brunswick, then the coastal bus to Wexham (about 50 minutes). We collect guests from the Wexham stop at 4:10 pm and 6:40 pm. Tell us which one when you book.",
      },
      {
        mode: "By air",
        text: "Portland is the nearest airport, 1 hour 40 minutes by car. We can arrange a driver for about $190 each way.",
      },
      {
        mode: "By boat",
        text: "Our dock takes boats up to 30 feet at high water. Call ahead and we will tell you the tide.",
      },
    ],
    nearby: [
      { name: "Calder marsh path", distance: "At the gate", text: "A two-mile loop on boardwalk and dike, best at low tide for herons." },
      { name: "Fish co-op", distance: "0.3 mi", text: "Lobster and clams off the boats, weekday mornings." },
      { name: "Pemmet Island lighthouse", distance: "4 mi", text: "A short drive and a shorter walk to the rocks." },
      { name: "Wexham village", distance: "14 mi", text: "Bookshop, bakery and the Saturday market." },
    ],
  },

  offers: [
    {
      title: "Three nights, midweek",
      season: "November to April",
      text: "Stay Sunday to Thursday for three nights and the third is on us. Breakfast every morning, a late check-out on the last day.",
      terms: "Sunday to Thursday arrivals. Not with other offers.",
      code: "MIDWEEK3",
    },
    {
      title: "Marsh and table",
      season: "All year",
      text: "Two nights, dinner for two in the Long Room on the first night, and a packed lunch for the marsh path or the lighthouse.",
      terms: "From $780 for two guests in a Marsh room.",
      code: "TABLE2",
    },
    {
      title: "The whole house",
      season: "By arrangement",
      text: "All fourteen rooms, the Long Room and the dock for a wedding, a reunion or a company that wants to think somewhere quiet.",
      terms: "Two nights minimum. Write to us for dates.",
      code: "",
    },
  ],

  contactTopics: ["A stay", "Dinner in the Long Room", "The whole house", "Something else"],

  footer: {
    note: "Open all year except the first two weeks of January.",
    social: [
      { label: "Instagram", href: "https://instagram.com/" },
    ],
  },
};

export const rooms: Room[] = [
  {
    slug: "marsh-room",
    number: "3",
    name: "Marsh Room",
    kind: "Queen room",
    summary: "A bright corner room over the reeds, with a window seat and a desk facing the water.",
    description: [
      "Marsh rooms are on the second floor at the back of the house, looking straight out over the reeds to the channel. In the morning the light comes in low and gold across the bed.",
      "There is a window seat wide enough to nap on, a writing desk, and a shower room with tiles made in Wexham.",
    ],
    size: "240 sq ft",
    beds: "1 queen",
    sleeps: 2,
    view: "Marsh",
    rateFrom: 265,
    amenities: ["Window seat", "Writing desk", "Walk-in shower", "Cotton bedding", "Wool blankets", "Coffee and tea tray", "Wi-Fi", "Robes"],
    palette: { wall: "#e7e3d8", floor: "#b99a74", linen: "#f6f3ec", throw: "#8a9b8a", wood: "#8b6a4a" },
    gallery: [
      { view: "bed", caption: "The bed, facing the marsh" },
      { view: "window", caption: "Window seat over the reeds" },
      { view: "desk", caption: "Writing desk and lamp" },
      { view: "bath", caption: "Shower room with Wexham tiles" },
    ],
  },
  {
    slug: "harbor-room",
    number: "7",
    name: "Harbor Room",
    kind: "King room",
    summary: "Front-of-house, with two tall windows over the harbor and a deep tub.",
    description: [
      "Harbor rooms look over the lane to the harbor and the boats on their moorings. They are the largest of the standard rooms, with a king bed and two armchairs by the windows.",
      "The bathroom has a deep cast-iron tub and a separate shower.",
    ],
    size: "310 sq ft",
    beds: "1 king",
    sleeps: 2,
    view: "Harbor",
    rateFrom: 325,
    amenities: ["Cast-iron tub", "Separate shower", "Two armchairs", "Cotton bedding", "Coffee and tea tray", "Wi-Fi", "Robes", "Blackout curtains"],
    palette: { wall: "#dfe4e2", floor: "#a88b6a", linen: "#f7f6f1", throw: "#4f6a73", wood: "#6e5440" },
    gallery: [
      { view: "bed", caption: "King bed between the windows" },
      { view: "bath", caption: "Cast-iron tub" },
      { view: "window", caption: "Harbor from the armchairs" },
    ],
  },
  {
    slug: "loft-suite",
    number: "12",
    name: "Loft Suite",
    kind: "Suite",
    summary: "The whole top floor under the eaves, with a sitting room, a tub by the window and room for a family.",
    description: [
      "The Loft Suite takes the attic of the house: a bedroom under the roof beams, a sitting room with a sofa bed, and a tub set under a dormer so you can watch the tide come in from the bath.",
      "It sleeps four, and the stairs are steep enough to feel like a hideout.",
    ],
    size: "560 sq ft",
    beds: "1 king, 1 sofa bed",
    sleeps: 4,
    view: "Marsh and harbor",
    rateFrom: 495,
    amenities: ["Sitting room", "Soaking tub", "Sofa bed", "Record player", "Cotton bedding", "Coffee and tea tray", "Wi-Fi", "Robes"],
    palette: { wall: "#ece6da", floor: "#9e7f5e", linen: "#f8f5ee", throw: "#b4876a", wood: "#7a5a3f" },
    gallery: [
      { view: "bath", caption: "Tub under the dormer" },
      { view: "bed", caption: "Bedroom under the beams" },
      { view: "desk", caption: "Sitting room corner" },
      { view: "window", caption: "Dormer view at high tide" },
    ],
  },
  {
    slug: "garden-room",
    number: "1",
    name: "Garden Room",
    kind: "Queen room, step-free",
    summary: "On the ground floor, opening onto its own porch and the garden, with a step-free shower.",
    description: [
      "The Garden Room is on the ground floor with a door to a small porch and the garden beyond. Everything is step-free, from the lane to the shower.",
      "Dogs are welcome here, with a bed, bowls and a towel by the door for after the marsh.",
    ],
    size: "260 sq ft",
    beds: "1 queen",
    sleeps: 2,
    view: "Garden",
    rateFrom: 245,
    amenities: ["Private porch", "Step-free access", "Roll-in shower", "Dogs welcome", "Cotton bedding", "Coffee and tea tray", "Wi-Fi"],
    palette: { wall: "#e5e6db", floor: "#b08f6b", linen: "#f5f3ea", throw: "#9a8f5c", wood: "#836247" },
    gallery: [
      { view: "bed", caption: "The bed and the garden door" },
      { view: "porch", caption: "Private porch" },
      { view: "bath", caption: "Roll-in shower" },
    ],
  },
  {
    slug: "boathouse",
    number: "14",
    name: "The Boathouse",
    kind: "Cottage",
    summary: "A one-room cottage on the dock, set apart from the house, with a woodstove.",
    description: [
      "The old boathouse sits at the end of the garden on the dock. It has one big room with a king bed, a woodstove, and doors that open onto the water.",
      "Breakfast can come down on a tray, and the house is a two-minute walk up the lawn.",
    ],
    size: "380 sq ft",
    beds: "1 king",
    sleeps: 2,
    view: "Water on three sides",
    rateFrom: 445,
    amenities: ["Woodstove", "Private dock", "Breakfast on a tray", "Outdoor shower", "Cotton bedding", "Wi-Fi", "Robes"],
    palette: { wall: "#d9d6cb", floor: "#8f7356", linen: "#f6f4ed", throw: "#6b5a48", wood: "#5f4733" },
    gallery: [
      { view: "porch", caption: "Doors onto the dock" },
      { view: "bed", caption: "King bed and the stove" },
      { view: "window", caption: "Water on three sides" },
    ],
  },
];
