// Authored sample worlds. Future catalog connections can replace this data without changing the page sections.
const tvStories = [
  {
    id: 'midnight', title: 'Midnight departures', genre: 'A little adventure', image: 'assets/midnight-departures.png',
    alt: 'A glowing train, a traveller in a yellow coat and a white fox beside a moonlit sea',
    logline: 'The last train is only the beginning.',
    opening: 'A train arrives at a station that closed fifty years ago. Its doors open. A white fox looks back, as if it has been waiting for you.',
    choices: [
      {label:'Follow the fox', text:'The fox leads you beneath the platform. There’s another station down there. The departures board lists memories instead of places.', next:[{label:'Find your earliest memory',text:'The first train is a tiny red bicycle. Its bell rings, and someone you haven’t seen in years calls your name.'},{label:'Choose a memory you don’t recognise',text:'You step into a sunlit garden. An older version of you smiles and says, “You’re a little early.”'}]},
      {label:'Step onto the train', text:'Every seat holds a different version of the same traveller. One of them stands up. “Good,” she says. “Now we can finally leave.”', next:[{label:'Ask where you’re going',text:'The conductor turns over your ticket. Written on the back is a question you’ve never dared to ask.'},{label:'Sit beside your other self',text:'She hands you a photograph of tomorrow. In it, the two of you are laughing. The fox is driving.'}]},
      {label:'Let the train leave', text:'As the last carriage fades into the mist, the sea begins to glow. A staircase of light appears where the tracks used to be.', next:[{label:'Take the first step',text:'The sea holds your weight like glass. Below your feet, a city lights its windows, one by one.'},{label:'Call someone to come with you',text:'Your phone rings before you can dial. “I can see it too,” says your best friend, from the other side of the world.'}]},
    ],
  },
  {
    id:'signal', title:'The other side of tomorrow', genre:'A little sci-fi', image:'assets/last-signal.jpg', alt:'An astronaut on an unfamiliar planet beneath a glowing eclipse', logline:'Someone is calling. It sounds like you.',
    opening:'On a quiet little planet, a radio begins to play a song you made up as a child. Between the notes, a voice says your name.',
    choices:[
      {label:'Sing the next line',text:'The stars above you blink in time. The whole sky has been waiting for the chorus.',next:[{label:'Sing a new ending',text:'A new constellation appears. It looks exactly like the home you remember.'},{label:'Let the sky answer',text:'The answer comes in a thousand voices. None of them have ever heard music before.'}]},
      {label:'Follow the signal',text:'Behind a dune sits a tiny radio shop. A handwritten sign says: Repairs for things you thought were lost.',next:[{label:'Step inside',text:'The shelves hold laughter, forgotten names and one very familiar lullaby.'},{label:'Ask who runs the shop',text:'A small robot looks up. “You do,” it says. “I’m just covering your shift.”'}]},
      {label:'Send a message home',text:'Your message arrives before you send it. The reply says: We kept the light on.',next:[{label:'Ask for directions',text:'Your family sends a drawing of a door. When you hold it up, the door opens.'},{label:'Send a picture of the stars',text:'Back home, a child looks up. For one moment, you are both looking at the same sky.'}]},
    ],
  },
  {
    id:'garden', title:'The garden of impossible things', genre:'A little wonder', image:'assets/glasshouse.png', alt:'A botanist and a fox beside a glowing flower in an overgrown glasshouse', logline:'Some things grow better with a little imagination.',
    opening:'A forgotten greenhouse has started growing impossible things. Today, a flower opens to reveal a tiny, perfectly furnished room.',
    choices:[
      {label:'Knock on the tiny door',text:'A gardener no bigger than your thumb answers. “At last. We need someone tall enough to water the moon.”',next:[{label:'Offer to help',text:'She gives you a watering can full of stars. It is much lighter than you expected.'},{label:'Ask about the moon',text:'“It’s a seed,” she explains. “Nobody remembers what it grows into.”'}]},
      {label:'Plant something of your own',text:'You plant a wish you never told anyone. By morning, the garden has grown a path to it.',next:[{label:'Follow the new path',text:'Every footstep brings the sound of somewhere you’ve always wanted to go.'},{label:'Invite a friend along',text:'Their wish grows beside yours. Where the paths meet, a whole new world begins.'}]},
      {label:'Follow the fox outside',text:'Outside the greenhouse, winter has become spring. Inside your pocket is a seed with your name on it.',next:[{label:'Plant it in the city',text:'By lunchtime, a tree of tiny doors is growing in the square. Everyone finds a different view.'},{label:'Give the seed away',text:'The person who takes it returns the next day with a basket of stories. “It’s a sharing tree,” they say.'}]},
    ],
  },
];
