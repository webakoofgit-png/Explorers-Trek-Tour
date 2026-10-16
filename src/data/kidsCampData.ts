export interface KidsCampImage {
  id: string;
  src: string;
  title: string;
  category: "Archery & Shooting" | "Camping & Tents" | "Rappelling & Ropes" | "Treks & Trails" | "Games & Activities" | "Himalayan & Manali Camp" | "Velas Turtle & Eco Nature";
  description: string;
}

export const kidsCampImages: KidsCampImage[] = [
  // Velas Turtle Festival Photos
  { id: "velas-1", src: "/images/velas-turtle-festival/velas-turtle-5.jpg", title: "Baby Olive Ridley Turtle Hatchling", category: "Velas Turtle & Eco Nature", description: "Tiny newborn Olive Ridley sea turtle crawling towards the Arabian Sea at Velas Beach." },
  { id: "velas-2", src: "/images/velas-turtle-festival/velas-turtle-4.jpg", title: "Velas Conservation Beach Release", category: "Velas Turtle & Eco Nature", description: "Witnessing baby turtles being released safely into ocean waters under conservation guides." },
  { id: "velas-3", src: "/images/velas-turtle-festival/velas-turtle-1.jpg", title: "Velas Village Homestay & Trail", category: "Velas Turtle & Eco Nature", description: "Exploring traditional Konkani village hospitality and coastal palm trails." },
  { id: "velas-4", src: "/images/velas-turtle-festival/velas-turtle-2.jpg", title: "Bankot Fort & Sunset Sea View", category: "Velas Turtle & Eco Nature", description: "Historical fort hike offering views of the Savitri river estuary and ocean sunset." },
  { id: "velas-5", src: "/images/velas-turtle-festival/velas-turtle-3.jpg", title: "Baby Turtle First Steps", category: "Velas Turtle & Eco Nature", description: "Witnessing the miracle of sea turtle conservation at Velas Beach, Ratnagiri." },
  { id: "velas-6", src: "/images/velas-turtle-festival/velas-turtle-6.png", title: "Harihareshwar Ferry Boat Ride", category: "Velas Turtle & Eco Nature", description: "Crossing the sea creek via jetty ferry boat to Harihareshwar coastal temple." },
  // Manali Adventure Camp Photos
  { id: "manali-1", src: "/images/manali-camp/manali-camp-1.jpg", title: "Manali Alpine Wilderness Campsite", category: "Himalayan & Manali Camp", description: "Tent camping amidst pine trees and snow-capped Himalayan peaks in Manali." },
  { id: "manali-2", src: "/images/manali-camp/manali-camp-2.jpg", title: "Youth Camp Expedition Team", category: "Himalayan & Manali Camp", description: "Young explorers and instructors on a Himalayan adventure expedition in Manali." },
  { id: "manali-3", src: "/images/manali-camp/manali-camp-3.jpg", title: "Himalayan Valley & Snow View", category: "Himalayan & Manali Camp", description: "Breathtaking views of Kullu-Manali snow trails and alpine river streams." },
  { id: "manali-4", src: "/images/manali-camp/manali-camp-4.jpg", title: "Pine Forest Trail Trekking", category: "Himalayan & Manali Camp", description: "Guided wilderness trek through dense Manali pine and cedar forests." },
  { id: "manali-5", src: "/images/manali-camp/manali-camp-5.jpg", title: "Solang Valley Snow Trail Walk", category: "Himalayan & Manali Camp", description: "Experiencing snow walking and high-altitude trail navigation in Solang." },
  { id: "manali-6", src: "/images/manali-camp/manali-camp-6.jpg", title: "Himalayan Stream & Rope Crossing", category: "Himalayan & Manali Camp", description: "Safe river crossing techniques under certified mountaineering leaders." },
  { id: "manali-7", src: "/images/manali-camp/manali-camp-7.jpg", title: "High Altitude Ridge Panorama", category: "Himalayan & Manali Camp", description: "Panoramic views of Dhauladhar and Pir Panjal mountain ranges." },

  // Kids Camp Photos
  { id: "archery-1", src: "/images/kids-camp/archery.jpg", title: "Archery & Focus Practice", category: "Archery & Shooting", description: "Concentration and aim training with bow and arrow under expert guidance." },
  { id: "rifle-1", src: "/images/kids-camp/rifle-shooting.jpg", title: "Air Rifle Target Shooting", category: "Archery & Shooting", description: "Precision target shooting emphasizing discipline and breath control." },
  { id: "rope-1", src: "/images/kids-camp/rope-activity.jpg", title: "High Rope Obstacle Course", category: "Rappelling & Ropes", description: "Building balance, agility, and courage on elevated rope challenges." },
  { id: "rap-1", src: "/images/kids-camp/rappelling-1.jpg", title: "Waterfall & Cliff Rappelling", category: "Rappelling & Ropes", description: "Thrilling controlled rope descent down natural rock faces." },
  { id: "rap-2", src: "/images/kids-camp/rappelling-2.jpg", title: "Guided Rappelling Safety", category: "Rappelling & Ropes", description: "Certified mountaineers ensuring 100% harness safety and instruction." },
  { id: "rap-3", src: "/images/kids-camp/rappelling-3.jpg", title: "Sahyadri Rock Rappelling", category: "Rappelling & Ropes", description: "Overcoming fear of heights through hands-on adventure sports." },
  { id: "rap-4", src: "/images/kids-camp/rappelling-4.jpg", title: "Rope Technique Practice", category: "Rappelling & Ropes", description: "Learning anchor techniques and body positioning for descents." },
  
  { id: "tent-1", src: "/images/kids-camp/tent-1.jpg", title: "Outdoor Tent Pitching Workshop", category: "Camping & Tents", description: "Kids learning how to pitch and secure camping tents in the wild." },
  { id: "tent-2", src: "/images/kids-camp/tent-2.jpg", title: "Wilderness Camping Stay", category: "Camping & Tents", description: "Experiencing authentic outdoor camping under safe supervision." },
  { id: "tent-3", src: "/images/kids-camp/tent-3.jpg", title: "Campsite Evening Life", category: "Camping & Tents", description: "Cosy tent stays surrounded by green Sahyadri hills." },
  
  { id: "stargazing-1", src: "/images/kids-camp/star-gazing.jpg", title: "Night Sky & Astronomy Session", category: "Games & Activities", description: "Identifying stars, constellations, and night navigation." },
  { id: "games-1", src: "/images/kids-camp/old-indian-games.jpg", title: "Traditional Indian Outdoor Games", category: "Games & Activities", description: "Screen-free games fostering team spirit and physical agility." },
  { id: "omkar-1", src: "/images/kids-camp/omkar.jpg", title: "Morning Meditation & Wellness", category: "Games & Activities", description: "Mindful breathing and morning stretching in fresh mountain air." },
  
  { id: "trek-1", src: "/images/kids-camp/trek-1.jpg", title: "Sahyadri Nature Exploration", category: "Treks & Trails", description: "Guided flora and fauna trail walks with naturalists." },
  { id: "trek-2", src: "/images/kids-camp/trek-2.jpg", title: "Junior Explorer Mountain Trail", category: "Treks & Trails", description: "Building endurance and trekking discipline on green mountain paths." },
  { id: "trek-3", src: "/images/kids-camp/trek-3.jpg", title: "Trail Summit Achievement", category: "Treks & Trails", description: "Reaching mountain viewpoints with fellow young explorers." },
  { id: "trek-4", src: "/images/kids-camp/trek-4.jpg", title: "Morning Valley Hike", category: "Treks & Trails", description: "Fresh morning air and panoramic valley views on trail." },
  { id: "trek-5", src: "/images/kids-camp/trek-5.jpg", title: "Forest Trail Navigation", category: "Treks & Trails", description: "Learning trail markings, map reading, and terrain safety." },
  { id: "trek-6", src: "/images/kids-camp/trek-6.jpg", title: "Historical Fort Exploration", category: "Treks & Trails", description: "Combining history lessons with fun outdoor mountain hikes." },
  { id: "trek-7", src: "/images/kids-camp/trek-7.jpg", title: "Team Friendship Trail", category: "Treks & Trails", description: "Making lifelong friends while exploring nature." },
  { id: "trek-8", src: "/images/kids-camp/trek-8.jpg", title: "Monsoon Waterfall Trail", category: "Treks & Trails", description: "Splashing in safe mountain streams and mist-covered trails." },
  { id: "trek-9", src: "/images/kids-camp/trek-9.jpg", title: "Proud Finish Line Moment", category: "Treks & Trails", description: "Celebrating trek completion with certificates and cheers." },

  { id: "kc-1", src: "/images/kids-camp/kids-camp-1.jpg", title: "Camp Orientation & Briefing", category: "Games & Activities", description: "Warm welcome, team division, and safety ground rules." },
  { id: "kc-2", src: "/images/kids-camp/kids-camp-2.jpg", title: "Team Building Challenges", category: "Games & Activities", description: "Group obstacle solving and leadership building games." },
  { id: "kc-3", src: "/images/kids-camp/kids-camp-3.jpg", title: "Outdoor Survival & Knots", category: "Games & Activities", description: "Essential survival skills including knot tying and gear prep." },
  { id: "kc-4", src: "/images/kids-camp/kids-camp-4.jpg", title: "Campsite Bonding & Laughter", category: "Games & Activities", description: "Joyful moments during interactive afternoon workshops." },
  { id: "kc-5", src: "/images/kids-camp/kids-camp-5.jpg", title: "Leadership & Self Reliance", category: "Games & Activities", description: "Encouraging kids to take initiative and support peers." },
  { id: "kc-6", src: "/images/kids-camp/kids-camp-6.jpg", title: "Nature Observation & Birding", category: "Games & Activities", description: "Discovering birds, butterflies, and natural flora." },
  { id: "kc-7", src: "/images/kids-camp/kids-camp-7.jpg", title: "Campfire Stories & Music", category: "Games & Activities", description: "Evening campfire gatherings with storytelling and acoustic songs." },
  { id: "kc-8", src: "/images/kids-camp/kids-camp-8.jpg", title: "Camp Achievement Awards", category: "Games & Activities", description: "Awarding badges for leadership, courage, and teamwork." },
  { id: "kc-9", src: "/images/kids-camp/kids-camp-9.jpg", title: "Guided Group Expedition", category: "Treks & Trails", description: "Safety marshals ensuring step-by-step guidance for every child." },
  { id: "kc-10", src: "/images/kids-camp/kids-camp-10.jpg", title: "Wilderness Living", category: "Camping & Tents", description: "Unplugging from screens to connect with authentic wilderness." },
  { id: "kc-11", src: "/images/kids-camp/kids-camp-11.jpg", title: "Harness & Safety Gear Check", category: "Rappelling & Ropes", description: "Strict equipment inspections before high-element activities." },
  { id: "kc-12", src: "/images/kids-camp/kids-camp-12.jpg", title: "Adventure Sports Practice", category: "Archery & Shooting", description: "Supervised target shooting stations for developing focus." },
  { id: "kc-13", src: "/images/kids-camp/kids-camp-13.jpg", title: "Outdoor Agility Drills", category: "Games & Activities", description: "Fun agility courses that keep kids active and energized." },
  { id: "kc-14", src: "/images/kids-camp/kids-camp-14.jpg", title: "Peer Encouragement & Teamwork", category: "Games & Activities", description: "Kids supporting each other to conquer obstacles." },
  { id: "kc-15", src: "/images/kids-camp/kids-camp-15.jpg", title: "Explorers Instructor Team", category: "Games & Activities", description: "Experienced instructors providing 24/7 care and encouragement." },
  { id: "kc-16", src: "/images/kids-camp/kids-camp-16.jpg", title: "Golden Hour At Campsite", category: "Camping & Tents", description: "Relaxing sunset views over the mountain campsite." },
  { id: "kc-17", src: "/images/kids-camp/kids-camp-17.jpg", title: "Certification Ceremony", category: "Games & Activities", description: "Every participant receives an official Explorers Junior certificate." },
  { id: "kc-18", src: "/images/kids-camp/kids-camp-18.jpg", title: "Outdoor Adventure Memories", category: "Treks & Trails", description: "Creating lifelong outdoor habits and nature appreciation." }
];
