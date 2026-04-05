export type EntryType = "meal" | "activity" | "drive" | "note" | "overnight" | "warning";

export interface TimelineEntry {
  time?: string;
  type: EntryType;
  tag: string;
  title: string;
  description?: string;
  detail?: string;
}

export interface DayDrive {
  depart: string;
  route: string;
  distance: string;
}

export interface DayAccommodation {
  name: string;
  type?: string;
  booking?: string;
}

export interface DayData {
  dayNumber: number;
  date: string;
  title: string;
  subtitle: string;
  drive?: DayDrive;
  timeline: TimelineEntry[];
  accommodation?: DayAccommodation;
}

export interface PreBooking {
  id: number;
  title: string;
  description: string;
  phone?: string;
}

export interface RoadCondition {
  text: string;
}

export const preBookings: PreBooking[] = [
  { id: 1, title: "Wed 8 — Karoo Origins Fossil Centre guided tour", description: "Min 4 people, pre-book essential", phone: "0870936135" },
  { id: 2, title: "Thu 9 night — Karoo Astro Tours, Prince Albert", description: "Book online — fills quickly" },
  { id: 3, title: "Fri 10 dinner — Karoo Kombuis OR Yellow House", description: "Kombuis: cash only, BYO. Yellow House: closed Tue/Wed so Friday is fine", phone: "0235411110" },
  { id: 4, title: "Sat 11 dinner — Nostalgie Restaurant, Oudtshoorn", description: "Fills up fast — book well ahead" },
  { id: 5, title: "Sun 12 — Cango Wildlife Ranch encounters", description: "Cheetah touch / croc cage dive: reservations@cango.co.za" },
  { id: 6, title: "Sun 12 — Cango Caves Adventure Tour", description: "Book online: webtickets.co.za (especially for Sunday)" },
  { id: 7, title: "Wed 15 lunch — Sophie's Choice, Willowmore area", description: "Verify still operating (changed ownership)", phone: "+27731405630" },
  { id: 8, title: "Thu 16 dinner — Ibis Lounge, Nieu-Bethesda", description: "Book ahead", phone: "0727427113" },
  { id: 9, title: "Fri 17 afternoon — Village tour with Jens, Philippolis", description: "Message ahead to confirm afternoon timing", phone: "+27845810149" },
];

export const roadConditions: RoadCondition[] = [
  { text: "Swartberg Pass (R328) — closed late March 2026 after flooding. Monitor from ~8 April via arrivealive.mobi. Required for Sat 11 departure from Prince Albert." },
  { text: "Meiringspoort (N12) — closed late March 2026, reopened 28 March. Monitor from ~10 April. Required for Mon 13 excursion from De Rust." },
  { text: "Gamkaskloof / Die Hel (optional) — if Swartberg Pass opens fully, assess for a day trip from Prince Albert on Fri 10." },
];

export const days: DayData[] = [
  // ===== DAY 1 =====
  {
    dayNumber: 1,
    date: "Mon 6 Apr",
    title: "Johannesburg → Luckhoff",
    subtitle: "Travel Day — 520 km · ~5h 30m",
    drive: { depart: "8:00 AM", route: "N1 South through Free State plains", distance: "520 km · ~5h 30m driving" },
    timeline: [
      { time: "11:30", type: "meal", tag: "Lunch Stop", title: "Coffee Talks — Bloemfontein", description: "Reliable coffee and food stop in Bloem — great coffee, fresh lunches, kid-friendly. ~45min break to stretch legs and refuel. Grab snacks and drinks for the road ahead.", detail: "Off the N1 in Bloemfontein · ~400km from JHB" },
      { time: "11:15", type: "drive", tag: "Continue", title: "Back on road south through Free State", description: "~240km remaining. Follow host directions to lodge — do not use GPS for final approach." },
      { time: "14:30", type: "activity", tag: "Arrive", title: "Eco Karoo Mountain Lodge — Knoffelfontein Farm", description: "Check in with hosts Bert & Estee Viljoen (3rd-generation farmers). 100% off-grid, solar powered, aquifer water. 4,200 hectares with kudu, waterbuck, oryx, warthog roaming. Ask Bert about the best route up Joostenberg for tomorrow's sunrise hike." },
      { time: "19:00", type: "meal", tag: "Dinner", title: "Braai at the lodge boma", description: "Buy Karoo lamb + wine on-site from hosts (cash only — bring firelighters). Boma is the prime stargazing spot. First proper Karoo night sky of the trip." },
    ],
    accommodation: { name: "Eco Karoo Mountain Lodge", type: "Off-grid eco suite · Luckhoff, Free State", booking: "Booking.com" },
  },
  // ===== DAY 2 =====
  {
    dayNumber: 2,
    date: "Tue 7 Apr",
    title: "Luckhoff — Full Day",
    subtitle: "No driving · Rest & Explore",
    timeline: [
      { time: "6:30", type: "activity", tag: "Hike", title: "Joostenberg Mountain Sunrise Hike", description: "Informal scramble up the dolerite-capped Joostenberg mountains directly behind the lodge. No marked trail — get the best line from Bert the night before. Early start to catch sunrise from the top over the Karoo plains. Rocky terrain with loose stone near the summit — closed-toe shoes with ankle support essential. Allow 2–2.5hrs return.", detail: "Ask hosts the night before for best route. April morning temp ~6–8°C — bring a layer." },
      { time: "9:00", type: "meal", tag: "Breakfast", title: "Self-cater at lodge", description: "Fully equipped kitchen in the lodge. Use farmstall provisions from yesterday." },
      { time: "10:30", type: "activity", tag: "Explore", title: "Farm walk — Bergrivier riverbed birding", description: "Birding through the reeds along the riverbed. Look for kudu, waterbuck, oryx and steenbok in the open plains. Pool in the afternoon if warm enough." },
      { time: "13:00", type: "meal", tag: "Lunch", title: "Self-cater at lodge" },
      { time: "19:00", type: "meal", tag: "Dinner", title: "Braai — Karoo lamb from lodge (cash, bring wine)", description: "Order the lodge's own Karoo lamb. Best lamb of the trip — lean, flavourful, farm-raised. Boma stargazing after. Zero light pollution, full Milky Way." },
      { type: "note", tag: "Pack for tomorrow", title: "Early departure Wednesday — pack the car tonight. No restaurants on route, carry snacks. Leave 7:00am sharp." },
    ],
    accommodation: { name: "Eco Karoo Mountain Lodge", booking: "Night 2 of 2" },
  },
  // ===== DAY 3 =====
  {
    dayNumber: 3,
    date: "Wed 8 Apr",
    title: "Luckhoff → Graaff-Reinet",
    subtitle: "Camdeboo NP · 350 km · ~4h",
    drive: { depart: "7:00 AM", route: "South through Karoo plains to Graaff-Reinet", distance: "350 km · ~4h" },
    timeline: [
      { type: "note", tag: "Why 7:00am?", title: "Arrive ~11am → fossil museum 11:30am → lunch → campsite by 2pm → Valley of Desolation sunset drive at 5pm. Tight but doable." },
      { time: "6:30", type: "meal", tag: "Breakfast", title: "Self-cater at lodge before departure", description: "Quick breakfast before hitting the road. Pack snacks for the drive — no worthwhile food stops en route." },
      { time: "11:15", type: "activity", tag: "Museum", title: "Karoo Origins Fossil Centre — 30 Parsonage Street", description: "World-famous Rubidge Fossil Collection on display. Longest fossil timeline in the world — creatures that lived before the dinosaurs. Start with guided tour (pre-booked). Entry R100 adults / R50 under 18. Guided tour +R50pp extra. Coffee shop on site. Allow 1.5hrs.", detail: "PRE-BOOK guided tour: 087 093 6135 · Min 4 people required" },
      { time: "13:00", type: "meal", tag: "Lunch", title: "Die Kliphuis Restaurant & Antique Shop", description: "Eat among antiques in beautifully appointed dining rooms or the tea garden. Daily changing menu of proper boerekos home cooking — generous portions, great service. Quirky and memorable.", detail: "Near the fossil centre in town · Walk-in fine" },
      { time: "14:00", type: "drive", tag: "Check In", title: "Camdeboo NP — Nqweba Campsite", description: "10min from Graaff-Reinet. Set up camp — 15 sites under thorn trees with power and braai." },
      { time: "17:00", type: "activity", tag: "Activity", title: "Valley of Desolation — Sunset Drive", description: "Drive up to the Valley of Desolation for golden hour. 120m-high dolerite columns rising from the valley floor — geological wonder 200 million years in the making. Walk the 1.5km Crag Lizard Trail along the cliff edge. April sunset ~6pm.", detail: "15min drive from campsite · Last entry before dark" },
      { time: "19:30", type: "meal", tag: "Dinner", title: "Braai at campsite" },
    ],
    accommodation: { name: "Nqweba Campsite — Camdeboo National Park", type: "SANParks campsite · 1 night", booking: "SANParks booking" },
  },
  // ===== DAY 4 =====
  {
    dayNumber: 4,
    date: "Thu 9 Apr",
    title: "Graaff-Reinet → Prince Albert",
    subtitle: "Scenic Route · ~200 km · ~3h 30m",
    drive: { depart: "8:30 AM", route: "N9 South → Aberdeen → R407 gravel (scenic) → Prince Albert", distance: "~200 km · ~3h 30m (gravel adds ~40min)" },
    timeline: [
      { time: "8:00", type: "meal", tag: "Breakfast", title: "Self-cater at campsite" },
      { time: "10:00", type: "drive", tag: "Coffee Stop", title: "Aberdeen — quick 20min stretch", description: "Small Karoo dorpie ~70km into the drive. Basic café options. Short leg stretch before the scenic gravel section." },
      { time: "13:00", type: "activity", tag: "Arrive", title: "Prince Albert — Lazy Lizard lunch", description: "Drop-in, no booking needed. Great coffee, cakes, light meals. Best first landing spot in Prince Albert — relaxed and family-friendly. Pick up jaffle ingredients from the deli counter for tonight's dinner.", detail: "Church Street · Open Mon–Fri 8am–7pm, Sat–Sun 9am–9pm · Licensed, takes cards" },
      { time: "14:30", type: "activity", tag: "Visit", title: "Gay's Dairy — Cheese Tasting", description: "No booking needed, 20min. Church Street, open daily 7am–6pm. Try the local goat's milk cheeses. Good addition to jaffle night." },
      { time: "15:00", type: "overnight", tag: "Check In", title: "Wolvekraal Guest Farm", description: "Seven retro-chic self-catering cottages on a koppie, 5min outside town. 360° views of Swartberg mountains and Karoo plains. Private braai areas, plunge pools. Settle in, explore the koppie, sundowners on the patio." },
      { time: "19:00", type: "meal", tag: "Dinner", title: "Jaffles at Wolvekraal — self-cater", description: "Easy first night after travel day. Use Gay's Dairy cheese and deli provisions from Lazy Lizard." },
      { time: "20:30", type: "activity", tag: "Evening", title: "Karoo Astro Tours", description: "Prince Albert sits in one of South Africa's darkest dark-sky zones. Evening telescope session — some of the finest stargazing in the southern hemisphere.", detail: "PRE-BOOK online — sessions fill quickly" },
    ],
    accommodation: { name: "Wolvekraal Guest Farm", type: "Self-catering cottage · Prince Albert · 2 nights", booking: "wolvekraal.co.za" },
  },
  // ===== DAY 5 =====
  {
    dayNumber: 5,
    date: "Fri 10 Apr",
    title: "Prince Albert — Full Day",
    subtitle: "Swartberg Pass Day Drive · Dinner Out",
    timeline: [
      { time: "8:00", type: "meal", tag: "Breakfast", title: "Self-cater at Wolvekraal" },
      { time: "8:30", type: "activity", tag: "Drive", title: "Swartberg Pass — Return Day Drive", description: "Drive the legendary Thomas Bain-built Swartberg Pass as a return trip from Prince Albert today — savour it without the pressure of needing to be somewhere. UNESCO World Heritage Site, 201 bends, summit at 1,583m. Stop at every viewpoint. Spectacular views of both Great and Klein Karoo. Drive to the Die Hel turnoff at the summit if conditions allow. Allow 3hrs total. Pack your own snacks — nothing available on the pass.", detail: "Monitor Swartberg Pass status from ~8 April — arrivealive.mobi" },
      { time: "12:00", type: "meal", tag: "Lunch", title: "Rolls at Wolvekraal — self-cater" },
      { time: "13:00", type: "activity", tag: "Afternoon", title: "Relax at Wolvekraal — pool, patio, Karoo afternoon", description: "The views from the koppie are outstanding at any time of day. The plunge pool in April will be refreshing rather than cold." },
      { time: "19:00", type: "meal", tag: "Dinner", title: "Karoo Kombuis OR Yellow House EAT", description: "Karoo Kombuis: 3-course set menu — slow roast lamb, bobotie, chicken pie. Cash only, BYO wine (no corkage). Limited seating.\n\nYellow House EAT: Rated 4.9★ — most creative menu in Prince Albert. Lamb shank, cheese soufflé with quince.", detail: "PRE-BOOK: Kombuis 023 541 1110 · Yellow House 082 480 3725 — choose one" },
    ],
    accommodation: { name: "Wolvekraal Guest Farm", booking: "Night 2 of 2" },
  },
  // ===== DAY 6 =====
  {
    dayNumber: 6,
    date: "Sat 11 Apr",
    title: "Prince Albert → Oudtshoorn",
    subtitle: "Over the Swartberg Pass · ~110 km · ~1h 30m",
    drive: { depart: "10:00 AM", route: "Swartberg Pass (R328) south into the Klein Karoo", distance: "~110 km · ~1h 30m (pass section is slow and glorious)" },
    timeline: [
      { time: "8:00", type: "activity", tag: "Market", title: "Prince Albert Saturday Morning Market", description: "Browse for an hour — locally grown olives, olive oil, preserves, fresh bread, artisan cheese, handmade crafts. Stock up on snacks and picnic provisions for the pass drive." },
      { time: "9:30", type: "meal", tag: "Pack up", title: "Check out Wolvekraal · Load car · Grab market picnic snacks" },
      { time: "10:00", type: "activity", tag: "Drive", title: "Over the Swartberg Pass into Oudtshoorn", description: "Having driven it yesterday, you know the road — now enjoy it as the departure route. The south-facing descent into the Klein Karoo is spectacular.", detail: "CONFIRM PASS IS OPEN before departing — check arrivealive.mobi" },
      { time: "12:00", type: "overnight", tag: "Arrive", title: "Oudtshoorn — Check In Karoo Lavender", description: "Lavender farm stay with Kammanassie River on one side and Swartberg views on the other. Self-catering units with fully equipped kitchens and private patios." },
      { time: "12:30", type: "meal", tag: "Lunch", title: "Mamash Deli — arrival lunch", description: "4.6★, 35 Baron Van Reede Street. Casual deli-style, good for a quick informal arrival lunch.", detail: "Or self-cater at Karoo Lavender if market provisions are enough" },
      { time: "14:30", type: "activity", tag: "Afternoon", title: "CP Nel Museum — Ostrich Feather Boom era", description: "Housed in the old Boys High School building. Covers the extraordinary ostrich feather boom that made Oudtshoorn one of the wealthiest towns in SA in the early 1900s. Allow 1hr." },
      { time: "19:00", type: "meal", tag: "Dinner", title: "Nostalgie Restaurant", description: "The standout in Oudtshoorn. Karoo cuisine with Cape Malay–inspired spices, vintage décor. Famous for slow roasted ostrich shank, ostrich fillet, bobotie, and malva pudding.", detail: "PRE-BOOK: 109 Baron Van Reede St · nostalgierestaurant.co.za" },
    ],
    accommodation: { name: "Karoo Lavender", type: "Self-catering farm stay · Oudtshoorn · 2 nights", booking: "Booking.com" },
  },
  // ===== DAY 7 =====
  {
    dayNumber: 7,
    date: "Sun 12 Apr",
    title: "Oudtshoorn — Big Activity Day",
    subtitle: "R328 Corridor: Ostrich → Wildlife Ranch → Cango Caves",
    timeline: [
      { time: "7:30", type: "meal", tag: "Breakfast", title: "Self-cater at Karoo Lavender — early start" },
      { time: "9:00", type: "activity", tag: "Activity 1", title: "Safari Ostrich Farm — Tractor Safari", description: "Only ostrich tractor safari in SA. Ride through breeder bird camps, visit incubation room (may see chicks hatching), hand feed the birds. Adults R146 / children 4–14 half price. Allow 1.5hrs.", detail: "6km from Oudtshoorn on R328 · safariostrich.co.za · Walk-in fine" },
      { time: "10:45", type: "activity", tag: "Activity 2", title: "Cango Wildlife Ranch", description: "90+ species across themed zones. Included guided tour (1hr) through Cheetahland, Valley of Ancients (crocodiles, snakes), Kuranda Forest (aviary), and Lemur Falls. Optional paid encounters: cheetah touch or croc cage dive.", detail: "PRE-BOOK encounters: cango.co.za" },
      { time: "13:15", type: "meal", tag: "Lunch", title: "Cango Caves on-site restaurant", description: "Traditional SA dishes including Karoo lamb. Convenient — grab lunch while waiting for your cave tour slot." },
      { time: "14:30", type: "activity", tag: "Activity 3", title: "Cango Caves — Adventure Tour (90min)", description: "Africa's largest show cave system. The Adventure Tour: crawl, slide, squeeze through Lumbago Alley, Devil's Chimney and Devil's Postbox. Children 8+ allowed. For lean, fit people only. Departs every 30min.", detail: "BOOK ONLINE at webtickets.co.za — Sunday slots fill quickly" },
      { time: "18:30", type: "meal", tag: "Dinner", title: "Headlines Restaurant or Mamash Deli", description: "Headlines: Ostrich steak and rump on Himalayan salt blocks, Baron Van Reede St. Mamash Deli: 4.6★, more casual, good for a relaxed family dinner after a big day." },
    ],
    accommodation: { name: "Karoo Lavender", booking: "Night 2 of 2" },
  },
  // ===== DAY 8 =====
  {
    dayNumber: 8,
    date: "Mon 13 Apr",
    title: "Oudtshoorn → Meiringspoort → De Rust",
    subtitle: "~45 km · ~1h drive + gorge excursion",
    drive: { depart: "9:00 AM", route: "N12 East to De Rust, then north into Meiringspoort gorge", distance: "~45 km to De Rust + 12km into Meiringspoort" },
    timeline: [
      { type: "warning", tag: "Before leaving Oudtshoorn", title: "Buy dinner and breakfast supplies for De Rust — only a small Caltex shop there. Stock up at Pick n Pay in Oudtshoorn. Also check Meiringspoort status." },
      { time: "9:30", type: "drive", tag: "Arrive", title: "De Rust — drop bags at Aards (too early to check in)" },
      { time: "10:00", type: "activity", tag: "Excursion", title: "Meiringspoort Gorge Drive", description: "Drive north from De Rust — 25km of towering sandstone cliffs carved by the Groot River over 250 million years. The road crosses the same river 25 times. One of the most dramatic geological drives in South Africa.", detail: "Confirm open before going — monitor arrivealive.mobi" },
      { time: "10:30", type: "activity", tag: "Stop", title: "The Great Waterfall — swim and picnic", description: "60m waterfall into a natural pool deep enough for diving. Free entry. Short walk up from the parking area. The pool is safe for swimming in April. The mermaid legend is worth telling the kids." },
      { time: "12:00", type: "drive", tag: "Return", title: "Drive back through gorge into De Rust" },
      { time: "12:30", type: "meal", tag: "Lunch", title: "Herries Bistro & Pub — De Rust", description: "Pluim (the best restaurant in De Rust) is CLOSED on Mondays. Herries is the Monday pick. Good pizza, solid burgers, lively local atmosphere.", detail: "Schoeman Street · Walk-in" },
      { time: "14:00", type: "overnight", tag: "Check In", title: "Aards Guest Farm — luxury hillside tent", description: "Luxury tent built into a hillside using local materials. Hot tub, open-air bath, kitchenette, fireplace, private patio. 10min from De Rust village." },
      { time: "16:00", type: "activity", tag: "Afternoon", title: "Mons Ruber Wine Estate — quick visit", description: "Historic estate producing wine since the mid-1800s — dessert wines, port, and traditional witblits brandy. 5km from Aards on R328. Easy 20–30min visit." },
      { time: "19:00", type: "meal", tag: "Dinner", title: "Self-catered at Aards Guest Farm", description: "Use provisions stocked in Oudtshoorn this morning." },
    ],
    accommodation: { name: "Aards Guest Farm", type: "Luxury hillside tent · De Rust · 2 nights", booking: "Booking.com" },
  },
  // ===== DAY 9 =====
  {
    dayNumber: 9,
    date: "Tue 14 Apr",
    title: "De Rust — Full Day",
    subtitle: "Relax · Village · Pluim Lunch",
    timeline: [
      { time: "9:00", type: "meal", tag: "Breakfast", title: "Self-cater at Aards" },
      { time: "10:00", type: "activity", tag: "Morning", title: "De Rust village stroll", description: "De Rust is a haven for artists — browse galleries and craft shops on the main street at leisure." },
      { time: "12:00", type: "meal", tag: "Lunch", title: "Pluim Eatery — the best in De Rust", description: "4.7★ (240 reviews). Contemporary decor, back garden seating, pot pie of the day. Chef's recommendations consistently outstanding — chicken livers, fresh pies, small rotating menu. Combined art gallery and eatery.", detail: "24 Schoeman Street · +27 83 305 9974 · Tue–Sun 8:30am–3pm" },
      { time: "14:30", type: "activity", tag: "Afternoon", title: "Hot tub / relax at Aards", description: "The last genuinely slow afternoon of the trip. Use the hot tub, open-air bath, enjoy the views of the Swartberg from the private patio." },
      { time: "19:00", type: "meal", tag: "Dinner", title: "Self-catered at Aards Guest Farm", description: "Braai on the private patio with Swartberg views." },
      { type: "note", tag: "Prep for Baviaanskloof", title: "Pack provisions for Wed lunch, Wed night braai at Uitspan, and Thu morning breakfast. No shop in Baviaanskloof. Uitspan campsite: no cell signal — WhatsApp them now to confirm arrival." },
    ],
    accommodation: { name: "Aards Guest Farm", booking: "Night 2 of 2" },
  },
  // ===== DAY 10 =====
  {
    dayNumber: 10,
    date: "Wed 15 Apr",
    title: "De Rust → Baviaanskloof",
    subtitle: "Via Willowmore · ~180 km · ~3h 30m",
    drive: { depart: "8:30 AM", route: "N9 northeast to Willowmore, then R332 gravel into Baviaanskloof", distance: "~180 km · ~3h 30m (45km gravel at end)" },
    timeline: [
      { time: "8:00", type: "meal", tag: "Breakfast", title: "Self-cater at Aards before departure" },
      { time: "10:00", type: "drive", tag: "Fuel Stop", title: "Willowmore — FILL UP. Non-negotiable.", description: "No fuel available anywhere in Baviaanskloof. Fill the tank completely in Willowmore before taking the R332 turnoff." },
      { time: "10:30", type: "meal", tag: "Lunch", title: "Sophie's Choice — Keurfontein Country House", description: "19km from Willowmore on N9 toward Uniondale (32km return detour). Legendary antique shop-restaurant combo: spinach & feta quiche, bobotie, venison pie, carrot cake, best cappuccinos. Worth the detour if confirmed open.", detail: "CALL AHEAD to confirm: +27 73 140 5630 — ownership changed" },
      { time: "12:15", type: "drive", tag: "Turn Off", title: "R332 — Baviaanskloof entrance (3km north of Willowmore)", description: "45km of scenic gravel to Uitspan. Accessible to all vehicle types from this (western) side — no 4x4 required." },
      { time: "13:30", type: "overnight", tag: "Arrive", title: "Uitspan Campsite — set up camp", description: "Western end of the Baviaanskloof UNESCO World Heritage Site. Grassed sites with private ablutions, covered kitchens, 220V power, and braai facilities. No cellphone reception." },
      { time: "15:00", type: "activity", tag: "Activity", title: "Houtkloof or Koepel Hiking Trail", description: "Trails run directly from the campsite through the UNESCO World Heritage landscape. Excellent birding — 300+ species including 26 raptor species. Allow 1.5–2hrs." },
      { time: "19:00", type: "meal", tag: "Dinner", title: "Braai at Uitspan campsite — self-catered", description: "One of the most isolated nights of the trip. No signal, no grid power, complete darkness — the stars here will rival Luckhoff." },
      { type: "note", tag: "Why 8:30am tomorrow?", title: "Longest drive day (280km, ~4hrs). Need to leave by 8:30am Thursday to arrive Nieu-Bethesda before 1pm and catch Sneeuberg Brewery before it closes at 4pm." },
    ],
    accommodation: { name: "Uitspan Campsite — Baviaanskloof", type: "Campsite · No cell signal · 1 night", booking: "Direct booking · baviaansuitspan.co.za" },
  },
  // ===== DAY 11 =====
  {
    dayNumber: 11,
    date: "Thu 16 Apr",
    title: "Baviaanskloof → Nieu-Bethesda",
    subtitle: "~280 km · ~4h — longest drive day",
    drive: { depart: "8:30 AM", route: "R332 back to Willowmore → N9 north → Nieu-Bethesda turnoff", distance: "~280 km · ~4h including gravel sections" },
    timeline: [
      { type: "note", tag: "Why 8:30am?", title: "Sneeuberg Brewery closes at 4pm. Arrive by 1pm for lunch, drop bags, and still make the brewery with time for André's tour." },
      { time: "8:00", type: "meal", tag: "Breakfast", title: "Self-cater at campsite before departure" },
      { time: "10:30", type: "drive", tag: "Coffee Stop", title: "Brief stop in Graaff-Reinet area if needed", description: "~2hrs into the drive. Quick coffee and stretch. Pack snacks from Baviaanskloof provisions." },
      { time: "12:30", type: "overnight", tag: "Arrive", title: "Nieu-Bethesda — Oude Waenhuis", description: "Drop bags. You're 100m from the Owl House. The 1847 wagon house, beautifully restored with stylish interiors, private pool, and beautiful gardens. Cash useful for Owl House (Snapscan also accepted)." },
      { time: "13:30", type: "meal", tag: "Lunch", title: "Sneeuberg Brewery & 2 Goats Deli", description: "Cheese lunches under enormous pepper trees — handmade goat and cow's milk cheeses, venison salami, warm rosemary bread, salads and preserves. Karoo ale, hand-roasted coffee. Owner André Cilliers will give you a brewery tour while the kids explore the animal farm.", detail: "Pienaar Street · Open 9am–4pm · MUST arrive before 3pm" },
      { time: "15:00", type: "activity", tag: "Museum", title: "Owl House + Kitching Fossil Centre (combo ticket)", description: "Helen Martins' extraordinary outsider art — ground glass embedded walls, mirrors arranged to catch light, and the Camel Yard's procession of concrete camels. Start with the introductory film. Adjacent Kitching Fossil Centre covers Permian period life — 253 million years ago. Combo ticket R65pp.", detail: "Martin Street · Daily 9am–5pm" },
      { time: "17:00", type: "activity", tag: "Walk", title: "Village wander — leiwater, artists, viewpoint", description: "The ancient irrigation channels (leiwater) run through streets lined with whitewashed tin-roof cottages. The viewpoint overlooking the whole village is 10 minutes up and worth it before dark." },
      { time: "19:00", type: "meal", tag: "Dinner", title: "Ibis Lounge", description: "Lamb shank, oxtail, steak, burgers, 26 coffee varieties, homemade desserts. Open daily 8am–8pm. Book ahead.", detail: "PRE-BOOK: 072 742 7113" },
    ],
    accommodation: { name: "Oude Waenhuis", type: "Self-catering cottage · Nieu-Bethesda · 1 night", booking: "Booking.com" },
  },
  // ===== DAY 12 =====
  {
    dayNumber: 12,
    date: "Fri 17 Apr",
    title: "Nieu-Bethesda → Philippolis",
    subtitle: "~200 km · ~2h 30m — last night of the trip",
    drive: { depart: "9:00 AM", route: "N9 northwest → Colesberg direction → R717 north to Philippolis", distance: "~200 km · ~2h 30m" },
    timeline: [
      { time: "7:30", type: "activity", tag: "Morning Walk", title: "Leiwater & Poplar Forest Walk", description: "20–30min. Follow the ancient irrigation channel from the village past Boetie's Pub, take a left from Hill Street to the river. Walk through the poplar forest in early morning light — the best sendoff from Nieu-Bethesda." },
      { time: "8:30", type: "meal", tag: "Breakfast", title: "Self-cater at Oude Waenhuis before departure" },
      { time: "11:30", type: "drive", tag: "Arrive", title: "Philippolis — Die Groenhuis check-in", description: "Seven restored Karoo townhouses, oldest dating to 1890. Braai area, stoep, garden with pear and lemon trees." },
      { time: "12:00", type: "meal", tag: "Lunch", title: "Self-cater or ask Jens for a recommendation", description: "Jens knows exactly what's operating in the village." },
      { time: "14:00", type: "activity", tag: "Village Tour", title: "Guided village walk with Jens Friis", description: "Jens is the resident expert — he published a coffee table book on Philippolis and knows every building, family, and story. Tour includes the Dutch Reformed Church (1871 wild olive pulpit carved without nails), the Transgariep Museum (Emily Hobhouse, Griqua period, Anglo-Boer War). Peacocks and blue cranes stroll freely through the streets.", detail: "Message Jens ahead: +27 84 581 0149 to confirm afternoon timing" },
      { time: "17:30", type: "activity", tag: "Sundowners", title: "Stoep at Die Groenhuis", description: "The last proper Karoo sunset of the trip. Sit on the stoep with pomegranate and quince trees in the garden, open southern Free State sky above." },
      { time: "19:00", type: "meal", tag: "Dinner", title: "Skinny Chef at the Brewery — new opening", description: "Newly opened restaurant at or near the Philippolis brewery. Jens can point you there on arrival." },
    ],
    accommodation: { name: "Die Groenhuis", type: "Restored Karoo townhouse · Philippolis · 1 night", booking: "philippolis.co.za" },
  },
  // ===== DAY 13 =====
  {
    dayNumber: 13,
    date: "Sat 18 Apr",
    title: "Philippolis → Johannesburg",
    subtitle: "Home Day · 500 km · ~5h 30m",
    drive: { depart: "8:00 AM", route: "R717 to N1 North — straight home", distance: "~500 km · ~5h 30m" },
    timeline: [
      { type: "note", tag: "Why 8:00am?", title: "500km is a solid drive. 8am departure means you arrive JHB ~2pm. Leaving later risks afternoon Gauteng traffic." },
      { time: "7:30", type: "meal", tag: "Breakfast", title: "Tea and rusks at Die Groenhuis before departure" },
      { time: "9:30", type: "meal", tag: "Road Stop", title: "Coffee Talks — Bloemfontein", description: "The same Bloem coffee shop you stopped at on the way down, 13 days ago. Final proper coffee and food before the last stretch home to JHB.", detail: "~1h 30m into the return drive · Off the N1 in Bloemfontein" },
      { time: "14:00", type: "drive", tag: "Home", title: "Johannesburg", description: "The Karoo will be waiting for next time." },
    ],
  },
];
