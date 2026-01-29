import { TripData } from "@/types/trip";

export const TRIP_DATA: TripData = {
  title: "Karoo Road Trip",
  subtitle: "13 Days Through South Africa's Heartland",
  tagline:
    "From the vast plains of the Free State through ancient mountain passes, fossil-rich valleys, and timeless Karoo villages — a family adventure through the soul of South Africa.",
  month: "April",
  year: 2025,
  startDate: "6 April",
  endDate: "18 April",
  totalDistanceKm: 2850,
  totalDays: 13,
  totalStops: 8,
  stops: [
    {
      id: 0,
      slug: "johannesburg-start",
      name: "Johannesburg",
      accommodation: "Home",
      accommodationType: "travel",
      coordinates: { lat: -26.2041, lng: 28.0473 },
      dates: "Mon 6 April",
      nights: 0,
      description:
        "The adventure begins. Pack the 4x4, check the cooler box, and hit the N1 south as the Gauteng skyline fades in the rear-view mirror. The open Karoo awaits.",
      landscapeDescription: "",
      activities: [],
      features: [],
      bookingSource: "",
      imageUrl: "/images/stops/jhb.jpg",
      driveFromPrevious: {
        distanceKm: 0,
        durationHours: 0,
        description: "",
      },
    },
    {
      id: 1,
      slug: "luckhoff",
      name: "Luckhoff",
      accommodation: "Eco Karoo Mountain Lodge",
      accommodationType: "bnb",
      coordinates: { lat: -29.9, lng: 24.7 },
      dates: "Mon 6 – Tue 7 April",
      nights: 1,
      description:
        "A 100% off-the-grid retreat nestled at the foot of the Joostenberg mountains on a 4,200-hectare working farm. Hosted by third-generation farmers, the lodge offers eco suites powered by solar energy with freshly pumped aquifer water. Rated 9.4 on Booking.com.",
      landscapeDescription:
        "The northern tip of the Great Karoo where majestic mountains rise to the west and endless flat plains stretch to the east. Big sky country with dramatic sunsets, sparse shrubland, and ancient rocky outcrops. Far from any light pollution — spectacular night skies.",
      activities: [
        {
          name: "Stargazing",
          description:
            "Off-grid, zero light pollution — one of the best stargazing spots in South Africa",
          icon: "stars",
        },
        {
          name: "Game Viewing",
          description:
            "Kudu, waterbuck, blesbok, oryx, steenbok and warthog roam freely around the lodge",
          icon: "binoculars",
        },
        {
          name: "Mountain Hiking",
          description:
            "Trails directly from the lodge into the surrounding Joostenberg mountains",
          icon: "hiking",
        },
        {
          name: "Vanderkloof Dam",
          description:
            "SA's second-largest dam, 40km away — fishing and water sports",
          icon: "water",
        },
      ],
      features: [
        "Swimming pool",
        "Fully equipped kitchen",
        "Braai & boma",
        "Fireplace",
        "Fast WiFi",
        "Secure parking",
      ],
      bookingSource: "Booking.com",
      bookingUrl:
        "https://www.booking.com/hotel/za/eco-karoo-mountain-lodge-luckhof.en-gb.html",
      imageUrl: "/images/stops/luckhoff.jpg",
      driveFromPrevious: {
        distanceKm: 520,
        durationHours: 5.5,
        description: "Via N1 south through the Free State",
      },
    },
    {
      id: 2,
      slug: "camdeboo",
      name: "Camdeboo National Park",
      accommodation: "Nqweba Camp Site",
      accommodationType: "campsite",
      coordinates: { lat: -32.2202, lng: 24.5405 },
      dates: "Wed 8 April",
      nights: 1,
      description:
        "Camping on the floodplains of the Nqweba Dam within Camdeboo National Park, which encircles the historic town of Graaff-Reinet. 15 sites beneath thorn trees, each with power and braai. The Valley of Desolation towers nearby — a geological wonder 200 million years in the making.",
      landscapeDescription:
        "Dramatic Karoo plains surrounded by dolerite-capped mountains. The otherworldly geology of the Valley of Desolation where columnar dolerite pillars stand against an endless panorama of the Great Karoo. Graaff-Reinet, the fourth-oldest town in South Africa, sits in a valley of Cape Dutch architecture.",
      activities: [
        {
          name: "Valley of Desolation",
          description:
            "Towering dolerite pillars rising 120m from the valley floor — spectacular at sunrise and sunset. 1.5km Crag Lizard Trail along the cliff edge.",
          icon: "mountain",
        },
        {
          name: "Game Drives",
          description:
            "Buffalo, gemsbok, eland, springbok, Cape mountain zebra and 220+ bird species",
          icon: "binoculars",
        },
        {
          name: "Nqweba Dam",
          description:
            "Fishing, canoeing, windsurfing and birding on the 1,000-hectare dam",
          icon: "water",
        },
        {
          name: "Graaff-Reinet",
          description:
            "Explore the Dutch Reformed Church (replica of Salisbury Cathedral), Reinet House Museum and Stretch's Court",
          icon: "building",
        },
      ],
      features: [
        "Power points",
        "Communal kitchen",
        "Braai at each site",
        "Accessible ablutions",
      ],
      bookingSource: "SANParks",
      imageUrl: "/images/stops/camdeboo.jpg",
      driveFromPrevious: {
        distanceKm: 350,
        durationHours: 4,
        description: "Long drive day south through the Great Karoo",
      },
    },
    {
      id: 3,
      slug: "karoo-national-park",
      name: "Karoo National Park",
      accommodation: "Embizweni Cottage",
      accommodationType: "bnb",
      coordinates: { lat: -32.2418, lng: 22.2995 },
      dates: "Thu 9 – Fri 10 April",
      nights: 2,
      description:
        "A remote, fully equipped overnight cottage deep within the park, accessible via the 90km Nuweveld 4x4 EcoTrail. Spectacular views of the Nuweveld Mountains with gas-powered amenities and solar lighting. A true wilderness adventure for those seeking solitude.",
      landscapeDescription:
        "The Nuweveld mountain range forms a dramatic amphitheatre backdrop to undulating Karoo plains spanning over 88,000 hectares. Flat-topped koppies, steep mountain passes, sparse vegetation, and a vast sky. The park's rich fossil history spans over 250 million years.",
      activities: [
        {
          name: "4x4 Eco Trail",
          description:
            "The Nuweveld 90km trail winds through rugged mountain terrain — the adventure of reaching Embizweni is half the fun",
          icon: "car",
        },
        {
          name: "Fossil Trail",
          description:
            "A 400m trail with real fossil displays from the area's 250-million-year geological history",
          icon: "search",
        },
        {
          name: "Night Game Drives",
          description:
            "Guided drives to spot nocturnal species including aardwolf and bat-eared fox",
          icon: "moon",
        },
        {
          name: "Wildlife Viewing",
          description:
            "Black rhino, lions, Cape mountain zebra, gemsbok, and the highest number of tortoise species of any park in the world",
          icon: "binoculars",
        },
      ],
      features: [
        "Fully equipped for 6",
        "Gas stove & fridge",
        "Solar lighting",
        "Remote & secluded",
        "4x4 required",
      ],
      bookingSource: "SANParks",
      bookingUrl: "https://karoonationalpark.co.za/",
      imageUrl: "/images/stops/karoo-np.jpg",
      driveFromPrevious: {
        distanceKm: 260,
        durationHours: 3,
        description: "West via N12 through Graaff-Reinet to Beaufort West",
      },
    },
    {
      id: 4,
      slug: "oudtshoorn",
      name: "Oudtshoorn",
      accommodation: "Karoo Lavender",
      accommodationType: "bnb",
      coordinates: { lat: -33.6241, lng: 22.2617 },
      dates: "Sat 11 – Sun 12 April",
      nights: 2,
      description:
        "A charming self-catering farm stay surrounded by organically grown lavender fields, with the Kammanassie River flowing on one side and views of the Swartberg mountain range on the other. Two separate units with fully equipped kitchens and private patios.",
      landscapeDescription:
        "The Klein Karoo is a semi-arid valley flanked by the Swartberg range to the north and the Outeniqua mountains to the south. Oudtshoorn sits in a fertile valley of lucerne fields, ostrich paddocks, and lavender farms. The Swartberg mountains provide a dramatic, jagged backdrop.",
      activities: [
        {
          name: "Cango Caves",
          description:
            "Subterranean wonder with dripstone caverns millions of years old — standard tour (1hr) and adventure tour with crawling through tight passages",
          icon: "cave",
        },
        {
          name: "Ostrich Farms",
          description:
            "Oudtshoorn is the ostrich capital of the world — guided tours, ostrich riding, and unique cuisine",
          icon: "feather",
        },
        {
          name: "Swartberg Pass",
          description:
            "UNESCO World Heritage Site mountain pass with stunning views connecting to Prince Albert",
          icon: "mountain",
        },
        {
          name: "Meerkat Encounters",
          description:
            "Early morning wild meerkat tours observing these social creatures in their natural habitat",
          icon: "eye",
        },
        {
          name: "Cango Wildlife Ranch",
          description:
            "Cheetah contact centre with lions, white Bengal tigers, meerkats, and pygmy hippos",
          icon: "paw",
        },
      ],
      features: [
        "Self-catering units",
        "Air conditioning",
        "Swimming pool",
        "Braai area",
        "Free WiFi",
        "Streaming TV",
      ],
      bookingSource: "Booking.com",
      bookingUrl:
        "https://www.booking.com/hotel/za/karoo-lavender.en-gb.html",
      imageUrl: "/images/stops/oudtshoorn.jpg",
      driveFromPrevious: {
        distanceKm: 350,
        durationHours: 4.5,
        description:
          "South over the Swartberg via the N12 and R407 into the Klein Karoo",
      },
    },
    {
      id: 5,
      slug: "de-rust",
      name: "De Rust",
      accommodation: "Aards Guest Farm",
      accommodationType: "bnb",
      coordinates: { lat: -33.5451, lng: 22.49 },
      dates: "Mon 13 – Tue 14 April",
      nights: 2,
      description:
        "A uniquely crafted luxury tent built into a hillside using local materials, designed to blend with the Klein Karoo landscape. Hot tub, open-air bath, kitchenette, fireplace, and private patio — all 10 minutes from the charming village of De Rust. Rated 9.4 on Booking.com.",
      landscapeDescription:
        "De Rust sits between towering Swartberg Mountains — gateway to Meiringspoort, where colossal sandstone cliff walls form a narrow gorge carved by the Groot River. Succulent shrubland, rocky outcrops, and expansive views framed by rugged peaks.",
      activities: [
        {
          name: "Meiringspoort Waterfall",
          description:
            "25km scenic drive through a gorge where the road crosses the Groot River 25 times. UNESCO World Heritage waterfall with an easy 15-min walk",
          icon: "waterfall",
        },
        {
          name: "Swartberg Pass Drive",
          description:
            "Spectacular UNESCO World Heritage pass over the Swartberg to Prince Albert and back",
          icon: "mountain",
        },
        {
          name: "Mons Ruber Wine Estate",
          description:
            "Historic estate producing wine since the mid-1800s — dessert wines, port, and traditional witblits brandy",
          icon: "wine",
        },
        {
          name: "De Rust Village",
          description:
            "Quaint Klein Karoo village with galleries, craft shops, and farm stalls",
          icon: "shop",
        },
      ],
      features: [
        "Hot tub",
        "Open-air bath",
        "Fireplace",
        "Kitchenette",
        "Swimming pool",
        "Free WiFi",
      ],
      bookingSource: "Booking.com",
      bookingUrl:
        "https://www.booking.com/hotel/za/aards-guest-farm.en-gb.html",
      imageUrl: "/images/stops/de-rust.jpg",
      driveFromPrevious: {
        distanceKm: 40,
        durationHours: 0.5,
        description: "Short drive east along the R62",
      },
    },
    {
      id: 6,
      slug: "baviaanskloof",
      name: "Baviaanskloof",
      accommodation: "Uitspan Campsite",
      accommodationType: "campsite",
      coordinates: { lat: -33.5159, lng: 23.7052 },
      dates: "Wed 15 April",
      nights: 1,
      description:
        "A well-equipped campsite at the western end of the spectacular Baviaanskloof UNESCO World Heritage Site. Grassed sites with private ablutions, covered kitchens, 220V power, and braai facilities — a cut above standard camping. Complete wilderness with no cellphone reception.",
      landscapeDescription:
        "The 'Valley of the Baboons' is one of South Africa's most spectacular wilderness areas — 2,040 sq km between mountain ranges. Remarkably, it contains seven of South Africa's nine biomes. Deep gorges, twisting streams, towering mountain cliffs, open plateaux, and hidden riverine valleys.",
      activities: [
        {
          name: "Hiking Trails",
          description:
            "Houtkloof & Koepel trails with magnificent scenery through the UNESCO World Heritage Site",
          icon: "hiking",
        },
        {
          name: "Foofie Slide",
          description:
            "Zip line across the Uitspan dam — popular with kids and adults alike",
          icon: "zap",
        },
        {
          name: "San Rock Art",
          description:
            "Ancient Bushman rock art sites in the surrounding mountains",
          icon: "palette",
        },
        {
          name: "Birding & Wildlife",
          description:
            "300+ bird species, 26 raptor species. Also Cape mountain zebra, kudu, eland, and buffalo",
          icon: "binoculars",
        },
      ],
      features: [
        "220V power",
        "Private ablutions",
        "Covered kitchen",
        "Braai facilities",
        "Swimming pool",
        "Foofie slide",
        "No cellphone reception",
      ],
      bookingSource: "Direct booking",
      bookingUrl: "https://www.baviaansuitspan.co.za/page/home",
      imageUrl: "/images/stops/baviaanskloof.jpg",
      driveFromPrevious: {
        distanceKm: 180,
        durationHours: 3.5,
        description:
          "East through Willowmore into the Baviaanskloof wilderness",
      },
    },
    {
      id: 7,
      slug: "nieu-bethesda",
      name: "Nieu-Bethesda",
      accommodation: "Oude Waenhuis",
      accommodationType: "bnb",
      coordinates: { lat: -31.8689, lng: 24.5536 },
      dates: "Thu 16 April",
      nights: 1,
      description:
        "An enchanting self-catering cottage originally built in 1847 as the wagon house for the village pastor. Meticulously restored with stylish interiors, a swimming pool designed to resemble a farm dam, and beautiful gardens. Just 100m from the world-famous Owl House.",
      landscapeDescription:
        "Nieu-Bethesda sits in a fertile valley surrounded by mountains, fed by mountain springs through an old 'leiwater' irrigation system. Extraordinarily preserved — whitewashed walls, tin roofs, and unpaved streets without streetlights. The Sneeuberg mountains soar above.",
      activities: [
        {
          name: "The Owl House",
          description:
            "South Africa's finest Outsider Art — Helen Martins' crushed-glass interior and the Camel Yard with hundreds of cement sculptures. National Heritage Site.",
          icon: "palette",
        },
        {
          name: "Kitching Fossil Centre",
          description:
            "253-million-year-old fossils with life-size prehistoric animal models and guided fossil walks",
          icon: "search",
        },
        {
          name: "Compassberg Mountain",
          description:
            "Highest free-standing peak in the Eastern Cape at 2,502m — accessible via 4x4 trail",
          icon: "mountain",
        },
        {
          name: "Donkey Cart Tours",
          description:
            "Guided donkey cart ride through the timeless village departing from the Owl House",
          icon: "cart",
        },
      ],
      features: [
        "2 bedrooms",
        "Private pool",
        "Beautiful gardens",
        "Free WiFi",
        "Pet-friendly",
        "Braai area",
      ],
      bookingSource: "Booking.com",
      bookingUrl: "https://www.booking.com/hotel/za/oude-waenhuis.html",
      imageUrl: "/images/stops/nieu-bethesda.jpg",
      driveFromPrevious: {
        distanceKm: 280,
        durationHours: 4,
        description:
          "North through the mountains via Graaff-Reinet back into the Great Karoo",
      },
    },
    {
      id: 8,
      slug: "philippolis",
      name: "Philippolis",
      accommodation: "Die Groenhuis",
      accommodationType: "bnb",
      coordinates: { lat: -30.2579, lng: 25.2634 },
      dates: "Fri 17 April",
      nights: 1,
      description:
        "A collection of 7 carefully restored Karoo townhouses, the oldest dating to 1890, on the edge of Philippolis — the oldest town in the Free State (founded 1823). Large fenced yards, lovely sunset views, and host-guided village tours bring this heritage town to life.",
      landscapeDescription:
        "Philippolis sits on the semi-arid plains of the southern Free State. Remarkably preserved — wide streets, slope-roofed homes, and the imposing Dutch Reformed Church at its centre. Surrounding farmland stretches under enormous skies. Peacocks, blue cranes, and olden-day flowers along quiet streets.",
      activities: [
        {
          name: "Historic Village Walk",
          description:
            "75 declared national monuments featuring Cape Dutch, Victorian, and Karoo flat-roof architecture. Guided tours by host Jens.",
          icon: "building",
        },
        {
          name: "Dutch Reformed Church",
          description:
            "Opened 1871 — famous pulpit carved from wild olive wood, erected without nails, screws, or bolts",
          icon: "building",
        },
        {
          name: "Transgariep Museum",
          description:
            "Emily Hobhouse's weaving school, the Griqua period, and the Anglo Boer War. Also the Laurens van der Post birthplace memorial.",
          icon: "book",
        },
        {
          name: "Gariep & Vanderkloof Dams",
          description:
            "South Africa's two largest dams nearby — fishing, boating, and birding with 200+ species",
          icon: "water",
        },
      ],
      features: [
        "Restored heritage houses",
        "Air conditioning",
        "Braai facilities",
        "Secure parking",
        "Pet-friendly",
        "Guided tours",
      ],
      bookingSource: "Direct booking",
      bookingUrl: "https://www.philippolis.co.za/",
      imageUrl: "/images/stops/philippolis.jpg",
      driveFromPrevious: {
        distanceKm: 200,
        durationHours: 2.5,
        description: "North through Cradock and into the Free State",
      },
    },
    {
      id: 9,
      slug: "johannesburg-end",
      name: "Johannesburg",
      accommodation: "Home",
      accommodationType: "travel",
      coordinates: { lat: -26.2041, lng: 28.0473 },
      dates: "Sat 18 April",
      nights: 0,
      description:
        "The final stretch home. 500km of open road, a car full of memories, and stories to tell. The Karoo will be waiting for next time.",
      landscapeDescription: "",
      activities: [],
      features: [],
      bookingSource: "",
      imageUrl: "/images/stops/jhb.jpg",
      driveFromPrevious: {
        distanceKm: 500,
        durationHours: 5.5,
        description: "North via N1 through the Free State back to Gauteng",
      },
    },
  ],
};
