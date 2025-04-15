interface PickupLine {
  id: number;
  text: string;
  category: 'standard' | 'spicy' | 'playful';
}

export const pickupLines: PickupLine[] = [
  // Existing 9 lines
  {
    id: 1,
    text: "Do you have a map? I keep getting lost in your eyes!",
    category: 'standard'
  },
  {
    id: 2,
    text: "Are you a camera? Because every time I look at you, I smile!",
    category: 'standard'
  },
  {
    id: 3,
    text: "Is your name Google? Because you've got everything I've been searching for!",
    category: 'standard'
  },
  {
    id: 4,
    text: "If you were a vegetable, you'd be a cute-cumber!",
    category: 'playful'
  },
  {
    id: 5,
    text: "Are you a cat? Because you're purr-fect!",
    category: 'playful'
  },
  {
    id: 6,
    text: "Are you made of copper and tellurium? Because you're Cu-Te!",
    category: 'playful'
  },
  {
    id: 7,
    text: "Are you a campfire? Because you are hot and I want s'more!",
    category: 'spicy'
  },
  {
    id: 8,
    text: "Is your name WiFi? Because I'm really feeling a connection!",
    category: 'spicy'
  },
  {
    id: 9,
    text: "Are you a parking ticket? Because you've got FINE written all over you!",
    category: 'spicy'
  },

  // Additional 'standard' pickup lines (IDs 10–44)
  {
    id: 10,
    text: "If beauty were a time, you'd be an eternity.",
    category: 'standard'
  },
  {
    id: 11,
    text: "Are you a bank loan? Because you have my interest.",
    category: 'standard'
  },
  {
    id: 12,
    text: "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
    category: 'standard'
  },
  {
    id: 13,
    text: "Are you a magician? Because whenever I look at you, everyone else disappears.",
    category: 'standard'
  },
  {
    id: 14,
    text: "If I could rearrange the alphabet, I'd put U and I together.",
    category: 'standard'
  },
  {
    id: 15,
    text: "Do you have a sunburn, or are you always this hot?",
    category: 'standard'
  },
  {
    id: 16,
    text: "Are you French? Because Eiffel for you.",
    category: 'standard'
  },
  {
    id: 17,
    text: "I must be a snowflake, because I've fallen for you.",
    category: 'standard'
  },
  {
    id: 18,
    text: "Do you have a pencil? Because I want to erase your past and write our future.",
    category: 'standard'
  },
  {
    id: 19,
    text: "Are you a time traveler? Because I see you in my future.",
    category: 'standard'
  },
  {
    id: 20,
    text: "Is your dad a boxer? Because you're a knockout!",
    category: 'standard'
  },
  {
    id: 21,
    text: "Are you a 90-degree angle? Because you're looking right!",
    category: 'standard'
  },
  {
    id: 22,
    text: "Is your name Ariel? Because we mermaid for each other.",
    category: 'standard'
  },
  {
    id: 23,
    text: "Are you a light bulb? Because you brighten up my day.",
    category: 'standard'
  },
  {
    id: 24,
    text: "Are you a star? Because your beauty lights up the night.",
    category: 'standard'
  },
  {
    id: 25,
    text: "Is your name Chapstick? Because you're da balm.",
    category: 'standard'
  },
  {
    id: 26,
    text: "Are you a campfire? Because you're hot and I want s'more.",
    category: 'standard'
  },
  {
    id: 27,
    text: "Are you a keyboard? Because you're just my type.",
    category: 'standard'
  },
  {
    id: 28,
    text: "Are you a dictionary? Because you add meaning to my life.",
    category: 'standard'
  },
  {
    id: 29,
    text: "Are you a volcano? Because I lava you.",
    category: 'standard'
  },
  {
    id: 30,
    text: "Are you a cloud? Because you make my day brighter.",
    category: 'standard'
  },
  {
    id: 31,
    text: "Are you a charger? Because without you, I'd die.",
    category: 'standard'
  },
  {
    id: 32,
    text: "Are you a rainbow? Because you color my world.",
    category: 'standard'
  },
  {
    id: 33,
    text: "Are you a lock? Because I'm keyed into you.",
    category: 'standard'
  },
  {
    id: 34,
    text: "Are you a sunrise? Because you brighten my morning.",
    category: 'standard'
  },
  {
    id: 35,
    text: "Are you a mirror? Because I see my future in you.",
    category: 'standard'
  },
  {
    id: 36,
    text: "Are you a song? Because I can't get you out of my head.",
    category: 'standard'
  },
  {
    id: 37,
    text: "Are you a chef? Because you have the recipe to my heart.",
    category: 'standard'
  },
  {
    id: 38,
    text: "Are you a gardener? Because you make my heart bloom.",
    category: 'standard'
  },
  {
    id: 39,
    text: "Are you a painter? Because you color my world.",
    category: 'standard'
  },
  {
    id: 40,
    text: "Are you a pilot? Because you make my heart soar.",
    category: 'standard'
  },
  {
    id: 41,
    text: "Are you a compass? Because I’d be lost without you.",
    category: 'standard'
  },
  {
    id: 42,
    text: "Are you a lighthouse? Because you guide me home.",
    category: 'standard'
  },
  {
    id: 43,
    text: "Are you a book? Because I can’t stop reading about you.",
    category: 'standard'
  },
  {
    id: 43,
    text: "Are you a book? Because I can’t stop reading about you.",
    category: 'standard'
  },
  {
    id: 44,
    text: "Are you gravity? Because you keep pulling me in.",
    category: 'standard'
  },

  // Playful pickup lines (IDs 45–79)
  {
    id: 45,
    text: "Are you a banana? Because I find you a-peel-ing!",
    category: 'playful'
  },
  {
    id: 46,
    text: "You must be a snowman, because you just made my heart melt!",
    category: 'playful'
  },
  {
    id: 47,
    text: "Are you a squirrel? Because I’m nuts about you!",
    category: 'playful'
  },
  {
    id: 48,
    text: "Do you have raisins? No? How about a date?",
    category: 'playful'
  },
  {
    id: 49,
    text: "Are you an alien? Because you’ve just abducted my heart!",
    category: 'playful'
  },
  {
    id: 50,
    text: "Are you a beaver? Because daaaaam!",
    category: 'playful'
  },
  {
    id: 51,
    text: "Are you cereal? Because you’re looking like a snack!",
    category: 'playful'
  },
  {
    id: 52,
    text: "If you were a triangle, you’d be acute one!",
    category: 'playful'
  },
  {
    id: 53,
    text: "You're the cheese to my macaroni.",
    category: 'playful'
  },
  {
    id: 54,
    text: "Are you a pancake? Because I flipping love you.",
    category: 'playful'
  },
  {
    id: 55,
    text: "Are you an egg? Because you crack me up!",
    category: 'playful'
  },
  {
    id: 56,
    text: "If you were a fruit, you'd be a fineapple.",
    category: 'playful'
  },
  {
    id: 57,
    text: "Are you a donut? Because I doughnut want to be without you.",
    category: 'playful'
  },
  {
    id: 58,
    text: "You're the peanut butter to my jelly.",
    category: 'playful'
  },
  {
    id: 59,
    text: "Are you from Tennessee? Because you're the only 10 I see!",
    category: 'playful'
  },
  {
    id: 60,
    text: "Do you like Star Wars? Because Yoda one for me.",
    category: 'playful'
  },
  {
    id: 61,
    text: "If we were socks, we’d make a great pair.",
    category: 'playful'
  },
  {
    id: 62,
    text: "Are you Mario? Because I want to be your Princess Peach.",
    category: 'playful'
  },
  {
    id: 63,
    text: "Are you laundry? Because I’m falling for you.",
    category: 'playful'
  },
  {
    id: 64,
    text: "Are you a ghost? Because you’ve been haunting my dreams.",
    category: 'playful'
  },
  {
    id: 65,
    text: "Are you a snowflake? Because you’re one of a kind.",
    category: 'playful'
  },
  {
    id: 66,
    text: "Do you have a name or can I call you mine?",
    category: 'playful'
  },
  {
    id: 67,
    text: "Are you a skeleton? Because you’re humerus.",
    category: 'playful'
  },
  {
    id: 68,
    text: "Are you WiFi? Because I’m feeling the connection.",
    category: 'playful'
  },
  {
    id: 69,
    text: "Are you the moon? Because even in the dark, you shine.",
    category: 'playful'
  },
  {
    id: 70,
    text: "Are you soup? Because you're hot and I want to spoon.",
    category: 'playful'
  },
  {
    id: 71,
    text: "Are you a sandwich? Because I’m hungering for you.",
    category: 'playful'
  },
  {
    id: 72,
    text: "Do you have a license? Because you're driving me crazy!",
    category: 'playful'
  },
  {
    id: 73,
    text: "You must be tired—running through my mind all day.",
    category: 'playful'
  },
  {
    id: 74,
    text: "Are you a light switch? Because you turn me on.",
    category: 'playful'
  },
  {
    id: 75,
    text: "Do you like Minecraft? Because I’d dig you any day.",
    category: 'playful'
  },
  {
    id: 76,
    text: "Are you soda? Because you pop into my thoughts all the time.",
    category: 'playful'
  },
  {
    id: 77,
    text: "Are you a campfire? Because I want to roast marshmallows with you.",
    category: 'playful'
  },
  {
    id: 78,
    text: "Are you glitter? Because you brighten everything up.",
    category: 'playful'
  },
  {
    id: 79,
    text: "Are you a meme? Because I can't stop sharing you.",
    category: 'playful'
  },

  // Spicy pickup lines (IDs 80–114)
  {
    id: 80,
    text: "Are you a furnace? Because you’re heating me up!",
    category: 'spicy'
  },
  {
    id: 81,
    text: "If kisses were snowflakes, I’d send you a blizzard.",
    category: 'spicy'
  },
  {
    id: 82,
    text: "Your lips look lonely. Want to introduce them to mine?",
    category: 'spicy'
  },
  {
    id: 83,
    text: "Are you wearing space pants? Because your booty is out of this world.",
    category: 'spicy'
  },
  {
    id: 84,
    text: "If I said you had a beautiful body, would you hold it against me?",
    category: 'spicy'
  },
  {
    id: 85,
    text: "Are you a drill? Because you're making my heart spin.",
    category: 'spicy'
  },
  {
    id: 86,
    text: "You must be made of sugar, spice, and a whole lot of hot.",
    category: 'spicy'
  },
  {
    id: 87,
    text: "Do you believe in love at first sight—or should I walk by again in slow-mo?",
    category: 'spicy'
  },
  {
    id: 88,
    text: "Are we in a sauna? Because it's getting steamy in here.",
    category: 'spicy'
  },
  {
    id: 89,
    text: "You make my heart race faster than my pre-workout.",
    category: 'spicy'
  },
  {
    id: 90,
    text: "I must be a candle, because you just lit my fire.",
    category: 'spicy'
  },
  {
    id: 91,
    text: "Are you a match? Because you set me on fire.",
    category: 'spicy'
  },
  {
    id: 92,
    text: "Are you a spice rack? Because you're bringing the heat.",
    category: 'spicy'
  },
  {
    id: 93,
    text: "Are you espresso? Because you keep me up all night.",
    category: 'spicy'
  },
  {
    id: 94,
    text: "If hotness was a crime, you'd be serving a life sentence.",
    category: 'spicy'
  },
  {
    id: 95,
    text: "Your body must be a wonderland, because I'd like to explore it.",
    category: 'spicy'
  },
  {
    id: 96,
    text: "Is it hot in here or is it just you?",
    category: 'spicy'
  },
  {
    id: 97,
    text: "If you were a dessert, you'd be on fire.",
    category: 'spicy'
  },
  {
    id: 98,
    text: "Are you a flame? Because I’m drawn to your heat.",
    category: 'spicy'
  },
  {
    id: 99,
    text: "You must be a magician, because every time I look at you, my clothes disappear—in my mind.",
    category: 'spicy'
  },
  {
    id: 100,
    text: "Are you a chili pepper? Because you're smoking hot.",
    category: 'spicy'
  },
  {
    id: 101,
    text: "If you were a burger, you’d be McSpicy.",
    category: 'spicy'
  },
  {
    id: 102,
    text: "Are you lava? Because you’re melting my resistance.",
    category: 'spicy'
  },
  {
    id: 103,
    text: "Are you a flame emoji? Because you’re lit.",
    category: 'spicy'
  },
  {
    id: 104,
    text: "Are you in a hot tub? Because things are bubbling over here.",
    category: 'spicy'
  },
  {
    id: 105,
    text: "Are you a heatwave? Because you’ve got me sweating.",
    category: 'spicy'
  },
  {
    id: 106,
    text: "Are you spicy ramen? Because I want to slurp you up.",
    category: 'spicy'
  },
  {
    id: 107,
    text: "Are you sunscreen? Because I need you to handle all this heat.",
    category: 'spicy'
  },
  {
    id: 108,
    text: "Do you believe in fate? Because this heat feels destined.",
    category: 'spicy'
  },
  {
    id: 109,
    text: "Are you tequila? Because you burn going down but I crave more.",
    category: 'spicy'
  },
  {
    id: 110,
    text: "Are you steam? Because I can’t see clearly around you.",
    category: 'spicy'
  },
  {
    id: 111,
    text: "Are you a spark? Because you’re starting something dangerous.",
    category: 'spicy'
  },
  {
    id: 112,
    text: "You bring the heat—do you come with AC?",
    category: 'spicy'
  },
  {
    id: 113,
    text: "Are you charcoal? Because you're hot under pressure.",
    category: 'spicy'
  },
  {
    id: 114,
    text: "You’re like a volcano—one hot eruption away from total destruction.",
    category: 'spicy'
  }
];
