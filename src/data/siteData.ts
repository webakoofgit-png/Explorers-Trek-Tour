export const heroMountains = "/images/hero-mountains.jpg";
export const heroCamping = "/images/hero-camping.jpg";
export const heroKids = "/images/kids-camp/tent-1.jpg";
export const heroWomen = "/images/hero-women.jpg";

export type TourType = "Weekend Trek" | "Himalayan Trek" | "Camping" | "Tour" | "Wildlife Tour" | "Speciality Tour";

export interface Batch {
  label: string;
  date: string;
  price: number;
  seats?: string;
}

export interface Trek {
  id: string;
  title: string;
  location: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Difficult" | "Extreme";
  endurance: "Low" | "Medium" | "High" | "Very High";
  ageGroup: string;
  price: number;
  originalPrice?: number;
  image: string;
  tag: string;
  reporting: string;
  description: string;
  overview: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  includes: string[];
  excludes: string[];
  month: string[];
  tourType: TourType;
  gallery: string[];
  batches: Batch[];
  featured?: boolean;
}

export const brand = {
  name: "Explorers",
  fullName: "Explorers Treks & Tours",
  tagline: "The Name of Excellence Since 2001",
  logoText: "EXPLORERS",
  whatsapp: "9850504437",
  address: "1692, Bhagyadarshan Building, Shop No 5, Sadashiv Peth, Tilak Road, Pune 411030",
};

export const heroSlides = [
  { image: heroMountains, title: "Weekend Treks", subtitle: "Guided Sahyadri escapes from Pune and Mumbai.", link: "/treks?type=Weekend+Trek" },
  { image: "/images/kids-camp/tent-1.jpg", title: "Junior Explorers", subtitle: "Safe outdoor learning & adventure camps for ages 8-16.", link: "/programs/junior-explorers" },
  { image: heroWomen, title: "Lady Explorers", subtitle: "Women-only treks, camps, tours, and friendships.", link: "/programs/lady-explorers" },
  { image: heroMountains, title: "Silver Explorers", subtitle: "Comfortable, carefully paced trips for 40+ explorers.", link: "/programs/silver-explorers" },
  { image: heroCamping, title: "Camping", subtitle: "Lake, forest, and mountain stays under open skies.", link: "/treks?type=Camping" },
  { image: heroWomen, title: "Himalayan Treks", subtitle: "High-altitude journeys led by trained teams.", link: "/treks?type=Himalayan+Trek" },
  { image: heroCamping, title: "Customise Your Tour", subtitle: "Private domestic, international, school, and corporate plans.", link: "/programs/customised-packages" },
  { image: "/images/kids-camp/archery.jpg", title: "Atlas", subtitle: "Adventure leadership training academy by Explorers.", link: "/atlas" },
  { image: heroMountains, title: "Jungle Safari", subtitle: "Wildlife tours across India's iconic national parks.", link: "/programs/wildlife-tours" },
];

export const globalSchedule = [
  { date: "01 June 2026", title: "Andharban", type: "Weekend Trek", month: "June", year: "2026" },
  { date: "10 June 2026", title: "Devkund Waterfall", type: "Weekend Trek", month: "June", year: "2026" },
  { date: "15 July 2026", title: "Madheghat Waterfall Rappelling", type: "Weekend Trek", month: "July", year: "2026" },
  { date: "25 August 2026", title: "Pavna Camping", type: "Camping", month: "August", year: "2026" },
  { date: "12 September 2026", title: "Lady Explorers Monsoon Special", type: "Speciality Tour", month: "September", year: "2026" },
  { date: "18 October 2026", title: "Himalayan Base Camp Briefing", type: "Himalayan Trek", month: "October", year: "2026" },
  { date: "01 January 2027", title: "Silver Explorers New Year Trail", type: "Speciality Tour", month: "January", year: "2027" },
];

export const trustStats = [
  { number: "24+", label: "Years Experience", note: "Since 2001", icon: "24+" },
  { number: "Certified", label: "Certified by Maharashtra Tourism", note: "Recognised operator", icon: "MT" },
  { number: "100%", label: "Safety Record", note: "Trained leaders", icon: "100" },
  {
    number: "4.7/5",
    label: "Google Rating",
    note: "Based on 476 Google reviews",
    icon: "Google",
    link: "https://share.google/gjutfkcL6JiTO7W7X",
  },
  { number: "5000+", label: "Treks Completed", note: "Across India", icon: "5K" },
];

export const treks: Trek[] = [
  {
    id: "junior-explorers-adventure-camp",
    title: "Junior Explorers Outdoor Leadership & Kids Camp",
    location: "Lonavala / Panshet, Maharashtra",
    duration: "3 Days / 2 Nights",
    difficulty: "Easy",
    endurance: "Low",
    ageGroup: "8-16 years",
    price: 3499,
    originalPrice: 4200,
    image: "/images/kids-camp/tent-1.jpg",
    tag: "Kids Camp Special",
    reporting: "Pune to Pune",
    description: "3 days of archery, air rifle shooting, high rope obstacle course, tent pitching, traditional games, and night star gazing.",
    overview: "Specially designed for children aged 8 to 16, the Junior Explorers Camp is an immersive, screen-free outdoor learning program. Led by certified instructors and child-friendly safety marshals, children develop independence, teamwork, confidence, and survival skills through hands-on adventure activities.",
    highlights: [
      "Archery & Air Rifle Target Practice",
      "Tent Pitching & Outdoor Wilderness Camping",
      "Elevated High Rope Obstacle Challenge",
      "Astronomy & Night Sky Star Gazing",
      "Traditional Indian Games & Team Drills",
      "100% Certified Safety Leaders & 24/7 Medical First-Aid"
    ],
    itinerary: [
      { day: 1, title: "Pickup, Arrival & Tent Pitching Workshop", description: "Pickup from Pune, arrival at campsite, orientation, group formation, tent pitching hands-on session, evening bonfire & star gazing." },
      { day: 2, title: "Archery, Rifle Shooting & Rope Course", description: "Morning yoga & breathing drills, archery & air rifle target practice, afternoon high rope obstacle course, traditional games, campfire talent show." },
      { day: 3, title: "Nature Trail Walk & Certificate Ceremony", description: "Guided morning nature trail, bird watching, knot-tying contest, certificate distribution ceremony, and return transfer to Pune." }
    ],
    includes: ["Pune to campsite transfer", "Tent stay & bedding", "All meals (Breakfast, Lunch, High Tea, Dinner)", "All activity equipment & certified instructors", "First aid support & certificate"],
    excludes: ["Personal purchases", "Insurance"],
    month: ["May", "Jun", "Oct", "Nov", "Dec"],
    tourType: "Speciality Tour",
    gallery: [
      "/images/kids-camp/tent-1.jpg",
      "/images/kids-camp/archery.jpg",
      "/images/kids-camp/rifle-shooting.jpg",
      "/images/kids-camp/rope-activity.jpg",
      "/images/kids-camp/star-gazing.jpg",
      "/images/kids-camp/old-indian-games.jpg",
      "/images/kids-camp/omkar.jpg",
      "/images/kids-camp/kids-camp-1.jpg"
    ],
    batches: [
      { label: "Batch 1 (Summer Special)", date: "15 May 2026", price: 3499, seats: "Filling Fast" },
      { label: "Batch 2 (Summer Special)", date: "22 May 2026", price: 3499, seats: "Open" },
      { label: "Batch 3 (Monsoon Camp)", date: "12 June 2026", price: 3499, seats: "Open" },
      { label: "Batch 4 (Diwali Break)", date: "25 October 2026", price: 3499, seats: "Open" },
      { label: "Batch 5 (Winter Camp)", date: "25 December 2026", price: 3499, seats: "Xmas Special" },
    ],
    featured: true,
  },
  {
    id: "velas-turtle-festival",
    title: "Velas Turtle Festival & Konkan Coastal Tour",
    location: "Velas & Harihareshwar, Ratnagiri, Maharashtra",
    duration: "2 Days / 1 Night",
    difficulty: "Easy",
    endurance: "Low",
    ageGroup: "All Age Groups (5-70 years)",
    price: 2999,
    originalPrice: 3500,
    image: "/images/velas-turtle-festival/velas-turtle-5.jpg",
    tag: "Eco Wildlife Special",
    reporting: "Pune & Mumbai",
    description: "Witness tiny Olive Ridley baby turtles hatching & taking their first steps into the Arabian Sea at Velas Beach, along with Harihareshwar temple & Bankot Fort.",
    overview: "The Velas Turtle Festival is a famous eco-tourism conservation movement in Maharashtra. Every year from February to April, female Olive Ridley turtles lay eggs on Velas beach. Explorers Group takes you to witness the magical moment when baby turtles hatch out of nests and crawl into the turquoise ocean. Includes Bankot Fort visit, Ferry boat ride, authentic Konkani homestay food, Harihareshwar beach & temple visit.",
    highlights: [
      "Witness Olive Ridley Turtle Hatchling Release into Ocean",
      "Scenic Ferry Boat Ride & Beach Exploration",
      "Historical Bankot Fort Hike & Sea Sunset Views",
      "Harihareshwar Temple & Pradakshina Route Visit",
      "Authentic Home-Cooked Konkani Solkadhi & Seafood/Veg Meals",
      "Stay in Traditional Konkani Village Homestays"
    ],
    itinerary: [
      { day: 1, title: "Pune/Mumbai to Velas Village & Sunset Hatching Release", description: "Early morning pickup from Pune/Mumbai, scenic Konkan drive, arrive at Velas village, traditional Konkani lunch. Afternoon visit to Velas beach for 5 PM turtle hatchling release session, Bankot Fort sunset walk, homestay dinner & bonfire." },
      { day: 2, title: "Morning Turtle Release, Ferry Ride & Harihareshwar Visit", description: "6:30 AM early morning beach visit for second turtle release session. Breakfast, departure for Bagmandle ferry boat crossing to Harihareshwar. Temple darshan, coastal rock formations walk, lunch, and return journey to Pune/Mumbai by evening." }
    ],
    includes: ["Transport Pune/Mumbai to Velas & back", "Ferry boat charges & entry fees", "Homestay accommodation", "1 Breakfast, 2 Lunches, 1 Dinner", "Conservation expert & tour leader", "First aid"],
    excludes: ["Personal expenses", "Camera fees", "Insurance"],
    month: ["Feb", "Mar", "Apr"],
    tourType: "Speciality Tour",
    gallery: [
      "/images/velas-turtle-festival/velas-turtle-5.jpg",
      "/images/velas-turtle-festival/velas-turtle-4.jpg",
      "/images/velas-turtle-festival/velas-turtle-1.jpg",
      "/images/velas-turtle-festival/velas-turtle-2.jpg",
      "/images/velas-turtle-festival/velas-turtle-3.jpg",
      "/images/velas-turtle-festival/velas-turtle-6.png",
      "/images/velas-turtle-festival/velas-turtle-7.png",
      "/images/velas-turtle-festival/velas-turtle-8.jpeg",
      "/images/velas-turtle-festival/velas-turtle-9.jpeg"
    ],
    batches: [
      { label: "Batch 1 (Hatching Season)", date: "13 February 2027", price: 2999, seats: "Filling Fast" },
      { label: "Batch 2 (Hatching Season)", date: "27 February 2027", price: 2999, seats: "Open" },
      { label: "Batch 3 (Peak Hatching)", date: "13 March 2027", price: 2999, seats: "Open" },
      { label: "Batch 4 (Peak Hatching)", date: "27 March 2027", price: 2999, seats: "Open" },
      { label: "Batch 5 (Spring Special)", date: "10 April 2027", price: 2999, seats: "Open" }
    ],
    featured: true,
  },
  {
    id: "junior-explorers-rappelling-trail",
    title: "Junior Explorers Waterfall Rappelling & Trail Camp",
    location: "Sahyadri, Maharashtra",
    duration: "2 Days / 1 Night",
    difficulty: "Moderate",
    endurance: "Medium",
    ageGroup: "10-16 years",
    price: 2799,
    originalPrice: 3300,
    image: "/images/kids-camp/rappelling-1.jpg",
    tag: "Adventure Thrill",
    reporting: "Pune to Pune",
    description: "Supervised waterfall rappelling, stream crossing, fort trekking, and nature trails designed for young adventurers.",
    overview: "An empowering outdoor adventure program where kids conquer their fear of heights through safe, professionally supervised waterfall and rock rappelling. Includes nature trails, fort exploration, and outdoor survival skills.",
    highlights: [
      "Guided Waterfall & Rock Rappelling",
      "Sahyadri Fort & Nature Trail Hike",
      "Night Campfire & Outdoor Storytelling",
      "Map Reading & Compass Navigation Drills",
      "Certified Mountain Safety Instructors & 1-on-1 Harness Care"
    ],
    itinerary: [
      { day: 1, title: "Base Camp & Technical Briefing", description: "Travel to Sahyadri base, safety harness fitting, technical briefing, afternoon rock rappelling practice, campsite dinner." },
      { day: 2, title: "Fort Trail Trek & Dispersal", description: "Early morning trail trek, fort history tour, certificate ceremony, and afternoon return to Pune." }
    ],
    includes: ["Transport Pune to base", "Safety gear & certified instructors", "Campsite meals & stay", "First aid & certificate"],
    excludes: ["Personal expenses", "Insurance"],
    month: ["Jun", "Jul", "Aug", "Sep", "Oct"],
    tourType: "Speciality Tour",
    gallery: [
      "/images/kids-camp/rappelling-1.jpg",
      "/images/kids-camp/rappelling-2.jpg",
      "/images/kids-camp/trek-1.jpg",
      "/images/kids-camp/trek-3.jpg",
      "/images/kids-camp/tent-2.jpg",
      "/images/kids-camp/trek-7.jpg",
      "/images/kids-camp/kids-camp-2.jpg"
    ],
    batches: [
      { label: "Batch 1", date: "20 June 2026", price: 2799, seats: "Filling Fast" },
      { label: "Batch 2", date: "18 July 2026", price: 2799, seats: "Open" },
      { label: "Batch 3", date: "15 August 2026", price: 2799, seats: "Independence Special" },
      { label: "Batch 4", date: "12 September 2026", price: 2799, seats: "Open" },
    ],
    featured: true,
  },
  {
    id: "andharban",
    title: "Andharban",
    location: "Bhira, Maharashtra",
    duration: "1 Day",
    difficulty: "Moderate",
    endurance: "Medium",
    ageGroup: "12-60",
    price: 1499,
    image: heroMountains,
    tag: "Trending",
    reporting: "Pune to Pune",
    description: "A misty forest descent through the famous dark forest route near Bhira.",
    overview: "Andharban is one of the most loved weekend treks near Pune-Mumbai, ideal for monsoon treks near Pune, guided treks Pune, and beginner trekking routes with a professional team. Explorers Group offers professionally guided Treks in Sahyadri, covering one-day and multi-day trekking experiences across summer, monsoon and winter seasons.",
    highlights: ["Dense Sahyadri forest trail", "Waterfalls and valley views", "Professional trek leader", "Great monsoon photography", "Beginner-friendly pacing"],
    itinerary: [{ day: 1, title: "Pune to Bhira and forest trek", description: "Early pickup from Pune, breakfast en route, guided Andharban trail walk, lunch, descent, and return by late evening." }],
    includes: ["Transport from Pune", "Breakfast and lunch", "Trek leader", "First aid", "Basic expertise charges"],
    excludes: ["Personal expenses", "Insurance", "Anything not mentioned in includes"],
    month: ["Jun", "Jul", "Aug", "Sep", "Oct"],
    tourType: "Weekend Trek",
    gallery: [heroMountains, heroWomen, heroCamping],
    batches: [
      { label: "Batch 1", date: "07 June 2026", price: 1499, seats: "Filling Fast" },
      { label: "Batch 2", date: "14 June 2026", price: 1499, seats: "Open" },
      { label: "Batch 3", date: "21 June 2026", price: 1499, seats: "Open" },
      { label: "Batch 4", date: "28 June 2026", price: 1499, seats: "Open" },
      { label: "Batch 5", date: "05 July 2026", price: 1499, seats: "8 seats left" },
      { label: "Batch 6", date: "12 July 2026", price: 1499, seats: "Filling Fast" },
      { label: "Batch 7", date: "19 July 2026", price: 1499, seats: "Open" },
      { label: "Batch 8", date: "26 July 2026", price: 1499, seats: "Open" },
      { label: "Batch 9", date: "02 August 2026", price: 1499, seats: "Open" },
      { label: "Batch 10", date: "09 August 2026", price: 1499, seats: "Filling Fast" },
      { label: "Batch 11", date: "15 August 2026", price: 1499, seats: "Independence Special" },
      { label: "Batch 12", date: "23 August 2026", price: 1499, seats: "Open" },
      { label: "Batch 13", date: "06 September 2026", price: 1499, seats: "Filling Fast" },
      { label: "Batch 14", date: "13 September 2026", price: 1499, seats: "Open" },
      { label: "Batch 15", date: "20 September 2026", price: 1499, seats: "Open" },
      { label: "Batch 16", date: "27 September 2026", price: 1499, seats: "Open" },
      { label: "Batch 17", date: "04 October 2026", price: 1499, seats: "Open" },
    ],
    featured: true,
  },
  {
    id: "devkund-waterfall",
    title: "Devkund Waterfall",
    location: "Bhira, Maharashtra",
    duration: "1 Day",
    difficulty: "Easy",
    endurance: "Low",
    ageGroup: "10-60",
    price: 1499,
    image: heroCamping,
    tag: "Must Do",
    reporting: "Pune to Pune",
    description: "A classic waterfall trail to the turquoise plunge pool of Devkund.",
    overview: "Devkund is a popular one day trek near Pune and Mumbai, perfect for guided treks Pune, weekend treks near Pune, and monsoon treks near Pune with safety-focused leaders.",
    highlights: ["Waterfall trail", "Forest walk", "Safe group management", "Ideal for first-time trekkers", "Scenic Bhira backwaters"],
    itinerary: [{ day: 1, title: "Waterfall trail", description: "Pickup, breakfast, forest walk to Devkund, lunch, return trek, evening drop." }],
    includes: ["Transport from Pune", "Meals as per plan", "Guide", "First aid"],
    excludes: ["Changing room charges", "Personal expenses", "Insurance"],
    month: ["Jun", "Jul", "Aug", "Sep", "Oct"],
    tourType: "Weekend Trek",
    gallery: [heroCamping, heroMountains, heroKids],
    batches: [
      { label: "Batch 1", date: "06 June 2026", price: 1499, seats: "Open" },
      { label: "Batch 2", date: "13 June 2026", price: 1499, seats: "Open" },
      { label: "Batch 3", date: "20 June 2026", price: 1499, seats: "Filling Fast" },
      { label: "Batch 4", date: "27 June 2026", price: 1499, seats: "Open" },
      { label: "Batch 5", date: "04 July 2026", price: 1499, seats: "Open" },
      { label: "Batch 6", date: "11 July 2026", price: 1499, seats: "Filling Fast" },
      { label: "Batch 7", date: "18 July 2026", price: 1499, seats: "Open" },
      { label: "Batch 8", date: "25 July 2026", price: 1499, seats: "Open" },
      { label: "Batch 9", date: "01 August 2026", price: 1499, seats: "Open" },
      { label: "Batch 10", date: "08 August 2026", price: 1499, seats: "Open" },
      { label: "Batch 11", date: "15 August 2026", price: 1499, seats: "Filling Fast" },
      { label: "Batch 12", date: "05 September 2026", price: 1499, seats: "Open" },
      { label: "Batch 13", date: "12 September 2026", price: 1499, seats: "Filling Fast" },
      { label: "Batch 14", date: "19 September 2026", price: 1499, seats: "Open" },
      { label: "Batch 15", date: "26 September 2026", price: 1499, seats: "Open" },
      { label: "Batch 16", date: "10 October 2026", price: 1499, seats: "Open" },
    ],
    featured: true,
  },
  {
    id: "madheghat-rappelling",
    title: "Madheghat Waterfall Rappelling",
    location: "Kelad, Maharashtra",
    duration: "1 Day",
    difficulty: "Difficult",
    endurance: "High",
    ageGroup: "16-50",
    price: 800,
    image: heroWomen,
    tag: "Adventure Special",
    reporting: "Direct Reporting",
    description: "A high-adrenaline waterfall rappelling event in the Sahyadri.",
    overview: "Madheghat is built for adventure lovers looking for offbeat treks Maharashtra, fort treks near Pune/Mumbai, and a professionally managed technical activity.",
    highlights: ["Waterfall rappelling", "Technical safety briefing", "Helmet and harness support", "Experienced activity team", "Raw mountain setting"],
    itinerary: [{ day: 1, title: "Rappelling activity", description: "Report at Kelad, safety briefing, activity rotation, lunch break, certificate photo, and dispersal." }],
    includes: ["Activity gear", "Technical experts", "Basic first aid", "Activity charges"],
    excludes: ["Travel", "Meals", "Personal expenses"],
    month: ["Jul", "Aug", "Sep"],
    tourType: "Weekend Trek",
    gallery: [heroWomen, heroMountains, heroCamping],
    batches: [
      { label: "Batch 1", date: "12 July 2026", price: 800, seats: "Open" },
      { label: "Batch 2", date: "19 July 2026", price: 800, seats: "Filling Fast" },
      { label: "Batch 3", date: "26 July 2026", price: 800, seats: "Open" },
      { label: "Batch 4", date: "09 August 2026", price: 800, seats: "Open" },
      { label: "Batch 5", date: "16 August 2026", price: 800, seats: "Filling Fast" },
      { label: "Batch 6", date: "23 August 2026", price: 800, seats: "Open" },
      { label: "Batch 7", date: "06 September 2026", price: 800, seats: "Filling Fast" },
      { label: "Batch 8", date: "13 September 2026", price: 800, seats: "Open" },
      { label: "Batch 9", date: "20 September 2026", price: 800, seats: "Open" },
    ],
    featured: true,
  },
  {
    id: "kalsubai-peak",
    title: "Kalsubai Peak Trek",
    location: "Bari, Maharashtra",
    duration: "1 Day / 1 Night",
    difficulty: "Moderate",
    endurance: "High",
    ageGroup: "12-55",
    price: 1399,
    image: heroMountains,
    tag: "Highest Peak",
    reporting: "Pune / Mumbai",
    description: "Scale the highest peak of Maharashtra (5400 ft) with iron ladders and panoramic views.",
    overview: "Kalsubai Peak is Maharashtra's Everest. Experiencing Kalsubai in monsoon green mist or winter sunrise is a proud milestone for every explorer.",
    highlights: ["Summit Kalsubai (5400 ft)", "Iconic steel ladder climbs", "Temple at summit", "Sunrise or monsoon mist view", "Traditional village meal"],
    itinerary: [{ day: 1, title: "Base Bari to Summit", description: "Night travel to Bari, early morning climb, summit temple visit, descent, local lunch, and evening return." }],
    includes: ["Transport Pune/Mumbai", "Breakfast & Lunch", "Safety gear & Guide", "First aid"],
    excludes: ["Personal expenses", "Insurance"],
    month: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    tourType: "Weekend Trek",
    gallery: [heroMountains, heroCamping, heroWomen],
    batches: [
      { label: "Batch 1", date: "13 June 2026", price: 1399, seats: "Open" },
      { label: "Batch 2", date: "18 July 2026", price: 1399, seats: "Filling Fast" },
      { label: "Batch 3", date: "15 August 2026", price: 1399, seats: "Open" },
      { label: "Batch 4", date: "12 September 2026", price: 1399, seats: "Filling Fast" },
      { label: "Batch 5", date: "17 October 2026", price: 1399, seats: "Open" },
      { label: "Batch 6", date: "14 November 2026", price: 1399, seats: "Open" },
      { label: "Batch 7", date: "12 December 2026", price: 1399, seats: "Open" },
      { label: "Batch 8", date: "31 December 2026", price: 1399, seats: "NYE Night Trek" },
      { label: "Batch 9", date: "09 January 2027", price: 1399, seats: "Open" },
      { label: "Batch 10", date: "13 February 2027", price: 1399, seats: "Open" },
      { label: "Batch 11", date: "13 March 2027", price: 1399, seats: "Night Trek" },
      { label: "Batch 12", date: "10 April 2027", price: 1399, seats: "Night Trek" },
      { label: "Batch 13", date: "08 May 2027", price: 1399, seats: "Night Trek" },
    ],
    featured: true,
  },
  {
    id: "rajmachi-fort",
    title: "Rajmachi Fort & Camping",
    location: "Lonavala, Maharashtra",
    duration: "2 Days / 1 Night",
    difficulty: "Easy",
    endurance: "Medium",
    ageGroup: "10-60",
    price: 1799,
    image: heroCamping,
    tag: "Monsoon & Fireflies",
    reporting: "Lonavala / Pune",
    description: "Explore Twin Forts Shrivardhan and Manoranjan with lush green trails and camping.",
    overview: "Rajmachi Fort trek is famous for fireflies in early monsoon, green plateau walks, and historical twin forts.",
    highlights: ["Shrivardhan & Manoranjan forts", "Fireflies trail", "Village homestay / camping", "Bhairavnath temple", "Scenic Kataldhar views"],
    itinerary: [
      { day: 1, title: "Lonavala to Udhewadi", description: "Reach Lonavala, trek/jeep to Udhewadi village, sunset walk, village dinner & bonfire." },
      { day: 2, title: "Twin Forts & Descent", description: "Early climb to Shrivardhan fort, breakfast, explore Manoranjan, descent and return." }
    ],
    includes: ["Lonavala transfer", "Homestay / Tents", "Dinner, Breakfast & Lunch", "Trek leader"],
    excludes: ["Personal expenses", "Insurance"],
    month: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    tourType: "Weekend Trek",
    gallery: [heroCamping, heroMountains, heroKids],
    batches: [
      { label: "Batch 1", date: "20 June 2026", price: 1799, seats: "Open" },
      { label: "Batch 2", date: "25 July 2026", price: 1799, seats: "Filling Fast" },
      { label: "Batch 3", date: "22 August 2026", price: 1799, seats: "Open" },
      { label: "Batch 4", date: "19 September 2026", price: 1799, seats: "Filling Fast" },
      { label: "Batch 5", date: "24 October 2026", price: 1799, seats: "Open" },
      { label: "Batch 6", date: "21 November 2026", price: 1799, seats: "Open" },
      { label: "Batch 7", date: "19 December 2026", price: 1799, seats: "Open" },
      { label: "Batch 8", date: "16 January 2027", price: 1799, seats: "Open" },
      { label: "Batch 9", date: "20 February 2027", price: 1799, seats: "Open" },
      { label: "Batch 10", date: "20 March 2027", price: 1799, seats: "Open" },
      { label: "Batch 11", date: "17 April 2027", price: 1799, seats: "Open" },
      { label: "Batch 12", date: "15 May 2027", price: 1799, seats: "Open" },
    ],
    featured: true,
  },
  {
    id: "harishchandragad",
    title: "Harishchandragad & Kokankada",
    location: "Khireshwar, Maharashtra",
    duration: "2 Days / 1 Night",
    difficulty: "Moderate",
    endurance: "High",
    ageGroup: "14-55",
    price: 1899,
    image: heroMountains,
    tag: "Iconic Sahyadri",
    reporting: "Pune / Mumbai",
    description: "Witness the awe-inspiring overhang cliff of Kokankada and ancient Harishchandreshwar temple.",
    overview: "Harishchandragad is an epic hill fort in Ahmednagar district, world renowned for the concave cliff face of Kokankada.",
    highlights: ["Vertical Kokankada cliff", "Taramati peak (2nd highest)", "Kedarheshwar cave temple", "Cave / tent stay", "Sunset over clouds"],
    itinerary: [
      { day: 1, title: "Base to Plateau", description: "Night drive, reach base, ascend via Khireshwar/Nalichi Bato, reach cave, view sunset at Kokankada." },
      { day: 2, title: "Taramati Peak & Return", description: "Early climb to Taramati peak, temple visit, breakfast, descent to base, return trip." }
    ],
    includes: ["Transport Pune/Mumbai", "Tent/Cave stay", "2 Meals, Breakfast", "Guide & expertise"],
    excludes: ["Personal expenses", "Insurance"],
    month: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    tourType: "Weekend Trek",
    gallery: [heroMountains, heroWomen, heroCamping],
    batches: [
      { label: "Batch 1", date: "27 June 2026", price: 1899, seats: "Open" },
      { label: "Batch 2", date: "26 July 2026", price: 1899, seats: "Open" },
      { label: "Batch 3", date: "30 August 2026", price: 1899, seats: "Filling Fast" },
      { label: "Batch 4", date: "27 September 2026", price: 1899, seats: "Filling Fast" },
      { label: "Batch 5", date: "31 October 2026", price: 1899, seats: "Open" },
      { label: "Batch 6", date: "22 November 2026", price: 1899, seats: "Open" },
      { label: "Batch 7", date: "20 December 2026", price: 1899, seats: "Open" },
      { label: "Batch 8", date: "17 January 2027", price: 1899, seats: "Open" },
      { label: "Batch 9", date: "21 February 2027", price: 1899, seats: "Open" },
      { label: "Batch 10", date: "21 March 2027", price: 1899, seats: "Open" },
      { label: "Batch 11", date: "18 April 2027", price: 1899, seats: "Open" },
      { label: "Batch 12", date: "23 May 2027", price: 1899, seats: "Open" },
    ],
    featured: true,
  },
  {
    id: "pavna-lake-camping",
    title: "Pavna Lake Camping",
    location: "Pavna, Maharashtra",
    duration: "1 Night",
    difficulty: "Easy",
    endurance: "Low",
    ageGroup: "5-70",
    price: 1299,
    image: heroCamping,
    tag: "Popular",
    reporting: "Direct Reporting",
    description: "Lakeside camping with tents, food, bonfire, and morning views.",
    overview: "A comfortable camping experience for families, school groups, and private groups near Pune.",
    highlights: ["Lakeside tents", "Bonfire evening", "Dinner and breakfast", "Family-friendly", "Customisable group dates"],
    itinerary: [{ day: 1, title: "Camp check-in", description: "Evening check-in, games, BBQ-style dinner, bonfire, tent stay, breakfast, and checkout." }],
    includes: ["Tent stay", "Dinner", "Breakfast", "Bonfire", "Camp coordinator"],
    excludes: ["Travel", "Extra activities", "Personal purchases"],
    month: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    tourType: "Camping",
    gallery: [heroCamping, heroKids, heroMountains],
    batches: [
      { label: "Batch 1", date: "25 August 2026", price: 1299, seats: "Open" },
      { label: "Batch 2", date: "12 September 2026", price: 1299, seats: "Filling Fast" },
      { label: "Batch 3", date: "26 September 2026", price: 1299, seats: "Open" },
      { label: "Batch 4", date: "10 October 2026", price: 1299, seats: "Open" },
      { label: "Batch 5", date: "24 October 2026", price: 1299, seats: "Diwali Camp" },
      { label: "Batch 6", date: "07 November 2026", price: 1299, seats: "Open" },
      { label: "Batch 7", date: "21 November 2026", price: 1299, seats: "Open" },
      { label: "Batch 8", date: "05 December 2026", price: 1299, seats: "Open" },
      { label: "Batch 9", date: "19 December 2026", price: 1299, seats: "Open" },
      { label: "Batch 10", date: "31 December 2026", price: 1299, seats: "NYE Special" },
      { label: "Batch 11", date: "01 January 2027", price: 1299, seats: "New Year Special" },
      { label: "Batch 12", date: "16 January 2027", price: 1299, seats: "Open" },
      { label: "Batch 13", date: "13 February 2027", price: 1299, seats: "Valentine Special" },
      { label: "Batch 14", date: "13 March 2027", price: 1299, seats: "Open" },
      { label: "Batch 15", date: "10 April 2027", price: 1299, seats: "Open" },
      { label: "Batch 16", date: "08 May 2027", price: 1299, seats: "Open" },
    ],
    featured: true,
  },
  {
    id: "kedarkantha",
    title: "Kedarkantha Snow Trek",
    location: "Uttarakhand, Himalaya",
    duration: "6 Days",
    difficulty: "Moderate",
    endurance: "High",
    ageGroup: "14-55",
    price: 8999,
    originalPrice: 10999,
    image: heroMountains,
    tag: "Snow Summit",
    reporting: "Dehradun to Dehradun",
    description: "A snow-season Himalayan summit trek with forest trails and wide mountain views.",
    overview: "A classic winter trek Maharashtra travellers love when graduating from Sahyadri treks Pune to guided Himalayan treks.",
    highlights: ["Snow summit", "Pine forests", "Camping experience", "Certified trek team", "High-altitude preparation"],
    itinerary: [
      { day: 1, title: "Dehradun to Sankri", description: "Drive to Sankri and briefing." },
      { day: 2, title: "Sankri to Juda Ka Talab", description: "Forest trek and campsite." },
      { day: 3, title: "Base camp", description: "Trek to Kedarkantha base." },
      { day: 4, title: "Summit day", description: "Early summit push and descent." },
      { day: 5, title: "Return to Sankri", description: "Descend and celebration dinner." },
      { day: 6, title: "Sankri to Dehradun", description: "Drive back." },
    ],
    includes: ["Meals on trek", "Camping equipment", "Trek leaders", "Forest permissions", "First aid"],
    excludes: ["Travel to Dehradun", "Personal gear", "Insurance", "Porter charges"],
    month: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    tourType: "Himalayan Trek",
    gallery: [heroMountains, heroWomen, heroCamping],
    batches: [
      { label: "Batch 1", date: "18 October 2026", price: 8999, seats: "Open" },
      { label: "Batch 2", date: "25 October 2026", price: 8999, seats: "Open" },
      { label: "Batch 3", date: "08 November 2026", price: 8999, seats: "Open" },
      { label: "Batch 4", date: "22 November 2026", price: 8999, seats: "Open" },
      { label: "Batch 5", date: "06 December 2026", price: 8999, seats: "Snow Batch" },
      { label: "Batch 6", date: "20 December 2026", price: 8999, seats: "Xmas Special" },
      { label: "Batch 7", date: "25 December 2026", price: 8999, seats: "Filling Fast" },
      { label: "Batch 8", date: "30 December 2026", price: 8999, seats: "NYE Snow Summit" },
      { label: "Batch 9", date: "03 January 2027", price: 8999, seats: "Open" },
      { label: "Batch 10", date: "15 January 2027", price: 8999, seats: "Open" },
      { label: "Batch 11", date: "10 February 2027", price: 8999, seats: "Open" },
      { label: "Batch 12", date: "07 March 2027", price: 8999, seats: "Spring Snow" },
      { label: "Batch 13", date: "11 April 2027", price: 8999, seats: "Open" },
    ],
    featured: true,
  },
  {
    id: "manali-adventure-camp",
    title: "Manali Wilderness Adventure & Youth Camp",
    location: "Manali, Himachal Pradesh",
    duration: "6 Days / 5 Nights",
    difficulty: "Easy",
    endurance: "Medium",
    ageGroup: "10-22 years & Families",
    price: 8999,
    originalPrice: 11500,
    image: "/images/manali-camp/manali-camp-1.jpg",
    tag: "Himalayan Camp Special",
    reporting: "Manali to Manali",
    description: "6 days of Himalayan wilderness camping, Solang valley adventure sports, pine forest trekking, river crossing, and night campfires in Manali.",
    overview: "Our flagship Manali Wilderness Adventure Camp offers young explorers and families an unforgettable Himalayan outdoor experience. Set amidst alpine pine forests and snow-capped peaks, participants engage in river crossing, rock climbing, high-altitude trekking, stream walks, and survival leadership modules under certified mountaineers.",
    highlights: [
      "Authentic Alpine Wilderness Camping in Manali",
      "Solang Valley Adventure & Snow Trail Walk",
      "Pine Forest Nature Treks & Stream Crossing",
      "Rock Climbing, Rappelling & River Crossing Drills",
      "Bonfire Evenings, Star Gazing & Cultural Night",
      "24/7 Medical Care, Certified Mountaineering Team & Healthy Meals"
    ],
    itinerary: [
      { day: 1, title: "Report at Manali Base Camp & Acclimatization", description: "Report at Manali camp site, tent allocation, orientation briefing, evening river side acclimatization walk, dinner & bonfire." },
      { day: 2, title: "Rock Climbing, Rappelling & River Crossing", description: "Morning fitness session, technical rock climbing & rappelling training, river crossing techniques, evening outdoor team games." },
      { day: 3, title: "Solang Valley & Snow Point Excursion", description: "Full day excursion to Solang Valley, snow trail walk, adventure activities, scenic valley photography, and return to camp." },
      { day: 4, title: "Pine Forest Wilderness Trek to Jogini Waterfall", description: "Guided trail trek through pine forests to Jogini Waterfalls, Vashisht hot springs visit, outdoor picnic lunch." },
      { day: 5, title: "High Altitude Ridge Trail & Cultural Night", description: "Ridge trek offering panoramic views of Pir Panjal range, outdoor survival knot workshop, certificate ceremony & camp talent show." },
      { day: 6, title: "Dispersal & Return Journey", description: "Post breakfast checkout, souvenir shopping in Manali town, and dispersal." }
    ],
    includes: ["Manali camp accommodation in alpine tents", "All meals (Breakfast, Lunch, Evening Snacks, Dinner)", "All adventure gear & certified instructors", "Permits, first aid & official certificate"],
    excludes: ["Travel to Manali", "Personal gear & purchases", "Insurance"],
    month: ["Apr", "May", "Jun", "Jul", "Oct"],
    tourType: "Himalayan Trek",
    gallery: [
      "/images/manali-camp/manali-camp-1.jpg",
      "/images/manali-camp/manali-camp-2.jpg",
      "/images/manali-camp/manali-camp-3.jpg",
      "/images/manali-camp/manali-camp-4.jpg",
      "/images/manali-camp/manali-camp-5.jpg",
      "/images/manali-camp/manali-camp-6.jpg",
      "/images/manali-camp/manali-camp-7.jpg"
    ],
    batches: [
      { label: "Batch 1 (Summer Camp)", date: "15 May 2026", price: 8999, seats: "Filling Fast" },
      { label: "Batch 2 (Summer Camp)", date: "25 May 2026", price: 8999, seats: "Open" },
      { label: "Batch 3 (Monsoon Himalayan)", date: "05 June 2026", price: 8999, seats: "Open" },
      { label: "Batch 4 (Autumn Camp)", date: "15 October 2026", price: 8999, seats: "Open" }
    ],
    featured: true,
  },
  {
    id: "bhrigu-lake-manali",
    title: "Manali Bhrigu Lake Trek",
    location: "Manali, Himachal Pradesh",
    duration: "5 Days",
    difficulty: "Moderate",
    endurance: "Medium",
    ageGroup: "12-60",
    price: 7499,
    originalPrice: 9499,
    image: "/images/manali-camp/manali-camp-3.jpg",
    tag: "High Alpine Lake",
    reporting: "Manali to Manali",
    description: "Trek to the holy alpine lake at 14,000 ft with emerald green meadows.",
    overview: "Bhrigu Lake is famous for high altitude meadows, snow patches, and sweeping alpine valley views above Manali.",
    highlights: ["14,000 ft Alpine Lake", "Rola Kholi meadows", "Snow slides & ridge walks", "Panorama of Dhauladhar & Pir Panjal", "Guided by certified mountaineers"],
    itinerary: [
      { day: 1, title: "Manali to Gulaba & Rola Kholi", description: "Drive to Gulaba, trek through pine forest to Rola Kholi camp." },
      { day: 2, title: "Rola Kholi to Bhrigu Lake & Back", description: "Summit push to Bhrigu Lake, sacred lake darshan, return to Rola Kholi." },
      { day: 3, title: "Rola Kholi to Pandu Ropa", description: "Trek downhill through ridge trails." },
      { day: 4, title: "Pandu Ropa to Vashisht / Manali", description: "Descend to Vashisht hot springs, hot bath & celebration." },
      { day: 5, title: "Dispersal from Manali", description: "Post breakfast checkout." }
    ],
    includes: ["Meals on trek", "Tents & sleeping bags", "Permits & Guide", "First aid & O2 cylinder"],
    excludes: ["Travel to Manali", "Personal clothing & gear"],
    month: ["Jun", "Jul", "Aug", "Sep", "Oct", "May"],
    tourType: "Himalayan Trek",
    gallery: [
      "/images/manali-camp/manali-camp-3.jpg",
      "/images/manali-camp/manali-camp-4.jpg",
      "/images/manali-camp/manali-camp-5.jpg",
      "/images/manali-camp/manali-camp-7.jpg"
    ],
    batches: [
      { label: "Batch 1", date: "10 June 2026", price: 7499, seats: "Open" },
      { label: "Batch 2", date: "24 June 2026", price: 7499, seats: "Open" },
      { label: "Batch 3", date: "08 July 2026", price: 7499, seats: "Open" },
      { label: "Batch 4", date: "22 July 2026", price: 7499, seats: "Open" },
      { label: "Batch 5", date: "12 August 2026", price: 7499, seats: "Open" },
      { label: "Batch 6", date: "09 September 2026", price: 7499, seats: "Filling Fast" },
      { label: "Batch 7", date: "23 September 2026", price: 7499, seats: "Open" },
      { label: "Batch 8", date: "07 October 2026", price: 7499, seats: "Open" },
      { label: "Batch 9", date: "12 May 2027", price: 7499, seats: "Open" },
      { label: "Batch 10", date: "26 May 2027", price: 7499, seats: "Open" },
    ],
    featured: true,
  },
  {
    id: "hampta-pass-manali",
    title: "Hampta Pass - Manali to Spiti",
    location: "Manali & Spiti, Himachal Pradesh",
    duration: "5 Days",
    difficulty: "Moderate",
    endurance: "High",
    ageGroup: "14-55",
    price: 8499,
    originalPrice: 10499,
    image: "/images/manali-camp/manali-camp-5.jpg",
    tag: "Cross-Pass Trek",
    reporting: "Manali to Manali",
    description: "Cross from lush green Kullu valley into the stark cold desert of Spiti with Chandratal Lake visit.",
    overview: "Hampta Pass is India's most dramatic crossover trek, offering contrasting scenery every single day.",
    highlights: ["Cross 14,000 ft Hampta Pass", "Chandratal Moon Lake visit", "Shea Goru river crossing", "Chika & Balu ka Ghera campsites", "High altitude landscape contrast"],
    itinerary: [
      { day: 1, title: "Manali to Jobra & Chika", description: "Drive to Jobra, trek along Rani River to Chika camp." },
      { day: 2, title: "Chika to Balu Ka Ghera", description: "Gradual incline walk along valley bed." },
      { day: 3, title: "Balu Ka Ghera to Hampta Pass to Shea Goru", description: "Ascend pass over snow bridges, descend into Spiti valley." },
      { day: 4, title: "Shea Goru to Chatru & Chandratal Lake", description: "Descend to Chatru, drive to iconic Chandratal Lake." },
      { day: 5, title: "Chatru to Manali via Atal Tunnel", description: "Drive back to Manali, trip ends." }
    ],
    includes: ["Meals on trek", "Camping gear & tents", "Chandratal excursion", "Permits & trek leader"],
    excludes: ["Travel to Manali", "Personal gear", "Insurance"],
    month: ["Jun", "Jul", "Aug", "Sep"],
    tourType: "Himalayan Trek",
    gallery: [
      "/images/manali-camp/manali-camp-5.jpg",
      "/images/manali-camp/manali-camp-2.jpg",
      "/images/manali-camp/manali-camp-6.jpg",
      "/images/manali-camp/manali-camp-1.jpg"
    ],
    batches: [
      { label: "Batch 1", date: "15 June 2026", price: 8499, seats: "Filling Fast" },
      { label: "Batch 2", date: "29 June 2026", price: 8499, seats: "Open" },
      { label: "Batch 3", date: "13 July 2026", price: 8499, seats: "Open" },
      { label: "Batch 4", date: "27 July 2026", price: 8499, seats: "Open" },
      { label: "Batch 5", date: "10 August 2026", price: 8499, seats: "Open" },
      { label: "Batch 6", date: "24 August 2026", price: 8499, seats: "Open" },
      { label: "Batch 7", date: "07 September 2026", price: 8499, seats: "Filling Fast" },
      { label: "Batch 8", date: "21 September 2026", price: 8499, seats: "Open" },
    ],
    featured: true,
  },
];

const categorySubtitles: Record<string, string> = {
  "Weekend Treks": "Guided Sahyadri Fort & Forest Treks",
  "Junior Explorers": "Specially Designed for aged 8 to 16 years",
  "Lady Explorers": "Women Special - Treks, Camps & Tours",
  "Silver Explorers": "Specially Curated for aged 40+ years",
  "Explorers on Wheels": "Bicycle, Bike & Caravan Expeditions",
  "Camping": "Lakeside & Mountain Camping Under Open Skies",
  "Jungle Safari": "Wildlife National Park Safaris Across India",
  "Himalayan Treks": "High-Altitude Guided Treks & Expeditions",
  "School Tours": "Safe Educational Outdoor Camps & Trips",
  "Corporate Tours": "Outbound Team Building & Offsite Trips",
  "Fix Departure Tours": "Scheduled Group Travel With Fixed Dates",
  "Customise Tour Packages": "Tailor-Made Domestic & International Plans",
  "TOURS OUT OF MAHARASHTRA": "Curated Kokan, South & North India Tours",
  "Offbeat Tours": "Lesser-Known Hidden Trails & Experiences",
  "Mountain Run": "Trail Running Events in Sahyadri Terrain",
  "ATLAS Training Academy": "Adventure Leadership Training Program",
  "Be A Part of Explorers": "Join Our Certified Event Leadership Team",
};

export const experienceCategories = [
  "Weekend Treks",
  "Junior Explorers",
  "Lady Explorers",
  "Silver Explorers",
  "Explorers on Wheels",
  "Camping",
  "Jungle Safari",
  "Himalayan Treks",
  "School Tours",
  "Corporate Tours",
  "Fix Departure Tours",
  "Customise Tour Packages",
  "TOURS OUT OF MAHARASHTRA",
  "Offbeat Tours",
  "Mountain Run",
  "ATLAS Training Academy",
  "Be A Part of Explorers",
].map((name, index) => ({
  name: name.toUpperCase(),
  rawName: name,
  subtitle: categorySubtitles[name] || "Curated Outdoor Experience",
  image: [heroMountains, heroKids, heroWomen, heroCamping][index % 4],
  link: name.includes("ATLAS")
    ? "/atlas"
    : name.includes("Weekend") || name.includes("Himalayan") || name.includes("Camping")
    ? `/treks?type=${encodeURIComponent(name === "Weekend Treks" ? "Weekend Trek" : name === "Himalayan Treks" ? "Himalayan Trek" : "Camping")}`
    : name.includes("Junior")
    ? "/programs/junior-explorers"
    : name.includes("Lady")
    ? "/programs/lady-explorers"
    : name.includes("Silver")
    ? "/programs/silver-explorers"
    : name.includes("Wheels")
    ? "/programs/on-wheels"
    : name.includes("Safari")
    ? "/programs/wildlife-tours"
    : name.includes("School")
    ? "/programs/school-tours"
    : name.includes("Corporate")
    ? "/programs/corporate-tours"
    : name.includes("Group") || name.includes("Fix Departure")
    ? "/programs/group-tours"
    : "/programs/customised-packages",
}));

export const awards = [
  "Maharashtra Tourism",
  "MSME",
  "NIDHI",
  "ETAA",
  "TAAP",
  "Bhartiya Paryatan Coop Society",
  "ATAOI",
  "TOI Award",
  "Paryatan Committee",
  "Innovative Tour Operator",
  "IIHM",
  "IHC London",
];

export interface GoogleReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  time: string;
  text: string;
  location?: string;
}

export const googleReviews: GoogleReview[] = [
  {
    id: "rev-1",
    name: "Shubham R",
    avatar: "SR",
    rating: 5,
    time: "29 Sep 2024",
    text: "The trek guidance was expert, enthusiastic and safety-focused. The team made the adventure enjoyable and encouraged everyone to push their limits.",
    location: "Google Review",
  },
  {
    id: "rev-2",
    name: "Ashwini D",
    avatar: "AD",
    rating: 5,
    time: "8 May 2025",
    text: "The four-day Rajgad trek for her son was well planned, with a good resort, activities, food, fun experiences and timely updates.",
    location: "Google Review",
  },
  {
    id: "rev-3",
    name: "Suhas P",
    avatar: "SP",
    rating: 5,
    time: "6 Nov 2023",
    text: "The Lingana climbing and rappelling trip was managed very well, including travel, accommodation, food and the complete hiking experience.",
    location: "Google Review",
  },
  {
    id: "rev-4",
    name: "Ketaki K",
    avatar: "KK",
    rating: 5,
    time: "7 Aug 2023",
    text: "The Nanemachi waterfall trek was reliable and well organised, with knowledgeable leaders, safe travel, good food and attentive support throughout.",
    location: "Google Review",
  },
  {
    id: "rev-5",
    name: "Yatin B",
    avatar: "YB",
    rating: 5,
    time: "14 Sep 2025",
    text: "The guide was supportive, food was well arranged, the schedule was managed on time and the team took excellent care of everyone's safety.",
    location: "Google Review",
  },
];

export const officialSocialLinks = {
  instagram: "https://www.instagram.com/explorers_group/",
  facebook: "https://www.facebook.com/Explorers.DareToDiscover/",
  youtube: "https://www.youtube.com/channel/UC5ffVZUnp2p2Bi6VqNyMRcw",
  google: "https://share.google/gjutfkcL6JiTO7W7X",
  whatsapp: `https://wa.me/91${brand.whatsapp}?text=${encodeURIComponent(
    "Hello Explorers! I am interested in your treks and tours. Please share the upcoming options and booking details.",
  )}`,
  textMessage: `sms:+91${brand.whatsapp}?body=${encodeURIComponent(
    "Hello Explorers! I am interested in your treks and tours. Please share the upcoming options and booking details.",
  )}`,
} as const;

export const socialChannels = [
  {
    type: "instagram",
    name: "Instagram",
    action: "FOLLOW",
    link: officialSocialLinks.instagram,
    subtext: "Live updates & trip reels",
  },
  {
    type: "facebook",
    name: "Facebook",
    action: "FOLLOW",
    link: officialSocialLinks.facebook,
    subtext: "Community photos & events",
  },
  {
    type: "youtube",
    name: "YouTube",
    action: "SUBSCRIBE",
    link: officialSocialLinks.youtube,
    subtext: "Trek vlogs & documentaries",
  },
  {
    type: "google",
    name: "Google Reviews",
    action: "REVIEW",
    link: officialSocialLinks.google,
    subtext: "4.7★ rating (476 Google reviews)",
  },
  {
    type: "whatsapp-group",
    name: "JOIN OUR WHATSAPP GROUP",
    action: "JOIN",
    link: "https://chat.whatsapp.com/ExplorersGroupJoin",
    subtext: "Get instant trek & tour alerts",
  },
  {
    type: "text-message",
    name: "SEND US A TEXT MESSAGE",
    action: "MESSAGE",
    link: officialSocialLinks.textMessage,
    subtext: "Start an instant trek or tour enquiry",
  },
];

export const pickupPoints = [
  { name: "Explorers Office", map: "https://www.google.com/maps/search/?api=1&query=Explorers+Office+Sadashiv+Peth+Pune" },
  { name: "Deccan", map: "https://www.google.com/maps/search/?api=1&query=Deccan+Pune" },
  { name: "Sancheti Hospital", map: "https://www.google.com/maps/search/?api=1&query=Sancheti+Hospital+Pune" },
  { name: "Nashik Phata", map: "https://www.google.com/maps/search/?api=1&query=Nashik+Phata+Pune" },
  { name: "Moshi", map: "https://www.google.com/maps/search/?api=1&query=Moshi+Pune" },
];

export const offers = [
  { name: "Early Bird", value: "Auto-applies for selected advance bookings" },
  { name: "Group Discount", value: "Rs.500 for 4-8, Rs.1000 for 8-15" },
  { name: "Membership Discount", value: "Lady and Silver Explorers voucher Rs.1000" },
  { name: "Repeater Discount", value: "Rs.1000 cashback after 10 treks in a financial year" },
];

export const adminModules = [
  "Hero sliders image/video",
  "Event categories and cards",
  "Seasonal tabs",
  "Detail pages and batches",
  "Prices and pickup points",
  "Itinerary and includes/excludes",
  "Offers and gallery",
  "Awards logos and testimonials",
  "Social links and calendar schedule",
  "Enquiries, bookings, users, payments, and contact details",
];

export const programDirectory = [
  { title: "Junior Explorers", subtitle: "8-16 years adventure camps and outdoor learning", link: "/programs/junior-explorers" },
  { title: "Lady Explorers", subtitle: "Women special treks, camps and tours", link: "/programs/lady-explorers" },
  { title: "Silver Explorers", subtitle: "40+ years comfortable treks and tours", link: "/programs/silver-explorers" },
  { title: "Explorers on Wheels", subtitle: "Bicycle, bike, caravan and road trips", link: "/programs/on-wheels" },
  { title: "Camping", subtitle: "Pavna, Panshet, Madheghat and Malshej stays", link: "/treks?type=Camping" },
  { title: "Jungle Safari", subtitle: "Forest safaris and wildlife learning tours", link: "/programs/wildlife-tours" },
  { title: "Himalayan Explorers", subtitle: "Guided Himalayan treks and expeditions", link: "/programs/himalayan-explorers" },
  { title: "School Tours", subtitle: "Safe educational trips and outdoor camps", link: "/programs/school-tours" },
  { title: "Corporate Tours", subtitle: "Team outings, offsites and leadership programs", link: "/programs/corporate-tours" },
  { title: "Group Tours", subtitle: "Fix departure domestic and international group tours", link: "/programs/group-tours" },
  { title: "Fix Departure Tours", subtitle: "Scheduled tours with confirmed batches", link: "/programs/fix-departure-tours" },
  { title: "Customised Packages", subtitle: "Domestic, international, honeymoon and private tours", link: "/programs/customised-packages" },
  { title: "Tours Out of Maharashtra", subtitle: "Kokan, South India, North India and pilgrimage tours", link: "/programs/tours-out-of-maharashtra" },
  { title: "Offbeat Tours", subtitle: "Hidden destinations and unusual travel experiences", link: "/programs/offbeat-tours" },
  { title: "Mountain Run", subtitle: "Trail running and Explorers Mountain Run events", link: "/programs/mountain-run" },
  { title: "ATLAS Training Academy", subtitle: "Become a part of Team Explorers", link: "/atlas" },
];

export const tourCategoryFilters = [
  "One Day Trek",
  "Camping",
  "Summer Camp",
  "Winter Camp",
  "Wildlife Safari",
  "Domestic Tour",
  "International Tour",
  "One Day Trekking Plan",
];

const programDetails: Record<string, { description: string; ageGroup: string }> = {
  "junior-explorers": {
    ageGroup: "8-16 years",
    description: "Specially designed for ages 8 to 16 years with outdoor learning, games, trekking basics, camping skills, and confidence-building activities.",
  },
  "lady-explorers": {
    ageGroup: "Women special",
    description: "Women-only treks, tours, and camping batches with trusted planning, comfort, and friendly group support.",
  },
  "silver-explorers": {
    ageGroup: "40+ years",
    description: "Comfortable, carefully paced trips for 40+ explorers with thoughtful itineraries and reliable logistics.",
  },
  "on-wheels": {
    ageGroup: "All age groups",
    description: "Bicycle rides, bike expeditions, caravan routes, and scenic road journeys with curated halts and support.",
  },
  "wildlife-tours": {
    ageGroup: "Families and nature lovers",
    description: "Explore Tadoba, Pench, Kanha, Bandhavgad, Ranthambore, Gir, Kaziranga and other wildlife destinations with safari planning and nature interpretation.",
  },
  "himalayan-explorers": {
    ageGroup: "14+ years",
    description: "Himalayan Explorers includes guided treks across Himachal, Uttarakhand, Jammu & Kashmir and Nepal, with preparation guidance and trained trek leadership.",
  },
  "school-tours": {
    ageGroup: "School groups",
    description: "School tours include educational trips, adventure camps, outdoor learning modules, leadership activities, safety-first logistics and teacher-friendly coordination.",
  },
  "corporate-tours": {
    ageGroup: "Corporate teams",
    description: "Corporate tours are built for team bonding, outbound training, leadership exercises, offsites, reward trips and customised employee engagement experiences.",
  },
  "group-tours": {
    ageGroup: "All age groups",
    description: "Group Tours include fixed departure tours such as Malvan Tarkarli, Suvarnadurga Panhalekaji, Gokarna-Murudeshwar, Hampi-Badami, Ujjain-Omkareshwar and more.",
  },
  "fix-departure-tours": {
    ageGroup: "All age groups",
    description: "Fix Departure Tours are scheduled, batch-wise trips for travellers who want confirmed dates, clear itineraries, transparent pricing and dependable Explorers coordination.",
  },
  "customised-packages": {
    ageGroup: "Private groups",
    description: "Customised packages cover domestic tours, international tours, honeymoon tours, corporate tours, school tours, family vacations and private group itineraries.",
  },
  "tours-out-of-maharashtra": {
    ageGroup: "Families and groups",
    description: "Tours Out of Maharashtra include curated travel across Kokan, South India, North India, heritage circuits, pilgrimage routes and nature destinations.",
  },
  "offbeat-tours": {
    ageGroup: "Curious travellers",
    description: "Offbeat Tours focus on lesser-known destinations, hidden trails, unusual landscapes, local experiences and routes beyond standard travel itineraries.",
  },
  "mountain-run": {
    ageGroup: "16+ years",
    description: "Mountain Run events are trail-running experiences in natural terrain, designed for fitness lovers, runners, trekkers and adventure-sport enthusiasts.",
  },
};

export const specialPrograms = programDirectory
  .filter((program) => program.link.startsWith("/programs/"))
  .map((program, index) => {
    const id = program.link.split("/").pop() || `program-${index}`;
    const details = programDetails[id] || { description: program.subtitle, ageGroup: program.subtitle };

    return {
      id,
      title: program.title,
      description: details.description,
      image: [heroKids, heroWomen, heroMountains, heroCamping][index % 4],
      ageGroup: details.ageGroup,
    };
  });

export const seasonTabs = {
  monsoon: {
    title: "Monsoon Treks & Tours",
    period: "June to September",
    intro: "Waterfalls, green valleys, misty ridges, and classic monsoon treks near Pune.",
  },
  winter: {
    title: "Winter Adventure",
    period: "October to January",
    intro: "Clear views, fort treks near Pune/Mumbai, camping, and beginner-friendly routes.",
  },
  summer: {
    title: "Summer Treks & Tours",
    period: "February to May",
    intro: "Early morning climbs, offbeat treks Maharashtra, school camps, and cool forest trails.",
  },
};
